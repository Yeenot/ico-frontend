<template>
  <div class="overlay">
    <slot name="content"></slot>
    <div class="front"
         v-if="prompt"
         :style="FrontStyle">
      <slot name="front"></slot>
      <div class="action"
           v-on:click="close()">
        <icon name="close"></icon>
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
  props: {
    css: {
      default: () => null,
      type: Object
    },
    show: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    prompt: false
  }),

  watch: {
    show(value) {
      this.prompt = value;
    }
  },

  mounted() {
    this.prompt = this.show;
  },

  computed: {
    FrontStyle() {
      var style = {};
      if (this.css != null) {
        style = this.css;
      }
      return style;
    }
  },

  methods: {
    close() {
      if (this.prompt) {
        this.prompt = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
