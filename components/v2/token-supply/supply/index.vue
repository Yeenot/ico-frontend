<template>
    <div class="supply">
        <div class="supply-wrapper">
            <div class="progress-wrapper">
                <progress-circle :values="percentages"
                                 :size="size"
                                 :border="border"
                                 :colors="colors"
                                 :onClick="href != null ? onCircleClick : null">
                    <div class="value"
                         :class="valueClass(value)">
                        <div>
                            <a class="fitty"
                               :href="href">{{ numberFormat(value) }}</a>
                        </div>
                        <span class="unit"
                              v-if="!isEmpty(value) && !isTba(value)">{{ unit }}</span>
                    </div>
                </progress-circle>
            </div>
            <div class="info-wrapper">
                <div class="info">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ProgressCircle from "@/components/v2/circle/progress";
import fitty from "fitty";

export default {
  components: {
    ProgressCircle
  },

  props: ["percentages", "value", "unit", "colors", "size", "border", "href"],
  mounted() {
    fitty(".fitty", {
      minSize: 12,
      maxSize: 18
    });
  },

  methods: {
    valueClass(val) {
      return {
        empty: this.isTba(val) || this.isEmpty(val)
      };
    },

    numberFormat(val) {
      let value = this.$util.getEmpty();
      if (!this.isEmpty(val)) {
        if (!this.isTba(val)) {
          value = this.$util.numberFormat(val);
        } else {
          value = val;
        }
      }
      return value;
    },

    isEmpty(val) {
      return this.$util.isDetailEmpty(val);
    },

    isTba(val) {
      return this.$util.isTba(val);
    },

    isEmptyAndTba(value) {
      return this.isEmpty(value) || this.isTba(value);
    },

    onCircleClick() {
      if (this.href) {
        window.open(this.href, "_blank");
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./style.scss";
</style>
