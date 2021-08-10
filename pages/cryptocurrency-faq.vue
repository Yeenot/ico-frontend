<template>
  <page id="faqs">
    <template slot="title">
      <h2>ICO Cryptocurrency FAQ</h2>
    </template>
    <div>
      <div class="indices flex-container">
        <div class="col group"
             v-for="(faq, faqIndex) in faqs"
             :key="faqIndex">
          <h6>{{ faq.section }}</h6>
          <div class="index-questions">
            <list direction="vertical">
              <list-item v-for="(item, index) in faq.list"
                         :key="index">
                <div class="index"
                     v-on:click="goToFaq(faqIndex, index)">
                  <i class="fa fa-caret-right"></i> {{ item.question }}
                </div>
              </list-item>
            </list>
          </div>
        </div>
      </div>
      <div class="faq">
        <div class="group"
             v-for="(faq, faqIndex) in faqs"
             :key="faqIndex">
          <h2>{{ faq.section }}</h2>
          <div class="answers">
            <accordion :selected="selected[faqIndex]"
                       :items="faq.list"
                       :single="true">
              <accordion-item slot-scope="{ item, index }"
                              :key="index"
                              :id="`faq-${faqIndex}-${index}`"
                              :index="index"
                              :open="item.open"
                              info="">
                <template slot="text">
                  {{ item.question }}
                </template>
                <template slot="content">
                  <div class="answer"
                       v-html="item.answer">
                  </div>
                </template>
              </accordion-item>
            </accordion>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "~/components/v2/page";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Accordion from "@/components/v2/accordion";
import AccordionItem from "@/components/v2/accordion/item";

export default {
  name: "faq",

  components: {
    Page,
    List,
    ListItem,
    Accordion,
    AccordionItem
  },

  head() {
    return {
      title: this.Title,
      meta: [
        {
          name: "google-site-verification",
          content: "_NoSyh4vxpf1Ud3_Wq3rHHM6e1RP6qPRqpqgCbd7IF0"
        },
        { name: "Content-Type", content: "text/html" },
        { hid: "description", name: "description", content: this.Description },
        { name: "image", content: this.MetaImage },
        { name: "og:title", content: this.Title },
        { name: "og:description", content: this.Description },
        { name: "og:image", content: this.MetaImage },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: this.Title },
        { name: "twitter:description", content: this.Description },
        { name: "twitter:image", content: this.MetaImage },

        { "http-equiv": "cache-control", content: "max-age=2592000, public" },
        { "http-equiv": "pragma", content: "max-age=2592000, public" },
        { "http-equiv": "expires", content: "1" }
      ]
    };
  },

  data: () => ({
    collapsed: {
      section: -1,
      item: -1
    },
    selected: []
  }),

  computed: {
    Title() {
      return "Faqs - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com";
    },

    Description() {
      return "Ico-check.com is an up to date ICO checker website. The ultimate Listing Tracker of active ICOs and upcoming ICOs. Discover the best Initial Coin Offering, ICO release date and ICO analysis.";
    },

    MetaImage() {
      return (
        this.HostName + "/images/ico-check-cryptocurrency-list-preview.jpeg"
      );
    },

    HostName() {
      return this.$store.state.settings.hostname;
    },

    faqs() {
      const parent = this;
      const hostname = this.HostName;
      const faqs = this.$store.state.faq.faqs;
      const collapsed = this.collapsed;
      const filter = [];
      faqs.forEach((group, groupIndex) => {
        const section = group.section;
        const list = group.list;
        const questions = [];
        list.forEach((item, itemIndex) => {
          questions.push({
            question: item.question,
            answer: parent.$util.regex(item.answer, hostname, / *\[[^)]*\] */g)
          });
        });
        filter.push({
          section,
          list: questions
        });
      });

      this.prepareSelected(filter.length);
      return filter;
    },

    collapsableOptions() {
      return {
        icon: {
          style: {
            "margin-top": "4px"
          }
        }
      };
    }
  },

  methods: {
    prepareSelected(len) {
      const selected = [];
      let ctr = 0;
      while (ctr < len) {
        selected.push([]);
        ctr++;
      }
      this.selected = selected;
    },

    getItemId(faqIndex, itemIndex) {
      return `faq-${faqIndex}-${itemIndex}`;
    },

    onCollapseFromOutside() {
      const collapsed = this.collapsed;
      const element = document.querySelector(
        `#faq-${collapsed.section}-${collapsed.item}`
      );
      const topBar = document.querySelector("#top-bar");
      const pageBar = document.querySelector(".page-header-bar");
      const top =
        element.offsetTop + topBar.clientHeight + pageBar.clientHeight;
      window.scroll({
        top,
        behavior: "smooth"
      });
    },

    goToFaq(faqIndex, itemIndex) {
      this.$set(this.selected, faqIndex, [itemIndex]);
      const element = document.querySelector(`#faq-${faqIndex}-${itemIndex}`);

      const anim = setTimeout(function() {
        window.scroll({
          top: element.offsetTop,
          behavior: "smooth"
        });
        clearTimeout(anim);
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/v2/pages/faq/scss/style.scss";
</style>
