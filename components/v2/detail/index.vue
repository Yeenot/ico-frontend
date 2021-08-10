<template>
    <div class="detail">
        <div class="title"
             v-if="hasSlot('title')">
            <slot name="title"></slot>
        </div>
        <div class="subtitle"
             v-if="hasSlot('subtitle')">
            <slot name="subtitle"></slot>
        </div>
        <div class="boxed"
             v-if="hasSlot('boxed')">
            <div class="value">
                <slot name="boxed"></slot>
            </div>
        </div>
        <div class="description"
             v-if="hasSlot('description')">
            <slot name="description"></slot>
        </div>
        <div class="view clearfix"
             v-if="link">
            <a :href="link"
               target="_blank">
                <div class="text">
                    Details
                </div>
                <icon name="link"></icon>
            </a>
        </div>
    </div>
</template>


<script>
import Icon from "@/components/v2/icon/";
export default {
  components: {
    Icon
  },

  props: ["link"],

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
