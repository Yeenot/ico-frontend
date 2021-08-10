<template>
    <div id="home"
         class="outer-grid">
        <main>

            <!-- <section id="ads"
                     v-if="ads.img != null">
                <div class="content-grid">
                    <a :href="ads.href"
                       target="_blank">
                        <img :src="ads.img"
                             alt="ICO Ad Banner" />
                    </a>
                </div>
            </section> -->

            <!-- hero -->
            <section id="hero"
                     class="fluid">
                <img class="coin"
                     src="/v2/images/coin.png"
                     alt="Coin" />
                <div class="content">
                    <div class="inner">
                        <h1>Cryptocurrency Initial Coin Offering List</h1>
                        <h4>
                            Welcome to ico-check.com, we are a cryptocurrency ICO website featuring an extensive and well researched list of the best ongoing and upcoming initial coin offerings to invest in.
                        </h4>
                    </div>
                </div>
            </section>

            <section id="icos">
                <div class="content-grid">
                    <ico-carousel>
                    </ico-carousel>
                </div>
            </section>

            <section id="newest-ico-reviews">
                <div class="content-grid">
                    <div class="division holder">
                        <div class="headline">
                            <h2>Newest ICO Reviews &amp; Ratings</h2>
                        </div>
                        <ico-reviews :items="reviews.latest"></ico-reviews>
                        <div class="bottom">
                            <button v-on:click="$router.push({ path: '/ico-reviews' })">See All ICO Ratings &amp; Reviews</button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-to-read">
                <div class="content-grid">
                    <div class="division">
                        <div class="headline">
                            <h2>Every ICO Has A Detailed Profile Page</h2>
                        </div>
                        <div class="division-content">
                            <page-labeller></page-labeller>
                        </div>
                    </div>
                </div>
            </section>

            <section id="faq">
                <div class="content-grid">
                    <div class="division holder">
                        <div class="headline">
                            <h2>FAQ</h2>
                        </div>
                        <faq></faq>
                    </div>
                </div>
            </section>

            <section id="related-articles">
                <div class="content-grid">
                    <div class="division holder">
                        <div class="headline">
                            <h2>Inside the Cryptoscene</h2>
                        </div>
                        <related-blogs :items="blogs"></related-blogs>
                    </div>
                </div>
            </section>

            <section id="about"
                     class="fluid">
                <div class="background">
                </div>
                <div class="content-grid">
                    <div class="division">
                        <button v-on:click="toggleAbout()">
                            About Our ICO Cryptocurrency List
                            <icon :class="{ 'open' : about.show }"
                                  name="chevron-arrow-down"></icon>
                        </button>

                        <div class="about"
                             v-show="about.show">
                            <div class="box">
                                <div class="left">
                                    <h3>How to use the ICO list</h3>
                                    You find our advanced ICO list with all ICOs in here: <router-link to="/advanced-ico-list"
                                                 target="_blank">LINK</router-link><br /><br />
                                    You can click the ONGOING button to display ICOs that are currently active, the UPCOMING button to display future ICOs, the PAST button to display finished ICOs and the ALL button to display all ICOs: ongoing, upcoming &amp; past. You can also select ongoing and upcoming together to show all active and future initial coin offerings. The ADD COLUMN button lets you select what columns you want to display in the table so you can easily order and compare ICOs based on your preferences. <br /><br /> Every ICO column in the list can be displayed in ascending or descending order by clicking the column title. This helps eg. in selecting high or low market cap cryptocurrency ICOs. Columns can be deleted by pressing the x button in the ICO list column header or by removing them from the column list when you click ADD COLUMN. <br /><br /> Located in the navbar - upper right of our ICO website is a handy feature to display uniform currencies. As some ICOs are pegged to Ethereum, others to Bitcoin and again others to the US Dollar or EURO, it is often hard to compare ICO market caps and prices. Our currency conversion tool does the trick for you and converts all caps and prices to your prefered currency: Either BTC - Bitcoin, ETH - Ethereum, USD or EURO. We get the conversion data directly from the coinmarketcap API and we update it every 5 minutes. Do you want some other currencies for the conversion? Let us know!
                                </div>
                                <div class="right">
                                    <h3>About Our ICO Cryptocurrency List</h3>
                                    ICO initial coin offerings have been booming in popularity, but one persistent problem has been the lack of a standardized way of presenting the info on how a cryptocurrency coin offering is being held. This lack of information means making decisions is often difficult, most specially for people new to the crypto scene. Even people who know how to get information about cryptocurrency initial coin offerings usually find themselves strapped for time trying to find every bit of info they need for their analysis. <br /><br /> Our list of ICOs contains information that is usually hard to find such as supply, pricing, tiers, presale, crowdsale &amp; private round info, ICO release date and soft, hard and market caps. To ensure veracity of the information we collect, we directly link each initial coin offering to the source where we got the information from. This helps you to do your own ICO analysis. We offer you a list of the best upcoming ICOs, ongoing ICOs and past ICOs, presented in a way where they can be easily compared and analysed so that you can pick the right ICO coin based on your requirements.<br /><br /> Thanks to our upcoming ICO list you can find all the best token crowd sales neatly displayed and sorted whichever way you prefer. You can add columns for every data field we offer and move them around. You can sort by date, hardcap, price, currency etc. No limits. You get a live ICO full text search box and you can change the currency of all prices, soft caps, hard caps, circulating- & fully diluted cryptocurrency market caps to Ethereum - ETH, Bitcoin - BTC, Euro and USD. <br /><br /> We give you all the links to the project's website, whitepaper, medium blog, bitcointalk, slack, telegram, discord, facebook, twitter, reddit, github etc. We show you countdown of start and end dates of ICO presales and crowd sales and provide all the information about whitelist signups. You can follow an ICO and receive regular updates if terms are changing. We show you hype indicators, the ICO projects facebook and twitter followers, slack and telegram members, alexa ranks, reviews by other ICO websites, token distribution dates, exchange listing and token burning information, participating countries, token supply and allocation, detailed tier pricing with notes and much more. Always linked to the source and with extensive ICO token notes and tooltip with more information. <br /><br /> Are you looking for the next hot lowcap ICO that could yield big returns or do you want to compare the hardcaps of all the running ICOs or check our ICO calendar to see which token sale will finish first? Our ICO list website helps you to find what you need. Easy with just a few clicks. No other ICO cryptocurrency website offers you these extensive features! Our cryptocurrency ICO list is readily updated with the latest initial coin offerings and ICO schedule to allow you to make smarter decisions without going thru the ICOs white paper and various documentation yourself. Our ICO checker will dedicate a special section of the website to extensive cryptocurrency ICO analysis where some selected ICOs are analyzed in-depth by our team of experts.<br /><br /> We will soon add an ICO calendar and ICO tracker with all the important whitelist, pre sale and crowdsale ICO release dates so you can easily and professionally plan your participation and strategy. To save your from losing your money to scams, we will also have a section of the site that deals with suspicious or scam cryptocurrency initial coin offerings. We actively background check each ICO we list and those that fail are put in this list with our commentary on why we did not list them.<br /><br /> We do the hard work, so you can spend less time digging for information and more time doing what you love most! We hope the information in this website will help you to pick the best initial coin offerings. All the best from your ico-check team!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="disclaimer"
                     class="fluid">
                <div class="background">
                </div>
                <div class="content-grid">
                    <div class="division">
                        <button v-on:click="toggleDisclaimer()">
                            See The Legal ICO Disclaimer
                            <icon :class="{ 'open' : disclaimer.show }"
                                  name="chevron-arrow-down"></icon>
                        </button>

                        <div class="disclaimer"
                             v-show="disclaimer.show">
                            <div class="box">
                                The information provided in our cryptocurrency ICO website is for informational purposes only. It should not be considered investment, legal or financial advice to invest in any ICO on our list. We cannot substitute for professional advice and independent factual verification before every ICO investment.<br /><br /> ico-check.com does not endorse any initial coin offerings advertised on our ICO website
                                <router-link to="/"
                                             target="_blank">https://www.ico-check.com</router-link> and does not make any guarantee or any other promise as to results that may be obtained from using our content. No one should make any investment decision without first consulting their own financial advisor and conducting their own research and due diligence. <br /><br /> To the maximum extent permitted by law, ico-check.com disclaims any and all liability in the event any information, analysis, opinions, commentary, advice and/or recommendations prove to be inaccurate, incomplete or unreliable, or result in any losses.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    </div>
