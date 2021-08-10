<template>
  <page>
    <template slot="title">
      <h1>List of All Up and Coming Cryptocurrencies around the World</h1>
    </template>
    <div>
      <h4>Top Cryptocurrency List</h4>
      <img src="/v2/images/hero.png"
           alt="List of All Up and Coming Cryptocurrencies around the World" />
      <br />
      <br />
      <ico-list :headers="headers"
                :icos="icos"
                :options="options"
                :settings="settings">
      </ico-list>
      <div class="bottom">
        <button v-on:click="toIcoList()">See Full ICO List</button>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "~/components/v2/page";
import MyTable from "~/components/v2/my-table";
import IcoList from "@/components/v2/ico-list";

export default {
  components: {
    Page,
    MyTable,
    IcoList
  },
  // middleware: "hide",
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

  async asyncData({ params, store }) {
    const response = await Promise.all([store.dispatch(`fields`)]);
    let fields = {};
    if (response[0].status == 200) {
      const list = response[0].data;
      for (const key of Object.keys(list)) {
        const item = list[key];
        fields[item.name] = item;
      }
    }

    return {
      fields
    };
  },

  data: () => ({
    params: {
      page: 1,
      perPage: 80,
      filter: "upcoming",
      cols: []
    },
    main: [
      "project-name",
      "hard-cap",
      "tier-one-price-per-token",
      "project-market",
      "project-token-type",
      "nr-of-telegram-members"
    ],
    extra: [
      "token-symbol",
      "token-price-pegged-to",
      "soft-cap-pegged-to",
      "hard-cap-pegged-to",
      "total-token-supply",
      "presale-start",
      "presale-end",
      "crowdsale-start",
      "crowdsale-end"
    ],
    icos: [],
    options: {},
    settings: {
      sort: false,
      remove: false
    }
  }),

  computed: {
    title() {
      return "List of all Up and Coming Cryptocurrencies in the World";
    },

    description() {
      return "The List of All Up And Coming Cryptocurrencies in the World. There are hundreds of ICOs but only a few can last longer than a few months.";
    },

    image() {
      return `${this.hostname}/v2/images/hero.png`;
    },

    keywords() {
      return "List of Cryptocurrency in the World,List of All Cryptocurrencies,Up and Coming Cryptocurrency";
    },

    hostname() {
      return this.$store.state.settings.hostname;
    },

    headers() {
      const fields = this.fields;
      const cols = this.main;
      const list = [];
      cols.forEach(col => {
        const field = fields[col];
        if (field != null) {
          list.push(field);
        }
      });
      return list;
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.getIcos();
    },

    handleTable() {
      const first = 128;
      const max = 1200 - first;
      const table = this.$refs.icos.$el.querySelector(".wrapper");
      const th = table.childNodes[1].childNodes[0].childNodes[0].childNodes;
      let len = th.length;
      if (len > 6) {
        len = 5;
      }
      const each = Math.floor(max / len);
      th[0].style.width = `${first}px`;
      var ctr = 1;
      while (ctr < th.length) {
        let width = each;
        if (ctr > 5) {
          width = 200;
        }
        th[ctr].style.width = `${width}px`;
        ctr++;
      }
    },

    getIcos() {
      this.icos = [];
      this.params.cols = this.$util.removeDuplicates(
        this.main.concat(this.extra)
      );
      this.$store
        .dispatch(`list`, this.params)
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
            this.icos = result.data;
          }
        })
        .catch(error => {});
    },

    getProperty(ico, field, attr = "value") {
      const details = ico.details;
      let value = null;
      if (details != null) {
        const data = details[field.name];
        if (data != null) {
          value = data[attr];
          if (field.type == "number") {
            value = this.$util.numberFormat(value);
            if (field.name == "percentage-sold-to-public") {
              if (!isNaN(value)) {
                value = `${value * 100}%`;
              }
            }
          }
        }
      }
      return value;
    },

    hasUnit(ico, name) {
      const unit = this.getUnit(name);
      const details = ico.details;
      const data = details[unit];
      let value = null;
      if (data != null) {
        value = data.value;
      }
      return value;
    },

    getUnit(name) {
      let unit = null;
      for (const key of Object.keys(this.units)) {
        const list = this.units[key];
        if (list.includes(name)) {
          unit = key;
          break;
        }
      }
      return unit;
    },

    numberFormat(val) {
      if (!this.$util.isTba(val)) {
        return this.$util.numberFormat(val);
      } else {
        return val;
      }
    },

    getSmallImage(ico) {
      const images = ico.images;
      let path = null;
      if (images != null) {
        const small = images.logo_small;
        if (small != null) {
          path = `https://api.ico-check.com/uploads/${small}`;
        }
      }
      return path;
    },

    isEmpty(value) {
      return this.$util.isDetailEmpty(value);
    },

    isEmptyAndTba(value) {
      return this.$util.isDetailEmpty(value) || value == "?";
    },

    isTba(value) {
      return this.$util.isTba(value);
    },

    validateInfo(value) {
      if (!this.isEmptyAndTba(value)) {
        return value;
      } else {
        return this.$util.getEmpty();
      }
    },

    toIcoList() {
      this.$router.push({
        path: `/advanced-ico-list`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px 16px;
  font-weight: 700;
}
.bottom {
  margin-top: 46px;
  text-align: center;
}
</style>
