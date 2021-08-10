<template>
  <div class="more"
       :class="{ 'show': show }">
    <div class="inner-content"
         ref="inner-content"
         :style="InnerContentStyle">
      <slot></slot>
    </div>
    <div class="gradient"
         :style="{ 'height': `${height}px` }">
    </div>
    <div class="content">
      <button v-on:click="show = false">Show More</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      default: 134,
      type: Number
    },
    limit: {
      default: 364,
      type: Number
    }
  },

  data: () => ({
    show: false
  }),

  mounted() {
    this.init();
  },

  computed: {
    InnerContentStyle() {
      const style = {};
      if (this.show) {
        style["max-height"] = `${this.limit}px`;
        style["overflow"] = "hidden";
      }
      return style;
    }
  },

  methods: {
    init() {
      const height = this.$refs["inner-content"].clientHeight;
      const calculatedHeight = this.limit - this.height;
      if (height > this.limit && !this.show) {
        this.show = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
