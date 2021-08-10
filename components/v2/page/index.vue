<template>
    <div class="page">
        <div class="area">
            <div class="outer-grid">
                <div class="content-grid">
                    <div class="headline"
                         v-if="$slots['title'] != null">
                        <slot name="title" />
                    </div>
                    <div class="content">
                        <slot/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      default: null,
      type: String
    },

    tag: {
      default: "h2",
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
