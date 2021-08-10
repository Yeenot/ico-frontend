<template>
    <div class="mobile-search">
        <autocomplete :items="items"
                      :onEnter="onEnter"
                      :onSelect="onSelect">
        </autocomplete>
    </div>
</template>

<script>
import Autocomplete from "@/components/v2/autocomplete";
export default {
  components: {
    Autocomplete
  },

  props: {
    items: {
      default: () => [],
      type: Array
    },
    onEnter: {
      default: () => null,
      type: Function
    },
    onSelect: {
      default: () => null,
      type: Function
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
