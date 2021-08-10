<template>
  <div class="menu-container"
       :class="{ 'open': open }">
    <div class="media group-list clearfix">
      <list direction="horizontal">
        <list-item v-for="(media, index) of media.list"
                   :key="index">
          <a :href="media.href">
            <icon :name="media.icon">
            </icon>
          </a>
        </list-item>
      </list>
    </div>
    <div class="menu group-list clearfix">
      <list direction="horizontal">
        <list-item v-for="(menu, index) of menuItems"
                   :key="index">
          <div class="item"
            :class="getItemClass(index)"
            v-on:mouseenter="mouseOver(index)"
            v-on:mouseleave="mouseOut(index)">
            <a class="disable-text-highlighting" v-on:click="onClick(index)" 
                   v-if="menu.list != null && menu.list.length > 0">
              {{ menu.text }}
              <div class="icon-wrapper">
                <icon name="chevron-arrow-down"></icon>
              </div>
            </a>
            <nuxt-link v-else
              class="disable-text-highlighting"
              :to="{ path: menu.href}">
              {{ menu.text }}
            </nuxt-link>
            <vue-slide-up-down class="inner"
                               v-if="menu.list != null && menu.list.length > 0"
                               :duration="300"
                               :active="menuItems[index].open">
              <list direction="vertical">
                <list-item v-for="(item, index) of menu.list"
                           :key="index">
                  <div class="item">
                    <nuxt-link class="disable-text-highlighting"
                      :to="{ path: item.href }">
                      {{ item.text }}
                    </nuxt-link>
                  </div>
                </list-item>
              </list>
            </vue-slide-up-down>
          </div>
        </list-item>
      </list>
    </div>
    <div class="symbol"
         v-on:click="toggleMenu()">
      <div class="action"
           v-if="open">
        <icon name="close"></icon>
      </div>
      <template v-else>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </template>
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
      default: [],
      type: Array
    }
  },

  data: () => ({
    open: false,
    media: {
      list: [
        {
          href: "https://www.facebook.com/icocheck/",
          icon: "facebook"
        },
        {
          href: "https://twitter.com/ico_check?lang=en",
          icon: "twitter"
        },
        {
          href: "https://t.me/ico_check",
          icon: "telegram"
        }
      ]
    },
    menuItems: [],
    isMobile: false
  }),

  watch: {
    items(list) {
      this.reMap(list);
    }
  },

  mounted() {
    this.reMap(this.items);
    this.load();
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  watch: {
    open(value) {
      if (value) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    },

    $route(value, oldValue) {
      this.open = false;
      this.reMap(this.items);
    }
  },

  methods: {
    load() {
      this.checkViewType();
    },

    checkViewType() {
      if (window.matchMedia("(max-width: 767px)").matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },

    reMap(items) {
      this.menuItems = [];
      items.forEach(item => {
        this.menuItems.push(Object.assign({}, item, { open: false }));
      });
    },

    handleResize() {
      this.open = false;
      this.reMap(this.items);
      this.checkViewType();
    },

    toggleMenu() {
      this.open = !this.open;
    },

    disableScroll() {
      document.documentElement.style.overflow = "hidden"; // firefox, chrome
      document.body.scroll = "no"; // ie only
    },

    enableScroll() {
      document.documentElement.style.overflow = "auto"; // firefox, chrome
      document.body.scroll = "yes"; // ie only
    },

    mouseOver(index) {
      if (!this.isMobile) {
        this.menuItems[index].open = true;
      }
    },

    mouseOut(index) {
      if (!this.isMobile) {
        this.menuItems[index].open = false;
      }
    },

    getItemClass(index) {
      return {
        open: this.menuItems[index].open
      };
    },

    onClick(index) {
      if (this.isMobile) {
        this.menuItems[index].open = !this.menuItems[index].open;
      }
    },

    animate() {
      const info = this.$el.querySelector(".content");
      if (!this.open) {
        info.style.maxHeight = null;
      } else {
        info.style.maxHeight = info.scrollHeight + "px";
      }
    },

    onContentResize(e) {
      const info = this.$el.querySelector(".content");
      if (this.open) {
        info.style.maxHeight = info.scrollHeight + "px";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
