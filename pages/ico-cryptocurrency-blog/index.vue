<template>
  <page id="article-list">
    <template slot="title">
      <h2>ICO Articles</h2>
    </template>
    <div>
      <div class="flex-container blogs">
        <div class="column col-1 col-sm-2 col-md-4"
             v-for="(article, index) of blogs"
             :key="index">
          <blog :img="article.featured_image.large"
                :name="article.title"
                :slug="article.slug"
                :alt="article.alt"
                :description="article.description">
          </blog>
        </div>
      </div>
      <pagination :options="options"
                  @go="goToPage"></pagination>
    </div>
  </page>
</template>

<script>
import Page from "~/components/v2/page";
import Blog from "~/components/v2/blog";
import Pagination from "@/components/v2/pagination";

export default {
  name: "blog-index",

  components: {
    Page,
    Blog,
    Pagination
  },

  head() {
    return {
      title: this.title,
      meta: [
        { name: "Content-Type", content: "text/html" },
        {
          hid: "description",
          name: "description",
          content: "Extensive ICO List"
        },
        { name: "image", content: this.logo },
        { name: "og:title", content: this.title },
        { name: "og:description", content: this.description },
        { name: "og:image", content: this.logo },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: this.title },
        { name: "twitter:description", content: this.description },
        { name: "twitter:image", content: this.logo },

        { itemprop: "name", content: this.title },
        { itemprop: "description", content: this.Description },
        { "http-equiv": "cache-control", content: "max-age=2592000, public" },
        { "http-equiv": "pragma", content: "max-age=2592000, public" },
        { "http-equiv": "expires", content: "1" }
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          type: "application/ld+json",
          innerHTML: `{ "@context": "http://schema.org", "@type": "PostalAddress", "name": "ico-check.com"}`
        }
      ]
    };
  },

  data() {
    return {
      params: {
        query: "",
        page: 1,
        perPage: 12
      },
      options: {},
      blogs: []
    };
  },

  watch: {
    // search(item) {
    //   this.reset();
    //   this.getBlogs();
    // }
  },

  computed: {
    title() {
      return "Blog - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule - ico-check.com";
    },

    description() {
      return "Ico-check.com is an up to date ICO checker website. The ultimate Listing Tracker of active ICOs and upcoming ICOs. Discover the best Initial Coin Offering, ICO release date and ICO analysis.";
    },

    logo() {
      return (
        this.HostName + "/images/ico-check-cryptocurrency-list-preview.jpeg"
      );
    },

    HostName() {
      return this.$store.state.settings.hostname;
    },

    search: {
      get() {
        return this.$store.state.all.search;
      },

      set(value) {
        this.$store.commit("SEARCH", value);
      }
    }

    // blogs() {
    //   return this.$store.state.blog.articles.slice().reverse();
    // }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.$bus.$on("search", () => {
        this.getBlogs();
      });
      this.getBlogs();
    },

    reset() {
      this.params.page = 1;
      this.params.filter = "";
    },

    getBlogs() {
      this.params.query = this.search;
      this.blogs = [];
      this.$store
        .dispatch(`BLOGS`, this.params)
        .then(response => {
          if (response.status == 200) {
            const result = response.data;
            this.options = {
              total: result.total,
              current: result.current_page,
              last: result.last_page,
              from: result.from,
              to: result.to
            };
            this.blogs = result.data;
          }
        })
        .catch(error => {});
    },

    goToPage(page) {
      if (page > 0 && page <= this.options.last) {
        this.params.page = page;
        this.getBlogs();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/v2/pages/blog/scss/style.scss";
</style>

