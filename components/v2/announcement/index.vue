<template>
    <div class="announcement"
         v-if="show">
        <icon name="megaphone"></icon>
        <div class="remove"
             v-on:click="close()">
            <icon name="close"></icon>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Icon from "@/components/v2/icon";
export default {
  components: {
    Icon
  },

  data: () => ({
    show: true
  }),

  methods: {
    close() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

