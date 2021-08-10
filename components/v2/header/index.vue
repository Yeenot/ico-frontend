<template>
  <header>
    <div class="container">
      <div class="content-grid">
        <div class="first-row">
          <!-- ico #s -->
          <div class="left on-mobile-hide">
            <list class="status"
                  direction="horizontal">
              <list-item v-for="(status, index) of status.list"
                         :key="index">
                <span class="count">{{ status.count }}</span> {{ status.text }}
              </list-item>
            </list>
          </div>

          <!-- whitelist & ico alert channel -->
          <div id="telegram-channel"
               class="middle">
            <div>
              <a href="https://t.me/ico_check"
                 target="_blank">
                <icon name="telegram">Free Whitelist &amp; ICO Alert Channel!</icon>
              </a>
            </div>
          </div>

          <!-- social media icons -->
          <div class="right on-small-mobile-hide">
            <list class="media"
                  direction="horizontal">
              <list-item v-for="(media, index) of media.list"
                         :key="index">
                <a :href="media.href" target="_blank">
                  <icon :name="media.icon">
                  </icon>
                </a>
              </list-item>
            </list>
          </div>
        </div>

        <!-- 2nd part -->
        <div class="second-row">
          <!-- search -->
          <div class="left">
            <search></search>
          </div>

          <!-- logo -->
          <div class="middle logo-wrapper">
            <nuxt-link to="/">
              <img class="logo on-mobile-hide"
                   src="/images/ico-check-cryptocurrency-list-logo.png"
                   alt="Initial Coin Offering iCO Check logo" />
              <img class="mobile-logo on-mobile-show"
                   src="/images/ico-check-cryptocurrency-list-logo-mobile.png"
                   alt="Initial Coin Offering iCO Check logo" />
            </nuxt-link>
          </div>

          <!-- menu -->
          <div class="right">
            <nav-menu :items="menu.list"></nav-menu>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Icon from "@/components/v2/icon/";
import Search from "@/components/v2/search";
import NavMenu from "@/components/v2/menu";

export default {
  components: {
    List,
    ListItem,
    Icon,
    Search,
    NavMenu
  },

  data: () => ({
    media: {
      list: [
        {
          href: "https://www.facebook.com/icocheck/",
          icon: "facebook"
        },
        {
          href: "https://twitter.com/ico_check?lang=en",
          icon: "twitter"
        },
        {
          href: "https://t.me/ico_check",
          icon: "telegram"
        }
      ]
    },
    menu: {
      list: [
        {
          href: "/advanced-ico-list",
          text: "ICO List"
        },
        {
          href: "/ico-reviews",
          text: "ICO Reviews"
        },
        {
          href: "/ico-calendar",
          text: "Calendar"
        },
        {
          text: "Resources",
          list: [
            {
              href: "/ico-cryptocurrency-blog",
              text: "Articles"
            },
            {
              href: "/ico-whitelist",
              text: "Whitelist"
            },
            {
              href: "/ico-social",
              text: "Social"
            },
            {
              href: "/cryptocurrency-glossary",
              text: "Glossary"
            },
            {
              href: "/cryptocurrency-faq",
              text: "Faq"
            }
          ]
        }
      ]
    }
  }),

  mounted() {
    this.initialization();
  },

  computed: {
    status() {
      const count = this.$store.state.v2Icos.count;
      const upcoming = count.upcoming;
      const ongoing = count.ongoing;
      const past = count.past;
      const all = upcoming + ongoing + past;

      return {
        list: [
          {
            count: all,
            text: "all"
          },
          {
            count: ongoing,
            text: "ongoing"
          },
          {
            count: upcoming,
            text: "upcoming"
          },
          {
            count: past,
            text: "past"
          }
        ]
      };
    }
  },

  methods: {
    initialization() {
      this.countIco();
      this.getIcoList();
    },

    countIco() {
      this.$store.dispatch("ico_count");
    },

    getIcoList() {
      this.$store.dispatch("all");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
