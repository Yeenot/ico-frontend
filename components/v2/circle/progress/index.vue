<template>
  <div class="progress circle"
       :class="CircleClass"
       :style="CircleStyle"
       v-on:click="onCircleClick()"
       @mouseenter="hover = true"
       @mouseleave="hover = false">

    <div class="inner"
         :style="InnerStyle">
      <div class="svg"
           :style="SvgStyle">
        <svg :viewBox="viewBox"
             :width="size"
             :height="size">
          <defs>
            <clipPath :id="uniqueId">
              <path stroke-width="0"
                    :d="describeArc" />
            </clipPath>
          </defs>
          <g :style="GroupStyle">
            <circle :cx="cX"
                    :cy="cY"
                    :r="radius"
                    :stroke-width="border"
                    :stroke="emptyColor"
                    fill="none" />
            <circle v-for="(item, index) of CalculatedValues"
                    :key="index"
                    :cx="cX"
                    :cy="cY"
                    :r="radius"
                    :stroke-width="border"
                    :stroke="colors[index]"
                    fill="none"
                    :stroke-dasharray="dashArray"
                    :stroke-dashoffset="item.value"
                    :style="getShapeStyle(item.offset)" />
          </g>
        </svg>
      </div>
      <div class="content"
           :style="ContentStyle">
        <div class="inner-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    values: {
      default: () => [0],
      type: Array
    },
    emptyColor: {
      default: "#e6e6e6",
      type: String
    },
    size: {
      default: 144,
      type: Number
    },
    border: {
      default: 6,
      type: Number
    },
    colors: {
      default: () => [null],
      type: Array
    },
    angle: {
      default: () => ({
        start: 0,
        end: 360
      }),
      type: Object
    },
    onClick: {
      default: null,
      type: Function
    },
    onHoverStateChanged: {
      default: () => ({}),
      type: Function
    }
  },

  data: () => ({
    componentId: null,
    hover: false
  }),

  watch: {
    hover(value) {
      this.onHoverStateChanged(value);
    }
  },

  mounted() {
    this.componentId = this._uid;
  },

  computed: {
    uniqueId() {
      return `clipPath-circle-${this.componentId}`;
    },

    viewBox() {
      return `0 0 ${this.size} ${this.size}`;
    },

    radius() {
      const halfSize = this.size / 2;
      const halfBorder = this.border / 2;
      return halfSize - halfBorder;
    },

    cX() {
      return this.size / 2;
    },

    cY() {
      return this.size / 2;
    },

    circumference() {
      return 2 * Math.PI * this.radius;
    },

    dashArray() {
      return this.circumference;
    },

    CalculatedValues() {
      const parent = this;
      const values = this.values;
      const newValues = [];
      let offset = 0;
      let previous = 0;
      values.forEach(function(value, index) {
        previous += value;
        const progress = parent.getDashOffset(value);
        newValues.push({
          value: progress,
          offset
        });
        offset += value;
      });
      return newValues;
    },

    CircleClass() {
      return {
        clickable: this.onClick != null
      };
    },

    CircleStyle() {
      const style = {};
      style["font-size"] = `${this.size}px`;
      return style;
    },

    InnerStyle() {
      const style = {};
      style["padding"] = `${this.border}px`;
      return style;
    },

    SvgStyle() {
      const style = {};
      return style;
    },

    ContentStyle() {
      const padding = this.border;
      const style = {
        "padding-left": `${padding}px`,
        "padding-right": `${padding}px`
      };
      return style;
    },

    GroupStyle() {
      const style = {};
      const angle = this.angle;
      if (angle.start > 0 || angle.end != 360) {
        style["clip-path"] = `url(#${this.uniqueId})`;
      }
      return style;
    },

    describeArc() {
      const x = this.cX;
      const y = this.cY;
      const radius = this.radius + this.border;
      const startAngle = this.angle.start;
      const endAngle = this.angle.end;
      var start = this.polarToCartesian(x, y, radius, endAngle);
      var end = this.polarToCartesian(x, y, radius, startAngle);

      var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

      var d = [
        "M",
        x,
        y,
        "L",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        arcSweep,
        0,
        end.x,
        end.y,
        "L",
        x,
        y
      ].join(" ");
      return d;
    }
  },

  methods: {
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees * Math.PI) / 180.0;

      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    },

    getShapeStyle(offset) {
      const size = this.size;
      const half = size / 2;
      const style = {};
      let val = 0;
      if (offset != null) {
        val = offset;
      }
      const decimal = offset / 100;
      const degrees = decimal * 360;
      style["-webkit-transform"] = `rotate(${degrees}deg)`;
      style["-moz-transform"] = `rotate(${degrees}deg)`;
      style["-ms-transform"] = `rotate(${degrees}deg)`;
      style["-o-transform"] = `rotate(${degrees}deg)`;
      style["transform"] = `rotate(${degrees}deg)`;
      style["-webkit-transform-origin"] = `${half}px ${half}px`;
      style["-moz-transform-origin"] = `${half}px ${half}px`;
      style["-ms-transform-origin"] = `${half}px ${half}px`;
      style["-o-transform-origin"] = `${half}px ${half}px`;
      style["transform-origin"] = `${half}px ${half}px`;
      return style;
    },

    getProgress(value) {
      return value / 100;
    },

    getDashOffset(value) {
      return this.circumference * (1 - this.getProgress(value));
    },

    onCircleClick() {
      if (this.onClick != null) {
        this.onClick();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
