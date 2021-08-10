<template>
    <div class="gallery">
        <photo-swipe ref="photoswipe" :items="items"></photo-swipe>
        <div id="screenshots-gallery" class="flex-container">
            <div class="column col-2 col-sm-3 col-md-4" v-for="(img, index) of items" :key="index">
                <div class="img-container">
                    <img class="preview-img-item" :src="img.src" @click="onItemClick(index)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PhotoSwipe from "~/components/v2/photoswipe"

export default {
    components: {
        PhotoSwipe
    },

    props: ["images"],

    data: () => ({
    }),

    computed: {
        items() {
            const images = this.images;
            const list = [];
            images.forEach(image => {
                list.push({
                    src: image.large,
                    thumb: image.thumb,
                    w: 0,
                    h: 0
                })
            })
            return list;
        }
    },

    mounted() {


        // const el = this.$el.querySelector('#screenshots-gallery')
        // const el = this.$refs.lightgallery
        // const el = this.$refs.lightgallery
        // const el = this.$el
        // console.log(this.$Lightgallery(el))
        // lightGallery(el, {
        //     thumbnail: true
        // })
    },

    beforeDestroy() {
        // const el = this.$el.querySelector('#screenshots-gallery')
        // window.lgData[el.getAttribute('lg-uid')].destroy(true);
    },

    methods: {
        onItemClick(index) {
            this.$refs["photoswipe"].open(index);
        }
    }
};

</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
