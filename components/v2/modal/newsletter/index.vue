<template>
  <div class="newsletter-modal">
    <h6>Thank you for your registration!</h6>
    <div class="content">
      Don't forget to check out our
      <a href="/ico-cryptocurrency-blog"
         target="_blank">blog</a> for more content about ICOs.
      <br/> We would love to connect with you on Telegram, Facebook or Twitter where you will find more exclusive ICO insights:
      <list direction="horizontal">
        <list-item v-for="(social, index) of socials"
                   :key="index">
          <a :href="social.href"
             target="_blank">
            <icon :name="social.icon.name"
                  :options="{
                          css: social.icon.css
                        }">
            </icon>
          </a>
        </list-item>
      </list>
      Cheers,<br/>ico-check.com
    </div>
    <div class="actions">
      <button class="reverse"
              v-on:click="close()">Ok</button>
    </div>
  </div>
</template>

<script>
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Icon from "@/components/v2/icon";

export default {
  components: {
    List,
    ListItem,
    Icon
  },

  data: () => ({
    socials: [
      {
        href: "https://www.facebook.com/icocheck/",
        icon: {
          name: "facebook",
          css: {
            svg: {
              height: "16px"
            }
          }
        }
      },
      {
        href: "https://twitter.com/ico_check?lang=en",
        icon: {
          name: "twitter",
          css: {
            svg: {
              height: "12px"
            }
          }
        }
      },
      {
        href: "https://t.me/ico_check",
        icon: {
          name: "telegram",
          css: {
            svg: {
              height: "14px"
            }
          }
        }
      }
    ]
  }),

  computed: {
    scroll: {
      get() {
        return this.$store.state.all.body.scroll;
      },

      set(value) {
        this.$store.commit("SCROLL", value);
      }
    }
  },

  destroyed() {
    this.scroll = true;
  },

  methods: {
    close() {
      this.$modal.hide("newsletter");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./style.scss";
</style>
