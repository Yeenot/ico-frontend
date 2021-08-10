<template>
  <div class="other-icos-popover">
    <div class="notes"
         v-if="name !='whitelist' && notes">
      {{ notes }}
    </div>
    <div class="name"
      :class="statusText">
      <template v-if="!isEmpty(status)">
        {{ name }} - {{ statusText }}
      </template>
      <template v-else>
        No {{ name }}
      </template>
    </div>
    <div class="dates" v-if="!isEmpty(status)">
      <div class="flex-container date" v-if="!isEmpty(date.start)">
        <div class="label">
          Start:
        </div>
        <div class="col value">
          {{ displayDate(start, "MMM DD, YYYY HH:mm") }}
        </div>
      </div>
      <div class="flex-container date">
        <div class="label">
          End:
        </div>
        <div class="col value">
          {{ displayDate(end, "MMM DD, YYYY HH:mm") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "date", "status", "notes"],

  mounted() {
  },

  computed: {
    start() {
      return this.date.start.value;
    },
    end() {
      return this.date.end.value;
    },

    statusText() {
      let text = null;
      const status = this.status;
      if (status) {
        if (status == "active") {
          text = "running";
        } else if (status == "past") {
          text = "finished";
        } else {
          text = status;
        }
      }
      return text;
    }
  },

  methods: {
    isEmpty(value) {
      return this.$util.isDetailEmpty(value);
    },

    isTba(value) {
      return this.$util.isTba(value);
    },

    displayDate(dt, format) {
      let value = this.$util.getEmpty();
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
