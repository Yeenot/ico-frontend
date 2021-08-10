<template>
    <img :src="src" />
</template>

<script>
export default {
    props: [
        "src"
    ]
}
</script>

<style lang="scss" scoped>
    @import "./style.scss";
</style>

