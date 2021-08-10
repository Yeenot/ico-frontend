<template>
  <div class="autocomplete"
       v-click-outside="outside">
    <div class="input-group">
      <input type="text"
             v-model="search"
             @keyup="onKeyup($event)"
             :placeholder="placeholder" />
      <div class="addon">
        <list direction="horizontal">
          <list-item v-if="search != ''">
            <div v-on:click="emptySearch()">
              <icon name="close"></icon>
            </div>
          </list-item>
          <list-item>
            <div v-on:click="goSearch()">
              <icon name="search"></icon>
            </div>
          </list-item>
        </list>
      </div>
    </div>
    <list class="results"
          v-if="show">
      <list-item v-for="(item, index) in matches"
                 :key="index">
        <div class="item"
             v-on:click="onSelectItem(item)">
          {{ item.label }}
        </div>
      </list-item>
    </list>
  </div>
</template>

<script>
import Icon from "@/components/v2/icon/";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";

export default {
  components: {
    Icon,
    List,
    ListItem
  },
  props: {
    items: {
      default: () => [],
      type: Array
    },
    onEnter: {
      default: () => null,
      type: Function
    },
    onSelect: {
      default: () => null,
      type: Function
    },
    placeholder: {
      default: "",
      type: String
    }
  },

  data: () => ({
    selecting: false,
    hide: false
  }),

  watch: {
    $route(value, oldValue) {
      if (this.isClear) {
        this.search = "";
      } else {
        this.isClear = true;
      }
    },

    search(value) {
      if (value != "") {
        if (this.selecting) {
          this.selecting = false;
          this.hide = true;
        } else {
          if (this.hide) {
            this.hide = false;
          }
        }
      }
    }
  },

  computed: {
    search: {
      get() {
        return this.$store.state.all.search;
      },

      set(value) {
        this.$store.commit("SEARCH", value);
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

    show() {
      let status = false;
      if (this.hasMatches) {
        if (!this.hide) {
          status = true;
        }
      }
      return status;
    },
    hasMatches() {
      return this.matches && this.matches.length > 0;
    },

    matches() {
      const routeName = this.$route.name;
      const items = this.items;
      const search = this.search.toLowerCase().trim();
      const list = [];
      if (
        search != "" &&
        routeName != null &&
        routeName != this.blogRouteName
      ) {
        items.every((item, index) => {
          if (item.label.includes(search)) {
            list.push(item);
          }
          if (list.length >= 10) {
            return false;
          }
          return true;
        });
      }
      return list;
    }
  },

  methods: {
    onSelectItem(item) {
      this.selecting = true;
      if (this.onSelect != null) {
        this.hide = true;
        this.onSelect(item);
      }
    },

    onKeyup(event) {
      const keycode = event.keyCode;
      if (keycode == 13) {
        this.goSearch();
      }
    },

    outside() {
      this.hide = true;
    },

    goSearch() {
      this.hide = true;
      if (this.onEnter) {
        this.onEnter(this.matches, this.search);
      }
    },

    emptySearch() {
      this.search = "";
      this.goSearch();
    }
  },

  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          console.warn(warn);
        }
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        document.addEventListener("click", handler);
      },

      unbind: function(el, binding) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
