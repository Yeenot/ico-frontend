<template>
  <div class="dotted-circle"
       :class="CircleClass"
       :style="CircleStyle"
       v-on:click="onClick()"
       @mouseenter="hover = true"
       @mouseleave="hover = false">
    <div class="content">
      <div class="inner-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: 25,
      type: Number
    },
    border: {
      default: 2,
      type: Number
    },
    color: {
      default: null,
      type: String
    },
    onClick: {
      default: () => null,
      type: Function
    },
    onHoverStateChanged: {
      default: () => ({}),
      type: Function
    }
  },

  data: () => ({
    hover: false
  }),

  watch: {
    hover(value) {
      this.onHoverStateChanged(value);
    }
  },

  computed: {
    CircleClass() {
      return {
        clickable: this.onClick != null
      };
    },

    CircleStyle() {
      const style = {
        width: `${this.size}px`,
        height: `${this.size}px`,
        ["border-width"]: `${this.border}px`
      };

      if (this.color) {
        style["border-color"] = this.color;
      }

      return style;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
