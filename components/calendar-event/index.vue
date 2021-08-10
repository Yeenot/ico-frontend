<template>
  <div>
    <div class="calendar-controls">
      <i class="fa fa-caret-left"
         v-on:click="previousMonth()"></i>
      <no-ssr>
        <date-picker lang="en"
                     v-model="calendar.date"
                     name="calendar-date"
                     format="MMMM yyyy"
                     :input-class="'calendar-picker form-control'"
                     :wrapper-class="'calendar-input-wrapper'"
                     :minimumView="'month'"
                     :maximumView="'month'"
                     :initialView="'month'"
                     ref="datepicker">
        </date-picker>
      </no-ssr>
      <i class="fa fa-caret-right"
         v-on:click="nextMonth()"></i>
    </div>
    <div class="calendar-container">
      <sweet-modal id="modal-day-events"
                   class="day-events"
                   overlay-theme="dark"
                   ref="events">
        <div class="events-header">
          <h4>Events - {{ formatDate(selected.date) }}</h4>
        </div>
        <div class="group-events">
          <div class="event-item"
               v-bind:style="getEventStyle(event)"
               v-for="event in DaySelected"
               v-on:click="goToDetails($event, event.name)">
            <span class="type"
                  v-if="event.event !== 'whitelist-until-date'">{{ formatType(event.type) }}:</span> {{ event.title }}
          </div>
        </div>
        <button class="reverse close-day-events"
                v-on:click="closeDayEvents()">OK</button>
        <div class="legends">
          <!-- <label>Legends:</label> -->
          <ul class="list calendar-legends">
            <li v-for="(legend, key) in legends"
                :key="key">
              <span class="box"
                    v-bind:style="{ 'background-color': legend.color }"></span>
              <span>{{ legend.heading }}</span>
            </li>
          </ul>
        </div>
      </sweet-modal>
      <table class="table">
        <tbody>
          <tr>
            <th v-for="day in daysInAWeek">
              {{ day }}
            </th>
          </tr>
        </tbody>
      </table>
      <div class="event-container">
        <div class="month-row"
             v-for="(week, weekNum) in dates">
          <table class="table inner-table date-bg">
            <tbody>
              <tr>
                <td class="cell-box"
                    v-bind:class="isToday(day)"
                    v-for="(day, dayNum) in week">
                  &nbsp;
                  <div class="others"
                       v-if="hasMore(weekNum, dayNum)"
                       v-on:click="viewDayEvents(weekNum, dayNum)"> {{ getMore(weekNum, dayNum) }} More </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table inner-table date-events">
            <tbody>
              <tr>
                <td v-bind:class="getCalendarDateClass(chunked, isToday(week[index]))"
                    v-for="(chunked, index) in week">
                  {{ chunked.getDate() }}
                </td>
              </tr>
              <tr>
                <td class="event-row"
                    v-bind:class="isToday(week[index])"
                    v-for="(day, index) in getIcoEvent(weekNum)">
                  <div class="event"
                       v-bind:style="getEventStyle(event)"
                       v-for="event in getLimitEvents(day)"
                       v-if="event"
                       v-on:click="goToDetails($event, event.name)">
                    <span class="type"
                          v-if="event.event !== 'whitelist-until-date'">{{ formatType(event.type) }}:</span> {{ event.title }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vuejs-datepicker";

export default {
  name: "calendar-event",
  props: ["events", "onRangeChange"],
  components: {
    DatePicker
  },

  data() {
    return {
      daysInAWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      calendar: {
        date: new Date()
      },
      limit: 3,
      dayEvents: [],
      selected: {
        week: 0,
        day: 0,
        date: null
      },

      dates: [],
      EventsPerIco: [],

      legends: {
        presale: {
          heading: "Presale",
          color: "#18244c"
        },
        crowdsale: {
          heading: "Crowdsale",
          color: "#0B8043"
        },
        "whitelist-until-date": {
          heading: "Whitelist closes",
          color: "#ec4079"
        },
        "estimated-date-of-exchange-listings": {
          heading: "Est. Date exchange listing",
          color: "#11a0f8"
        },
        "token-distribution-date": {
          heading: "Token Release Date",
          color: "#db4437"
        }
      }
    };
  },

  mounted() {
    this.getCalendarOfTheMonth(this.calendar.date);
  },

  computed: {
    DaySelected() {
      let events = [];
      const week = this.getIcoEvent(this.selected.week);
      let day = [];
      if (week) {
        if (week.length > 0) {
          day = week[this.selected.day];
        }
      }
      if (day) {
        events = day;
      }
      return events;
    }
  },

  watch: {
    "calendar.date"(value) {
      this.getCalendarOfTheMonth(value);
    },

    events(value) {
      const dates = this.dates;
      let events = value;
      if (events.length > 0) {
        events = this.getEventsPerDate(events, dates);
      }
      this.EventsPerIco = events;
    }
  },

  methods: {
    getCalendarDateClass(chunked, obj) {
      obj["not-in-month"] = !this.isDateInMonth(chunked);
      return obj;
    },

    getCalendarOfTheMonth(date) {
      const month = date.getMonth();
      const year = date.getFullYear();

      const daysInMonth = this.getDaysInMonth(month, year);
      const chunkedMonth = this.$util.chunk(
        daysInMonth,
        this.daysInAWeek.length
      );
      this.dates = chunkedMonth;
      this.setRange(chunkedMonth);
    },

    getIcoEvent(week, day) {
      const eventsPerIco = this.EventsPerIco;
      let events = [];
      if (eventsPerIco.length > 0) {
        const eventsPerWeek = eventsPerIco[week];
        if (eventsPerWeek.length > 0 && day) {
          events = eventsPerWeek[day];
        } else {
          events = eventsPerWeek;
        }
      }
      return events;
    },

    isToday(day) {
      const obj = {};
      const today = new Date();
      if (this.isSameDay(today, day)) {
        obj["today"] = true;
      }
      return obj;
    },

    changeMonth(increment) {
      const date = this.calendar.date;
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth() + increment,
        1
      );
      this.$set(this.calendar, "date", newDate);
    },

    previousMonth() {
      this.changeMonth(-1);
    },

    nextMonth() {
      this.changeMonth(+1);
    },

    formatDate(date) {
      return this.$util.formatDate(date, "MMMM DD, YYYY");
    },

    goToDetails(event, name) {
      const el = this.$refs.events;
      if (el) {
        el.close();
      }

      event.preventDefault();
      if (event.ctrlKey) {
        window.open(window.location.origin + `/${name}-ico`, "_blank");
        return;
      }
      this.$router.push({
        path: `/${name}-ico`
      });
    },

    formatType(type) {
      return type.toUpperCase();
    },

    getLimitEvents(events) {
      const limit = this.limit;
      return events.slice(0, limit);
    },
    // new
    getEventsPerDate(events, dates) {
      const parent = this;

      const weekly = [];
      dates.forEach((weeklyEvents, index) => {
        const daily = [];
        weeklyEvents.forEach((day, index) => {
          const dayEvents = [];

          events.forEach(event => {
            const start = event.date.start;
            const end = event.date.end;

            let isSame = false;
            let type = "start";

            if (parent.isSameDay(start, day)) {
              isSame = true;
            } else if (parent.isSameDay(end, day)) {
              isSame = true;
              type = "end";
            }

            if (isSame) {
              const additional = {
                type
              };
              dayEvents.push(Object.assign({}, event, additional));
            }
          });
          daily.push(dayEvents);
        });
        weekly.push(daily);
      });
      return weekly;
    },

    isSameDay(date1, date2) {
      return (
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate() &&
        date1.getFullYear() === date2.getFullYear()
      );
    },

    getEventStyle(event) {
      const obj = {};
      if (event) {
        obj["background-color"] = event.color;
        obj["color"] = "#ffffff";
      }
      return obj;
    },

    closeDayEvents() {
      this.$refs.events.close();
    },

    viewDayEvents(weekNum, dayNum) {
      this.selected.week = weekNum;
      this.selected.day = dayNum;
      this.selected.date = this.dates[weekNum][dayNum];
      this.$refs.events.open();
    },

    hasMore(week, day) {
      let has = false;
      let count = this.getMore(week, day);
      if (count > 0) {
        has = true;
      }
      return has;
    },

    getMore(week, day) {
      let count = 0;
      const event = this.getIcoEvent(week);
      let dayEvents = [];
      if (event) {
        if (event.length > 0) {
          dayEvents = event[day];
        }
      }
      if (dayEvents && dayEvents.length > 0) {
        count = dayEvents.length;
      }

      if (count > this.limit) {
        count = count - this.limit;
      } else {
        count = 0;
      }
      return count;
    },

    setRange(dayPerWeek) {
      let firstDay = null;
      let lastDay = null;
      if (dayPerWeek) {
        const firstWeek = dayPerWeek[0];
        const lastWeek = dayPerWeek[dayPerWeek.length - 1];
        firstDay = firstWeek[0];
        lastDay = lastWeek[lastWeek.length - 1];
      }
      const range = {
        start: firstDay,
        end: lastDay
      };
      this.onRangeChange(range);
    },

    getEventsByWeek(week, events) {
      const parent = this;
      const order = [];
      const filter = {};

      const spanLimit = this.daysInAWeek.length;
      let hasReachedLimit = false;
      const rows = [];
      this.generateEmptyRow(rows);
      events.forEach(item => {
        const indexes = [];

        for (let ctr = item.index; ctr < item.index + item.span; ctr++) {
          indexes.push(ctr);
        }

        let isAvailable = true;
        for (let ctr = 0; ctr < rows.length; ctr++) {
          const row = rows[ctr];

          let ctr2 = 0;
          while (ctr2 < row.length) {
            const col = row[ctr2];

            if (col) {
              const start = ctr2;
              const end = ctr2 + col.span;
              if (
                indexes[0] >= start ||
                start <= indexes[indexes.length - 1] ||
                (indexes[0] >= end || end <= indexes[indexes.length - 1])
              ) {
                isAvailable = false;
                break;
              }
              ctr2 += col.span;
            } else {
              ctr2++;
            }
          }

          if (!isAvailable) {
            if (ctr === rows.length - 1) {
              if (rows.length < parent.limit) {
                parent.generateEmptyRow(rows);
              } else {
                hasReachedLimit = true;
                break;
              }
            }
            isAvailable = true;
          } else {
            const firstIndex = indexes[0];
            const spanned = indexes.length - 1;
            row[firstIndex] = item;
            if (spanned > 0) {
              row.splice(firstIndex + 1, spanned);
            }
            break;
          }
        }

        if (hasReachedLimit) {
          return;
        }
      });
      return rows;
    },

    generateEmptyRow(rows) {
      const spanLimit = this.daysInAWeek.length;
      const cols = [];
      for (let ctr = 0; ctr < spanLimit; ctr++) {
        cols.push(null);
      }
      rows.push(cols);
    },

    getEventsPerWeek(week) {
      const parent = this;
      const events = parent.events;
      const temp = {};
      const order = [];
      events.forEach(event => {
        week.forEach((day, index) => {
          // const list = []
          const eventDate = event.date;
          let start = eventDate.start;
          let end = eventDate.end;
          if (day >= start && day <= end) {
            if (!temp.hasOwnProperty(event.title)) {
              order.push(event.title);
              parent.$set(
                temp,
                event.title,
                Object.assign({}, event, { index, span: 1 })
              );
            } else {
              temp[event.title].span++;
            }
          }
        });
      });

      const list = [];
      order.forEach(title => {
        const item = temp[title];
        list.push(item);
      });
      return list;
    },

    getEventsPerDay(week) {
      const parent = this;
      const events = parent.events;
      const temp = [];
      const days = [];
      week.forEach(day => {
        const list = [];
        events.forEach(event => {
          const eventDate = event.date;
          let start = eventDate.start;
          let end = eventDate.end;
          if (day >= start && day <= end) {
            list.push(event);
            temp.push(event);
          }
        });

        days.push(list);
      });

      return days;
    },

    isDateInMonth(date) {
      const calendar = this.calendar;
      const dateNow = calendar.date;
      return dateNow.getMonth() === date.getMonth();
    },

    getDaysInMonth(month, year) {
      let date = new Date(year, month, 1);
      let startingDay = date.getDay();
      let days = this.getDaysInPreviousMonth(date, startingDay);
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      date.setDate(date.getDate() - 1);
      let endingDay = date.getDay();
      days = days.concat(
        this.getDaysInNextMonth(date, this.daysInAWeek.length - 1 - endingDay)
      );
      return days;
    },

    getDaysInPreviousMonth(date, daysBehind) {
      date.setDate(date.getDate() - daysBehind);
      const days = [];
      let ctr = 0;
      while (ctr < daysBehind) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
        ctr++;
      }
      return days;
    },

    getDaysInNextMonth(date, daysLacking) {
      date.setDate(date.getDate() + 1);
      const days = [];
      let ctr = 0;
      while (ctr < daysLacking) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
        ctr++;
      }
      return days;
    }
  }
};
</script>

