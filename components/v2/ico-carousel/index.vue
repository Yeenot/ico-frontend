<template>
  <div class="ico-carousel">
    <div class="filters flex-container no-wrap">
      <div class="col left">
        <div class="status-list flex-container">
          <div class="column"
               v-for="(status, index) of filters"
               :key="index">
            <div class="status"
                 :class="{ 'selected': selected == index }"
                 v-on:click="onStatusClick(index)">
              {{ status.label }}
            </div>
          </div>
        </div>
      </div>
      <div class="create-filter">
        <button v-on:click="to('/advanced-ico-list')">Full ICO List</button>
      </div>
    </div>
    <swiper :option="swiperOption"
            :instanceName="'ico-carousel'">
      <template slot="default">
        <div class="swiper-slide"
             v-for="(item, index) in items"
             v-on:click="onIcoClick($event, item.slug)"
             :class="{ 'favourite': item.is_sponsored }"
             :key="index">
          <div class="box">
            <div class="ribbon">
              <a href="#">ICO CHECK'S FAVOURITE</a>
            </div>
            <h2 class="name">
              {{ item.name }}
            </h2>
            <div class="logo">
              <img :src="item.logo"
                   :alt="`${item.name} Logo`" />
            </div>
            <sale :ico="item.sale"
                  :match="match"
                  v-if="filter.value != 'past'"></sale>
            <div class="info">
              <div class="cap">
                <div class="label">
                  hard cap
                </div>
                <div class="value">
                  <template v-if="!isEmpty(item.hardcap)">
                    {{ numberFormat(item.hardcap) }} <template v-if="!isEmptyAndTba(item.peggedTo)">{{ item.peggedTo }}</template>
                  </template>
                  <template v-else>
                    -
                  </template>
                </div>
              </div>
              <div class="sold-to-public">
                <div class="label">
                  % sold to public
                </div>
                <div class="value">
                  <progress-circle :values="[ !isEmptyAndTba(item.soldToPublic) ? item.soldToPublic : 0 ]"
                                   :size="circle.size"
                                   :border="circle.border"
                                   :emptyColor="(index == 0 || index == 1 || index == 3) ? '#d5d4d4' : '#e6e6e6'"
                                   :colors="[ (index == 0 || index == 1 || index == 3) ? '#0f92e2' : '#1b2c65' ]">
                    <div>
                      <template v-if="!isEmpty(item.soldToPublic)">
                        <span class="fitty">{{ numberFormat(item.soldToPublic) }}<template v-if="!isEmptyAndTba(item.soldToPublic)">%</template></span>
                      </template>
                      <template v-else>-</template>
                    </div>
                  </progress-circle>
                </div>
              </div>
              <div class="telegram-members">
                <div class="label">
                  Telegram members
                </div>
                <div class="value">
                  <template v-if="!isEmpty(item.telegramMembers)">
                    {{ numberFormat(item.telegramMembers) }}
                  </template>
                  <template v-else>
                    -
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide ico-check"
             :style="lastSlideClass">
          <div class="box">
            <h2 class="name">
              Ico-Check.com
            </h2>
            <div class="logo">
              <img src="/v2/images/ico-check.png"
                   alt="Logo" />
            </div>
            <div class="heading">
              That isn't all!
            </div>
            <div class="info">
              <div class="label">
                See the full list of
              </div>
              <div class="value">
                {{ total }} ICOs
              </div>
            </div>
            <button v-on:click="to('/advanced-ico-list')">Here</button>
          </div>
        </div>
      </template>
      <template slot="nav">
        <div id="ico-carousel--prev"
             class="swipe--prev">
          <img src="/v2/images/arrow-left.png" />
        </div>
        <div id="ico-carousel--next"
             class="swipe--next">
          <img src="/v2/images/arrow-left.png" />
        </div>
      </template>
    </swiper>
    <div class="bottom">
      <button class="view-all"
              v-on:click="to('/advanced-ico-list')">View Full Customizable ICO List</button>
    </div>
  </div>
</template>

