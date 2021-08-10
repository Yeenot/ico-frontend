<template>
  <div class="minimalist"
       v-if="info">
    <div class="flex-container wrapper">
      <div class="col">
        <div class="info">
          <img class="logo"
               :src="info.src" />
          <div class="name"
               v-on:click="toPage()">
            {{ info.name }} <span class="symbol"
                  v-if="!isEmptyAndTba(info.symbol)">({{ info.symbol }})</span>
          </div>
          <div class="cap">
            <div class="label">
              Hard Cap:
            </div>
            <div>
              <template v-if="!isEmptyAndTba(info.cap)">
                <template v-if="!isTba(info.cap)">
                  {{ $util.numberFormat(info.cap) }}
                  <template v-if="!isEmptyAndTba(info.unit)">
                    <span class="unit">{{ info.unit }}</span>
                  </template>
                </template>
                <template v-else>
                  {{ info.cap }}
                </template>
              </template>
              <template v-else>
                {{ empty }}
              </template>
            </div>
          </div>
          <!-- <total-score :score="info.score"></total-score> -->
          <div class="box"
               v-if="formattedItems.length > 0">
            <transition name="fade"
                        mode="out-in">
              <div v-for="(item, index) of formattedItems"
                   v-if="index == realSelected"
                   :key="index">
                <div v-if="item.name == 'whitelist'"
                     class="notes">
                  <template v-if="!isEmptyAndTba(item.notes)">
                    {{ item.notes }}
                  </template>
                  <template v-else>
                    <div class="empty">
                      {{ empty }}
                    </div>
                  </template>
                </div>
                <template v-else>
                  <template v-if="item.status != null">
                    <template v-if="item.date.hasOwnProperty('start') && item.status == 'upcoming'">
                      <template v-if="!isTba(item.date.start.value)">
                        <countdown :deadline="item.date.start.value"
                                   :stop="true"> </countdown>
                      </template>
                      <template v-else>
                        {{ item.date.start.value }}
                      </template>
                    </template>
                    <template v-else-if="(!item.date.hasOwnProperty('start') && item.status == 'upcoming') || item.status == 'active'">
                      <template v-if="!isTba(item.date.end.value)">
                        <countdown :deadline="item.date.end.value"
                                   :stop="true"> </countdown>
                      </template>
                      <template v-else>
                        {{ item.date.end.value }}
                      </template>
                    </template>
                  </template>
                  <template v-else>
                    {{ empty }}
                  </template>
                </template>

                <!-- <div class="ended">
                  <div class="label">
                    Ended
                  </div>
                  <div>
                    {{ displayDate(item.date.end, "MMMM D, YYYY") }}
                  </div>
                </div> -->
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div v-if="formattedItems.length > 0">
        <list class="progress-line"
              ref="progress-line">
          <progress-line-item v-for="(item, index) of formattedItems"
                              :key="index"
                              :index="index"
                              :status="item.status"
                              :date="item.date"
                              :selected="index == realSelected"
                              :afterStatus="(formattedItems[index+1] ? formattedItems[index+1].status : null)">
            <template slot="popover">
              <other-icos-popover :name="item.name"
                                  :date="item.date"
                                  :status="item.status"
                                  :notes="item.notes">
              </other-icos-popover>
            </template>
          </progress-line-item>
        </list>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/v2/list";
import ProgressLineItem from "@/components/v2/hard-cap/progress-line-item";
import Countdown from "@/components/v2/countdown";
import TotalScore from "@/components/v2/ratings/total";
import OtherIcosPopover from "@/components/v2/popover/other-icos";

export default {
  components: {
    List,
    ProgressLineItem,
    Countdown,
    TotalScore,
    OtherIcosPopover
  },

  props: {
    info: {
      default: null,
      type: Object
    },
    selected: {
      default: 0,
      type: Number
    }
  },

  data: () => ({
    realSelected: null
  }),

  mounted() {},

  computed: {
    formattedItems() {
      const items = [];
      if (this.info && this.info.sales) {
        const now = new Date();
        const sales = this.info.sales;
        for (const key of Object.keys(sales)) {
          const item = sales[key];
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
                status = "upcoming";
              } else if (now > start) {
                if (!this.isEmpty(end)) {
                  if (!this.isTba(end)) {
                    if (end > now) {
                      status = "active";
                    } else {
                      status = "past";
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
          items.push(Object.assign({}, item, { status, name: key }));
        }
      }

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
    toPage() {
      this.$router.push({
        path: `/${this.info.slug}-ico`
      });
    },

    onItemClick(index) {
      this.realSelected = index;
    },

    displayDate(dt, format) {
      return this.$util.formatDate(dt, format);
    },

    isEmpty(value) {
      return this.$util.isDetailEmpty(value);
    },

    isEmptyAndTba(value) {
      return this.$util.isDetailEmpty(value) || value == "?";
    },

    isTba(value) {
      return this.$util.isTba(value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
