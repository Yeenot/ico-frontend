<template>
  <list-item class="progress-line-item"
             :class="ProgressClass"
             :style="ProgressStyle">
    <div class="event"
         :style="EventStyle">
      <v-popover :offset="5"
                 :open="popoverShow"
                 trigger="hover"
                 :disabled="popover.disabled">
        <template v-if="status == 'upcoming'">
          <dotted-circle :size="circle"
                         :border="2"
                         color="rgba(37, 174, 136, 0.5)"
                         :onClick="onClick"
                         :onHoverStateChanged="onPopoverHoverStateChanged">
            <icon name="info"
                  :class="status"></icon>
          </dotted-circle>
        </template>
        <template v-else>
          <progress-circle :values="[ percentage ]"
                           :size="circle"
                           :border="2"
                           :colors="[color]"
                           :onClick="onClick"
                           :onHoverStateChanged="onPopoverHoverStateChanged">
            <icon name="info"
                  :class="status"></icon>
          </progress-circle>
        </template>
        <template slot="popover">
          <slot name="popover" />
        </template>
      </v-popover>

      <div class="line"
          :style="LineStyle">
        <div class="inner"
            :style="InnerLineStyle"></div>
      </div>

      <div class="text"
           ref="text"
           v-if="hasSlot()"
           v-on:click="onClick(index)">
        <slot></slot>
        <div class="mask"
             ref="mask"
             :style="MaskStyle"></div>
        <div class="sign-post"
             ref="sign-post"
             :style="SignPostStyle"></div>
      </div>
    </div>
    
  </list-item>
</template>

<script>
import ListItem from "@/components/v2/list/item";
import Icon from "@/components/v2/icon/";
import ProgressCircle from "@/components/v2/circle/progress";
import DottedCircle from "@/components/v2/circle/dotted";
import Popover from "@/components/v2/popover";
import Vue from "vue";
import { VPopover } from "v-tooltip";

export default {
  components: {
    ListItem,
    Icon,
    ProgressCircle,
    DottedCircle,
    VPopover
  },

  props: {
    index: {
      default: -1,
      type: Number
    },
    date: {
      default: null,
      type: Object
    },
    selected: {
      default: false,
      type: Boolean
    },
    status: {
      default: "past",
      type: String
    },
    afterStatus: {
      default: null,
      type: String
    },
    popover: {
      default: () => ({
        disabled: false
      }),
      type: Object
    }
  },

  data: () => ({
    circle: 25,
    postHeight: 0,
    percentage: 100,
    interval: null,
    popoverShow: false
  }),

  watch: {
    percentage(value) {
      if (value >= 100) {
        clearInterval(this.interval);
      }
    }
  },

  mounted() {
    this.init();
    window.addEventListener("resize", this.resize);
  },

  computed: {
    ProgressClass() {
      const obj = {};
      obj["selected"] = this.selected;
      obj[this.status] = this.status;
      return obj;
    },

    ProgressStyle() {
      const style = {};
      if (this.status == "upcoming") {
      } else {
      }
      return style;
    },

    LineStyle() {
      const style = {
        width: `${this.circle}px`,
        bottom: `${this.circle + 7}px`
      };
      return style;
    },

    InnerLineStyle() {
      const style = {};
      if (this.status) {
        if (this.status == "upcoming") {
          style["border-style"] = "dotted";
          style["border-color"] = "rgba(37, 174, 136, 0.5)";
        } else if (this.status == "active") {
          style["border-style"] = "solid";
          style["border-color"] = "rgba(37, 174, 136, 0.5)";
        }
      }
      return style;
    },

    EventStyle() {
      return {
        "min-height": `${this.circle}px`
      };
    },

    SignPostStyle() {
      const half = this.postHeight / 2;
      const obj = {
        "border-top-width": `${half - 1}px`,
        "border-bottom-width": `${half - 1}px`
      };
      return obj;
    },
    MaskStyle() {
      const half = this.postHeight / 2;
      const obj = {
        "border-top-width": `${half}px`,
        "border-bottom-width": `${half}px`
      };
      return obj;
    },

    color() {
      let color = "#db507a";
      if (this.status == "active") {
        color = "#25ae88";
      }
      return color;
    }
  },

  methods: {
    init() {
      this.prepareProgressInterval();
      this.createSignPost();
    },

    resize() {
      this.createSignPost();
    },

    prepareProgressInterval() {
      if (this.status == "active") {
        let start = null;
        let end = null;
        if (this.date) {
          if (this.date.start && this.date.end) {
            start = this.date.start;
            end = this.date.end;
          }
        }
        if (start && end) {
          this.interval = setInterval(() => {
            this.percentage = this.calculatePercentage(
              new Date().getTime(),
              start,
              end
            );
          }, 1000);
          this.percentage = this.calculatePercentage(
            new Date().getTime(),
            start,
            end
          );
        } else {
          this.percentage = 100;
        }
      } else if (this.status == "past") {
        this.percentage = 100;
      }
    },

    calculatePercentage(input, start, end) {
      const min = start.value;
      const max = end.value;
      let value = 0;
      if (!this.isEmptyAndTba(max)) {
        if (!this.isEmptyAndTba(min)) {
          const range = max - min;
          const first = input - min;
          const temp = (first * 100) / range;
          if (temp < 1) {
            value = Math.ceil(temp)
          } else {
            value = Math.floor(temp)
          }
        } else {
          value = 100;
        }
      }
      return value;
    },

    onClick() {
      this.$parent.$parent.onItemClick(this.index);
    },

    onPopoverHoverStateChanged(isHover) {
      this.popoverShow = isHover;
    },

    createSignPost() {
      if (this.$refs.text) {
        this.postHeight = this.$refs.text.offsetHeight;
      }
    },

    hasSlot(name = "default") {
      return this.$slots && this.$slots[name];
    },

    isEmptyAndTba(value) {
      return this.$util.isDetailEmpty(value) || value == "?";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

