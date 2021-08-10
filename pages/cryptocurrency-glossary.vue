<template>
  <page id="glossary">
    <template slot="title">
      <h2>Cryptocurrency Glossary</h2>
    </template>
    <div>
      <div class="selection">
        <div class="wrapper"
             :class="WrapperClass">
          <div class="inner">
            <list class="letters"
                  direction="horizontal">
              <list-item v-for="(alphabet, index) in alphabets"
                         :key="index"
                         v-bind:class="ItemClass(index)">
                <div v-on:click="goToLetter(alphabet, index)">
                  {{ alphabet }}
                </div>
              </list-item>
            </list>
          </div>
        </div>
      </div>
      <div class="introduction">
        <span>Hi there!</span><br/>
        <br/> The world of crypto has a completely different set of words and jargon from what we use in everyday life. A newcomer in this field will usually feel out of place and might not understand what is happening because of how different and technical the terms are. We have prepared this Glossary to serve as a quick reference to guide for you. This is a living document and will constantly be updated to reflect the fast-paced world of Crypto.
      </div>
      <div class="keywords">
        <div :id="'character-' + letter"
             class="group"
             v-for="(keys, letter) in keywords"
             :key="letter">
          <span class="letter">{{ letter }}</span>
          <list class="keys"
                direction="vertical">
            <list-item v-for="(word, index) in keys"
                       :key="index">
              <div class="flex-container term">
                <div class="key">
                  <h2>{{ word.key}}</h2> -
                </div>
                <div class="col definition"
                     v-html="word.definition">
                </div>
              </div>
            </list-item>
          </list>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "~/components/v2/page";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";

