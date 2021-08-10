<template>
  <page id="calendar">
    <div class="legends">
      <!-- <label>Legends:</label> -->
      <p>Click to select:</p>
      <ul class="list calendar-legends">
        <li v-for="(legend, key) in legends"
            v-on:click="filterBy(key)"
            :key="key">
          <span class="box"
                v-bind:style="{ 'background-color': legend.color }"></span>
          <span>{{ legend.heading }}</span>
        </li>
        <li v-on:click="filterBy('')">Reset filter</li>
      </ul>
    </div>
    <calendar-event :events="events"
                    :onRangeChange="onRangeChange"></calendar-event>
  </page>
</template>

<script>
import Page from "~/components/v2/page";
import CalendarEvent from "@/components/calendar-event/index";
export default {
  name: "calendar",
  components: {
    Page,
    CalendarEvent
  },

  head() {
    return {
      title: this.Title,
      meta: [
        { hid: "description", name: "description", content: this.Description },
        { name: "image", content: this.MetaImage },
        { name: "og:title", content: this.Title },
        { name: "og:description", content: this.Description },
        { name: "og:image", content: this.MetaImage },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: this.Title },
        { name: "twitter:description", content: this.Description },
        { name: "twitter:image", content: this.MetaImage },

        { "http-equiv": "cache-control", content: "max-age=2592000, public" },
        { "http-equiv": "pragma", content: "max-age=2592000, public" },
        { "http-equiv": "expires", content: "1" }
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          type: "application/ld+json",
          innerHTML: `{ "@context": "http://schema.org", "@type": "PostalAddress", "name": "ico-check.com" }`
        }
      ]
    };
  },

  data() {
    return {
      params: {
        start: null,
        end: null,
        event: ""
      },
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
      },
      staticEvents: [
        {
          title: "Airswap: Presale",
          date: {
            start: new Date(2017, 10, 29),
            end: new Date(2017, 11, 10)
          }
        },
        {
          title: "BPI: Presale",
          date: {
            start: new Date(2017, 11, 1),
            end: new Date(2017, 11, 1)
          }
        },
        {
          title: "Aion: Presale",
          date: {
            start: new Date(2017, 11, 1),
            end: new Date(2017, 11, 5)
          }
        },
        {
          title: "Bank: Presale",
          date: {
            start: new Date(2017, 10, 30),
            end: new Date(2017, 11, 4)
          }
        },
        {
          title: "Airtoken: Presale",
          date: {
            start: new Date(2017, 10, 28),
            end: new Date(2017, 11, 13)
          }
        },
        {
          title: "Storm: Presale",
          date: {
            start: new Date(2017, 11, 9),
            end: new Date(2017, 11, 12)
          }
        },
        {
          title: "Dota 2: Presale",
          date: {
            start: new Date(2017, 10, 20),
            end: new Date(2017, 11, 5)
          }
        }
      ]
    };
  },

  mounted() {},

  computed: {
    Title() {
      return "Calendar - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com";
    },

    Description() {
      return "Ico-check.com is an up to date ICO checker website. The ultimate Listing Tracker of active ICOs and upcoming ICOs. Discover the best Initial Coin Offering, ICO release date and ICO analysis.";
    },

    MetaImage(name) {
      return (
        this.HostName + "/images/ico-check-cryptocurrency-list-preview.jpeg"
      );
    },

    HostName() {
      return this.$store.state.settings.hostname;
    },

    stat() {
      const arranged = this.reorder(this.staticEvents);
      return arranged;
    },

    events() {
      const icos = this.$store.state.icos.events;
      const parent = this;
      const filter = [];
      icos.forEach(ico => {
        const icoName = ico.name;
        const title = ico.title;
        const events = ico.events;
        events.forEach(event => {
          const eventName = event.name;
          const heading = event.heading;
          const date = event.date;
          const start = date.start;
          const end = date.end;

          filter.push({
            name: icoName,
            title,
            event: eventName,
            date: {
              start: new Date(Date.parse(start)),
              end: new Date(Date.parse(end))
            },
            color: parent.legends[eventName].color
          });
        });
      });

      const arranged = this.reorder(filter);
      return arranged;
    }
  },

  methods: {
    filterBy(event) {
      this.$set(this.params, "event", event);
      this.getEvents();
    },

    reorder(events) {
      return events.sort(function(a, b) {
        return a.date.start - b.date.start;
      });
    },

    getDateString(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return year + "-" + month + "-" + day;
    },

    onRangeChange(range) {
      this.$set(this.params, "start", range.start);
      this.$set(this.params, "end", range.end);
      this.getEvents();
    },

    getEvents() {
      this.$store.commit(`EVENTS`, []);
      const params = {
        start: this.getDateString(this.params.start),
        end: this.getDateString(this.params.end),
        event: this.params.event
      };
      this.$store.dispatch(`getEvents`, params);
    }
  }
};
</script>

<style lang="scss" scoped>
#calendar /deep/ {
  section {
    .division {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>


<style type="text/css" scoped>
.legends {
  margin-top: 40px;
  font-weight: 500;
}

.calendar-legends {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
}

.calendar-legends li {
  display: block;
  overflow: hidden;
  font-weight: 600;
  cursor: pointer;
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