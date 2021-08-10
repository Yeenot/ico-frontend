<template>
  <div class="total-score"
       :class="{'empty': !hasScore}">
    <div class="text"
         :style="ListStyle">{{ formattedScore }}</div>
    <div class="info">
      <div class="checkmarks">
        <list class="mask"
              v-if="hasScore && mask.has"
              direction="horizontal"
              :style="ListStyle">
          <list-item v-for="(n, index) in 5"
                     :key="index">
            <progress-circle :values="values"
                             :size="circle.size"
                             :angle="angle"
                             :border="circle.border"
                             :colors="['#d3d9da']">
              <icon name="check2"
                    v-if="hasScore">
              </icon>
            </progress-circle>
          </list-item>
        </list>
        <list direction="horizontal"
              ref="check-lists"
              :class="{'has-gradient': !hasScore && mask.gradientOnEmpty }"
              :style="ListStyle">
          <list-item v-for="(n, index) in 5"
                     :key="index">
            <progress-circle :values="values"
                             :size="circle.size"
                             :angle="angle"
                             :border="circle.border"
                             :emptyColor="theme.colors.passive"
                             :colors="[theme.colors.active]">
              <icon name="check2"
                    v-if="hasScore">
              </icon>
            </progress-circle>
          </list-item>
        </list>
      </div>
      <span class="label"
            v-if="$slots">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import ProgressCircle from "@/components/v2/circle/progress";
import Icon from "@/components/v2/icon";

export default {
  components: {
    List,
    ListItem,
    ProgressCircle,
    Icon
  },

  props: {
    score: {
      default: null,
      type: Number
    },

    theme: {
      default: () => ({
        border: 2,
        size: 16,
        colors: {
          active: "#533e8b",
          passive: "#e2e5e6"
        }
      }),
      type: Object
    },
    mask: {
      default: () => ({
        has: true,
        gradientOnEmpty: false
      }),
      type: Object
    }
  },

  data: () => ({
    distance: 0
  }),

  mounted() {
    this.adjustDistance();
    window.addEventListener("resize", this.adjustDistance);
  },

  destroyed() {
    window.removeEventListener("resize", this.adjustDistance);
  },

  computed: {
    window() {
      return this.$store.state.all.window;
    },

    circle() {
      const window = this.window;
      const theme = this.theme;
      let size = theme.size;
      let border = theme.border;

      if (window.width <= 479) {
        size = 14;
        border = 1.7;

        if (theme.colors.active == "#ffffff") {
          border = 1.5;
        }
      }

      return {
        size,
        border
      };
    },

    ListStyle() {
      const style = {};
      style["padding-top"] = `${this.distance}px`;
      return style;
    },

    formattedScore() {
      let value = "N/C";
      const score = this.score;
      if (score > -1) {
        value = score.toFixed(1);
      }
      return value;
    },

    hasScore() {
      return this.score > -1;
    },

    values() {
      return [this.hasScore ? 100 : 0];
    },

    angle() {
      const hasScore = this.hasScore;
      return {
        start: hasScore ? 76 : 0,
        end: hasScore ? 393 : 360
      };
    },

    colors() {
      const colors = this.theme.colors;
      return [this.hasScore ? colors.active : colors.passive];
    }
  },

  methods: {
    adjustDistance() {
      const first = this.$refs["check-lists"].$children[0];
      const circle = first.$el.querySelector(".progress.circle");
      const content = first.$el.querySelector(".content");
      const icon = first.$el.querySelector(".icon-group");
      if (icon) {
        const translate = this.$util.getComputedTranslateXY(icon);
        const marginTop = content.offsetTop;
        const translateY = translate[1] * -1;
        if (translateY > marginTop) {
          this.distance = translateY - marginTop;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
