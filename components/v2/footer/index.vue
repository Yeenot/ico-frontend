<template>
  <div class="footer">
    <modal name="newsletter"
           :adaptive="true"
           height="auto">
      <newsletter-modal></newsletter-modal>
    </modal>
    <div id="get-weekly-report">
      <div class="content-grid">
        <div id="subscribe"
             class="flex-container">
          <div>
            <div class="label">
              <icon name="email">Get a weekly ICO report</icon>
            </div>
          </div>
          <div class="col">
            <div class="input-group">
              <input type="text"
                     v-model="subscribe.email"
                     @keyup.enter="newsletter()"
                     placeholder="Email Address" />
              <div class="addon">
                <button v-on:click="newsletter()">
                  <template v-if="subscribe.sending">
                    Sending...
                  </template>
                  <template v-else>
                    Subscribe
                  </template>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="content-grid">
        <div class="section flex-container">
          <div class="info">
            <div class="info-wrapper">
              <img class="logo"
                   src="/v2/images/ico-check-cryptocurrency-list-logo-dark.png" />
              <div class="quote">
                &copy; {{ currentYear }} | ico-check.com <br /> Made with Love for the Crypto Community
              </div>
              <div class="mails">
                <list direction="vertical">
                  <list-item>
                    Advertise with us: <a href="mailto:updates@ico-check.com">updates@ico-check.com</a>
                  </list-item>
                  <list-item>
                    ICO Updates: <a href="mailto:updates@ico-check.com">updates@ico-check.com</a>
                  </list-item>
                </list>
              </div>
              <button class="submit-ico reverse"
                      v-on:click="goTo(submit.href, '_blank')">
                <icon name="submit">Submit ICO</icon>
              </button>
            </div>
          </div>
          <div class="col">
            <div class="flex-container">
              <div class="col col-xs-2 category"
                   v-for="(item, index) of categories"
                   :key="index">
                <div class="group">
                  <h6> {{ item.name }} </h6>
                  <list :direction="item.direction">
                    <list-item v-for="(item, index) of item.list"
                               :key="index">
                      <a :href="item.href"
                         :target="item.target">
                        <template v-if="item.icon">
                          <icon :name="item.icon.name"
                                :options="{
                          css: item.icon.css
                        }">
                            <template v-if="item.name">
                              {{ item.name }}
                            </template>
                          </icon>
                        </template>
                        <template v-else>
                          <template v-if="item.name">
                            {{ item.name }}
                          </template>
                        </template>
                      </a>
                    </list-item>
                  </list>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import RssFeed from "@/components/v2/rss-feed";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Icon from "@/components/v2/icon";
import NewsletterModal from "@/components/v2/modal/newsletter";

export default {
  components: {
    RssFeed,
    List,
    ListItem,
    Icon,
    NewsletterModal
  },

  data: () => ({
    submit: {
      href:
        "https://docs.google.com/forms/d/e/1FAIpQLSetn2xjsqUiWaoSDI8AL7qqHnazJQjbyBtMOMk2QV5KD_QDqg/viewform"
    },
    categories: [
      {
        name: "ICO Trackers",
        direction: "vertical",
        list: [
          {
            name: "Telegram Groups",
            href: "/ico-social/telegram",
            target: "_blank"
          },
          {
            name: "Facebook Groups",
            href: "/ico-social/facebook",
            target: "_blank"
          },
          {
            name: "Twitter Groups",
            href: "/ico-social/twitter",
            target: "_blank"
          },
          {
            name: "Alexa Ranks",
            href: "/ico-social/alexa",
            target: "_blank"
          }
        ]
      },
      {
        name: "Links",
        direction: "vertical",
        list: [
          {
            name: "Whitelists",
            href: "/ico-whitelist",
            target: "_blank"
          },
          {
            name: "Glossary",
            href: "/cryptocurrency-glossary",
            target: "_blank"
          },
          {
            name: "FAQ",
            href: "/cryptocurrency-faq",
            target: "_blank"
          },
          {
            name: "Feedback",
            href:
              "mailto:updates@ico-check.com?Subject=Feedback%20/%20Feature%20Request",
            target: "_blank"
          },
          {
            name: "Feature Requests",
            href:
              "mailto:updates@ico-check.com?Subject=Feedback%20/%20Feature%20Request",
            target: "_blank"
          }
        ]
      },
      {
        name: "Follow Us",
        direction: "vertical",
        list: [
          {
            name: "Telegram",
            href: "https://t.me/ico_check",
            target: "_blank",
            icon: {
              name: "telegram",
              css: {
                svg: {
                  height: "14px"
                }
              }
            }
          },
          {
            name: "Facebook",
            href: "https://www.facebook.com/icocheck/",
            target: "_blank",
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
            name: "Twitter",
            href: "https://twitter.com/ico_check?lang=en",
            target: "_blank",
            icon: {
              name: "twitter",
              css: {
                svg: {
                  height: "13px"
                }
              }
            }
          },
          {
            name: "Email",
            href: "mailto:updates@ico-check.com",
            target: "_blank",
            icon: {
              name: "email",
              css: {
                svg: {
                  height: "13px"
                }
              }
            }
          },
          {
            name: "RSS",
            href: "https://api.ico-check.com/feed/rss",
            target: "_blank",
            icon: {
              name: "feed",
              css: {
                svg: {
                  height: "13px"
                }
              }
            }
          }
        ]
      }
    ],

    subscribe: {
      email: "",
      sending: false,
      success: -1
    }
  }),

  watch: {
    "subscribe.email"(value) {
      if (this.subscribe.success == 0) {
        this.subscribe.success = -1;
      }
    },

    scroll(value) {
      document.body.style.overflow = !value ? "hidden" : "";
    }
  },

  mounted() {},

  computed: {
    HostName() {
      return this.$store.state.settings.hostname;
    },

    scroll: {
      get() {
        return this.$store.state.all.body.scroll;
      },

      set(value) {
        this.$store.commit("SCROLL", value);
      }
    },
    currentYear() {
      return (new Date()).getFullYear();
    }
  },

  methods: {
    goTo(href, target) {
      window.open(href, target);
    },

    newsletter() {
      let email = this.subscribe.email;
      if (email != "") {
        this.subscribe.sending = true;
        const subscribe = this.$store.dispatch(`newsletter`, email);
        subscribe
          .then(response => {
            if (response.status == 200) {
              this.subscribe.success = 1;
              this.subscribe.sending = false;
              this.subscribe.email = "";
              this.scroll = false;
              this.$modal.show("newsletter");
            }
          })
          .catch(error => {
            this.subscribe.sending = false;
            this.subscribe.success = 0;
          });
      }
    }
  }
};
</script>

<style scoped>
@import "normalize.css/normalize.css";
</style>
<style lang="scss" scoped>
@import "assets/v2/scss/main.scss";
</style>

<style lang="scss" scoped>
@import "./style.scss";
</style>
