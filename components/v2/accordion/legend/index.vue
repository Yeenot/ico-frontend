<template>
    <div class="accordion-legend">
        <div class="wrapper">
            <div class="group collapse-all"
                 v-on:click="$emit('collapse')">
                Collapse All
                <div class="actions">
                    <span class="first">+</span>
                    <span class="second">+</span>
                </div>
            </div>
            <div class="group expand-all"
                 v-on:click="$emit('expand')">
                Expand All
                <div class="actions">
                    <span class="first">+</span>
                    <span class="second">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
