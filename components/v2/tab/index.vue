<template>
    <div class="tab">
        <div class="menu">
            <ul class="clearfix">
                <slot name="menu"></slot>
            </ul>
        </div>
        <div class="content">
            <transition name="fade"
                        mode="out-in">
                <slot name="content"></slot>
            </transition>
        </div>
    </div>
</template>


<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