<style>
.calendar-input-wrapper {
  display: inline-block !important;
  text-align: center;
  vertical-align: text-bottom;
}

.calendar-picker {
  display: inline-block !important;
  width: auto !important;
  min-width: 0 !important;
  text-align: center;
  cursor: pointer;
}

.calendar-controls .vdp-datepicker__calendar {
  z-index: 9999999;
}
</style>

<style scoped>
.calendar-container {
  position: relative;
  margin-bottom: 60px;
}

.event-container {
  position: relative;
}

.calendar-controls {
  padding-top: 20px;
  padding-bottom: 20px;
}

.calendar-controls .fa {
  font-size: 30px;
  vertical-align: text-bottom;
  margin-bottom: 2px;
  cursor: pointer;
}

.calendar-controls .fa-caret-left {
  margin-right: 15px;
}

.calendar-controls .fa-caret-right {
  margin-left: 15px;
}

.month-row {
  position: relative;
  height: 150px;
}

.table.inner-table {
  margin-bottom: 0;
}

.table.inner-table tr td {
  padding: 2px 5px;
  width: 14.2857%;
}

.table.inner-table.date-bg tr td {
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
}

.table.inner-table.date-bg tr:last-child td {
  border-bottom: 1px solid #ccc;
}

.table.inner-table.date-bg tr td:last-child {
  border-right: 1px solid #ccc;
}

