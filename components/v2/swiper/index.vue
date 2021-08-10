<template>
    <div class="swiper">
        <div v-swiper:mySwiper="option"
             :instanceName="instanceName">
            <div class="swiper-wrapper">
                <slot />
            </div>
        </div>
        <slot name="nav" />
    </div>
</template>

<script>
export default {
  props: ["instanceName", "option"],

  data: () => ({}),

  beforeDestroy() {
      this.mySwiper.destroy(this.instanceName)
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
