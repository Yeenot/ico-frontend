<template>
  <page id="whitelist">
    <template slot="title">
      <h2>Whitelist</h2>
    </template>
    <div>
      <h2>A list of all upcoming and running ICO whitelists</h2>
      <div class="table-wrapper">
        <my-table>
          <template slot="tbody">
            <template v-for="(ico, index) in whitelist">
              <tr class="spacer"
                  v-if="index > 0"
                  :key="`spacer-${index}`">
                <td>
                </td>
              </tr>
              <tr :key="`tr-${index}`">
                <td class="name">
                  <nuxt-link :to="toIco(ico.slug)">
                    <div class="info">
                      <img :src="ico.logo"
                           :alt="`${ico.name} Logo`" /> {{ ico.name }}
                    </div>
                  </nuxt-link>
                </td>
                <td class="market">
                  <template v-if="!isEmpty(ico.market)">
                    {{ ico.market }}
                  </template>
                  <template v-else>
                    -
                  </template>
                </td>
                <td class="date">
                  <div class="status"
                       :class="ico.status">
                    {{ ico.status }}
                  </div>
                  <template v-if="!isEmpty(ico.until.timestamp)">
                    <countdown v-if="ico.until.timestamp != false && dateFromTimestamp(ico.until.timestamp) > new Date()"
                               :deadline="dateFromTimestamp(ico.until.timestamp)"
                               stop="true">
                    </countdown>
                  </template>
                </td>
                <td class="join">
                  <a :href="ico.url"
                     v-if="!isEmptyAndTba(ico.url)"
                     target="_blank">
                    JOIN NOW
                    <i class="fa fa-sign-in"></i>
                  </a>
                </td>
              </tr>
            </template>
          </template>
        </my-table>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "~/components/v2/page";
import MyTable from "~/components/v2/my-table";
import Countdown from "@/components/v2/countdown";

export default {
  name: "whitelist",

  components: {
    Page,
    MyTable,
    Countdown
  },

  head() {
    return {
      title: this.Title,
      meta: [
        { name: "Content-Type", content: "text/html" },
        { hid: "description", name: "description", content: this.Description },
        { name: "image", content: this.MetaImage },
        { name: "og:title", content: this.Title },
        { name: "og:description", content: this.Description },
        { name: "og:image", content: this.MetaImage },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: this.Title },
        { name: "twitter:description", content: this.Description },
        { name: "twitter:image", content: this.MetaImage },

        { "http-equiv": "cache-control", content: "max-age=2592000, public" },
        { "http-equiv": "pragma", content: "max-age=2592000, public" },
        { "http-equiv": "expires", content: "1" }
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          type: "application/ld+json",
          innerHTML: `{ "@context": "http://schema.org", "@type": "PostalAddress", "name": "ico-check.com", "url": "${
            this.HostName
          }", "logo": "${this.Logo}" }`
        }
      ]
    };
  },

  async fetch({ store }) {
    const response = await store.dispatch(`getWhitelist`);
  },

  data() {
    return {};
  },

  computed: {
    Title() {
      return "Whitelist Overview - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com";
    },

    Description() {
      return "Ico-check.com is an up to date ICO checker website. The ultimate Listing Tracker of active ICOs and upcoming ICOs. Discover the best Initial Coin Offering, ICO release date and ICO analysis.";
    },

    MetaImage() {
      return (
        this.HostName + "/images/ico-check-cryptocurrency-list-preview.jpeg"
      );
    },

    HostName() {
      return this.$store.state.settings.hostname;
    },

    whitelist() {
      const whitelist = this.$store.state.icos.whitelist;
      const list = [];
      whitelist.forEach(ico => {
        const until = this.Until(ico);
        const status = this.status(until);

        if (status == "open") {
          const slug = ico.name;
          const name = this.property(ico, "project-name");
          const logo = this.getIcoLogo(ico);
          const market = this.property(ico, "project-market");

          const url = this.Url(ico);

          list.push({
            slug,
            name,
            logo,
            market,
            until,
            status,
            url
          });
        }
      });
      return list;
    }
  },

  methods: {
    getIcoLogo(ico) {
      let image = null;
      if (ico.hasOwnProperty("images")) {
        const images = ico.images;
        if (images.hasOwnProperty("logo_small")) {
          image = images["logo_small"];
        }
      }
      let logo = "";
      if (image) {
        logo = `https://api.ico-check.com/uploads/${image}`;
      }
      return logo;
    },

    toIco(name) {
      return `/${name}-ico`;
    },

    Url(ico) {
      return this.property(ico, "whitelist-url");
    },

    Until(ico) {
      const timestamp = this.property(ico, "whitelist-until-date", "timestamp");
      const value = this.property(ico, "whitelist-until-date", "value");
      return {
        value,
        timestamp
      };
    },

    WhitelistStatus(status) {
      const labels = {
        upcoming: "soon",
        active: "open"
      };

      return labels[status];
    },

    StatusClass(ico) {
      let status = this.WhitelistStatus(ico);
      const obj = {};
      if (status) {
        obj[`whitelist-${status}`] = true;
      }
      return obj;
    },

    property(ico, attr, key = "value") {
      const details = ico.details;
      let value = "-";
      if (details) {
        const property = details[attr];
        value = property[key];
      }
      return value;
    },

    dateFromTimestamp(timestamp) {
      return this.$util.toDate(timestamp * 1000);
    },

    status(until) {
      let status = "";
      if (!this.isEmptyAndTba(until.value)) {
        if (until.timestamp != false) {
          const dt = this.dateFromTimestamp(until.timestamp);
          if (dt) {
            const now = new Date();
            if (dt > now) {
              status = "open";
            } else {
              status = "closed";
            }
          }
        }
      } else {
        if (this.isTba(until.value)) {
          status = "soon";
        }
      }
      return status;
    },

    isEmpty(value) {
      return this.$util.isDetailEmpty(value);
    },

    isEmptyAndTba(value) {
      return this.$util.isDetailEmpty(value) || value == "?";
    },

    isTba(value) {
      return this.$util.isTba(value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/v2/pages/whitelist/scss/style.scss";
</style>