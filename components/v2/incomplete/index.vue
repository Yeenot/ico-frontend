<template>
  <div class="incomplete">
    <icon name="plane"></icon>
    <h6>THERE IS MORE...</h6>
    <p>
      This is a basic listing - we gather and verify more information for the project as soon as public interest rises. You are interested? Once a few people subscribe below, we might do a deeper research, update the listing and notify you.
    </p>
    <div class="actions">
      <button v-on:click="proceed()">Proceed Anyways</button>
      <button class="transparent"
              v-on:click="notified()">Subscribe</button>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/v2/icon/";

export default {
  components: {
    Icon
  },

  methods: {
    proceed() {
      this.$emit("proceed");
    },

    notified() {
      this.$emit("notified");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
