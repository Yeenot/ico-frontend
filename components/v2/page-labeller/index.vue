<template>
  <div class="page-labeller">
    <photo-swipe ref="photoswipe" :items="items"></photo-swipe>
    <div class="content">
      <div class="scrollbar"
          ref="scrollbar">
        <div class="scroll"
          v-dragscroll
          v-on:dragscrollstart="onScrollStart()"
          v-on:dragscrollmove="onScrollMove($event)"
          v-on:dragscrollend="onScrollEnd()"
          ref="scroll">
            <div class="bar" ref="bar"></div>
          </div>
      </div>

      <div class="scrollable"
           ref="scrollable"
            @scroll="handleScroll($event)">
        <div id="page-screenshot" class="scroll-content">
            <img ref="img" class="preview-img-item" src="/v2/images/detailed-profile-page.jpg" @click="onItemClick(0)" alt="ICO Detailed Page" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressCircle from "@/components/v2/circle/progress";
import Icon from "@/components/v2/icon";
import ScrollBooster from 'scrollbooster';
import PhotoSwipe from "~/components/v2/photoswipe";

export default {
  components: {
    ProgressCircle,
    Icon,
    PhotoSwipe
  },
  props: {
    locations: {
      default: () => [
        {
          x: "10%",
          y: "9.17%",
          note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
          x: "50.32%",
          y: "9.8%",
          note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
          x: "15.11%",
          y: "18.80%",
          note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
          x: "84.20%",
          y: "19%",
          note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        }
      ],
      type: Array
    }
  },

  data: () => ({
    scroll: {
      top: 0,
      height: 0
    },
    sb: null,
    isManual: false
  }),

  mounted() {
    this.scrollHeight();
    window.addEventListener("resize", this.resize)

    const el = this.$el.querySelector('#page-screenshot')
        // const el = this.$refs.lightgallery
        // const el = this.$refs.lightgallery
        // const el = this.$el
        // console.log(this.$Lightgallery(el))
  },

  updated() {
    this.scrollHeight(true);
  },

  beforeDestroy() {
    const image = this.$refs["img"];

    if (image.addEventListener) {
      image.removeEventListener('load', this.onImageLoad);
    } else {
      // it's IE!
      image.detachEvent('onload', this.onImageLoad)
    }
},

  destroyed() {
    if (this.sb != null) {
      this.sb.destroy();
    }
    window.removeEventListener("resize", this.resize)
  },

  computed: {
    ScrollStyle() {
      const top = this.scroll.top;
      const height = this.scroll.height;
      return {
        // top: `${top}px`,
        // height: `${height}px`
      };
    },

    items() {
      return [{
        src: "/v2/images/detailed-profile-page.jpg",
        w: 0,
        h: 0
      }];
    }
  },

  methods: {

    onItemClick(index) {
      this.$refs["photoswipe"].open(index);
    },

    resize() {
      this.scrollHeight(true);
    },

    scrollHeight(update = false) {
      const image = this.$refs["img"];

      if (!update) {
        if (image.addEventListener) {
          image.addEventListener('load', this.onImageLoad);
        } else {
          // it's IE!
          image.attachEvent('onload', this.onImageLoad)
        }
      } else {
        this.onImageLoad();
      }
    },

    onImageLoad() {
      const viewport = this.$el.querySelector(".scrollable");
      const content = viewport.querySelector(".scroll-content");
      const scrollbar = this.$refs["scrollbar"];
      const bar = this.$refs["bar"];

      let height = viewport.offsetHeight;
      if (content.offsetHeight > viewport.offsetHeight) {
        height = content.offsetHeight;
      }

      const percentage = viewport.offsetHeight / height;
      bar.style.height =  `${scrollbar.offsetHeight * percentage}px`;
    },

    getStyle(item) {
      return {
        top: item.y,
        left: item.x
      };
    },

    handleScroll(e) {
      if (!this.isManual) {
        const viewport = e.target;
        const content = viewport.querySelector(".scroll-content");
        const scrollbar = this.$refs["scrollbar"];
        const scroll = this.$refs["scroll"];
        
        //get larger height
        let height = viewport.offsetHeight;
        if (content.offsetHeight > viewport.offsetHeight) {
          height = content.offsetHeight;
        }

        const top = viewport.scrollTop;
        const scrollValue = this.getScroll(top, height, scrollbar.offsetHeight);
        scroll.style.top =  `${scrollValue}px`;
      }
    },

    onScrollStart() {
      this.isManual = true
    },

    onScrollEnd() {
      this.isManual = false
    },

    onScrollMove(event) {
      let viewport = this.$el.querySelector(".scrollable");
      let content = viewport.querySelector(".scroll-content");
      const scrollbar = this.$refs["scrollbar"];
      const scroll = this.$refs["scroll"];
      const bar = this.$refs["bar"];

      let position = scroll.offsetTop + (event.detail.deltaY * -1);
      const end = scrollbar.offsetHeight - bar.offsetHeight;
      if (position < 0) {
        position = 0;
      } else if (position > end) {
        position = end;
      }
      scroll.style.top = `${position}px`;

      //get larger height
      let height = viewport.offsetHeight;
      if (content.offsetHeight > viewport.offsetHeight) {
        height = content.offsetHeight;
      }

      const top = scroll.offsetTop;
      const scrollValue = this.getScroll(scroll.offsetTop, scrollbar.offsetHeight, height);
      viewport.scrollTop = scrollValue;
    },

    getScroll(top, height, toHeight) {
      let percentage = top / height;
      return toHeight * percentage;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
