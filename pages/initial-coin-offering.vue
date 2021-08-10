<template>
  <page id="initial-coin-offering">
    <template slot="title">
      <h1>Initial Coin Offering</h1>
    </template>
    <div>
      <h2>The Future of Investments</h2>
      <h3>What is an Initial Coin Offering?</h3>
      <img src="/v2/images/hero.png"
           alt="ICO Initial Coin Offering" />
    </div>
  </page>
</template>

<script>
import Page from "~/components/v2/page";
export default {
  middleware: "hide",
  components: {
    Page
  },
  head() {
    return {
      title: this.title,
      meta: [
        { name: "Content-Type", content: "text/html" },
        { hid: "description", name: "description", content: this.description },
        { name: "image", content: this.image },
        { name: "keywords", content: this.keywords },
        { name: "og:title", content: this.title },
        { name: "og:description", content: this.description },
        { name: "og:keywords", content: this.keywords },
        { name: "og:image", content: this.image },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: this.title },
        { name: "twitter:description", content: this.description },
        { name: "twitter:keywords", content: this.keywords },
        { name: "twitter:image", content: this.image },

        { "http-equiv": "cache-control", content: "max-age=2592000, public" },
        { "http-equiv": "pragma", content: "max-age=2592000, public" },
        { "http-equiv": "expires", content: "1" }
      ]
    };
  },

  computed: {
    title() {
      return "ICO Initial Coin Offering";
    },

    description() {
      return "An initial coin offering (ICO) or initial currency offering, a type of crowdfunding using cryptocurrencies, is a means of raising capital that has been prone to scams and securities law violations. Fewer than half of all ICOs survive four months after the offering.";
    },

    image() {
      return `${this.hostname}/v2/images/hero.png`;
    },

    keywords() {
      return "ICO coin,ICO initial coin offering,Initial Coin Offering";
    },

    hostname() {
      return this.$store.state.settings.hostname;
    }
  }
};
</script>
