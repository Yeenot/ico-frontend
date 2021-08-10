<template>
    <div class="pagination-wrapper">
        <!-- label showing how many records are being retrieved -->
        <p v-if="options.last > 1">Showing {{ options.from }} to {{ options.to }} of {{ options.total }} records</p>
        <p v-else>{{ options.total }} record/s</p>

        <list class="pagination"
            direction="horizontal"
            v-if="options.last > 1">
        <template v-if="options.current > 1">
            <list-item>
            <a v-on:click="goToPage(1)">&lt;&lt;</a>
            </list-item>
            <list-item>
            <a v-on:click="goToPage(options.current - 1)">&lt;</a>
            </list-item>
            <list-item v-if="info.hasPrev">
                <a class="dot">
                    ...
                </a>
            </list-item>
        </template>
        <list-item v-for="n in info.pages"
                    :key="n"
                    :class="{ 'active' : (n == options.current ) }">
            <a v-on:click="goToPage(n)">{{ n }}</a>
        </list-item>
        <template v-if="options.current < options.last">
            <list-item v-if="info.hasNext">
                <a class="dot">
                    ...
                </a>
            </list-item>
            <list-item>
                <a v-on:click="goToPage(options.current + 1)">&gt;</a>
            </list-item>
            <list-item>
                <a v-on:click="goToPage(options.last)">&gt;&gt;</a>
            </list-item>
        </template>
        </list>
    </div>
</template>

<script>
import List from "~/components/v2/list";
import ListItem from "~/components/v2/list/item";

export default {
    components: {
        List,
        ListItem
    },

    props: {
        options: {
            default: () => {},
            type: Object
        }
    },

    computed: {
        info() {
            const options = this.options;
            let pages = [];
            let hasPrev = false;
            let hasNext = false;
            if (Object.keys(options).length > 0) {
                const current = options["current"]
                const last = options["last"]
                const half = 5;

                //add extra prevs
                let from = (current-1) - (half);
                let extra_from = 0;
                if (from < 0) {
                    extra_from = Math.abs(from);
                    from = 0;
                }
                //add extra nexts
                let to = current + (half + extra_from);
                let extra_to = 0;
                if(to > last) {
                    extra_to = to - last;
                    to = last
                }

                // recheck extra prevs again
                from = from - (extra_to);
                if (from < 0) {
                    from = 0;
                }

                let ctr = from + 1;
                while (ctr <= to) {
                    pages.push(ctr);
                ctr++;
                }

                hasPrev = from > 0;
                hasNext = to < last;
            }
            return {
                pages,
                hasPrev,
                hasNext
            }
        }
    },

    methods: {
        goToPage(page) {
            this.$emit("go", page);
        }
    }
}
</script>

<style lang="scss" scoped>
 @import "./style.scss";
</style>
