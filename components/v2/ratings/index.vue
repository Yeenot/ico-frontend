<template>
  <div class="ratings">
    <div class="left">
      <div class="flex-container criteria">
        <div class="column"
             v-for="(criteria, index) of items"
             :key="index">
          <div class="each-wrapper"
               :style="EachWrapperStyle">
            {{ criteria.name }}
            <progress-circle :class="{ check : criteria.rating != 0 }"
                             :values="[criteria.rating]"
                             :size="size"
                             :angle="{
                                      start: (criteria.rating != 0) ? 76 : 0,
                                      end: (criteria.rating != 0) ? 393 : 360
                                    }"
                             :border="3"
                             :colors="['#533E8B']">
              <icon v-if="criteria.rating != 0"
                    name="check">
              </icon>
            </progress-circle>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="rating">
        <total-score :score="checked ? average : -1"
                     :theme="{
                          border: 1.7,
                          size: 16,
                          colors: {
                            active: '#ffffff',
                            passive: '#ffffff'
                          }
                        }"
                     :mask="{
                         has: false,
                         gradientOnEmpty: true
                       }">
          <template v-if="checked">
            ico-check.com
          </template>
          <template v-else>
            not checked
          </template>
        </total-score>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import ProgressCircle from "@/components/v2/circle/progress";
import Icon from "@/components/v2/icon";
import TotalScore from "./total";

export default {
  components: {
    List,
    ListItem,
    ProgressCircle,
    Icon,
    TotalScore
  },

  props: {
    criterias: {
      default: () => null,
      type: Array
    },
    checked: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    size: 21,
    average: 0
  }),

  computed: {
    EachWrapperStyle() {
      return {
        "padding-right": `${this.size + 10}px`,
        "min-height": `${this.size}px`
      };
    },

    items() {
      let score = 0;
      const list = [];
      if (this.criterias != null) {
        this.criterias.forEach(criteria => {
          const rating = criteria.rating * 25;
          const decimal = rating / 100;
          score += decimal;
          list.push({
            name: criteria.name,
            rating
          })
        });
      }
      this.average = score;
      return list;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

