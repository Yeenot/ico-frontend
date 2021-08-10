<template>
  <div class="token-supply">

    <transition name="fade"
                mode="out-in">
      <div class="flex-container distribution"
           key="no-details"
           v-if="!showDetails">

        <supply v-for="(supply, index) of supplies"
                class="column"
                :percentages="[supply.percentage]"
                :value="supply.value"
                :unit="supply.unit"
                :colors="['#533e8b']"
                :size="design.no.size"
                :border="design.no.border"
                :href="supply.href"
                :key="index">
          {{ supply.name }}
          <div class="percentage"
               v-if="supply.is_percentage">
            {{ numberFormat(supply.percentage) }}
            <span class="symbol">%</span>
          </div>
        </supply>

        <supply class="column shares"
                :percentages="SharesPercentages"
                :value="shares.total.value"
                :unit="shares.total.unit"
                :size="design.no.size"
                :border="design.no.border"
                :href="shares.total.href"
                :colors="shares.colors">
          <div class="legend">
            <list>
              <list-item v-for="(share, index) of shares.values"
                         :key="index">
                <a class="clearfix"
                   :href="share.href">
                    <div class="name">
                      {{ share.name }}
                      <span class="color"
                          :style="{ 'background-color': shares.colors[index] }"></span>
                  </div>
                   <div class="legend-info">
                    {{ numberFormat(share.percentage) }}%
                  </div>
                </a>
              </list-item>
            </list>
          </div>
        </supply>

      </div>

      <div class="flex-container distribution with-details"
           key="has-details"
           v-else>
        <div class="col"
             v-for="(supplies, columnIndex) of ChunkedSupplies"
             :key="`col-${columnIndex}`">

          <supply v-for="(supply, index) of supplies"
                  :percentages="[supply.percentage]"
                  :value="supply.value"
                  :unit="supply.unit"
                  :colors="['#533e8b']"
                  :size="design.yes.size"
                  :border="design.yes.border"
                  :href="supply.href"
                  :key="index">
            <div class="name">
              {{ supply.name }}
            </div>
            <div class="percentage"
                 v-if="supply.is_percentage">
              <span class="value">
                <span>{{ numberFormat(supply.percentage) }}</span>
                <span class="symbol">%</span>
              </span>
            </div>
            <div class="detail">
              <template v-if="!isEmpty(supply.detail)">
                {{ supply.detail }}
              </template>
              <template v-else>
                {{ empty.detail }}
              </template>
            </div>
          </supply>
        </div>
        <div class="col">
          <supply class="shares"
                  :percentages="SharesPercentages"
                  :value="shares.total.value"
                  :unit="shares.total.unit"
                  :size="design.yes.size"
                  :border="design.yes.border"
                  :href="shares.total.href"
                  :colors="shares.colors">
            <div class="legend">
              <list>
                <list-item v-for="(share, index) of shares.values"
                           :key="index">
                  <a :href="share.href"
                     target="_blank">
                    <div class="clearfix">
                      <div class="name">
                        <div class="value"
                             :style="{ 'background-color': shares.colors[index] }">
                          {{ share.name }}
                        </div>
                      </div>
                      <div class="real-value">
                        <template v-if="!isEmpty(share.value)">
                          {{ numberFormat(share.value) }}
                        </template>
                        <template v-else>
                          <span class="empty">
                            {{ empty.value }}
                          </span>
                        </template>
                      </div>
                    </div>
                    <div class="legend-info">
                      <template v-if="share.detail">
                        {{ share.detail }}
                      </template>
                      <template v-else>
                        {{ empty.detail }}
                      </template>
                    </div>
                  </a>
                </list-item>
              </list>
              <div class="total">
                <label>Total</label><br/>
                <template v-if="!isEmptyAndTba(shares.total.detail)">
                  {{ shares.total.detail }}
                </template>
                <template v-else>
                  {{ empty.detail }}
                </template>
              </div>
            </div>
          </supply>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Supply from "./supply";

export default {
  components: {
    List,
    ListItem,
    Supply
  },

  props: {
    supplies: {
      default: [],
      type: Array
    },
    shares: {
      default: {},
      type: Object
    },
    showDetails: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    yes: {},
    no: {}
  }),

  mounted() {
    var media = matchMedia(`(max-width: 767px)`);
    var structure = mediaQueryList => {
      if (mediaQueryList.matches) {
        this.$set(this, "yes", {
          size: 118,
          border: 4
        });
        this.$set(this, "no", {
          size: 122,
          border: 4
        });
      } else {
        this.$set(this, "yes", {
          size: 128,
          border: 6
        });
        this.$set(this, "no", {
          size: 142,
          border: 6
        });
      }
    };
    media.addListener(structure);
    structure(media);
  },

  computed: {
    ChunkedSupplies() {
      const supplies = this.supplies;
      const len = supplies.length;
      const columnNum = 2;
      const chunk = Math.ceil(len / columnNum);
      const items = [];

      let ctr = 0;
      while (ctr < supplies.length) {
        items.push(supplies.slice(ctr, ctr + chunk));
        ctr += chunk;
      }
      return items;
    },

    SharesPercentages() {
      const items = this.shares.values;
      const percentages = [];
      items.forEach(item => {
        percentages.push(item.percentage);
      });
      return percentages;
    },

    empty() {
      return {
        value: this.$util.getEmpty(),
        detail: "no further comments"
      }
    },

    window() {
      return this.$store.state.all.window;
    },

    design() {
      return {
        no: this.no,
        yes: this.yes
      };
    }
  },

  methods: {
    isEmpty(obj) {
      return this.$util.isDetailEmpty(obj);
    },

    isEmptyAndTba(value) {
      return this.$util.isDetailEmpty(value) || value == "?";
    },

    numberFormat(val) {
      return this.$util.numberFormat(val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

