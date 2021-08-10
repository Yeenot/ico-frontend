<template>
  <div id="search">
    <div class="mobile"
         v-if="isMobile">
      <v-popover :offset="5"
                 trigger="click"
                 :disabled="false"
                 popoverBaseClass="popover tooltip search">
        <icon class="outer-icon"
              name="search"></icon>
        <popover-search slot="popover"
                        :items="list"
                        :onEnter="onEnter"
                        :onSelect="onSelect"
                        :placeholder="placeholder"></popover-search>
      </v-popover>
    </div>
    <div class="web"
         v-else>
      <autocomplete :items="list"
                    :onEnter="onEnter"
                    :onSelect="onSelect"
                    :placeholder="placeholder">
      </autocomplete>
    </div>
  </div>
</template>

<script>
import Autocomplete from "@/components/v2/autocomplete";
import Icon from "@/components/v2/icon/";
import PopoverSearch from "@/components/v2/popover/search";
import Vue from "vue";
import { VPopover } from "v-tooltip";

export default {
  components: {
    Autocomplete,
    Icon,
    VPopover,
    PopoverSearch
  },

  data: () => ({
    search: "",
    isMobile: false,
    blogRoutes: ["ico-cryptocurrency-blog", "ico-cryptocurrency-blog-name"]
  }),

  computed: {
    isBlog() {
      const routes = this.blogRoutes;
      let is = false;
      const name = this.$route.name;
      if (routes.includes(name)) {
        is = true;
      }
      return is;
    },

    list() {
      const list = [];
      if (!this.isBlog) {
        const items = this.$store.state.v2Icos.all;
        items.forEach(ico => {
          const slug = ico.name;
          const details = ico.details;
          if (details != null) {
            const name = details["project-name"];
            if (name != null) {
              const value = name.value.toLowerCase().trim();
              list.push({
                label: value,
                value: slug
              });
            }
          }
        });
      }
      return list;
    },

    IcoListOptions: {
      get() {
        return this.$store.getters.ICOLIST_OPTIONS;
      },

      set(value) {
        this.$store.commit(`ICOLIST_OPTIONS`, value);
      }
    },

    isClear: {
      get() {
        return this.$store.state.all.isClear;
      },

      set(value) {
        this.$store.commit(`IS_CLEAR`, value);
      }
    },

    placeholder() {
      let type = "ICOS";
      if (this.isBlog) {
        type = "BLOGS";
      }
      return `SEARCH ${type}`;
    }
  },

  mounted() {
    window.addEventListener("resize", () => {
      this.handleMobile();
    });
    this.handleMobile();
  },

  desroyed() {
    window.removeEventListener("resize", () => {
      this.handleMobile();
    });
  },

  methods: {
    handleMobile() {
      const mq = window.matchMedia("(max-width: 767px)");
      if (mq.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },

    onEnter(matches, filter) {
      const name = this.$route.name;
      const len = matches.length;
      if (this.isBlog) {
        if (name == "ico-cryptocurrency-blog") {
          this.$bus.$emit("search");
        } else {
          this.isClear = false;
          this.$router.push({
            name: "ico-cryptocurrency-blog"
          });
        }
      } else {
        if (len > 0) {
          if (len > 1) {
            if (name != "advanced-ico-list") {
              this.isClear = false;
              this.$router.push({
                name: "advanced-ico-list"
              });
            } else {
              this.$bus.$emit("search");
            }
          } else {
            this.isClear = false;
            this.toDetail(matches[0]);
          }
        } else {
          this.$bus.$emit("search");
        }
      }
    },

    onSelect(item) {
      this.toDetail(item);
    },

    toDetail(ico) {
      this.$router.push({
        path: `/${ico.value}-ico`
      });
    }
  }
};
</script>

<style lang="scss">
.tooltip.popover.search {
  max-width: 300px;
  right: 10px;

  .icon-group {
    .icon {
      fill: #e4eaeb;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "./style.scss";
</style>
