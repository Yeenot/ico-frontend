<template>
  <div class="add-column">
    <div class="wrapper">
      <div class="flex-container">
        <div class="col">
          <input type="text" v-model="search" placeholder="Search"/>
          <div class="categories">
            <accordion :items="filtered.list"
                       :single="filtered.options.single"
                       :legend="false"
                       :defaultExpandAll="filtered.options.expandAll">
              <accordion-item slot-scope="{ item, index }"
                              :key="item.name"
                              :index="index"
                              info=""
                              :animation="false"
                              :open="item.open"
                              :disabled="false">
                <template slot="text">
                  {{ item.name }}
                </template>
                <template slot="content">
                  <list direction="vertical">
                    <list-item v-for="column of item.columns"
                               :key="column.name">
                      <checkbox v-model="column.selected"
                                :key="column.name"
                                :disabled="column.disabled"
                                @onChange="value => { onCheckboxChange({
                                  column,
                                  value,
                                  categoryIndex: item.index,
                                  columnIndex: column.index
                                }) }">
                        <template v-if="column.heading">
                          {{ column.heading }}
                        </template>
                        <template v-else>
                          {{ column.name }}
                        </template>
                      </checkbox>
                    </list-item>
                  </list>
                </template>
              </accordion-item>
            </accordion>
          </div>
        </div>
        <div class="col">
          <div class="selected">
            <SlickList class="slick-list selected"
                      lockAxis="y"
                      :distance="5"
                      v-model="items">
              <SlickItem class="slick-item disable-text-highlight"
                        v-for="(item, index) in items"
                        :index="index"
                        :key="index">
                <i class="fa fa-bars"></i>
                <template v-if="item.heading">
                  {{ item.heading }}
                </template>
                <template v-else>
                  {{ item.name }}
                </template>
                <i class="fa fa-times-circle-o delete"
                  v-if="!blacklist.includes(item.name)"
                  v-on:click="removeSelected(item.categoryIndex, item.columnIndex)"></i>
              </SlickItem>
            </SlickList>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <button class="reverse"
              v-on:click="change()">OK</button>
    </div>
  </div>
</template>

<script>
var Cookies = require("js-cookie");
import { SlickList, SlickItem } from "vue-slicksort";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Accordion from "@/components/v2/accordion";
import AccordionItem from "@/components/v2/accordion/item";
import Checkbox from "@/components/v2/checkbox";

export default {
  props: {
    categories: {
      default: () => [],
      type: Array
    },
    fields: {
      default: () => {},
      type: Object
    }
  },

  components: {
    SlickList,
    SlickItem,
    List,
    ListItem,
    Accordion,
    AccordionItem,
    Checkbox
  },

  data: () => ({
    items: [],
    selection: [],
    blacklist: ["project-name"],
    search: ""
  }),

  computed: {
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

    filtered() {
      const selection = this.selection;
      const search = this.search;
      const list = [];

      selection.forEach(item => {
        const columns = [];
        item.columns.forEach(column => {
          const heading = column.heading;
          const name = column.name;
          let text = heading;
          if (text == null) {
            text = name;
          }
          if (text.toLowerCase().includes(search.toLowerCase())) {
            columns.push(column);
          }
        });

        if (columns.length > 0) {
          const additional = {
            columns
          }
          list.push(Object.assign({}, item, additional));
        }
      });
      return {
        list,
        options: {
          single: search == "" ? true : false,
          expandAll: search != "" ? true : false
        }
      }
    }
  },

  mounted() {
    this.cloneCategories();
    this.setSelected();
  },

  methods: {
    cloneCategories() {
      this.selection = this.categories.map((category, categoryIndex) => {
        const columns = category.columns.map((column, columnIndex) => {
          let disabled = false;
          if (this.blacklist.includes(column.name)) {
            disabled = true;
          }
          return Object.assign({}, column, { selected: false, disabled, index: columnIndex });
        });
        return Object.assign({}, category, { columns, index: categoryIndex });
      });
    },

    setSelected() {
      const initial = this.main;
      const selected = [];

      initial.forEach(item => {
        let found = false;
        this.selection.every((category, categoryIndex) => {
          category.columns.every((column, columnIndex) => {
            if (item == column.name) {
              this.selection[categoryIndex].columns[
                columnIndex
              ].selected = true;
              selected.push(
                Object.assign({}, column, {
                  categoryIndex,
                  columnIndex
                })
              );
              found = true;
            }

            if (found) {
              return false;
            }

            return true;
          });
          if (found) {
            return false;
          }
          return true;
        });
      });

      this.items = selected;
    },

    hasColumn(name) {
      let id = -1;
      this.items.every((item, index) => {
        if (item.name == name) {
          id = index;
          return false;
        }
        return true;
      });

      return id;
    },

    onStateChanged(column) {
      const id = this.hasColumn(column.name);
      if (id > -1) {
        this.items.splice(id, 1);
      } else {
        this.items.push(column);
      }
    },

    change() {
      const list = [];
      this.items.forEach(item => {
        list.push(item.name);
      });
      this.main = list;
      Cookies.set("columns", this.main, { expires: 15 });
      this.$modal.hide("columns");
    },

    onCheckboxChange({ column, value, categoryIndex, columnIndex }) {
      const id = this.hasColumn(column.name);
      if (id > -1) {
        this.items.splice(id, 1);
      } else {
        this.items.push(
          Object.assign({}, column, { categoryIndex, columnIndex })
        );
      }
    },

    removeSelected(categoryIndex, columnIndex) {
      this.$set(
        this.selection[categoryIndex].columns[columnIndex],
        "selected",
        false
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
