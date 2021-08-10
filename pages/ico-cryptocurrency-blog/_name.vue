<template>
  <page id="article">
    <div class="holder">
      <list class="breadcrumbs"
            direction="horizontal">
        <list-item>
          <nuxt-link :to="{ path: '/'} ">Home</nuxt-link>
        </list-item>
        <list-item>
          <nuxt-link :to="{ path: '/ico-cryptocurrency-blog'} ">Blog</nuxt-link>
        </list-item>
        <list-item>
          {{ blog.title }}
        </list-item>
      </list>

      <div class="content">
        <div class="info">
          <h1>{{ blog.title }}</h1>
          <div class="others">
            <list direction="horizontal">
              <list-item>
                Posted by:
                <span class="author" >{{ blog.author }}</span>
              </list-item>
              <list-item>
                <span>
                  {{ category }}
                </span>
              </list-item>
              <list-item v-if="blog.keywords.length > 0">{{ keywordsToString }} {{ $util.isValidDate(published) }}</list-item>
              <list-item v-if="published != null">
                {{ published }}
              </list-item>
            </list>
          </div>
        </div>
        <div class="img-container">
          <img :src="image"
               :alt="blog.alt" />
        </div>
        <div class="description"
             v-html="blog.description">
        </div>
        <div class="comments">
          <disqus name="ico-check" :title="this.blog.title" :identifier="slug"></disqus>
        </div>
        <div class="navigation clearfix">
          <div class="previous disable-text-highlight"
               :class="nextClass"
               v-on:click="next()">
            <i class="fa fa-long-arrow-left"></i> Previous</div>
          <div class="next disable-text-highlight"
               :class="prevClass"
               v-on:click="prev()">Next
            <i class="fa fa-long-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/v2/page";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Icon from "@/components/v2/icon";
import Disqus from "@/components/v2/disqus";

export default {
  components: {
    Page,
    List,
    ListItem,
    Icon,
    Disqus
  },

  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description },
        { name: "image", content: this.image },
        { name: "og:title", content: this.title },
        { name: "og:description", content: this.description },
        { name: "og:image", content: this.image },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: this.title },
        { name: "twitter:description", content: this.description },
        { name: "twitter:image", content: this.image },

        { "http-equiv": "cache-control", content: "max-age=2592000, public" },
        { "http-equiv": "pragma", content: "max-age=2592000, public" },
        { "http-equiv": "expires", content: "1" }
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          type: "application/ld+json",
          innerHTML: `{ "@context": "http://schema.org", "@type": "Article", "name": "${
            this.title
          }", "description": "${this.description}", "logo": "${this.image}"}`
        }
      ]
    };
  },

  async asyncData({ params, store, error }) {
    const slug = params.name;
    let blog = null;

    try {
      const response = await store.dispatch(`BLOG`, slug);
      if (response.status == 200) {
        blog = response.data;
      }
    } catch (e) {
      if (!blog) {
        error({
          statusCode: 404
        });
      }
    }

    return {
      slug,
      blog
    };
  },

  data() {
    return {
      trends: [
        // {
        // 	title: 'Trend Title 1',
        // 	img: '/blogs/trend-4.png',
        // 	description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum At vero eos et accusamus et iusto odio dignissimos ducimus'
        // },
        // {
        // 	title: 'Trend Title 2',
        // 	img: '/blogs/trend-2.png',
        // 	description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum At vero eos et accusamus et iusto odio dignissimos ducimus'
        // },
        // {
        // 	title: 'Trend Title 3',
        // 	img: '/blogs/trend-3.png',
        // 	description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum At vero eos et accusamus et iusto odio dignissimos ducimus'
        // },
        // {
        // 	title: 'Trend Title 4',
        // 	img: '/blogs/trend-4.png',
        // 	description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum At vero eos et accusamus et iusto odio dignissimos ducimus'
        // }
      ],
      categories: [
        // {
        // 	name: 'Feature'
        // },
        // {
        // 	name: 'Interview'
        // },
        // {
        // 	name: 'Quotes'
        // },
        // {
        // 	name: 'Weekly Roundup'
        // }
      ],

      archives: [
        // {
        // 	date: 'January 2018'
        // },
        // {
        // 	date: 'December 2017'
        // },
        // {
        // 	date: 'November 2017'
        // }
      ]
    };
  },

  watch: {
    "$route.params": function(value) {
      this.scrollTop();
    }
  },

  mounted() {
    this.scrollTop();
  },

  computed: {
    articles() {
      return this.$store.state.blog.articles;
    },

    keywordsToString() {
      let keywords = "";
      if (this.blog.hasOwnProperty("keywords")) {
        const str = this.blog.keywords.join();
        keywords = str.replace(/,/g, ", ");
      }
      return keywords;
    },

    published() {
      const dt = new Date(this.blog.published_date);
      if (dt != null) {
        return this.$util.formatDate(dt, "MMMM DD, YYYY");
      }
      return null;
    },

    HostName() {
      return this.$store.state.settings.hostname;
    },

    title() {
      let title = "";
      if (this.blog) {
        title = this.blog.title;
      }
      return title + " - ico-check.com";
    },

    description() {
      let description = "";
      if (this.blog) {
        description = this.formatDescription(this.blog.description);
      }
      return description;
    },

    image() {
      let img = null;
      const ftImage = this.blog.featured_image;
      if (ftImage) {
        img = ftImage.large;
      }
      return img;
    },

    prevClass() {
      const obj = {
        disable: !this.hasPrev()
      };
      return obj;
    },

    nextClass() {
      const obj = {
        disable: !this.hasNext()
      };
      return obj;
    },

    category() {
      return this.$util.capitalizeFirstLetter(this.blog.category[0]);
    }
  },

  methods: {
    formatDescription(str) {
      const util = this.$util;
      return util
        .trim(util.stripHTML(str))
        .slice(0, 320)
        .replace(/\s+/g, " ")
        .replace(/^\s+|\s+$/, "");
    },

    scrollTop() {
      window.scroll({
        top: 0
      });
    },

    hasPrev() {
      return this.blog.prev && this.blog.prev != "";
    },

    hasNext() {
      return this.blog.next && this.blog.next != "";
    },

    prev() {
      if (this.hasPrev()) {
        this.goToBlog(this.blog.prev);
      }
    },

    next() {
      if (this.hasNext()) {
        this.goToBlog(this.blog.next);
      }
    },

    goToBlog(slug) {
      this.$router.push({
        path: "/ico-cryptocurrency-blog/" + slug
      });
    },

    goTo(path) {
      this.$router.push({
        path
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/v2/pages/blog/scss/article.scss";
</style>
