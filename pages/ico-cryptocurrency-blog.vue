<template>
  <nuxt-child />
</template>

<script>
export default {
  computed: {
    title() {
      return "Blog - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule - ico-check.com";
    },

    description() {
      return "Ico-check.com is an up to date ICO checker website. The ultimate Listing Tracker of active ICOs and upcoming ICOs. Discover the best Initial Coin Offering, ICO release date and ICO analysis.";
    },

    logo() {
      return this.HostName + "/images/logo.jpeg";
    },

    HostName() {
      return this.$store.state.settings.hostname;
    },

    blogs() {
      return this.$store.state.blog.articles;
    }
  }
};
</script>

<style type="text/css" scoped>
</style>