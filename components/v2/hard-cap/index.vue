<template>
  <div class="hard-cap"
       v-if="formattedItems.length > 0">
    <list class="progress-line"
          ref="progress-line">
      <progress-line-item v-for="(item, index) of formattedItems"
        :key="index"
        :index="index"
        :status="item.status"
        :date="item.date"
        :selected="index == realSelected"
        :afterStatus="(formattedItems[index+1] ? formattedItems[index+1].status : null)"
        :popover="{
          disabled: true
        }">
        {{ item.name }}
      </progress-line-item>
    </list>
    <div class="box">
      <transition-group name="fade">
        <div v-for="(item, index) of formattedItems"
             v-if="index == realSelected"
             class="progress-content"
             :key="item.name">
          <div class="main">
            <h6>
                <template v-if="item.status == null">
                  No
                </template>
                {{ item.name }}
                <template v-if="item.name == 'whitelist'">
                  -
                  <a :href="item.date.end.link" target="_blank">
                    Link
                  </a>
                </template>
            </h6>
            <div class="date">
              <template v-if="item.date.hasOwnProperty('start')">
                <a :href="item.date.start.link"
                  target="_blank">
                  {{ displayDate(item.date.start.value, "MMM DD YYYY") }}
                </a>
                <template v-if="item.date.hasOwnProperty('start')">
                  -
                </template>
              </template>
              <a :href="item.date.end.link"
                target="_blank">
                {{ displayDate(item.date.end.value, "MMM DD YYYY") }}
              </a>
            </div>
            <div class="notes"
              v-if="item.notes">
              {{ item.notes }}
            </div>
          </div>
          <div class="ended" v-if="item.status != null">
            <div class="legend">
              <span>
                <template v-if="item.date.hasOwnProperty('start') && item.status == 'upcoming'">
                  Starts In
                </template>
                <template v-else-if="(!item.date.hasOwnProperty('start') && item.status == 'upcoming') || item.status == 'active'">
                  Ends In
                </template>
                <template v-else>
                  Ended
                </template>
              </span>
            </div>
            <template v-if="hasDate(item.date)">
              <template v-if="item.date.hasOwnProperty('start') && item.status == 'upcoming'">
                <template v-if="!isTba(item.date.start.value)">
                  <countdown :deadline="item.date.start.value"
                           :stop="true"> </countdown>
                </template>
                <template v-else>
                  <a :href="item.date.start.link">
                    {{ item.date.start.value }}
                  </a>
                </template>
              </template>
              <template v-else-if="(!item.date.hasOwnProperty('start') && item.status == 'upcoming') || item.status == 'active'">
                <template v-if="!isTba(item.date.end.value)">
                  <countdown :deadline="item.date.end.value"
                           :stop="true"> </countdown>
                </template>
                <template v-else>
                  <a :href="item.date.end.link">
                    {{ item.date.end.value }}
                  </a>
                </template>
              </template>
              <template v-else>
                <a :href="item.date.end.link"
                   target="_blank">
                  {{ displayDate(item.date.end.value, "MMMM D, YYYY") }}
                </a>
              </template>
            </template>
            <template v-else>
              {{ empty }}
            </template>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import List from "@/components/v2/list";
import ProgressLineItem from "@/components/v2/hard-cap/progress-line-item";
import Countdown from "@/components/v2/countdown";

export default {
  components: {
    List,
    ProgressLineItem,
    Countdown
  },

  props: {
    selected: {
      default: -1,
      type: Number
    },
    items: {
      default: () => [],
      type: Array
    }
  },

  data: () => ({
    realSelected: null
  }),

  mounted() {
    this.init();
  },

  computed: {
    formattedItems() {
      const items = [];
      const now = new Date();
      this.items.every((item, index) => {
        let status = null;
        const date = item.date;
        let start = null;
        let end = null;
        if (date) {
          if (date.hasOwnProperty("start")) {
            start = date.start.value;
          }
          if (date.end != null) {
            end = date.end.value;
          }
        }

        if (!date.hasOwnProperty("start") || !this.isEmpty(start)) {
          if (this.isTba(start)) {
            status = "upcoming";
          } else {
            if (start > now) {
              status = "upcoming"
            }  else if (now > start) {

              if (!this.isEmpty(end)) {
                if (!this.isTba(end)) {
                  if (end > now) {
                    status = "active";
                  } else {
                    status = "past"
                  }
                } else {
                  if (!date.hasOwnProperty("start")) {
                    status = "upcoming";
                  } else {
                    status = "active";
                  }
                }
              }
            }
          }
        }
        items.push(Object.assign({}, item, { status }));
        
        return true;
      });

      if (this.selected == -1) {
        let selected = -1;
        items.every((item, index) => {
          if (item.status == "active") {
            selected = index;
            return false;
          } else if (item.status == "upcoming") {
            let change = true;
            if (selected > -1) {
              if (items[selected].status == item.status) {
                change = false;
              }
            }

            if (change) {
              selected = index;
            }
          }
          return true;
        });

        if (selected == -1) {
          selected = 0;
        }
        this.realSelected = selected;
      }
      return items;
    },

    empty() {
      return this.$util.getEmpty();
    }
  },

  methods: {
    init() {
      // this.realSelected = this.selected;
    },

    hasDate(date) {
      let start = null;
      if (date.hasOwnProperty("start")) {
        start = date.start.value;
      }
      return date && (start || date.end.value);
    },

    isEmpty(value) {
      return this.$util.isDetailEmpty(value);
    },

    isEmptyAndTba(value) {
      return this.$util.isDetailEmpty(value) || value == "?";
    },

    isTba(value) {
      return this.$util.isTba(value);
    },

    validateInfo(value) {
      if (!this.isEmptyAndTba(value)) {
        return value
      } else {
        return this.$util.getEmpty();
      }
    },

    onItemClick(index) {
      this.realSelected = index;
    },

    displayDate(dt, format) {
      let value = this.empty;
      if (!this.isEmpty(dt)) {
        if (!this.isTba(dt)) {
        value = this.$util.formatDate(dt, format);
        } else {
          value = dt;
        }
      }
      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
