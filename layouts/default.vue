<template>
  <div>
    <v-header>
    </v-header>
    <nuxt />
    <v-footer>
    </v-footer>
  </div>
</template>

<script>
import VHeader from "@/components/v2/header";
import VFooter from "@/components/v2/footer";
export default {
  components: {
    VHeader,
    VFooter
  },

  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800"
        },
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        }
      ],
      script: [
        { src: "https://www.youtube.com/iframe_api" }
        // { src: "/js/many-chat.js" }
      ]
    };
  },

  data: () => ({}),

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.getWindowSize();
      });
    });

    window.addEventListener("load", () => {
      this.getWindowSize();
    });
  },

  methods: {
    getWindowSize() {
      this.$store.commit(`WINDOW`, {
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }
};
</script>

<style>
@import "normalize.css/normalize.css";
</style>
<style lang="scss">
@import "assets/v2/scss/main.scss";
</style>
