<template>
  <div class="review">
    <div class="img-container">
      <img :src="src" />
    </div>
    <div class="info">
      <template v-if="!isEmpty(value)">
        <a :href="href"
           target="_blank">{{ value }} </a>
      </template>
      <template v-else>
        {{ empty }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      default: null,
      type: String
    },
    value: {
      default: null,
      type: String
    },
    href: {
      default: null,
      type: String
    },
    score: {
      default: 0,
      type: Number
    },
    total: {
      default: 0,
      type: Number
    }
  },

  computed: {
    empty() {
      return this.$util.getEmpty();
    }
  },

  methods: {
    isEmpty(value) {
      return this.$util.isDetailEmpty(value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