export default {
  name: "glossary",
  layout: "default",

  components: {
    Page,
    List,
    ListItem
  },

  head() {
    return {
      title: this.Title,
      meta: [
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

  async asyncData({ params, store }) {
    // let response = await store.dispatch(`getKeywords`)
    // if (response.statusText === 'OK') {
    // 	const data = response.data
    // 	store.commit(`SET_KEYWORDS`, data)
    // }
  },

  data: () => ({
    selected: "",
    isLettersFixed: false,
    isFirstLoaded: false,
    original: {
      letters: {
        top: 0
      }
    },
    info: {
      elements: [
        {
          key: "keywords",
          query: ".keywords"
        },
        {
          key: "page-header-bar",
          query: ".page-header-bar"
        },
        {
          key: "letters-container",
          query: ".letters-container"
        },
        {
          key: "letters-inner-container",
          query: ".letters-inner-container"
        },
        {
          key: "header",
          query: "#header"
        },
        {
          key: "navigation-bar",
          query: "#navigation-bar"
        },
        {
          key: "top-bar",
          query: "#top-bar"
        }
      ]
    },
    elements: {},
    styles: {},
    query: "",
    isFix: false,
    selectionDistance: 0,
    wrapper: {
      width: null,
      height: null
    }
  }),

  mounted() {
    this.prepareLetters();
    // this.stickyElement();
  },

  destroyed() {
    this.unprepareLetters();
  },

  computed: {
    Title() {
      return "Glossary - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com";
    },

    Description() {
      return "Ico-check.com is an up to date ICO checker website. The ultimate Listing Tracker of active ICOs and upcoming ICOs. Discover the best Initial Coin Offering, ICO release date and ICO analysis.";
    },

    MetaImage() {
      return (
        this.HostName + "/images/ico-check-cryptocurrency-list-preview.jpeg"
      );
    },

    WrapperClass() {
      return {};
    },

    InnerStyle() {
      const width = this.wrapper.width;
      const style = {};
      if (this.isFix && width != null) {
        style["width"] = `${width}px`;
      }
      return style;
    },

    SelectionStyle() {
      const height = this.wrapper.height;
      const style = {};
      if (this.isFix && height != null) {
        style["height"] = `${height}px`;
      }
      return style;
    },

    HostName() {
      return this.$store.state.settings.hostname;
    },

    alphabets() {
      const keywords = this.keywords;
      const others = [];

      const start = 65;
      const end = 90;

      const letters = [];
      let ctr = start;
      while (ctr <= end) {
        letters.push(String.fromCharCode(ctr));
        ctr++;
      }

      for (const key of Object.keys(keywords)) {
        if (!letters.includes(key)) {
          others.push(key);
        }
      }

      const all = others.concat(letters);
      return all;
    },

    keywords() {
      const search = this.query;
      const keywords = this.$store.state.glossary.keywords;
      const filter = {};
      for (const key of Object.keys(keywords)) {
        const list = keywords[key];
        const filteredList = [];
        list.forEach(item => {
          if (item.key.includes(search)) {
            filteredList.push(item);
          }
        });
        if (filteredList.length > 0) {
          this.$set(filter, key, filteredList);
        }
      }
      return filter;
    }
  },

  methods: {
    getDefinition(definition) {
      return unescape(definition);
    },

    prepareLetters() {
      window.addEventListener("load", this.onUpdate);
      window.addEventListener("scroll", this.onUpdate);
      window.addEventListener("resize", this.onUpdate);
    },

    unprepareLetters() {
      window.removeEventListener("load", this.onUpdate);
      window.removeEventListener("scroll", this.onUpdate);
      window.removeEventListener("resize", this.onUpdate);
    },

    onUpdate() {
      this.scroll();
      this.getCurrentAlphabet();
    },

    scroll() {
      const selection = this.$el.querySelector(".selection");
      const wrapper = this.$el.querySelector(".wrapper");
      const inner = this.$el.querySelector(".inner");

      var viewportOffset = selection.getBoundingClientRect();
      if (viewportOffset.top <= 0) {
        wrapper.classList.add("fixed");
        inner.style.width = `${selection.clientWidth}px`;
        selection.style.height = `${wrapper.clientHeight}px`;
      } else {
        wrapper.classList.remove("fixed");
        inner.style.width = "";
        selection.style.height = "";
      }
    },

    stickyElement() {
      window.addEventListener("load", () => {
        this.assign();
        this.calculateLettersDiv();
        this.getCurrentAlphabet();
      });
      window.addEventListener("scroll", () => {
        this.calculateLettersDiv();
        this.getCurrentAlphabet();
      });
      window.addEventListener("resize", () => {
        this.resetLayout();
        this.assign();
        this.calculateLettersDiv();
        this.getCurrentAlphabet();
      });
    },

    assign() {
      const parent = this;
      const elements = {};
      const styles = {};
      const info = this.info.elements;

      info.forEach(item => {
        const element = parent.getElement(item.query);
        const style = parent.getStyle(element);

        parent.$set(elements, item.key, element);
        parent.$set(styles, item.key, style);
      });

      this.elements = elements;
      this.styles = styles;
    },

    getStyle(element) {
      return window.getComputedStyle(element);
    },

    getElement(query) {
      return document.querySelector(query);
    },

    getCurrentAlphabet() {
      const scrollPos =
        window.scrollY ||
        window.scrollTop ||
        document.getElementsByTagName("html")[0].scrollTop;

      const elements = this.elements;
      const keywords = this.keywords;
      const container = this.$el.querySelector(".keywords").offsetTop;
      const wrapper = this.$el.querySelector(`.wrapper`);

      let current = "";
      for (const letter of Object.keys(keywords)) {
        const keys = keywords[letter];
        const element = this.$el.querySelector("#character-" + letter);
        const top = element.getBoundingClientRect().top - wrapper.clientHeight;
        current = letter;
        if (top <= 0) {
          continue;
        } else {
          break;
        }
      }
      if (!current) {
        if (Object.keys(keywords).length > 0) {
          current = Object.keys(keywords)[0];
        }
      }
      this.selected = current;
    },

    calculateLettersDiv() {
      const scrollPos =
        window.scrollY ||
        window.scrollTop ||
        document.getElementsByTagName("html")[0].scrollTop;
      const elements = this.elements;
      const styles = this.styles;

      const header = elements.header;
      const pagebar = elements["page-header-bar"];
      const keywords = elements.keywords;
      const topbar = elements["top-bar"];
      const navbar = elements["navigation-bar"];
      const letters = elements["letters-container"];

      const headerStyle = header.style;
      const pagebarStyle = pagebar.style;
      const navbarStyle = navbar.style;
      const topbarStyle = topbar.style;
      const lettersStyle = letters.style;
      const keywordsStyle = keywords.style;

      let side = "";
      let top = "0px";
      let totalScroll = 0;

      if (window.matchMedia("(max-width: 767px)").matches) {
        totalScroll = header.clientHeight + pagebar.clientHeight;
      } else if (
        window.matchMedia("(min-width: 768px)").matches &&
        window.matchMedia("(max-width: 991px)").matches
      ) {
        totalScroll = topbar.clientHeight + pagebar.clientHeight;
        top = navbar.clientHeight + "px";
      } else {
        totalScroll = topbar.clientHeight + pagebar.clientHeight;
        top = navbar.clientHeight + "px";
      }

      if (window.matchMedia("(max-width: 1230px)").matches) {
        side = "15px";
      }

      if (!this.isLettersFixed) {
        if (scrollPos > totalScroll) {
          lettersStyle.position = "fixed";
          lettersStyle.top = top;

          if (side) {
            lettersStyle.width = "auto";
            lettersStyle.left = side;
            lettersStyle.right = side;
          } else {
            lettersStyle.width = "1200px";
            lettersStyle.left = "auto";
            lettersStyle.right = "auto";
          }

          keywordsStyle.marginTop = letters.clientHeight + "px";
          this.isLettersFixed = true;
        }
      } else {
        if (scrollPos <= totalScroll) {
          lettersStyle.position = "static";
          lettersStyle.top = "0px";
          lettersStyle.left = side;
          lettersStyle.right = side;
          keywordsStyle.marginTop = "0px";
          this.isLettersFixed = false;
        }
      }
    },

    resetLayout() {
      const elements = this.elements;
      const letters = elements["letters-container"];
      const keywords = elements.keywords;
      const lettersStyle = letters.style;
      const keywordsStyle = keywords.style;

      lettersStyle.position = "static";
      lettersStyle.paddingTop = "0px";
      keywordsStyle.marginTop = "0px";
      this.isLettersFixed = false;
    },

    goToLetter(letter, index) {
      const element = this.$el.querySelector(`#character-${letter}`);
      const wrapper = this.$el.querySelector(`.wrapper`);

      window.scroll({
        top: element.offsetTop - wrapper.clientHeight,
        behavior: "smooth"
      });
    },

    ItemClass(index) {
      return {
        selected: this.alphabets[index] === this.selected
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/v2/pages/glossary/scss/style.scss";
</style>