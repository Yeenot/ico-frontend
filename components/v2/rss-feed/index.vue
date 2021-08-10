<template>
  <div class="rss-wrapper"
       v-if="items.length > 0">
    <div class="feed">
      <div class="box">
        <div class="heading">
          <h5>{{ title }}</h5>
        </div>
        <div class="content">
          <div class="list">
            <div class="item"
                 v-for="(item,index) of items"
                 :key="index">
              <div class="banner">
                <img :src="item.enclosure['@attributes'].url" />
              </div>
              <div class="info">
                <h6>{{ item.title["#cdata-section"] }}</h6>
                <div class="creator">{{ item["dc:creator"]["#text"] }}</div>
                <div class="published">{{ item.pubDate["#text"] }}</div>
                <div class="description"
                     v-html="item.description['#cdata-section']">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["src"],

  data: () => ({
    rss: null
  }),

  mounted() {
    this.getFeed();
  },

  computed: {
    title() {
      return this.rss.channel.title["#text"];
    },

    items() {
      return this.rss ? this.rss.channel.item : [];
    }
  },

  methods: {
    getFeed() {
      const parent = this;
      axios({
        method: "GET",
        url: parent.src
      })
        .then(response => {
          if (response.statusText === "OK") {
            const parser = new DOMParser();
            const xml = parser.parseFromString(response.data, "text/xml");
            parent.rss = parent.$util.xmlToJson(xml).rss;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
