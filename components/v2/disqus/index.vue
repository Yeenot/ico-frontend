<template>
    <div class="comments">
        <vue-disqus ref="disqus"
                    :shortname="name"
                    :title="title"
                    :identifier="identifier"
                    @onChanged="reset"
                    language="en"></vue-disqus>
    </div>
</template>

<script>
// import VueDisqus from "vue-disqus/dist/vue-disqus.vue";
import VueDisqus from "@/components/v2/vue-disqus";

export default {
  components: {
    VueDisqus
  },

  props: {
    identifier: {
      default: null,
      type: String
    },

    name: {
      default: null,
      type: String
    },

    title: {
      default: null,
      type: String
    }
  },

  mounted() {
  },

  methods: {
    reset() {
      this.$refs.disqus.reset(window.DISQUS);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
