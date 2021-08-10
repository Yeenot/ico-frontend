<template>
    <label class="toggle">
        <input type="checkbox"
               v-model="checked"
               @change="onChange(checked)">
        <span class="slider round"></span>
    </label>
</template>

<script>
export default {
  props: {
    value: {
      default: false,
      type: Boolean
    },
    onChange: {
      default: null,
      type: Function
    }
  },

  data: () => ({
    checked: this.value
  })
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
