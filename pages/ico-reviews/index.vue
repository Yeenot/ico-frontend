<template>
  <page id="ico-reviews">
    <template slot="title">
      <h2>ICO Reviews &amp; Ratings</h2>
    </template>
    <div>
    <ico-reviews :items="reviews.latest"></ico-reviews>
    </div>
  </page>
</template>

<script>
import Page from "@/components/v2/page";
import IcoReviews from "@/components/v2/ico-reviews";

export default {
  components: {
    Page,
    IcoReviews
  },

  async asyncData({ store }) {
    const response = await store.dispatch(`latest_reviews`)
    let latest = null;
    if (response.status = 200) {
        latest = response.data;
    }
    return {
        reviews: {
            latest
        }
    }
  },

  data() {
    return {};
  },

  computed: {
    title() {
      return "ICO Reviews - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule - ico-check.com";
    },

    description() {
      return "Ico-check.com is an up to date ICO checker website. The ultimate Listing Tracker of active ICOs and upcoming ICOs. Discover the best Initial Coin Offering, ICO release date and ICO analysis.";
    },

    logo() {
      return this.HostName + "/images/logo.jpeg";
    },

    HostName() {
      return this.$store.state.settings.hostname;
    }
  }
};
</script>