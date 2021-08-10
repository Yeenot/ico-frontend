<template>
  <div class="my-table">
    <div class="viewport">
      <div class="wrapper">
        <div class="clone-wrapper"
             style="display: none;">
          <table class="table clone-table">
            <thead>
              <slot name="clone" />
            </thead>
          </table>
        </div>
        <table class="table data-table">
          <thead>
            <slot name="thead" />
          </thead>
          <tbody>
            <slot name="tbody" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollBooster from "scrollbooster";
export default {
  props: {
    options: {
      default: () => {},
      type: Object
    },
    fixed: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    clone: {
      show: false
    },
    sb: null,
    clickable: true
  }),

  mounted() {
    this.createBooster();
    if (this.fixed) {
      this.createBooster();
      this.prepareFixedHeaders();
    }
  },

  updated() {
    this.createBooster();
    if (this.fixed) {
      this.cloneHeader();
      this.load();
      this.$emit("loaded");
    }
  },

  destroyed() {
    if (this.fixed) {
      if (this.sb != null) {
        this.sb.destroy();
      }
      this.unprepareFixedHeaders();
    }
  },

  methods: {
    createBooster() {
      if (this.sb != null) {
        this.sb.destroy();
      }
      let viewport = this.$el.querySelector(".viewport");
      let content = viewport.querySelector(".wrapper");
      this.sb = new ScrollBooster({
        viewport,
        mode: "x",
        onUpdate: data => {
          this.$emit("onScrollMove", { clickable: this.clickable, data });
          viewport.scrollLeft = data.position.x;
          this.onScrollMove(data);
          this.tableScroll();
        },
        onClick: (data, event) => {
          if (event.target.tagName == "A") {
            if (!this.clickable) {
              event.preventDefault();
            }
          }
        }
      });
      const x = viewport.scrollLeft;
      this.sb.updateMetrics();
      this.sb.setPosition({
        x
      });
    },

    onScrollMove(data) {
      const offset = data.dragOffsetPosition;
      if (Math.abs(offset.x) > 10) {
        this.clickable = false;
        if (!data.isDragging) {
          this.clickable = true;
        }
      }
    },

    cloneHeader() {
      this.updateClone();
    },

    prepareFixedHeaders() {
      this.cloneHeader();
      this.load();
      window.addEventListener("scroll", this.scroll);
      window.addEventListener("resize", this.resize);
      // viewport.addEventListener("scroll", this.tableScroll);
    },

    unprepareFixedHeaders() {
      window.removeEventListener("scroll", this.scroll);
      window.removeEventListener("resize", this.resize);
      // viewport.removeEventListener("scroll", this.tableScroll);
    },

    load() {
      this.scroll();
      this.$emit("loaded");
    },

    resize() {
      this.updateClone();
      this.scroll();
    },

    updateClone() {
      let viewport = this.$el.querySelector(".viewport");
      var clone = {
        table: viewport.querySelector("table.table.clone-table")
      };
      var real = {
        table: viewport.querySelector("table.table.data-table")
      };
      const wrapper = viewport.querySelector(".clone-wrapper");
      if (clone.table) {
        clone.th = clone.table.childNodes[0].childNodes[0].childNodes;
      }
      if (real.table) {
        real.th = real.table.childNodes[0].childNodes[0].childNodes;
      }

      var ctr = 0;
      while (ctr < real.th.length) {
        clone.th[ctr].style.width = `${real.th[ctr].clientWidth}px`;
        clone.th[ctr].style.height = `${real.th[ctr].clientHeight}px`;
        ctr++;
      }

      wrapper.style.width = `${viewport.clientWidth}px`;
    },

    tableScroll() {
      let viewport = this.$el.querySelector(".viewport");
      const wrapper = viewport.querySelector(".clone-wrapper");
      wrapper.scrollLeft = viewport.scrollLeft;
    },

    scroll() {
      let viewport = this.$el.querySelector(".viewport");
      var cloneWrapper = viewport.querySelector(".clone-wrapper");
      var clone = {
        table: viewport.querySelector("table.table.clone-table")
      };
      var real = {
        table: viewport.querySelector("table.table.data-table")
      };
      var viewportOffset = real.table.getBoundingClientRect();
      var top = viewportOffset.top;
      var bottom = top + real.table.clientHeight;
      bottom = bottom - clone.table.clientHeight;

      if (top <= 0) {
        cloneWrapper.style.display = "";

        if (bottom <= 0) {
          cloneWrapper.style.top = `${bottom}px`;
        } else {
          cloneWrapper.style.top = "0";
        }
      } else {
        cloneWrapper.style.display = "none";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

