<template>
  <div class="accordion-item"
       :class="ItemClass"
       :id="id">
    <piece :info="info"
           :onClick="click">
      <template slot="icon">
        <slot name="icon"></slot>
      </template>
      <template slot="text">
        <slot name="text"></slot>
      </template>
      <template slot="action">
        +
      </template>
    </piece>
    <div class="content"
         v-resize="onContentResize">
      <div class="inner-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Piece from "@/components/v2/piece";
export default {
  components: {
    Piece
  },

  props: {
    id: {
      default: null
    },
    index: {
      index: null
    },
    disabled: {
      default: false,
      type: Boolean
    },
    info: {
      default: null
    },
    open: {
      default: false,
      type: Boolean
    },
    animation: {
      default: true,
      type: Boolean
    }
  },

  data: () => ({
    clicked: false,
    isMounted: true
  }),

  computed: {
    ItemClass() {
      const list = {
        open: this.open,
        disabled: this.disabled
      };
      return list;
    }
  },

  watch: {
    open(newValue) {
      this.animate();
    }
  },

  mounted() {
    this.animate();
  },

  methods: {
    click(event) {
      if (!this.disabled) {
        this.clicked= true;
        this.$parent.toggle(this.index);
      }
    },

    animate() {
      const info = this.$el.querySelector(".content");
      if (!this.isMounted) {
        if (this.animation || this.clicked) {
          info.style.transition = "max-height 0.2s ease-out"
          this.clicked = false;
        } else {
          info.style.transition = ""
        }
      } else {
        this.isMounted = false;
      }

      if (!this.open) {
        info.style.maxHeight = null;
      } else {
        info.style.maxHeight = info.scrollHeight + "px";
      }
    },

    onContentResize(e) {
      const info = this.$el.querySelector(".content");
      if (this.open) {
        info.style.maxHeight = info.scrollHeight + "px";
      }
    }
  }
};
</script>