</template>

<script>
import IcoCarousel from "@/components/v2/ico-carousel";
import IcoReviews from "@/components/v2/ico-reviews";
import Faq from "@/components/v2/faq";
import Icon from "@/components/v2/icon";
import PageLabeller from "@/components/v2/page-labeller";
import RelatedBlogs from "@/components/v2/related-blogs";

export default {
  components: {
    IcoCarousel,
    IcoReviews,
    Faq,
    Icon,
    PageLabeller,
    RelatedBlogs
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
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          type: "application/ld+json",
          innerHTML: `{ "@context": "http://schema.org", "@type": "PostalAddress", "name": "ico-check.com", "url": "${
            this.HostName
          }", "logo": "${this.Logo}" }`
        }
      ]
    };
  },

  async asyncData({ store }) {
    const response = await Promise.all([
      store.dispatch(`latest_reviews`),
      store.dispatch(`BLOGS`, {
        page: 1
      })
    ]);

    let latest = null;
    if ((response[0].status = 200)) {
      latest = response[0].data;
      if (latest.length > 6) {
        latest = latest.splice(0, 6);
      }
    }

    let blogs = [];
    if (response[1].status == 200) {
      const result = response[1].data;
      if (result.data != null) {
        blogs = result.data;
      }
    }

    return {
      reviews: {
        latest
      },
      blogs
    };
  },

  data: () => ({
    about: {
      show: false
    },
    disclaimer: {
      show: false
    },
    ads: {
      img: "/v2/images/ads.gif",
      href:
        "https://tokensale.w12.io/?utm_source=banners&utm_medium=trackers&utm_campaign=ico-check"
    }
  }),

  computed: {
    Title() {
      return "Upcoming ICO List - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com";
    },

    Description() {
      return "Ico-check.com is an up to date ICO checker website. The ultimate Listing Tracker of active ICOs and upcoming ICOs. Discover the best Initial Coin Offering, ICO release date and ICO analysis.";
    },

    MetaImage() {
      return (
        this.HostName + "/images/ico-check-cryptocurrency-list-preview.jpeg"
      );
    },

    Logo() {
      return this.HostName + "/images/ico-check-cryptocurrency-list-logo.png";
    },

    HostName() {
      return this.$store.state.settings.hostname;
    }
  },

  methods: {
    toggleAbout() {
      this.about.show = !this.about.show;
    },
    toggleDisclaimer() {
      this.disclaimer.show = !this.disclaimer.show;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/v2/pages/home/scss/style.scss";
</style>
