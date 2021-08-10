<template>
  <div class="feeds">
    <template v-if="type.items.length > 0"
              v-for="(type, index) of types">
      <feed :type="type.name"
            :open="type.open"
            @onStateChanged="(state) => onStateChanged(index, state)"
            :key="index">
        <template v-if="type.name == 'telegram'">
          <telegram :name="name"
                    :img="img"
                    :channel="channel[type.name]"
                    :items="type.items"></telegram>
        </template>
        <template v-else>
          <rss :name="name"
               :img="img"
               :channel="channel[type.name]"
               :items="type.items"></rss>
        </template>
      </feed>
    </template>
  </div>
</template>

<script>
import Feed from "@/components/v2/feeds/feed";
import Telegram from "@/components/v2/feeds/feed/telegram";
import Rss from "@/components/v2/feeds/feed/rss";

export default {
  components: {
    Feed,
    Telegram,
    Rss
  },

  props: {
    name: {
      default: null,
      type: String
    },
    slug: {
      default: null,
      type: String
    },
    channel: {
      default: () => {},
      type: Object
    },
    img: {
      default: null,
      type: String
    }
  },

  data: () => ({
    types: [
      {
        name: "telegram",
        open: false,
        items: []
      },
      {
        name: "medium",
        open: false,
        rss: true,
        items: []
      }
    ],
    individual: true,
    prev: -1,
    isMobile: -1
  }),

  watch: {
    isMobile(value) {
      let open = 0;
      if (value == 0) {
        open = 1;
      }
      this.types.forEach((type, index) => {
        this.types[index].open = open;
      });
    }
  },

  computed: {
    activeTypes() {
      const list = [];
      this.types.forEach(type => {
        if (type.items.length > 0) {
          list.push(type);
        }
      });
      return list;
    }
  },

  mounted() {
    const types = this.types;
    types.forEach((type, index) => {
      const name = type.name;
  
      this.$store
        .dispatch(
          `get${this.$util.capitalizeFirstLetter(name)}`,
          this.slug
        )
        .then(response => {
          if (response.status == 200) {
            const result = response.data;
            if (result != null && result !== " ") {
              types[index].items = result;
            }
          }
        })
        .catch(error => {
        });
    });

    window.addEventListener("resize", this.resize);
    this.load();
  },

  methods: {
    load() {
      let isMobile = 1;
      this.individual = true;
      if (window.matchMedia("(min-width: 768px)").matches) {
        isMobile = 0;
        this.individual = false;
      }
      this.isMobile = isMobile;
    },
    resize() {
      this.load();
    },
    onStateChanged(index, state) {
      if (this.prev != index) {
        if (this.individual) {
          if (this.prev > -1) {
            this.types[this.prev].open = false;
          }
        }
        this.prev = index;
      }
      this.types[index].open = !this.types[index].open;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

