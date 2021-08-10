<template>
  <div class="subscribe-modal">
    <div class="status"
         v-if="success == 1">
      You have successfully followed
      <span class="name">{{ name }}.</span>
    </div>
    <h6>
      FOLLOW
      <span class="name">
        {{ name }}
      </span>
      AND RECEIVE IMPORTANT ALERTS
    </h6>
    <div>
      <input type="text"
             v-model="email"
             placeholder="Email Address" />
    </div>
    <div class="actions">
      <list direction="horizontal">
        <list-item>
          <button class="reverse"
                  v-on:click="submit()">
            <template v-if="!sending">
              Submit
            </template>
            <template v-else>
              Sending...
            </template>
          </button>
        </list-item>
        <list-item>
          <button class="reverse"
                  :disabled="sending"
                  v-on:click="close()">Close</button>
        </list-item>
      </list>
    </div>
  </div>
</template>

<script>
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Icon from "@/components/v2/icon";

export default {
  components: {
    List,
    ListItem,
    Icon
  },

  props: {
    name: {
      default: null,
      Type: String
    }
  },

  data: () => ({
    email: "",
    sending: false,
    success: -1
  }),

  computed: {
    scroll: {
      get() {
        return this.$store.state.all.body.scroll;
      },

      set(value) {
        this.$store.commit("SCROLL", value);
      }
    }
  },

  destroyed() {
    this.scroll = true;
  },

  methods: {
    submit() {
      let email = this.email;
      if (email != "") {
        this.success = -1;
        const ico = this.$route.params.name;
        this.sending = true;
        const params = {
          ico,
          email
        };
        const subscribe = this.$store.dispatch(`subscribe`, params);
        subscribe
          .then(response => {
            if (response.status == 200) {
              this.success = 1;
              this.sending = false;
              this.email = "";
            }
          })
          .catch(error => {
            this.sending = false;
            this.success = 0;
          });
      }
    },

    close() {
      this.$modal.hide("subscribe");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./style.scss";
</style>
