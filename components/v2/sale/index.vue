<template>
  <div class="sale">
    <div>
      <div class="type"
           :class="info.name"
           v-if="isEmptyAndTba(info.date) || (!isEmptyAndTba(info.date) && hasDifference(info.date))">
        {{ info.name }}
      </div>
      <template v-if="!isEmptyAndTba(info.date)">
        <template v-if="hasDifference(info.date)">
          <countdown :deadline="getDate(info.date)"
                     :stop="true"> </countdown>
        </template>
        <div v-else>
          <div class="done"
               v-if="empties[info.status] != null"
               :class="empties[info.status]">
            {{ empties[info.status] }}
          </div>
        </div>
      </template>
      <div class="empty"
           v-else>
        {{ info.date }}
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from "@/components/v2/countdown";
export default {
  components: {
    Countdown
  },

  props: {
    ico: {
      default: () => null,
      type: Object
    },

    match: {
      default: () => [],
      type: Array
    }
  },

  data: () => ({
    pairs: {
      upcoming: 0,
      active: 1
    },

    label: {
      upcoming: "upcoming",
      active: "ongoing"
    },

    empties: {
      upcoming: "started",
      active: "ended"
    }
  }),

  computed: {
    emptyVal() {
      let value = this.empty;
      if (value == null) {
        value = this.$util.getEmpty();
      }
      return value;
    },

    info() {
      const ico = this.ico;
      let sale = null;

      if (ico != null) {
        const now = new Date();
        const lists = [];
        // ico.presale.date = 1538469248
        // ico.crowdsale.date = 1538469248
        const presale = Object.assign({}, ico.presale, {
          name: "presale"
        });
        const crowdsale = Object.assign({}, ico.crowdsale, {
          name: "crowdsale"
        });

        const status = this.match;
        let change = true;
        let prev = null;
        const assignSameStatus = item => {
          if (status.includes(item.status)) {
            if (change && prev != item.status) {
              sale = item;
              if (item.status == "active") {
                change = false;
              }
              prev = item.status;
            }
          }
        };
        assignSameStatus(presale);
        assignSameStatus(crowdsale);
      }

      return sale;
    }
  },

  methods: {
    getProperty(name, attr = "value") {
      const ico = this.ico;
      const details = ico.details;
      let value = null;
      if (details != null) {
        const data = details[name];
        if (data != null) {
          value = data[attr];
        }
      }
      return value;
    },

    isEmpty(value) {
      return this.$util.isDetailEmpty(value);
    },

    isEmptyAndTba(value) {
      return this.$util.isDetailEmpty(value) || value == "?";
    },

    getDate(value) {
      let dt = null;
      if (!this.isEmpty(value)) {
        dt = new Date(value * 1000);
      } else {
        dt = value;
      }
      return dt;
    },

    getDifference(dt) {
      return dt * 1000 - new Date().getTime();
    },

    hasDifference(dt) {
      return this.getDifference(dt) > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
