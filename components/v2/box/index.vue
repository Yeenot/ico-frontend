<template>
    <div class="box">
        <div class="heading">
            <slot name="heading"></slot>
            <div class="description"
                 v-if="hasSlot('description')">
                <slot name="description"></slot>
            </div>
            <icon :name="icon"
                  v-if="icon"></icon>
        </div>
        <div class="content">
            <div class="list"
                 v-if="hasSlot('list')">
                <slot name="list"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/components/v2/icon";
export default {
  components: {
    Icon
  },

  props: ["icon"],

  methods: {
    hasSlot(name) {
      return this.$slots[name] ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
