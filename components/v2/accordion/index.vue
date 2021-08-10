<template>
  <div class="accordion">
    <accordion-legend v-if="!single && legend"
                      v-on:collapse="toggle(-2)"
                      v-on:expand="toggle(-1)"></accordion-legend>
    <div class="list">
      <slot v-for="(item, index) of list"
            :index="index"
            :item="item"></slot>
    </div>
    <accordion-legend v-if="!single && legend"
                      v-on:collapse="toggle(-2)"
                      v-on:expand="toggle(-1)"></accordion-legend>
  </div>
</template>

<script>
import AccordionLegend from "@/components/v2/accordion/legend";
export default {
  components: {
    AccordionLegend
  },

  props: {
    selected: {
      default: () => [],
      type: Array
    },
    items: {
      default: () => [],
      type: Array
    },
    single: {
      default: false,
      type: Boolean
    },
    legend: {
      default: true,
      type: Boolean
    },
    defaultExpandAll: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    realSelected: [],
    list: []
  }),

  mounted() {
    this.init();
  },

  watch: {
    selected(items) {
      this.assignSelected(items);
      this.getList();
    },

    items(value) {
      this.init();
    }
  },

  methods: {
    init() {
      if (!this.defaultExpandAll) {
        this.toggle(-2);
      } else {
        this.toggle(-1);
      }
    },

    getList() {
      const items = [];
      const selected = this.realSelected;
      this.items.every((item, id) => {
        let open = false;
        if (selected.includes(id)) {
          open = true;
        }
        const obj = Object.assign({}, item, {
          open
        });
        items.push(obj);
        return true;
      });
      this.list = items;
    },

    assignSelected(items) {
      if (items.length > 0) {
        this.realSelected = items;
      }
    },

    toggle(index) {
      let selected = [];
      if (index >= 0) {
        //individual
        if (!this.single) {
          this.realSelected.every(item => {
            selected.push(item);
            return true;
          });
        }
        if (this.realSelected.includes(index)) {
          const pos = selected.indexOf(index);
          if (pos > -1) {
            selected.splice(pos, 1);
          }
        } else {
          selected.push(index);
        }
      } else {
        if (index == -1) {
          this.items.every((item, id) => {
            if (!item.disabled) {
              selected.push(id);
            }
            return true;
          });
        }
      }
      this.$set(this, "realSelected", selected);
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
