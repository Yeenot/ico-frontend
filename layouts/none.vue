<template>
	<div>
		<v-header>
		</v-header>
		<nuxt/>
	</div>
</template>

<script>
import VHeader from "@/components/v2/header";
export default {
  components: {
    VHeader
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
      script: [{ src: "https://www.youtube.com/iframe_api" }]
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
