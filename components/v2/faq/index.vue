<template>
  <div class="faq">
    <div class="flex-container">
      <div class="left">
        <div class="questions">
          <list direction="vertical">
            <list-item v-for="(item, index) of faq"
                       :key="index">
              <div class="question"
                   :class="{ 'selected' : selected == index}"
                   v-on:click="onFaqSelected(index)">
                {{ item.question }}
              </div>
            </list-item>
          </list>
        </div>
        <div class="bottom on-left">
          <button v-on:click="$router.push({ path: '/cryptocurrency-faq' })">See FAQ</button>
        </div>
      </div>
      <div class="col right">
        <div class="box">
          <fade-transition group
                           :duration="300">
            <div v-for="(item, index) of faq"
                 class="answer"
                 v-show="selected == index"
                 v-html="item.answer"
                 :key="index">
            </div>
          </fade-transition>
        </div>
      </div>
    </div>
    <div class="bottom on-whole">
      <button v-on:click="$router.push({ path: '/cryptocurrency-faq' })">See FAQ</button>
    </div>
  </div>
</template>

<script>
import FadeTransition from "@/components/v2/fade-transition";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
export default {
  components: {
    FadeTransition,
    List,
    ListItem
  },

  data: () => ({
    limit: 5,
    selected: 0
  }),

  computed: {
    HostName() {
      return this.$store.state.settings.hostname;
    },

    faq() {
      const faqs = this.$store.state.faq.faqs;
      const hostname = this.HostName;
      let done = false;
      const limit = this.limit;
      const list = [
        {
          question: "What is an ICO?",
          answer:
            "An abbreviation for Initial Coin Offering. This is the cryptocurrency equivalent of an initial public offering (IPO) or crowdsourcing. ICOs sell their currency or tokens to fund a project, blockchain, network et al.  A tokensale is usually divided into Private Sale, Presale and Crowd Sale and we cover all aspects of most popular ICOs.<br/><br/>One of the top blockchains and cryptocurrencies Ethereum(ETH) held an ICO in 2014. Bitcoin did not hold an ICO because it was mined."
        },
        {
          question: "Tokens don't show up in my wallet.",
          answer:
            'You might have to add a custom token in your wallet. Adding custom tokens involves inputting the token contract address, decimals and the token symbol. The ICO will usually provide these details. MyEtherWallet has a good guide detailing how to add tokens here: <a href="https://www.myetherwallet.com/" target="_blank">LINK</a>'
        },
        {
          question: "What are the drawbacks of investing in an ICO?",
          answer: `Some drawbacks of investing in an ICO are: greater risk since some products are still in development. This topic will be covered in greater detail in our <a href="${hostname}/ico-cryptocurrency-blog/" target="_blank">blogposts</a>/<a href="${hostname}/ico-cryptocurrency-blog/" target="_blank">articles</a>.`
        },
        {
          question: "What are the benefits of investing in an ICO?",
          answer:
            "Investing in an ICO allows you to get tokens at a fixed price with a usually much lower cost than from buying one exchanges."
        }
      ];

      faqs.every(section => {
        section.list.every(item => {
          list.push(
            Object.assign({}, item, {
              answer: this.$util.regex(item.answer, hostname, / *\[[^)]*\] */g)
            })
          );
          if (list.length == limit) {
            done = false;
            return false;
          }
          return true;
        });
        if (!done) {
          return false;
        }
        return true;
      });
      return list;
    }
  },

  methods: {
    onFaqSelected(index) {
      this.selected = index;
    },

    beforeLeave(el) {
      const { marginLeft, marginTop, width, height } = window.getComputedStyle(
        el
      );
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