<script>
import Countdown from "@/components/v2/countdown";
import ProgressCircle from "@/components/v2/circle/progress";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Swiper from "@/components/v2/swiper";
import Sale from "@/components/v2/sale";
import fitty from "fitty";

export default {
  components: {
    Countdown,
    ProgressCircle,
    List,
    ListItem,
    Swiper,
    Sale
  },

  data: () => ({
    swiperOption: {
      loop: false,
      slidesPerView: 5,
      spaceBetween: 5,
      navigation: {
        nextEl: "#ico-carousel--next",
        prevEl: "#ico-carousel--prev"
      },
      breakpoints: {
        1340: {
          slidesPerView: 4
        },
        992: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 2
        }
      },
      on: {
        slideChange() {},
        tap() {}
      }
    },
    selected: 0,
    filter: null,
    params: {
      filter: "",
      preset: "",
      perPage: 12,
      page: 1,
      cols: [],
      sortBy: "",
      sortOrder: ""
    },
    columns: [
      "project-name",
      "hard-cap",
      "percentage-sold-to-public",
      "marketcap-circulating-supply",
      "marketcap-total-supply",
      "nr-of-telegram-members"
    ],
    icos: [],
    empties: {
      upcoming: "started",
      active: "ended"
    },
    fitties: null,
    baseHeight: 459
  }),

  watch: {
    selected(index) {
      this.getIcos();
    },

    filter(item) {
      this.media(item);
    }
  },

  mounted() {
    this.init();
  },

  updated() {
    this.setFitty();
  },

  computed: {
    window() {
      return this.$store.state.all.window;
    },

    lastSlideClass() {
      let height = this.baseHeight;
      return {
        height: `${height}px`
      };
    },

    circle() {
      const window = this.window;
      let size = 35;
      let border = 2;

      if (window.width > 0 && window.width < 767) {
        size = 32;
        border = 2;
      }
      return {
        size,
        border
      };
    },

    filters() {
      return [
        {
          label: "Top Hype",
          value: "tophype"
        },
        {
          label: "Lowcap",
          value: "lowcap"
        },
        {
          label: "Upcoming",
          value: "upcoming"
        },
        {
          label: "Ongoing",
          value: "active"
        },
        {
          label: "Past",
          value: "past"
        }
      ];
    },

    extra() {
      return this.$store.state.v2Icos.columns.extra;
    },

    total() {
      const count = this.$store.state.v2Icos.count;
      const upcoming = count.upcoming;
      const ongoing = count.ongoing;
      const past = count.past;
      const all = upcoming + ongoing + past;
      return all;
    },

    items() {
      const parent = this;
      const icos = this.icos;
      const list = [];
      icos.forEach(ico => {
        const details = ico.details;
        const slug = ico.name;
        const is_sponsored = ico.is_sponsored;
        const name = parent.$util.getProp(details["project-name"]);
        const images = ico["images"];
        let logo = null;
        if (images != null) {
          logo = `https://api.ico-check.com/uploads/${images["logo_small"]}`;
        }
        const prop = {
          hardcap: details["hard-cap"]
        };
        let hardcap = parent.$util.getProp(prop.hardcap);
        let peggedTo = parent.$util.getProp(details["hard-cap-pegged-to"]);
        let soldToPublic = parent.$util.getProp(
          details["percentage-sold-to-public"]
        );
        let telegramMembers = parent.$util.getProp(
          details["nr-of-telegram-members"]
        );

        // hardcap = parent.$util.nullToZero(hardcap);
        // soldToPublic = parent.$util.nullToZero(soldToPublic);
        // telegramMembers = parent.$util.nullToZero(telegramMembers);

        if (!this.isEmptyAndTba(soldToPublic)) {
          soldToPublic = Math.ceil(soldToPublic * 100);
        }

        if (prop.hardcap) {
          if (
            prop.hardcap.hasOwnProperty("converted") &&
            prop.hardcap.converted
          ) {
            peggedTo = "USD";
          }
        }

        list.push({
          slug,
          name,
          logo,
          sale: {
            presale: ico.presale,
            crowdsale: ico.crowdsale
          },
          is_sponsored,
          hardcap,
          peggedTo,
          soldToPublic,
          telegramMembers
        });
      });
      return list;
    },

    match() {
      const filter = this.filter.value;
      let status = [filter];
      if (filter == "tophype" || filter == "lowcap") {
        status = ["upcoming", "active"];
      }
      return status;
    }
  },

  methods: {
    init() {
      window.addEventListener("resize", () => {
        this.media(this.filter);
      });
      this.media(this.filter);
      this.getIcos();
      this.setFitty();
    },

    media(filter) {
      var small = window.matchMedia("(max-width: 767px)");
      if (small.matches) {
        var xsmall = window.matchMedia("(max-width: 479px)");
        if (xsmall.matches) {
          if (this.isPastFilter()) {
            this.baseHeight = 326;
          } else {
            this.baseHeight = 388;
          }
        } else {
          if (this.isPastFilter()) {
            this.baseHeight = 340;
          } else {
            this.baseHeight = 413;
          }
        }
      } else {
        if (this.isPastFilter()) {
          this.baseHeight = 369;
        } else {
          this.baseHeight = 459;
        }
      }
    },

    isPastFilter() {
      return this.filter != null && this.filter.value == "past";
    },

    setFitty() {
      this.fitties = fitty(".fitty", {
        minSize: 8,
        maxSize: 12
      });
    },

    getIcos() {
      this.filter = this.filters[this.selected];
      const filter = this.filter.value;

      this.params.filter = "";
      this.params.preset = "";
      this.params.sortBy = "";
      this.params.sortOrder = "";

      if (filter != "tophype" && filter != "lowcap") {
        this.params.filter = filter;
      } else {
        if (filter == "tophype") {
          this.params.preset = "tophype";
          this.params.sortBy = "url-alexa-rank-global";
          this.params.filter = "upcoming,active";
          this.params.sortOrder = "asc";
        } else if (filter == "lowcap") {
          this.params.preset = "lowcap";
          this.params.filter = "upcoming,active";
        }
      }
      this.icos = [];
      this.params.cols = this.$util.removeDuplicates(
        this.columns.concat(this.extra)
      );
      this.$store
        .dispatch(`list`, this.params)
        .then(response => {
          if (response.status == 200) {
            this.icos = response.data.data;
          }
        })
        .catch(error => {});
    },

    onStatusClick(index) {
      this.selected = index;
    },

    numberFormat(val) {
      if (!this.$util.isTba(val)) {
        return this.$util.numberFormat(val);
      } else {
        return val;
      }
    },

    getDate(value) {
      let dt = null;
      if (!this.isEmpty(value)) {
        dt = new Date(value * 1000);
      } else {
        dt = value;
      }
      return dt;
    },

    getDifference(dt) {
      return dt * 1000 - new Date().getTime();
    },

    hasDifference(dt) {
      return this.getDifference(dt) > 0;
    },

    getSales(name, details) {
      let sale = null;

      const start = this.getDate(
        this.$util.getProp(details[`${name}-start`], "new_value")
      );
      const end = this.getDate(
        this.$util.getProp(details[`${name}-end`], "new_value")
      );
      const now = new Date();
      sale = {
        name
      };
      if ((!this.isEmpty(start) && this.isTba(start)) || now < start) {
        sale.status = "upcoming";
        sale.date = start;
      } else if ((!this.isEmpty(end) && this.isTba(end)) || now < end) {
        sale.status = "active";
        sale.date = end;
      } else {
        sale = null;
      }
      return sale;
    },

    to(path) {
      this.$router.push({
        path
      });
    },

    onIcoClick(event, slug) {
      event.preventDefault();
      if (event.ctrlKey) {
        window.open(window.location.origin + `/${slug}-ico`, "_blank");
        return;
      }
      this.toDetail(slug);
    },

    toDetail(slug) {
      this.$router.push({
        path: `/${slug}-ico`
      });
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
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./style.scss";
</style>
