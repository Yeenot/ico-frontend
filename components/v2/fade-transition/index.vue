<template>
  <component :is="type"
             :tag="tag"
             style="position: relative"
             mode="out-in"
             enter-active-class="fadeIn"
             leave-active-class="fadeOut"
             v-bind="$attrs"
             v-on="hooks">
    <slot></slot>
  </component>
</template>
<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 300
    },
    group: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  computed: {
    type() {
      return this.group ? "transition-group" : "transition";
    },
    hooks() {
      return {
        beforeEnter: this.beforeEnter,
        afterEnter: this.cleanUpDuration,
        beforeLeave: this.beforeLeave,
        afterLeave: this.afterLeave,
        leave: this.leave,
        ...this.$listeners
      };
    }
  },
  methods: {
    beforeEnter(el) {
      if (this.group) {
      }
      this.setDuration(el);
    },
    beforeLeave(el) {
      this.setAbsolutePosition(el);
      this.setDuration(el);
    },
    leave() {},
    afterLeave(el) {
      if (this.group) {
        el.style.position = "";
      }
      this.cleanUpDuration(el);
    },
    setDuration(el) {
      el.style.animationDuration = `${this.duration}ms`;
    },
    cleanUpDuration(el) {
      el.style.animationDuration = "";
    },
    setAbsolutePosition(el) {
      if (this.group) {
        el.style.position = "absolute";
        const parent = el.parentNode;
        var style = parent.currentStyle || window.getComputedStyle(parent);
        el.style.top = style.paddingTop;
      }
    }
  }
};
</script>
<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeIn {
  animation-name: fadeIn;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fadeOut {
  animation-name: fadeOut;
}
.fade-move {
  transition: transform 0.3s ease-out;
}
</style>