<template>
  <div class="articles">
    <swiper :option="swiperOption"
            :instanceName="'related-articles'">
      <template slot="default">
        <blog class="swiper-slide"
              v-for="(article, index) of articles"
              :key="index"
              :slug="article.slug"
              :img="article.featured_image.large"
              :alt="article.alt"
              :name="article.title"
              :description="article.description">
        </blog>
      </template>

      <template slot="nav">
        <div id="related-articles--prev"
             class="swipe--prev">
          <img src="/v2/images/arrow-left.png" />
        </div>
        <div id="related-articles--next"
             class="swipe--next">
          <img src="/v2/images/arrow-left.png" />
        </div>
      </template>
    </swiper>
    <div class="bottom">
      <button v-on:click="$router.push({ path: '/ico-cryptocurrency-blog' })">See Our Blog</button>
    </div>
  </div>
</template>

<script>
import Blog from "@/components/v2/blog";
import Swiper from "@/components/v2/swiper";

export default {
  components: {
    Blog,
    Swiper
  },

  props: {
    items: {
      default: () => [],
      type: Array
    }
  },

  data: () => ({
    swiperOption: {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 40,
      navigation: {
        nextEl: "#related-articles--next",
        prevEl: "#related-articles--prev"
      },
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        413: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }
    }
  }),

  computed: {
    articles() {
      const blogs = this.items;
      let list = [];
      if (blogs != null) {
        if (blogs.length > 3) {
          list = blogs.slice(0, 3);
        } else {
          blist = blogs;
        }
      }
      return list;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
