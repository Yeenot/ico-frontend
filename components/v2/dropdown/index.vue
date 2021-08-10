<template>
  <div class="dropdown"
       v-click-outside="outside">
    <button v-on:click="onClick()">
      <template v-if="!isEmpty && selected != -1">
        {{ items[selected].label }}
      </template>
      <template v-else>SELECT</template>
      <icon name="chevron-arrow-down"
            :class="{ 'rotate': show }"></icon>
    </button>
    <div class="dropdown-menu"
         :class="{ 'show': show }">
      <list v-if="!isEmpty"
            direction="vertical">
        <list-item v-for="(item, index) of items"
                   :key="index">
          <div class="item"
               v-on:click="onSelected(index)">
            {{ item.label }}
          </div>
        </list-item>
      </list>
    </div>
  </div>
</template>

<script>
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Icon from "@/components/v2/icon";

export default {
  components: {
    List,
    ListItem,
    Icon
  },

  props: {
    items: {
      default: () => [],
      type: Array
    },
    default: {
      default: 0,
      type: Number
    }
  },

  data: () => ({
    show: false,
    selected: 0
  }),

  watch: {
    selected(value) {
      this.$emit("change", this.items[value]);
    }
  },

  mounted() {
    this.selected = this.default;
  },

  computed: {
    isEmpty() {
      return !(this.items && this.items.length);
    }
  },

  methods: {
    onClick() {
      this.show = !this.show;
    },

    onSelected(index) {
      this.show = false;
      this.selected = index;
    },

    outside() {
      this.show = false;
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
