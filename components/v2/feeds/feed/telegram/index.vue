<template>
  <list direction="vertical">
    <list-item v-for="(item,index) in items"
               :key="index">
      <div class="item">
        <div class="info">
          <div class="img-container">
            <a :href="channel"
               target="_blank">
              <img :src="img" />
                  </a>
          </div>
          <h6>
            <a :href="channel"
               target="_blank">
              {{ name }}
            </a>
          </h6>
          <div class="timestamp">
            {{ getTimeAgo(item.created_at) }}
          </div>
        </div>
        <div class="comment"
             v-html="formatComment(item.message)">
        </div>
      </div>
    </list-item>
  </list>
</template>

<script>
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
export default {
  components: {
    List,
    ListItem
  },

  props: {
    name: {
      default: null,
      type: String
    },
    img: {
      default: null,
      type: String
    },
    channel: {
      default: null,
      type: String
    },
    items: {
      default: () => [],
      type: Array
    }
  },

  methods: {
    formatComment(msg) {
      let comment = "";
      if (msg) {
        comment = msg
          .replace(
            /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
            '<a href="$1" target="_blank">$1</a>'
          )
          .replace(/(?:\r\n|\r|\n)/g, "<br />");
      }
      return comment;
    },

    getTimeAgo(date) {
      return this.$util.timeAgo(date);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
