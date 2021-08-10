<template>
  <div class="feed">
    <div class="box"
         v-on:mouseover="onMouseOver"
         v-on:mouseleave="onMouseLeave"
         v-if="open">
      <div class="header">
        <i class="fa fa-minus exit"
           v-on:click="hide()"></i>
        {{ type }}
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
    <button v-on:click="show()"
            v-if="!open">
      <icon :name="type" />
      <span class="text">
        {{ type }} Feed
      </span>
    </button>
  </div>
</template>

<script>
import Icon from "@/components/v2/icon";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";

export default {
  components: {
    Icon,
    List,
    ListItem
  },
  props: ["type", "open"],

  watch: {
    open(value) {
      this.toggleListener(value);
    }
  },

  data: () => ({
    feed: []
  }),

  mounted() {
    this.onBrowser();
  },

  destroy() {
    this.toggleListener(false);
  },

  methods: {
    toggleListener(open) {
      const parent = this;
      var el = this.$el;

      function listen() {
        if (el) {
          var box = el.querySelector(".content");
          if (box != null) {
            if (open) {
              box.addEventListener("mousewheel", function(e) {
                parent.listener(this, e);
              });
            } else {
              box.removeEventListener("mousewheel", function(e) {
                parent.listener(this, e);
              });
            }
          }
        }
      }

      if (open) {
        this.$nextTick(() => {
          listen();
        });
      } else {
        listen();
      }
    },

    removeListener() {
      const parent = this;
      var el = this.$el;
      box.removeEventListener("mousewheel", function(e) {
        parent.listener(this, e);
      });
    },

    listener(obj, e) {
      obj.scrollTop += e.deltaY;
      e.preventDefault();
    },

    onBrowser() {
      // if (window.matchMedia("(min-width: 768px)").matches) {
      //   this.open = true;
      // }
    },

    onMouseOver() {},

    onMouseLeave() {},

    show() {
      this.$emit("onStateChanged", true);
    },

    hide() {
      this.onMouseLeave();
      this.$emit("onStateChanged", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
