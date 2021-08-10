<template>
  <div :class="classList"
       :style="style.group">
    <span class="icon"
          :style="style.icon">
      <div class="svg-wrapper"
           v-html="src"
           :style="style.svg"></div>
    </span>
    <span class="slot"
          v-if="hasSlot">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: ["name", "options"],

  data: () => ({
    style: {
      group: {},
      icon: {},
      svg: {}
    }
  }),

  mounted() {
    const style = this.style;
    const options = this.options;
    if (options != null) {
      const css = options.css;
      for (const key of Object.keys(css)) {
        const item = css[key];
        const breakpoints = item.breakpoints;
        delete item.breakpoints;

        if (breakpoints != null) {
          Object.entries(breakpoints).forEach((breakpoint, index) => {
            const current = {
              size: breakpoint[0],
              props: breakpoint[1]
            };

            if (index == 0) {
              var media = matchMedia(
                `(min-width: ${parseInt(current.size) + 1}px)`
              );
              var updateBP = mediaQueryList => {
                if (mediaQueryList.matches) {
                  style[key] = item;
                }
              };
              media.addListener(updateBP);
              updateBP(media);
            }

            let mediaString = `(max-width: ${current.size}px)`;
            const nextItem = breakpoints[index + 1];

            if (nextItem != null) {
              mediaString = `(min-width: ${nextItem[0] +
                1}px) and ${mediaString}`;
            }

            const size = breakpoint[0];
            const props = breakpoint[1];

            var media = matchMedia(mediaString);
            updateBP = mediaQueryList => {
              if (mediaQueryList.matches) {
                style[key] = current.props;
              }
            };
            media.addListener(updateBP);
            updateBP(media);
          });
        } else {
          style[key] = item;
        }
      }
    }
  },

  computed: {
    src() {
      return require(`~/assets/v2/svg/${this.name}.svg`);
    },

    classList() {
      const result = {
        "icon-group": true
      };
      result[this.name] = true;
      if (this.hasSlot) {
        result["has-slot"] = true;
      }
      return result;
    },

    hasSlot() {
      return this.$slots.default;
    }
  },

  methods: {
    getCss(name) {
      let style = {};
      const options = this.options;
      if (options) {
        const css = options.css;
        if (css) {
          let data = css[name];
          let breakpoints = null;
          if (data != null) {
            if (data.breakpoints != null) {
              breakpoints = data.breakpoints;
            }

            let media = null;
            if (breakpoints != null) {
              if (process.browser) {
                for (const key of Object.keys(breakpoints)) {
                  const obj = breakpoints[key];
                  if (window.matchMedia(`(max-width: ${key}px)`).matches) {
                    media = obj;
                  } else {
                    break;
                  }
                }
                data = Object.assign(data, media);
              }
            }
            style = Object.assign({}, style, data);
          }
        }
      }
      return style;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