.table.inner-table.date-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  height: 100%;
  width: 100%;
  table-layout: fixed;
}

.table.inner-table.date-events {
  width: 100%;
  table-layout: fixed;
  position: relative;
  z-index: 0;
}

.table.inner-table.date-events tr td {
  border-top: 0;
}

.table.inner-table.date-events tr td .event,
.group-events .event-item {
  color: #1d1d1d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  z-index: 999;
  padding: 2px 5px;

  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;

  cursor: pointer;
}

.events-header {
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.group-events {
  max-width: 400px;
  margin: 0 auto;
}

.events-header h4 {
  font-size: 16px;
  font-weight: 700;
  margin-top: 0;
}

.group-events .event-item {
  font-size: 12px;
}

.group-events .event-item .type {
  font-weight: 700;
}

.table.inner-table.date-events tr td .event + .event {
  margin-top: 5px;
}

.close-day-events {
  font-size: 13px;
  max-width: 80px;
  width: 100%;
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 0;
}

.group-events .event-item + .event-item {
  margin-top: 5px;
}

.not-in-month {
  color: #ccc;
}

.calendar-controls {
  text-align: center;
}

.table .cell-box {
  position: relative;
}

.cell-box.today {
  color: #fff;
  background-color: #7c7c7c;
}

.date-events td.today {
  color: #fff;
}

.cell-box .others {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999999999;
  padding: 7px 5px;
  text-align: center;
  cursor: pointer;
  color: inherit;
}

.day-events {
  font-size: 12px;
}

.legends {
  margin-top: 0px;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
}

.calendar-legends {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
  padding-left: 0;
}

.calendar-legends li {
  display: block;
  overflow: hidden;
  font-weight: 600;
}

.calendar-legends .box {
  float: left;
  max-width: 100%;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  margin-top: 2px;
}
</style>

<style lang="scss" scoped>
/deep/ {
  .sweet-modal {
    .sweet-content {
      padding-top: 30px !important;
      padding-bottom: 30px !important;
    }
  }
}
</style>
