<template>
    <div class="countdown">
        <list class="wrapper"
              direction="horizontal">
            <list-item>
                <p class="digit">{{ days | twoDigits }}</p>
                <p class="text">DD</p>
            </list-item>

            <list-item>
                <p class="digit">{{ hours | twoDigits }}</p>
                <p class="text">HH</p>
            </list-item>

            <list-item>
                <p class="digit">{{ minutes | twoDigits }}</p>
                <p class="text">MM</p>
            </list-item>

            <list-item>
                <p class="digit">{{ seconds | twoDigits }}</p>
                <p class="text">SS</p>
            </list-item>
        </list>
    </div>
</template>

<script>
import Vue from "vue";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";

Vue.filter("twoDigits", value => {
  if (value.toString().length <= 1) {
    return "0" + value.toString();
  }
  return value.toString();
});

export default {
  components: {
    List,
    ListItem
  },
  props: ["deadline", "stop", "onStop"],

  data() {
    return {
      now: null,
      date: null,
      diff: 0,
      interval: null
    };
  },

  mounted() {
    this.date = Math.trunc(Date.parse(this.deadline) / 1000);
    const now = Math.trunc(new Date().getTime() / 1000);
    const diff = this.date - now;
    if (diff <= 0) {
      this.now = this.date;
    } else {
      this.now = now;
      this.interval = setInterval(() => {
        this.now = Math.trunc(new Date().getTime() / 1000);
      }, 1000);
      this.isEnd(this.now);
    }
  },

  computed: {
    seconds() {
      let seconds = 0;
      if (this.date) {
        seconds = Math.trunc(this.date - this.now) % 60;
      }
      return seconds;
    },

    minutes() {
      let minutes = 0;
      if (this.date) {
        minutes = Math.trunc((this.date - this.now) / 60) % 60;
      }
      return minutes;
    },

    hours() {
      let hours = 0;
      if (this.date) {
        hours = Math.trunc((this.date - this.now) / 60 / 60) % 24;
      }
      return hours;
    },

    days() {
      let days = 0;
      if (this.date) {
        days = Math.trunc((this.date - this.now) / 60 / 60 / 24);
      }
      return days;
    }
  },

  watch: {
    now(value) {
      this.isEnd(value);
    }
  },

  methods: {
    isEnd(value) {
      this.diff = this.date - value;
      if (this.diff <= 0 && this.stop) {
        this.diff = 0;
        clearInterval(this.interval);

        if (this.onStop) {
          this.onStop();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

