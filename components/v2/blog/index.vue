<template>
  <div class="blog">
    <div class="img-container">
      <img :src="img" :alt="alt"/>
    </div>
    <div class="info">
      <div class="name">
        {{ name }}
      </div>
      <div class="description"
           v-html="formattedDescription">
      </div>
    </div>
    <div class="actions"
         v-if="link != null">
      <nuxt-link :to="{ path: link }">Read all</nuxt-link>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    slug: {
      default: null,
      type: String
    },
    img: {
      default: null,
      type: String
    },
    name: {
      default: null,
      type: String
    },
    alt: {
      default: null,
      type: String
    },
    description: {
      default: null,
      type: String
    }
  },

  computed: {
    link() {
      let str = null;
      if (this.slug != null) {
        str = `/ico-cryptocurrency-blog/${this.slug}`;
      }
      return str;
    },
    formattedDescription() {
      const util = this.$util;
      const description = util
        .trim(util.stripHTML(this.description))
        .substring(0, 100);
      return `${description}...`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
