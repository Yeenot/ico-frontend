<template>
    <div id="welcome">
        <h6>
            Welcome to ico-check.com!
        </h6>
        <p>
            This is an example of our ICO detail page. This will help you understand our website to get the information you need and to make your own investment decisions. You can mouse over text that has an exclamation point (!) next to it to get additional information.
        </p>
        <div class="actions">
            <button class="reverse"
                    v-on:click="close()">OK</button>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$modal.hide("welcome");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
