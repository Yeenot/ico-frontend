<template>
  <page>
    <template slot="title">
      <h1>ICO {{ FormattedSocial }} {{ PageTitleUnit }} Tracker</h1>
    </template>
    <div id="social">
      <div class="selection flex-container">
        <div class="column"
             v-for="(type, index) of Types"
             :key="index">
          <div class="type"
               :class="{ 'selected': SocialIndex == index }"
               v-on:click="onTypeSelected(index)">
            {{ type.label }}
          </div>
        </div>
      </div>

      <div class="datas">
        <div class="filter">
          <list direction="horizontal">
            <list-item>
              <dropdown :items="Intervals"
                        v-on:change="onIntervalSelected"></dropdown>
            </list-item>
            <list-item>
              <dropdown :items="Filters"
                        :default="2"
                        v-on:change="onFilterSelected"></dropdown>
            </list-item>
          </list>
        </div>

        <div class="bar-chart"
             v-if="Social !== 'alexa'">
          <h2>{{ ChartTitle }}</h2>
          <div class="chart-wrapper">
            <horizontal-bar-chart :styles="chartStyles"
                                  :chart-data="ChartData"
                                  :options="options"
                                  v-if="Stats.length > 0" />
          </div>
        </div>

        <div class="icos">
          <h2>{{ TableTitle }}</h2>
          <my-table v-if="Stats.length > 0"
                    :fixed="true">
            <template slot="thead">
              <tr>
                <th v-for="(header, index) of TableHeaders"
                    :key="index"
                    v-on:click="onSort(header.key)">
                  {{ header.label }}
                  <i class="fa"
                     v-if="Sort.key == header.key"
                     :class="SortClass"></i>
                </th>
              </tr>
            </template>
            <template slot="clone">
              <tr>
                <th v-for="(header, index) of TableHeaders"
                    :key="index"
                    v-on:click="onSort(header.key)">
                  {{ header.label }}
                  <i class="fa"
                     v-if="Sort.key == header.key"
                     :class="SortClass"></i>
                </th>
              </tr>
            </template>
            <template slot="tbody">
              <tr v-for="(data, index) of TableData"
                  :key="index"
                  v-on:click="onItemClick($event, data)">
                <td v-for="(header, index) of TableHeaders"
                    :key="index">
                  <template v-if="header.key != 'name'">
                    {{ numberFormat(data[header.key]) }}
                  </template>
                  <template v-else>
                    {{ data[header.key] }}
                  </template>
                </td>
              </tr>
            </template>
          </my-table>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import TabLinks from "@/components/tabs/links.vue";
import HorizontalBarChart from "~/components/chart/bar/horizontal.js";
import MyTable from "@/components/v2/my-table";
import Page from "@/components/v2/page";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Dropdown from "@/components/v2/dropdown";

