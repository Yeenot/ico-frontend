<template>
  <div class="piece"
       :class="classList"
       v-on:click="onPieceClick($event)">
    <div class="heading">
      <slot name="icon"></slot>
      <div class="text">
        <slot name="text"></slot>
      </div>
      <a class="info"
         :href="href"
         target="_blank">
        <div class="value"
             v-if="info != null">
          {{ info }}
        </div>
        <template v-else>
          {{ empty }}
        </template>
      </a>
      <div class="action">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="description"
         v-if="hasSlot('description')">
      <slot name="description" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["info", "href", "onClick"],
  computed: {
    classList() {
      return { "has-action": this.hasSlot("action") };
    },

    empty() {
      return this.$util.getEmpty();
    }
  },

  methods: {
    hasSlot(name) {
      return this.$slots[name] != null ? true : false;
    },

    onPieceClick(event) {
      if (this.onClick != null) {
        this.onClick(event);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
