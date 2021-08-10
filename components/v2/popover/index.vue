<template>
    <div class="popover"
         :class="PopoverClass">
        <slot/>
        <div class="inner">
            <div class="content">
                <slot name="popover" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    open: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },

  computed: {
    PopoverClass() {
      const list = {
        disabled: this.disabled
      };

      if (!this.disabled) {
        list["open"] = this.open;
      }
      return list;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
