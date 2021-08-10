<template>
  <div class="list clearfix"
       :class="ListClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      default: "vertical",
      type: String
    }
  },

  computed: {
    ListClass() {
      const direction = this.direction;
      const classes = {};
      classes[direction] = true;
      return classes;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

