<template>
  <div class="icos">
    <my-table ref="icos"
              :fixed="true"
              @loaded="handleTable()"
              @onScrollMove="onScrollMove"
              @onScrollEnd="onScrollEnd">
      <template slot="thead">
        <tr class="original-head">
          <th v-for="(field, index) of headers"
              :key="index"
              v-on:click="onSort(field.name)">
            {{ field.heading }}
            <i class="fa sort"
               :class="getSortIcon(field.name)"></i>
            <template v-if="settings.remove">
              <i class="fa fa-times-circle-o delete"
                 v-if="field.name != 'project-name' && field.name != 'countdown'"
                 v-on:click="removeColumn(field.name)"></i>
            </template>
          </th>
        </tr>
      </template>
      <template slot="clone">
        <tr>
          <th v-for="(field, index) of headers"
              :key="index"
              v-on:click="onSort(field.name)">
            {{ field.heading }}
            <i class="fa sort"
               :class="getSortIcon(field.name)"></i>
            <template v-if="settings.remove">
              <i class="fa fa-times-circle-o delete"
                 v-if="field.name != 'project-name' && field.name != 'countdown'"
                 v-on:click="removeColumn(field.name)"></i>
            </template>
          </th>
        </tr>
      </template>
      <template slot="tbody">
        <template v-for="(ico, index) in icos">
          <tr class="spacer"
              v-if="index > 0"
              :key="`spacer-${index}`">
            <td>
            </td>
          </tr>
          <tr :key="`tr-${index}`"
              :class="{ 'favourite': ico.is_sponsored }"
              v-on:click="onClick($event, ico.name)">
            <td v-for="(field, index) of headers"
                :class="{ 'name': field.name == 'project-name'}"
                :key="index">
              <div class="ribbon"
                   v-if="field.name == 'project-name'">
                <a href="#">ICO CHECK'S FAVOURITE</a>
              </div>
              <div class="field"
                   :class="{ 'name': field.name == 'project-name'}">
                <div class="column-label"
                     v-if="field.name != 'project-name' && field.name != 'countdown'">
                  {{ field.heading }}
                </div>
                <div class="column-value"
                     :class="{ 'has-label': field.name != 'project-name' }">
                  <template v-if="field.name == 'project-name'">
                    <img class="ico-logo"
                         :src="getSmallImage(ico)"
                         :alt="`${getProperty(ico, field)} Logo`" />
                  </template>
                  <div class="value">
                    <template v-if="isEmptyAndTba(getProperty(ico, field)) || (field.type != 'url' || field.name == 'project-name')">
                      <template v-if="field.name == 'countdown'">
                        <slot name="countdown"
                              :ico="ico" />
                      </template>
                      <template v-else>
                        <template v-if="!isEmpty(getProperty(ico, field))">
                          {{ getProperty(ico, field) }}
                          {{ ico.is_sponsored }}
                        </template>
                        <template v-else>
                          -
                        </template>
                      </template>
                    </template>
                    <template v-else>
                      <a :href="getProperty(ico, field)"
                         target="_blank"
                         v-if="!isEmpty(getProperty(ico, field))">
                        LINK
                      </a>
                      <template v-else>
                        -
                      </template>
                    </template>
                    <template v-if="!isEmptyAndTba(getProperty(ico, field)) && !isEmptyAndTba(hasUnit(ico, field.name))">
                      {{ hasUnit(ico, field.name) }}
                    </template>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </template>
    </my-table>
    <pagination v-if="settings.pagination"
                :options="options"
                @go="goToPage"></pagination>
  </div>
</template>

<script>
import MyTable from "~/components/v2/my-table";
import Pagination from "@/components/v2/pagination";
export default {
  components: {
    MyTable,
    Pagination
  },

  props: {
    headers: {
      default: () => [],
      type: Array
    },
    icos: {
      default: () => [],
      type: Array
    },
    options: {
      default: () => ({}),
      type: Object
    },
    settings: {
      default: () => ({
        sort: false,
        remove: false,
        pagination: false
      }),
      type: Object
    },
    sort: {
      default: () => ({
        by: false,
        order: false
      }),
      type: Object
    }
  },

  data: () => ({
    clickable: true
  }),

  computed: {
    units() {
      return this.$store.state.v2Icos.units;
    }
  },

  methods: {
    handleTable() {
      const first = 170;
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

    goToPage(page) {
      if (page > 0 && page <= this.options.last) {
        this.$emit("goToPage", page);
      }
    },

    removeColumn(name) {
      if (this.clickable) {
        this.$emit("removeColumn", name);
      }
    },

    onScrollMove({ clickable, data }) {
      this.clickable = clickable;
    },

    onScrollEnd() {
      this.clickable = true;
    },

    onClick(event, slug) {
      if (this.clickable) {
        if (event.target.tagName != "A") {
          event.preventDefault();
          if (event.ctrlKey) {
            window.open(window.location.origin + `/${slug}-ico`, "_blank");
            return;
          }
          this.$router.push({ path: `/${slug}-ico` });
        }
      }
    },

    onSort(name) {
      if (this.settings.sort && this.clickable) {
        this.$emit("onSort", name);
      }
    },

    getSortIcon(name) {
      return {
        "fa-caret-up": name == this.sort.by && this.sort.order == "desc",
        "fa-caret-down": name == this.sort.by && this.sort.order == "asc"
      };
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