export default {
  components: {
    HorizontalBarChart,
    TabLinks,
    MyTable,
    Page,
    List,
    ListItem,
    Dropdown
  },

  head() {
    return {
      title: this.Title,
      meta: [
        {
          name: "google-site-verification",
          content: "_NoSyh4vxpf1Ud3_Wq3rHHM6e1RP6qPRqpqgCbd7IF0"
        },
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
      ]
    };
  },

  async fetch({ params, store, redirect }) {
    const type = params.type;
    const types = store.state.social.types;
    if (!type) {
      if (types.length > 0) {
        redirect("/ico-social/" + types[0].value);
        return;
      }
    }

    const interval = store.state.social.selected.interval;
    const filter = store.state.social.selected.filter;
    const requests = [];

    const data = {
      type,
      interval: interval === "total" ? "latest" : interval,
      status: filter
    };
    requests.push(store.dispatch(`getSocial`, data));
    await Promise.all(requests);
  },

  data: () => ({
    name: "stats",

    barChartData: {
      labels: [
        "Aion",
        "Airtoken",
        "Etherdelta",
        "Globcoin",
        "FinTab",
        "Envion",
        "Appcoins",
        "The Key",
        "Block Port",
        "Pindify",
        "Jibrel Network",
        "AMT"
      ],
      datasets: [
        {
          label: "Ico Users Count",
          backgroundColor: "#533e8b",
          data: [300, 500, 100, 5, 700, 120, 580, 120, 50, 250, 175, 1040]
        }
      ]
    },

    sort: {
      key: "name",
      type: 1
    }
  }),

  mounted() {
    // this.getStatistics(this.Social, this.Interval, this.Filter)
  },

  watch: {
    Social(value) {
      this.getStatistics(value, this.Interval, this.Filter);
    },

    Interval(value) {
      this.getStatistics(this.Social, value, this.Filter);
    },

    Filter(value) {
      this.getStatistics(this.Social, this.Interval, value);
    }
  },

  computed: {
    Title() {
      return (
        this.$util.capitalizeFirstLetter(this.Social) +
        " - Social - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com"
      );
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

    chartStyles() {
      let width = this.width;
      if (!width) {
        width = "auto";
      }
      return {
        height: `${width}px`,
        position: "relative"
      };
    },

    FormattedSocial() {
      const social = this.Social;
      return this.$util.capitalizeFirstLetter(social);
    },

    Social() {
      return this.$route.params.type;
    },

    Types() {
      const types = this.$store.state.social.types;
      const social = this.Social;

      const formatted = [];
      types.forEach((type, index) => {
        formatted.push({
          label: type.value,
          unit: type.unit
        });
      });
      return formatted;
    },

    SocialIndex() {
      const social = this.Social;
      const types = this.Types;
      let socialIndex = -1;
      types.forEach((type, index) => {
        if (social === type.label) {
          socialIndex = index;
        }
      });
      return socialIndex;
    },

    Intervals() {
      const intervals = this.$store.state.social.intervals;
      const formatted = [];
      intervals.forEach((interval, index) => {
        formatted.push({
          label: this.$util.capitalizeFirstLetter(interval),
          value: interval
        });
      });
      return formatted;
    },

    Stats() {
      let stats = this.$store.state.social.stats;
      return stats;
    },

    PageTitleUnit() {
      const social = this.Social;
      const unit = this.Unit;
      let pageUnit = unit;

      if (social === "telegram" || social === "facebook") {
        pageUnit = "group";
      }

      if (this.$util.lastChar(pageUnit) === "s") {
        pageUnit = pageUnit.substring(0, pageUnit.length - 1);
      }

      return this.$util.capitalizeFirstLetter(pageUnit);
    },

    Unit() {
      const social = this.Social;
      const types = this.Types;
      let unit = "";
      types.forEach(type => {
        if (social === type.label) {
          unit = type.unit;
          return;
        }
      });
      return unit;
    },

    IntervalLabel() {
      const interval = this.Interval;
      let label = this.$util.capitalizeFirstLetter(interval);
      return label;
    },

    Interval: {
      get() {
        return this.$store.state.social.selected.interval;
      },

      set(value) {
        this.$store.commit(`INTERVAL`, value);
      }
    },

    Filter: {
      get() {
        return this.$store.state.social.selected.filter;
      },

      set(value) {
        this.$store.commit(`FILTER`, value);
      }
    },

    Filters() {
      return this.$store.state.social.filter;
    },

    IntervalOptions() {
      return {
        key: "label"
      };
    },

    FilterOptions() {
      return {
        default: this.Filter,
        key: "label"
      };
    },

    ChartData() {
      const social = this.Social;
      const stats = this.$util.clone(this.Stats);
      const interval = this.Interval;
      const data = this.getChartData(social, stats, interval);
      return data;
    },

    ChartTitle() {
      const social = this.Social;
      const interval = this.Interval;
      let unit = this.Unit;
      const key = this.getKeyOfInterval();

      if (social === "telegram" || social === "facebook") {
        unit = "Groups";
      }

      let title = `Largest ${social} ${unit}`;
      if (interval !== "total") {
        title = `${interval} Change Largest ${social} ${unit}`;
      }
      return title;
    },

    TableTitle() {
      const social = this.Social;
      const interval = this.Interval;
      let unit = this.Unit;
      let key = this.getKeyOfInterval();

      if (social === "telegram" || social === "facebook") {
        unit = "Groups";
      }

      let prefix = `${key}`;
      if (interval !== "total") {
        prefix = `${interval} ` + prefix;
      }
      let title = `${prefix} ${social} ${unit}`;

      return title;
    },

    TableClass() {
      const interval = this.Interval;
      const obj = {};
      const key = this.getKeyOfInterval();
      obj[`${key}-table`] = true;
      return obj;
    },

    Sort() {
      return this.sort;
    },

    SortClass() {
      const sort = this.Sort;
      return {
        "fa-caret-up": sort.type % 2 != 0,
        "fa-caret-down": sort.type % 2 == 0
      };
    },

    TableHeaders() {
      const interval = this.Interval;
      let table = {
        headers: [
          {
            label: "Ico",
            key: "name"
          },
          {
            label: "Total",
            key: "total"
          }
        ]
      };

      if (interval !== "total") {
        table.headers.push({
          label: "Change",
          key: "change"
        });
      }
      return table.headers;
    },

    TableData() {
      const parent = this;
      const stats = this.Stats;
      const clone = this.$util.clone(stats);
      const interval = this.Interval;

      let key = "total";
      if (interval !== "total") {
        key = "change";
      }
      const sort = this.sort;

      if (sort.key) {
        clone.sort(function(a, b) {
          const aString = a[sort.key].toString();
          const bString = b[sort.key].toString();

          if (sort.type % 2 !== 0) {
            return parent.$util.naturalSorter(aString, bString);
          } else {
            return parent.$util.naturalSorter(bString, aString);
          }
        });
      }
      return clone;
    },

    options() {
      const parent = this;
      return {
        hover: {
          onHover: function(e, items) {
            var el = this.canvas;
            el.style.cursor = items[0] ? "pointer" : "default";
          }
        },
        onClick: function(e) {
          var element = this.getElementAtEvent(e)[0];
          const label = element._model.label;
          const stat = parent.getStatByLabel(label);
          window.open(`${window.location.origin}/${stat.slug}-ico`, "_blank");
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            right: 70
          }
        },
        animation: {
          onComplete: response => {}
        },
        legend: {
          onClick: () => {}
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              categoryPercentage: 1,
              barThickness: 20,
              gridLines: {
                display: true
              }
            }
          ]
        }
      };
    }
  },

  methods: {
    onItemClick(event, item) {
      event.preventDefault();
      window.open(`${window.location.origin}/${item.slug}-ico`, "_blank");
    },

    getStatByLabel(label) {
      const stats = this.Stats;
      let stat = null;
      stats.forEach(item => {
        if (item.name === label) {
          stat = item;
          return;
        }
      });

      return stat;
    },

    onSort(key) {
      const currentKey = this.sort.key;
      if (currentKey === key) {
        this.sort.type++;
      } else {
        this.sort.type = 1;
      }
      this.sort.key = key;
    },

    getKeyOfInterval() {
      const interval = this.Interval;
      let key = "total";

      if (interval !== "total") {
        key = "change";
      }

      return key;
    },

    getChartData(social, stats, interval) {
      const unit = this.Unit;
      let key = "total";
      let prefix = "Total ";
      if (interval !== "total") {
        prefix = this.$util.capitalizeFirstLetter(interval) + " Change ";
        key = "change";
      }

      stats.sort(function(a, b) {
        return b[key] - a[key];
      });
      const top = stats.slice(0, 15);

      const label =
        prefix +
        this.$util.capitalizeFirstLetter(social) +
        " " +
        this.$util.capitalizeFirstLetter(unit);
      const labels = [];
      const data = [];
      top.forEach(stat => {
        labels.push(stat.name);
        data.push(stat[key]);
      });

      return {
        labels,
        datasets: [
          {
            label,
            backgroundColor: "#533e8b",
            data,
            datalabels: {
              align: "end",
              anchor: "end",
              offset: 0
            }
          }
        ]
      };
    },

    onTypeSelected(index) {
      this.$router.push({
        path: "/ico-social/" + this.Types[index].label
      });
    },

    onIntervalSelected(item) {
      this.Interval = item.value;
    },

    onFilterSelected(item) {
      this.Filter = item.value;
    },

    getStatistics(type, interval, status) {
      const params = {
        type,
        interval: interval === "total" ? "latest" : interval,
        status
      };
      this.$store.commit(`SOCIAL`, []);
      this.$store.dispatch(`getSocial`, params);
    },

    numberFormat(value) {
      return this.$util.numberFormat(value);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "assets/v2/pages/social/scss/style.scss";
</style>
