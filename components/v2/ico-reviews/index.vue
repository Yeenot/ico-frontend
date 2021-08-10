<template>
    <div class="ico-reviews">
        <div class="flex-container container">
            <div class="column col-1 col-md-2"
                 v-for="(ico, index) of icos"
                 :key="index">
                <div class="ico grow">
                    <img class="logo"
                         :src="ico.logo"
                         :alt="`${ico.name} Logo`" />
                    <div class="name">
                        {{ ico.name }}
                    </div>
                    <total-score :score="ico.score"></total-score>
                    <div class="description"
                         v-html="ico.description">
                    </div>
                    <div class="actions">
                        <button v-on:click="goTo(ico.slug)">See more</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TotalScore from "@/components/v2/ratings/total";
export default {
  components: {
    TotalScore
  },

  props: {
    items: {
      default: () => [{}, {}, {}, {}, {}, {}],
      type: Array
    }
  },

  computed: {
    icos() {
      const items = this.items;
      const list = [];
      items.forEach(ico => {
        const images = ico.images;
        const name = ico["project-name"];
        const slug = ico.name;
        const description = this.formatDescription(ico["project-description"]);
        let logo = null;
        if (images != null) {
          logo = images["logo_small"];
        }
        const score = this.getScore(ico["ico_ratings"]);
        list.push({
          name,
          slug,
          logo,
          description,
          score
        });
      });
      return list;
    }
  },

  methods: {
    formatDescription(str) {
      let description = null;
      if (str != null) {
        const util = this.$util;
        description = util.trim(util.stripHTML(str)).substring(0, 264);
        description = `${description}...`;
      }
      return description;
    },

    goTo(slug) {
      if (slug != null) {
        this.$router.push({
          path: `/${slug}-ico`
        });
      }
    },

    getScore(ratings) {
      let score = -1;
      if (ratings != null && ratings.length > 0) {
        score = 0;
        ratings.forEach(criteria => {
          const decimal = (criteria.total * 25) / 100;
          score += decimal;
        });
      }

      return score;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
