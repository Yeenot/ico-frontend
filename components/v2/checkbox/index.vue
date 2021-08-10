<template>
  <div class="checkbox-group">
    <input :id="id"
           type="checkbox"
           :disabled="disabled"
           v-model="state" />
    <label :for="id"
           class="name">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  props: ["value", "disabled"],

  data: () => ({
    id: null,
    state: null
  }),

  mounted() {
    this.id = this._uid;
    this.state = this.value;
  },

  watch: {
    value(value) {
      this.state = value;
    },

    state(value, oldValue) {
      if (oldValue != null) {
        this.$emit("input", value);
        this.$emit("onChange", value);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./style.scss";
</style>

