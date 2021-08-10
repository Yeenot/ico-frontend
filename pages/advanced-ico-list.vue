<template>
  <page id="advanced">
    <div>
      <modal name="columns"
             :adaptive="true"
             height="auto">
        <columns-modal :fields="fields"
                       :categories="categories">
        </columns-modal>
      </modal>
      <div class="intro">
        <h1>Find and compare ICOs in this customizable table:</h1>
        <p>
          Click the <b>"Add Column"</b> button to add, delete and reorder columns. Click on a column name of your choice to <b>sort data</b>. Simply drag the whole table to <b>scroll it</b>.
        </p>
      </div>
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
        <div class="add-column">
          <button v-on:click="$modal.show('columns')">Add Column</button>
        </div>
      </div>
      <ico-list :headers="headers"
                :icos="icos"
                :options="options"
                :settings="settings"
                :sort="{
                  by: params.sortBy,
                  order: params.sortOrder
                }"
                @onSort="onSort"
                @removeColumn="removeColumn"
                @goToPage="goToPage">
        <template slot="countdown"
                  slot-scope="{ ico }">
          <sale :ico="ico"
                :match="filter.value == 'upcoming' || filter.value == 'active' ? [filter.value] : []"></sale>
        </template>
      </ico-list>
    </div>
  </page>
</template>

<script type="text/javascript">
import IcoList from "@/components/v2/ico-list";
import Page from "~/components/v2/page";
import List from "~/components/v2/list";
import ListItem from "~/components/v2/list/item";
import ColumnsModal from "@/components/v2/modal/columns";
import Sale from "@/components/v2/sale";

export default {
  components: {
    IcoList,
    Page,
    List,
    ListItem,
    ColumnsModal,
    Sale
  },

  async asyncData({ params, store }) {
    const response = await Promise.all([
      store.dispatch(`fields`),
      store.dispatch(`categories`)
    ]);
    let fields = {};
    if (response[0].status == 200) {
      const list = response[0].data;
      for (const key of Object.keys(list)) {
        const item = list[key];
        fields[item.name] = item;
      }
    }

    let categories = [];
    if (response[1].status == 200) {
      categories = response[1].data;
    }
    return {
      fields,
      categories
    };
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

  data: () => ({
    selected: 1,
    params: {
      query: "",
      filter: "",
      perPage: 15,
      page: 1,
      cols: [],
      sortBy: "",
      sortOrder: ""
    },
    icos: [],
    options: {},
    settings: {
      sort: true,
      remove: true,
      pagination: true
    }
  }),

  computed: {
    Title() {
      return "Upcoming ICO List - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com";
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

    filters() {
      return this.$store.state.all.filters;
    },

    filter() {
      return this.filters[this.selected];
    },

    columns() {
      return this.$store.state.v2Icos.columns;
    },

    main: {
      get() {
        return this.columns.main;
      },

      set(list) {
        this.$store.commit(`MAIN`, list);
      }
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
      const filter = this.filter;
      if (filter.value == "upcoming" || filter.value == "active") {
        list.splice(1, 0, { name: "countdown", heading: "" });
      }
      return list;
    },

    search: {
      get() {
        return this.$store.state.all.search;
      },

      set(value) {
        this.$store.commit("SEARCH", value);
      }
    }
  },

  watch: {
    main(list) {
      this.reset();
      this.getIcos();
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.$bus.$on("search", () => {
        this.selected = 0;
        this.getIcos();
      });
      if (this.search != "") {
        this.selected = 0;
      }
      this.getIcos();
    },

    reset() {
      this.params.page = 1;
      this.params.filter = "";
      this.params.sortBy = "";
      this.params.sortOrder = "";
    },

    getIcos() {
      const filter = this.filter.value;
      this.params.filter = filter;
      this.params.query = this.search;

      this.icos = [];
      this.params.cols = this.$util.removeDuplicates(
        this.columns.main.concat(this.columns.extra)
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

    onStatusClick(index) {
      this.selected = index;
      this.search = "";
      this.reset();
      this.getIcos();
    },

    onSort(name) {
      if (this.params.sortBy != name) {
        this.params.sortBy = name;
        this.params.sortOrder = "asc";
      } else {
        if (this.params.sortOrder == "asc") {
          this.params.sortOrder = "desc";
        } else {
          this.params.sortOrder = "asc";
        }
      }
      this.getIcos();
    },

    removeColumn(name) {
      const index = this.main.indexOf(name);
      if (index > -1) {
        this.main.splice(index, 1);
      }
    },

    goToPage(page) {
      this.params.page = page;
      this.getIcos();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/v2/pages/advanced/scss/style.scss";
</style>
