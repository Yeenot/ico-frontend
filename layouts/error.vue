<template>
  <div id="error">
    <div class="outer-grid">
      <div class="content-grid">
        <h1>404</h1>
        <div v-if="error.statusCode === 404">
          <p>We couldn't find the page you're looking for.</p>
        </div>
        <div v-else>
          <p>The project that you're looking for can't be found.</p>
        </div>
        <nuxt-link class="link"
                   to="/">
          <i class="fa fa-long-arrow-left"></i>Home page</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "none",
  props: ["error"],

  head() {
    return {
      title: "404 Page Not Found | ICO CHECK"
    };
  }
};
</script>

<style lang="scss" scoped>
#error {
  font-size: 18px;
  text-align: center;
  margin-top: 50px;

  h1 {
    font-size: 120px;
  }

  @media (max-width: 479px) {
    & {
      font-size: 12px;

      h1 {
        font-size: 44px;
      }
    }
  }
}
</style>
