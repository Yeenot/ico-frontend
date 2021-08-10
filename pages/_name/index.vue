<template>
  <div id="detail"
       class="outer-grid">

    <!-- modals -->
    <modal name="welcome"
           :adaptive="true"
           height="auto">
      <welcome-modal></welcome-modal>
    </modal>

    <!-- modals -->
    <modal name="subscribe"
           :adaptive="true">
      <subscribe-modal :name="name"></subscribe-modal>
    </modal>

    <feeds :name="name"
           :slug="slug"
           :img="logo"
           :channel="channel"></feeds>

    <!-- main content -->
    <main>

      <div class="content-grid">
        <!-- announcement -->
        <announcement v-if="announcement">
          <div v-html="announcement">
          </div>
          <!-- <span class="highlight">Round 1</span> (first 6 hours of crowdsale): Each whitelisted participant will be allowed to contribute anywhere from 0.1 ETH to 1 ETH. <br/>
        <span class="highlight">Round 2</span> (Apr 3rd 15:00 UTC): Each whitelisted participant will be allowed to invest between 0.1 ETH to 2 ETH, excluding the round 1 contribution. <br/>
        <span class="highlight">Round 3</span> (Apr 3 21:00 UTC to Apr 7 09:00 UTC) Each whitelisted participant can contribute as much as you want. -->
        </announcement>

        <div class="major">
          <!-- general info -->
          <section id="general">
            <div class="division">
              <div class="outer flex-container mobile-direction-column">
                <div class="col left">
                  <div class="flex-container no-wrap">
                    <div class="first-column">
                      <img id="ico-logo"
                           :src="logo"
                           :alt="`${name} logo`">
                      <button class="follow-ico"
                              v-on:click="follow()">
                        <icon name="follow">Follow ICO</icon>
                      </button>

                      <list class="links">
                        <list-item v-for="(link, index) of links"
                                   v-if="link.href"
                                   :key="index">
                          <a :href="link.href"
                             target="_blank">
                            <icon :name="link.icon">{{ link.text }}</icon>
                          </a>
                        </list-item>
                      </list>
                    </div>
                    <div class="col second-column">
                      <div class="upper">
                        <div id="name">
                          <h1>
                            {{ name }}
                          </h1>
                          <div class="star"
                               v-on:click="follow()">
                            <icon name="follow"></icon>
                          </div>
                        </div>
                        <div class="description"
                             v-html="description">
                        </div>
                      </div>

                      <!-- hard cap -->
                      <div class="on-mobile-hide">
                        <hard-cap :selected="-1"
                                  :items="hcap.list">
                        </hard-cap>
                      </div>
                      <!-- end of hard cap -->
                      <v-player class="video show-sm"
                                v-if="video != null">
                        <div data-plyr-provider="youtube"
                             :data-plyr-embed-id="video"></div>
                      </v-player>
                    </div>
                  </div>

                </div>
                <div class="right">

                  <v-player class="video show-xs"
                            v-if="video != null">
                    <div data-plyr-provider="youtube"
                         :data-plyr-embed-id="video"></div>
                  </v-player>

                  <!-- hard cap -->
                  <div class="on-mobile-show">
                    <hard-cap :selected="-1"
                              :items="hcap.list">
                    </hard-cap>
                  </div>
                  <!-- end of hard cap -->

                  <v-player class="video show-md"
                            v-if="video != null">
                    <div data-plyr-provider="youtube"
                         :data-plyr-embed-id="video"></div>
                  </v-player>

                  <div class="social-networks"
                       v-if="socials.length > 0">
                    <div class="wrapper">
                      <h6>Follow {{ name }} ICO on:</h6>
                      <div class="list-wrapper">
                        <list direction="horizontal">
                          <list-item v-for="(social, index) of socials"
                                     v-if="social.href"
                                     :key="index">
                            <a :href="social.href"
                               target="_blank">
                              <icon :name="social.icon">
                              </icon>
                            </a>
                          </list-item>
                        </list>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ratings -->
          <section id="ratings">
            <ratings :criterias="criterias.list"
                     :checked="criterias.checked"></ratings>
          </section>
          <!-- end of ratings -->

          <section id="token-supply">
            <div class="division">
              <div class="headline">
                <h2>Token Supply &amp; Distribution</h2>
                <div class="select-currency on-small-mobile-hide">
                  <span class="label">Currency:</span>
                  <dropdown :items="currencies"
                            v-on:change="onCurrencyChange"
                            :default="0"></dropdown>
                </div>
              </div>

              <div class="on-small-mobile-show clearfix">
                <div class="select-currency">
                  <span class="label">Currency:</span>
                  <dropdown :items="currencies"
                            v-on:change="onCurrencyChange"
                            :default="0"></dropdown>
                </div>
              </div>

              <div class="details">
                <div class="switch">
                  <toggle :value="details.show"
                          :onChange="showDetailsChange"></toggle>
                  <div class="text">
                    SHOW DETAILS
                  </div>
                </div>

                <token-supply :supplies="supplies"
                              :shares="shares"
                              :showDetails="details.show"></token-supply>
              </div>
            </div>
          </section>

          <section id="market-returns"
                   v-if="investment != null">
            <div class="division">
              <div class="headline">
                <h2>Market &amp; Returns</h2>
              </div>
              <div class="flex-container main-container">
                <div class="col">
                  <div class="token-price">
                    <h6>{{ symbol }} token price</h6>
                    <list direction="vertical">
                      <list-item v-for="(item, index) of investment.list"
                                 :class="`price-${item.unit}`"
                                 :key="index">
                        <template v-if="item.unit == 'usd'">$</template>
                        {{ item.price }}
                        <span class="unit"
                              v-if="item.unit != 'usd'">{{ item.unit }}</span>
                        <template v-else>
                          <template v-if="investment.change != 0">
                            (<span class="change"
                                  :class="{ 'increase': investment.change > 0 }">
                              <template v-if="investment.change > 0">+</template>{{ investment.change }}%</span>)
                          </template>
                        </template>
                      </list-item>
                    </list>
                  </div>
                  <div class="flex-container extra">
                    <div class="col"
                         v-for="(item, index) of investment.extra"
                         :key="index">
                      <div class="label">{{ item.label }}</div>
                      <div class="value">${{ item.value }}</div>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="returns">
                    <h6>Returns since ICO</h6>
                    <list direction="horizontal">
                      <list-item v-for="(item, index) of investment.list"
                                 :key="index">
                        <div class="circle">
                          {{ item.returns.gain_in_x }}x
                          <div class="unit">{{ item.unit }}</div>
                        </div>
                      </list-item>
                    </list>
                    <div class="note">
                      These numbers show how much the token price has changed relative to the initial ICO token price.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <overlay :css="{ 'background-color': 'rgba(16, 30, 80, 0.8)'}"
                   :show="incomplete">
            <template slot="content">
              <section id="tab">
                <div class="division">
                  <tab :selected="tab.selected">
                    <template slot="menu">
                      <li v-for="(nav, index) of tab.menu"
                          :class="{ 'selected' : tab.selected == index }"
                          :key="index"
                          v-on:click="onTabClick(index)">
                        {{ nav.name }}
                      </li>
                    </template>
                    <template slot="content">
                      <!-- about -->
                      <div id="about"
                           v-if="tab.selected == 0"
                           :key="0">
                        <box>
                          <template slot="heading">
                            Additional Information
                          </template>
                          <template slot="list">
                            <piece v-for="(item, index) of about"
                                   :key="index"
                                   :info="!isEmpty(item.info) ? item.info : null"
                                   :href="item.href">
                              <!-- heading -->
                              <icon :name="item.icon.name"
                                    :options="{
                              css: item.icon.css
                            }"
                                    slot="icon"></icon>
                              <template slot="text">
                                {{ item.label }}
                              </template>
                              <template slot="description">
                                {{ item.description }}
                              </template>
                            </piece>
                          </template>
                        </box>
                      </div>

                      <!-- price and distribution -->
                      <div id="price-distribution"
                           v-if="tab.selected == 1"
                           :key="1">
                        <accordion :selected="[]"
                                   :items="distribution.items">
                          <accordion-item slot-scope="{ item, index }"
                                          :key="index"
                                          :index="index"
                                          :info="!isEmpty(item.info) ? item.info : null"
                                          :href="item.href"
                                          :open="item.open"
                                          :disabled="item.disabled">

                            <!-- heading -->
                            <icon :name="item.icon"
                                  slot="icon"></icon>
                            <template slot="text">
                              {{ item.name }}
                            </template>

                            <template slot="content">
                              <!-- private round -->
                              <template v-if="item.name == 'Private round'">
                                <detail>
                                  <template slot="title">
                                    Price per {{ symbol }}
                                  </template>
                                  <template slot="subtitle">
                                    <template v-if="!isEmpty(item.info)">
                                      <a :href="item.href">
                                        {{ item.info }}
                                      </a>
                                    </template>
                                    <template v-else>
                                      {{ $util.getEmpty() }}
                                    </template>
                                  </template>
                                </detail>
                              </template>

                              <!-- presale -->
                              <template v-if="item.name == 'Presale'">
                                <detail v-for="(tier, index) of distribution.presale"
                                        :key="index"
                                        :link="tier.description.href">
                                  <template slot="title">
                                    Tier {{ index + 1 }} (Price per {{ symbol }})
                                  </template>
                                  <template slot="subtitle">
                                    <a :href="tier.price.href"
                                       target="_blank">
                                      {{ validateInfo(tier.price.value) }} <span v-if="!isEmptyAndTba(tier.price.value)">{{ unit }}</span>
                                    </a>
                                  </template>
                                  <template slot="boxed">
                                    {{ tier.conversion }}
                                  </template>
                                  <template slot="description">
                                    <template v-if="!isEmpty(tier.description.value)">
                                      {{ validateInfo(tier.description.value) }}
                                    </template>
                                  </template>
                                </detail>
                              </template>

                              <!-- crowdsale -->
                              <template v-if="item.name == 'Crowdsale'">
                                <detail v-for="(tier, index) of distribution.crowdsale"
                                        :key="index"
                                        :link="tier.description.href">
                                  <template slot="title">
                                    Tier {{ index + 1 }} (Price per {{ symbol }})
                                  </template>
                                  <template slot="subtitle">
                                    <a :href="tier.price.href"
                                       target="_blank">
                                      {{ validateInfo(tier.price.value) }} <span v-if="!isEmptyAndTba(tier.price.value)">{{ unit }}</span>
                                    </a>
                                  </template>
                                  <template slot="boxed">
                                    {{ tier.conversion }}
                                  </template>
                                  <template slot="description">
                                    <template v-if="!isEmpty(tier.description.value)">
                                      {{ validateInfo(tier.description.value) }}
                                    </template>
                                  </template>
                                </detail>
                              </template>

                              <!-- allocation -->
                              <template v-if="item.name == 'Allocation'">
                                <detail :link="item.description.href">
                                  <template slot="description">
                                    {{ validateInfo(item.description.value) }}
                                  </template>
                                </detail>
                                <detail>
                                </detail>
                              </template>

                              <!-- Distribution -->
                              <template v-if="item.name == 'Distribution'">
                                <detail :link="item.description.href">
                                  <template slot="description">
                                    {{ validateInfo(item.description.value) }}
                                  </template>
                                </detail>
                              </template>
                            </template>
                          </accordion-item>
                        </accordion>
                      </div>

                      <!-- social and hype -->
                      <div id="social-hype"
                           v-if="tab.selected == 2"
                           :key="2">
                        <div class="flex-container">
                          <div class="column col-1 col-md-2"
                               v-for="(group, index) of socialHype"
                               :key="index">
                            <box :icon="group.href != null ? 'open-out' : null">
                              <template slot="heading">
                                {{ group.name }}
                              </template>
                              <template slot="list">
                                <piece v-for="(item, itemIndex) of group.items"
                                       :key="itemIndex"
                                       :info="!isEmpty(item.info) ? item.info : null">
                                  <!-- heading -->
                                  <icon :name="item.icon.name"
                                        :options="{
                                        css: item.icon.css
                                      }"
                                        slot="icon"></icon>
                                  <template slot="text">
                                    {{ item.label }}
                                  </template>
                                </piece>
                              </template>
                            </box>
                          </div>
                        </div>
                      </div>
                    </template>
                  </tab>
                </div>
              </section>
            </template>
            <incomplete slot="front"
                        v-on:proceed="onProceed()"
                        v-on:notified="follow()"></incomplete>
          </overlay>

          <section id="reviews-resources"
                   v-if="reviews.length > 0">
            <div class="division">
              <div class="headline">
                <h2>Reviews &amp; Resources</h2>
              </div>
              <more>
                <div class="review-list">
                  <div class="flex-container">
                    <div class="column col-3 col-md-4"
                         v-for="(item, index) of reviews"
                         :key="index">
                      <review :src="item.src"
                              :value="item.value"
                              :href="item.href"
                              :score="item.score"
                              :total="item.total"></review>
                    </div>
                  </div>
                </div>
              </more>
            </div>
          </section>

          <section id="about-us">
            <div class="division">
              <div class="headline">
                <h2>About</h2>
              </div>
              <more>
                <div v-html="summary">
                </div>
              </more>
              <template v-if="screenshots.length > 0">
                <div class="sub-headline">
                  <h2>Screenshots</h2>
                </div>
                <gallery :images="screenshots"></gallery>
              </template>
            </div>
          </section>

          <section id="cta">
            <div class="flex-container">
              <div class="flex">
                <div class="info-wrapper">
                  <img class="logo"
                       :src="logo"
                       :alt="`${name} logo`">
                  <div class="info">
                    <div class="name">
                      {{ name }} ICO
                    </div>
                    <total-score :score="criterias.checked ? criterias.score : -1"></total-score>
                  </div>
                </div>
              </div>
              <div class="flex web-social col middle on-mobile-hide">
                <list class="social-networks"
                      direction="horizontal">
                  <list-item v-for="(social, index) of cta.socials"
                             :key="index"
                             v-if="social.href">
                    <a :href="social.href"
                       target="_blank">
                      <icon :name="social.name"
                            :options="{
                  css: social.css
                }"></icon>
                    </a>
                  </list-item>
                </list>
              </div>
              <div class="flex">
                <button class="follow-ico reverse"
                        v-on:click="follow()">
                  <icon name="follow">Follow ICO</icon>
                </button>
              </div>
              <div class="flex mobile-social on-mobile-show">
                <list class="social-networks"
                      direction="horizontal">
                  <list-item v-for="(social, index) of cta.socials"
                             :key="index"
                             v-if="social.href">
                    <a :href="social.href"
                       target="_blank">
                      <icon :name="social.name"
                            :options="{
                  css: social.css
                }"></icon>
                    </a>
                  </list-item>
                </list>
              </div>
            </div>
          </section>
        </div>
        <!-- end of major -->

        <section id="disqus">
          <disqus :name="slug"
                  title="ICO Check"></disqus>
        </section>
      </div>

      <section id="others"
               class="fluid">
        <div class="content-grid">
          <div class="division">
            <div class="headline-2">
              <h2>Other ICOs</h2>
            </div>
            <div class="flex-container list">
              <div class="column col-1 col-md-3"
                   v-for="(item, index) of related"
                   :key="index">
                <minimalist :info="item"
                            :selected="-1"></minimalist>
              </div>
            </div>
            <div id="mistake">
              <a href="mailto:mail@ico-check.com?Subject=Mistake on Agora (VOTE) - ICO (Token Crowd Sale) information about Agora - ICO Check ICO">
                Found a mistake? Let us know!
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>

<script>
import Announcement from "@/components/v2/announcement";
import List from "@/components/v2/list";
import ListItem from "@/components/v2/list/item";
import Icon from "@/components/v2/icon/";
import HardCap from "@/components/v2/hard-cap";
import Ratings from "@/components/v2/ratings";
import Dropdown from "@/components/v2/dropdown";
import Toggle from "@/components/v2/toggle";
import TokenSupply from "@/components/v2/token-supply";
import Tab from "@/components/v2/tab";
import Accordion from "@/components/v2/accordion";
import AccordionItem from "@/components/v2/accordion/item";
import Detail from "@/components/v2/detail";
import Box from "@/components/v2/box";
import Piece from "@/components/v2/piece";
import Review from "@/components/v2/review";
import More from "@/components/v2/more";
import Overlay from "@/components/v2/overlay";
import Gallery from "@/components/v2/gallery";
import Minimalist from "@/components/v2/minimalist";
import TotalScore from "@/components/v2/ratings/total";
import Incomplete from "@/components/v2/incomplete";
import SubscribeModal from "@/components/v2/modal/subscribe";
import WelcomeModal from "@/components/v2/modal/welcome";
import Disqus from "@/components/v2/disqus";
import Feeds from "@/components/v2/feeds";
import VPlayer from "@/components/v2/v-player";

export default {
  components: {
    Announcement,
    List,
    ListItem,
    Icon,
    HardCap,
    Ratings,
    Dropdown,
    Toggle,
    TokenSupply,
    Tab,
    Accordion,
    AccordionItem,
    Detail,
    Box,
    Piece,
    Review,
    More,
    Overlay,
    Gallery,
    Minimalist,
    TotalScore,
    Incomplete,
    SubscribeModal,
    WelcomeModal,
    Disqus,
    Feeds,
    VPlayer
  },

  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.metaDescription
        },
        { name: "image", content: this.logo },
        { name: "og:title", content: this.title },
        { name: "og:description", content: this.metaDescription },
        { name: "og:image", content: this.logo },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: this.title },
        { name: "twitter:description", content: this.metaDescription },
        { name: "twitter:image", content: this.logo },

        { "http-equiv": "cache-control", content: "max-age=2592000, public" },
        { "http-equiv": "pragma", content: "max-age=2592000, public" },
        { "http-equiv": "expires", content: "1" }
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          src: "js/hotjar-heatmap.js"
        },
        {
          type: "application/ld+json",
          innerHTML: `{ "@context": "http://schema.org", "@type": "PostalAddress", "name": "${
            this.title
          }", "description": "${this.metaDescription}", "logo": "${this.logo}"}`
        }
      ]
    };
  },

  async asyncData({ params, store, redirect, error }) {
    let slug = params.name;
    var index = slug.lastIndexOf("-");
    const isValid = slug.slice(index + 1) == "ico";
    const name = slug.slice(0, index);
    if (isValid) {
      slug = name;
    }
    let details = {};
    let response = null;
    try {
      response = await Promise.all([store.dispatch(`ico`, slug)]);
      if (response[0].status == 200) {
        if (!isValid) {
          redirect(`/${slug}-ico`);
          return;
        }
        details = response[0].data;
      }
    } catch (e) {
      error({
        statusCode: 404
      });
      return;
    }

    return {
      slug,
      details
    };
  },

  mounted() {
    this.getInvestment();
    this.$store.dispatch("related", this.slug);
  },

  data: () => ({
    details: {
      show: true
    },
    tab: {
      selected: 1,
      menu: [
        {
          name: "About"
        },
        {
          name: "Price & Distribution"
        },
        {
          name: "Social Hype"
        }
      ]
    },

    proceed: false,
    currency: "",
    realCurrency: "",
    investment_raw: null
  }),

  watch: {
    currency(unit) {
      const ico = this.slug;

      let url = `ico`;
      let params = ico;

      if (unit != "") {
        url = `convert`;
        params = {
          ico,
          unit
        };
      }

      this.$store
        .dispatch(url, params)
        .then(response => {
          if (response.status === 200) {
            this.details = response.data;
            this.realCurrency = unit;
          }
        })
        .catch(error => {
          //error
        });
    }
  },

  computed: {
    HostName() {
      return this.$store.state.settings.hostname;
    },

    title() {
      let symbol = "";
      if (!this.isEmptyAndTba(this.symbol)) {
        symbol = `(${this.symbol}) `;
      }
      return `${
        this.name
      } ${symbol} - ICO (Token Crowd Sale) information about ${
        this.name
      } - ICO Check`;
    },

    metaDescription() {
      let value = null;
      const description = this.description;
      if (!this.isEmptyAndTba(description)) {
        let limit = description.length;
        if (limit > 160) {
          limit = 160;
        }
        value = description.substring(0, limit);
      }
      return value;
    },

    name() {
      return this.getDetailAttribute("project-name", "value");
    },

    logo() {
      let logo = null;
      const images = this.details["images"];
      if (images) {
        logo = images["logo_small"];
      }
      return logo;
    },

    type() {
      return this.details["ico_type"];
    },

    channel() {
      return {
        telegram: this.getDetailAttribute("project-telegram-url", "value"),
        medium: this.getDetailAttribute("project-medium-url", "value")
      };
    },

    incomplete() {
      let status = false;
      if (this.type != null && this.type == "BASIC") {
        if (this.proceed == true) {
          status = false;
        } else {
          status = true;
        }
      }
      return status;
    },

    description() {
      const desc = this.getDetailAttribute("project-description", "value");
      let value = null;
      if (!this.isEmptyAndTba(desc)) {
        value = desc;
      }
      return value;
    },

    summary() {
      let desc = this.description;
      let summary = this.details.executive_summary;
      let value = null;
      if (!this.isEmptyAndTba(summary)) {
        value = summary;
      } else {
        value = desc;
      }
      return value;
    },

    video() {
      let url = this.getDetailAttribute("project-youtube-main-vid", "value");
      if (!this.isEmptyAndTba(url)) {
        const data = url.match("[^/]+$");
        if (data != null && data.length > 0) {
          return data[0];
        }
      }
      return null;
    },

    currencies() {
      return this.$store.state.all.currencies;
    },

    symbol() {
      return this.getDetailAttribute("token-symbol", "value");
    },

    unit() {
      return this.getConvertedUnit("token-price");
    },

    softcap_unit() {
      let unit = this.getConvertedUnit("soft-cap");
      if (unit == null) {
        unit = this.hardcap_unit;
      }
      return unit;
    },

    hardcap_unit() {
      let unit = this.getConvertedUnit("hard-cap");
      if (unit == null) {
        unit = this.unit;
      }
      return unit;
    },

    pegged_to() {
      return {
        "token-price": this.getDetailAttribute(
          "token-price-pegged-to",
          "value"
        ),
        "soft-cap": this.getDetailAttribute("soft-cap-pegged-to", "value"),
        "hard-cap": this.getDetailAttribute("hard-cap-pegged-to", "value")
      };
    },

    total_token_supply() {
      return this.details["total-token-supply"];
    },

    marketcap_total_supply() {
      return this.details["marketcap-total-supply"];
    },

    announcement() {
      return this.details.update_text;
    },

    links() {
      const whitepapers = [];
      let index = 1;
      let ctr = 0;
      while (ctr < 2) {
        const href = this.getDetailAttribute(
          `project-whitepaper-url-${ctr + 1}`,
          "value"
        );
        if (!this.$util.isDetailEmpty(href)) {
          whitepapers.push({
            href: href,
            icon: "whitepaper",
            text: `Whitepaper ${index}`
          });
          index++;
        }
        ctr++;
      }

      let list = [
        {
          href: this.getDetailAttribute("project-url", "value"),
          icon: "website",
          text: "Website"
        },
        {
          href: this.getDetailAttribute("whitelist-url", "value"),
          icon: "whitelist",
          text: "Whitelist"
        }
      ];

      list = list.concat(whitepapers);
      list.push({
        href: this.getDetailAttribute("project-prototype-url", "value"),
        icon: "prototype",
        text: "Prototype"
      });

      return list;
    },

    hcap() {
      const list = [
        {
          name: "whitelist",
          date: {
            end: {
              value: this.getDate(
                this.getDetailAttribute("whitelist-until-date", "new_value")
              ),
              link: this.getDetailAttribute("whitelist-url", "value")
            }
          },
          notes: this.getDetailAttribute("whitelist-text", "value")
        },
        {
          name: "presale",
          date: {
            start: {
              value: this.getDate(
                this.getDetailAttribute("presale-start", "new_value")
              ),
              link: this.getDetailAttribute("presale-start", "source_field")
            },
            end: {
              value: this.getDate(
                this.getDetailAttribute("presale-end", "new_value")
              ),
              link: this.getDetailAttribute("presale-end", "source_field")
            }
          },
          notes: this.getDetailAttribute("presale-start", "link_text_source")
        },
        {
          name: "crowdsale",
          date: {
            start: {
              value: this.getDate(
                this.getDetailAttribute("crowdsale-start", "new_value")
              ),
              link: this.getDetailAttribute("crowdsale-start", "source_field")
            },
            end: {
              value: this.getDate(
                this.getDetailAttribute("crowdsale-end", "new_value")
              ),
              link: this.getDetailAttribute("crowdsale-end", "source_field")
            }
          },
          notes: this.getDetailAttribute("crowdsale-start", "link_text_source")
        }
      ];

      return {
        list
      };
    },

    socials() {
      const names = [
        "medium",
        "facebook",
        "twitter",
        "telegram",
        "reddit",
        "github"
      ];

      const list = [];
      names.forEach(name => {
        const value = this.getDetailAttribute(`project-${name}-url`, "value");

        if (!this.isEmptyAndTba(value)) {
          list.push({
            href: value,
            icon: name
          });
        }
      });

      return list;
    },

    about() {
      const bannedCountries = this.getDetailAttribute(
        "banned-countries",
        "value"
      );
      const numOfCountries = bannedCountries.match(/([^,\s]+)/g).length;
      return [
        {
          label: "Participation with",
          icon: {
            name: "participation-with",
            css: {
              svg: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              }
            }
          },
          info: this.getDetailAttribute(`currencies-accepted-in-ico`, "value"),
          href: this.getDetailAttribute(
            `currencies-accepted-in-ico`,
            "source_field"
          ),
          description: this.getDetailAttribute(
            "currencies-accepted-in-ico",
            "link_text_source"
          )
        },
        {
          label: "Token Type",
          icon: {
            name: "key",
            css: {
              group: {
                width: "21px",
                breakpoints: {
                  767: {
                    height: "19px"
                  }
                }
              },
              icon: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              },
              svg: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              }
            }
          },
          info: this.$util.capitalizeFirstLetter(
            this.getDetailAttribute("project-token-type", "value")
          ),
          href: this.$util.capitalizeFirstLetter(
            this.getDetailAttribute("project-token-type", "source_field")
          ),
          description: this.getDetailAttribute(
            "project-token-type",
            "link_text_source"
          )
        },
        {
          label: "Category",
          icon: {
            name: "category",
            css: {
              group: {
                width: "21px",
                breakpoints: {
                  767: {
                    height: "19px"
                  }
                }
              },
              icon: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              },
              svg: {
                height: "12px",
                breakpoints: {
                  767: {
                    height: "11px"
                  }
                }
              }
            }
          },
          info: this.getDetailAttribute(`project-category`, "value"),
          href: this.getDetailAttribute(`project-category`, "source_field"),
          description: this.getDetailAttribute(
            "project-category",
            "link_text_source"
          )
        },
        {
          label: "Market",
          icon: {
            name: "market",
            css: {
              group: {
                width: "21px",
                breakpoints: {
                  767: {
                    height: "19px"
                  }
                }
              },
              icon: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              },
              svg: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              }
            }
          },
          info: this.getDetailAttribute(`project-market`, "value"),
          href: this.getDetailAttribute(`project-market`, "source_field"),
          description: this.getDetailAttribute(
            "project-market",
            "link_text_source"
          )
        },
        {
          label: "Competition",
          icon: {
            name: "competition",
            css: {
              group: {
                width: "21px",
                breakpoints: {
                  767: {
                    height: "19px"
                  }
                }
              },
              icon: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              },
              svg: {
                height: "14px",
                breakpoints: {
                  767: {
                    height: "12px"
                  }
                }
              }
            }
          },
          info: this.getDetailAttribute(`project-competition`, "value"),
          href: this.getDetailAttribute(`project-competition`, "source_field"),
          description: this.getDetailAttribute(
            "project-competition",
            "link_text_source"
          )
        },
        {
          label: "Banned Countries",
          icon: {
            name: "globe",
            css: {
              group: {
                width: "21px",
                breakpoints: {
                  767: {
                    height: "19px"
                  }
                }
              },
              icon: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              },
              svg: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              }
            }
          },
          description: bannedCountries,
          href: this.getDetailAttribute("banned-countries", "source_field"),
          info: `${numOfCountries} countries`
        },
        {
          label: "Token a security",
          icon: {
            name: "key",
            css: {
              group: {
                width: "21px",
                breakpoints: {
                  767: {
                    height: "19px"
                  }
                }
              },
              icon: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              },
              svg: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              }
            }
          },
          info: this.$util.capitalizeFirstLetter(
            this.getDetailAttribute("is-token-a-security", "value")
          ),
          href: this.$util.capitalizeFirstLetter(
            this.getDetailAttribute("is-token-a-security", "source_field")
          ),
          description: this.getDetailAttribute(
            "is-token-a-security",
            "link_text_source"
          )
        },
        {
          label: "Team Vesting",
          icon: {
            name: "vesting",
            css: {
              group: {
                width: "21px",
                breakpoints: {
                  767: {
                    height: "19px"
                  }
                }
              },
              icon: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              },
              svg: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              }
            }
          },
          info: this.$util.capitalizeFirstLetter(
            this.getDetailAttribute("team-token-vested-in-months", "value")
          ),
          href: this.$util.capitalizeFirstLetter(
            this.getDetailAttribute(
              "team-token-vested-in-months",
              "source_field"
            )
          ),
          description: this.getDetailAttribute(
            "team-token-vested-in-months",
            "link_text_source"
          )
        },
        {
          label: "Tokens Burned",
          icon: {
            name: "fire",
            css: {
              group: {
                width: "21px",
                breakpoints: {
                  767: {
                    height: "19px"
                  }
                }
              },
              icon: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              },
              svg: {
                height: "20px",
                breakpoints: {
                  767: {
                    height: "18px"
                  }
                }
              }
            }
          },
          info: this.$util.capitalizeFirstLetter(
            this.getDetailAttribute("remaining-tokens-burned", "value")
          ),
          href: this.$util.capitalizeFirstLetter(
            this.getDetailAttribute("remaining-tokens-burned", "source_field")
          ),
          description: this.getDetailAttribute(
            "remaining-tokens-burned",
            "link_text_source"
          )
        }
      ];
    },

    distribution() {
      const keys = {
        presale: [
          "presale-tier-one",
          "presale-tier-two",
          "presale-tier-three",
          "presale-tier-four",
          "presale-tier-five",
          "presale-tier-six"
        ],
        crowdsale: [
          "tier-one",
          "tier-two",
          "tier-three",
          "tier-four",
          "tier-five",
          "tier-six"
        ]
      };

      const presale = this.generateTiers(keys.presale);
      const crowdsale = this.generateTiers(keys.crowdsale);

      return {
        selected: 1,
        items: [
          {
            name: "Private round",
            icon: "private-round",
            info: this.getDetailAttribute(
              "privat-round-price-per-token",
              "value"
            ),
            href: this.getDetailAttribute(
              "privat-round-price-per-token",
              "source_field"
            )
          },
          {
            name: "Presale",
            icon: "presale",
            info: presale.info,
            disabled: presale.tiers.length == 0
          },
          {
            name: "Crowdsale",
            icon: "crowdsale",
            info: crowdsale.info,
            disabled: crowdsale.tiers.length == 0
          },
          {
            name: "Allocation",
            icon: "allocation",
            info: this.getDetailAttribute("token-per-participant", "value"),
            href: this.getDetailAttribute(
              "token-per-participant",
              "source_field"
            ),
            description: {
              value: this.getDetailAttribute(
                "token-per-participant",
                "link_text_source"
              ),
              href: this.getDetailAttribute(
                "token-per-participant",
                "source_field"
              )
            },
            disabled: this.isEmptyAndTba(
              this.getDetailAttribute(
                "token-per-participant",
                "link_text_source"
              )
            )
          },
          {
            name: "Distribution",
            icon: "distribution",
            info: this.getDetailAttribute("token-distribution-date", "value"),
            href: this.getDetailAttribute(
              "token-distribution-date",
              "source_field"
            ),
            description: {
              value: this.getDetailAttribute(
                "token-distribution-note",
                "value"
              ),
              href: this.getDetailAttribute(
                "token-distribution-note",
                "source_field"
              )
            },
            disabled: this.isEmptyAndTba(
              this.getDetailAttribute("token-distribution-note", "value")
            )
          }
        ],
        presale: presale.tiers,
        crowdsale: crowdsale.tiers
      };
    },

    socialHype() {
      return [
        {
          name: "GITHUB",
          href: this.getDetailAttribute("project-github-url", "value"),
          items: [
            {
              label: "Respositories",
              icon: {
                name: "repository",
                css: {
                  group: {
                    width: "20px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "20px",
                    breakpoints: {
                      767: {
                        height: "18px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-github-repositories", "value")
              )
            },
            {
              label: "Commits",
              icon: {
                name: "commit",
                css: {
                  group: {
                    width: "20px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "11px",
                    breakpoints: {
                      767: {
                        height: "10px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-github-commits", "value")
              )
            },
            {
              label: "Forks",
              icon: {
                name: "fork",
                css: {
                  group: {
                    width: "20px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "20px",
                    breakpoints: {
                      767: {
                        height: "18px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-github-forks", "value")
              )
            },
            {
              label: "Issues",
              icon: {
                name: "warning",
                css: {
                  group: {
                    width: "20px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "20px",
                    breakpoints: {
                      767: {
                        height: "18px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-github-issues", "value")
              )
            },
            {
              label: "Contributors",
              icon: {
                name: "users",
                css: {
                  group: {
                    width: "20px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "16px",
                    breakpoints: {
                      767: {
                        height: "14px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-github-contributors", "value")
              )
            },
            {
              label: "Last commit",
              icon: {
                name: "date2",
                css: {
                  group: {
                    width: "20px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "20px",
                    breakpoints: {
                      767: {
                        height: "18px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("github-last-commit", "value")
              )
            },
            {
              label: "Watchers",
              icon: {
                name: "watcher",
                css: {
                  group: {
                    width: "20px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "15px",
                    breakpoints: {
                      767: {
                        height: "13px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-github-watches", "value")
              )
            },
            {
              label: "Stars",
              icon: {
                name: "star",
                css: {
                  group: {
                    width: "20px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "19px",
                    breakpoints: {
                      767: {
                        height: "17px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-github-stars", "value")
              )
            }
          ]
        },
        {
          name: "SOCIAL MEDIA",
          items: [
            {
              label: "Slack",
              icon: {
                name: "slack",
                css: {
                  group: {
                    width: "31px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "20px",
                    breakpoints: {
                      767: {
                        height: "18px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-slack-members", "value")
              )
            },
            {
              label: "Facebook",
              icon: {
                name: "facebook-square",
                css: {
                  group: {
                    width: "31px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "20px",
                    breakpoints: {
                      767: {
                        height: "18px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-facebook-followers", "value")
              )
            },
            {
              label: "Bitcointalk",
              icon: {
                name: "bitcoin",
                css: {
                  group: {
                    width: "31px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "20px",
                    breakpoints: {
                      767: {
                        height: "18px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-bitcointalk-posts", "value")
              )
            },
            {
              label: "Telegram",
              icon: {
                name: "telegram",
                css: {
                  group: {
                    width: "31px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "17px",
                    breakpoints: {
                      767: {
                        height: "15px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-telegram-members", "value")
              )
            },
            {
              label: "Twitter",
              icon: {
                name: "twitter",
                css: {
                  group: {
                    width: "31px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "16px",
                    breakpoints: {
                      767: {
                        height: "14px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-twitter-followers", "value")
              )
            },
            {
              label: "Reddit",
              info: "",
              icon: {
                name: "reddit",
                css: {
                  group: {
                    width: "31px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "20px",
                    breakpoints: {
                      767: {
                        height: "18px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("nr-of-reddit-posts", "value")
              )
            },
            {
              label: "Alexa Rank Global",
              icon: {
                name: "alexa-rank-global",
                css: {
                  group: {
                    width: "31px",
                    breakpoints: {
                      767: {
                        width: "28px"
                      }
                    }
                  },
                  icon: {
                    height: "20px"
                  },
                  svg: {
                    height: "20px",
                    breakpoints: {
                      767: {
                        height: "18px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("url-alexa-rank-global", "value")
              )
            },
            {
              label: "Alexa Rank USA",
              info: "",
              icon: {
                name: "alexa-rank-usa",
                css: {
                  group: {
                    width: "31px",
                    top: "17px",
                    breakpoints: {
                      767: {
                        width: "28px",
                        top: "10px"
                      }
                    }
                  },
                  icon: {
                    height: "26px"
                  },
                  icon: {
                    height: "26px",
                    breakpoints: {
                      767: {
                        height: "24px"
                      }
                    }
                  }
                }
              },
              info: this.$util.numberFormat(
                this.getDetailAttribute("url-alexa-rank-usa", "value")
              )
            }
          ]
        }
      ];
    },

    supplies() {
      const total_token_supply = this.total_token_supply;
      const marketcap_total_supply = this.marketcap_total_supply;

      let supplies = [
        {
          key: "soft-cap",
          note: "soft-cap-note",
          name: "Softcap",
          unit: this.softcap_unit,
          is_percentage: false
        },
        {
          key: "hard-cap",
          note: "hard-cap-note",
          name: "Hardcap",
          unit: this.hardcap_unit,
          is_percentage: false
        },
        {
          key: "percentage-sold-to-public",
          name: "Sold to Public",
          unit: this.symbol,
          is_percentage: true
        },
        {
          key: "marketcap-circulating-supply",
          name: "Circulating Marketcap",
          unit: this.unit,
          is_percentage: true
        },
        {
          key: "total-tokens-in-circulation-after-ico",
          name: "Circulating Coins after ICO",
          unit: this.symbol,
          is_percentage: true
        }
      ];
      const details = this.details;
      supplies = supplies.map(supply => {
        const obj = {
          percentage: 0,
          is_percentage: false,
          detail: null
        };

        //value
        let total_supply = 0;
        let value = this.getDetailAttribute(supply.key, "value");

        if (
          supply.key == "percentage-sold-to-public" ||
          supply.key == "total-tokens-in-circulation-after-ico"
        ) {
          total_supply = this.getProp(total_token_supply, "value");
        } else {
          total_supply = this.getProp(marketcap_total_supply, "value");
        }

        let percentage = 0;
        obj.is_percentage = supply.is_percentage;
        if (!this.isEmptyAndTba(value)) {
          if (!this.isEmptyAndTba(total_supply)) {
            if (supply.key == "percentage-sold-to-public") {
              value = total_supply * value;
            }

            //percentage
            percentage = 100;
            if (obj.is_percentage) {
              percentage = value / total_supply;
              percentage = percentage * 100;
            }
          } else {
            percentage = 100;
          }
        }

        obj.value = value;
        obj.percentage = percentage;

        obj.href = this.getDetailAttribute(supply.key, "source_field");
        let detail = null;
        //note
        if (supply.note) {
          detail = this.getDetailAttribute(supply.note, "value");
        } else {
          detail = this.getDetailAttribute(supply.key, "link_text_source");
        }
        obj.detail = detail;
        supply = Object.assign({}, supply, obj);
        return supply;
      });

      return supplies;
    },

    shares() {
      const details = this.details;
      const total_token_supply = this.total_token_supply;
      const marketcap_total_supply = this.marketcap_total_supply;
      const values = [
        {
          key: "private-round-token-supply",
          name: "Private"
        },
        {
          key: "team-token-supply",
          name: "Team"
        },
        {
          key: "other-token-supply",
          name: "Other"
        },
        {
          key: "crowdsale-token-supply",
          name: "Crowd"
        }
      ];

      const items = [];
      values.forEach(share => {
        let value = this.getDetailAttribute(share.key, "value");
        let percentage = 0;

        if (
          !this.isEmptyAndTba(value) &&
          !this.isEmptyAndTba(this.getProp(total_token_supply, "value"))
        ) {
          percentage = value / this.getProp(total_token_supply, "value");
          percentage = percentage * 100;
        }

        const href = this.getDetailAttribute(share.key, "source_field");

        items.push({
          name: share.name,
          value,
          percentage,
          href,
          detail: this.getDetailAttribute(share.key, "link_text_source")
        });
      });

      return {
        total: {
          value: this.getProp(total_token_supply, "value"),
          unit: this.symbol,
          href: this.getProp(total_token_supply, "source_field"),
          detail: this.getProp(marketcap_total_supply, "link_text_source")
        },
        values: items,
        colors: ["#de7b8f", "#74dbe0", "#afe341", "#7693cd"]
      };
    },

    screenshots() {
      const images = this.details["ico_screenshots"];
      const list = [];
      if (images != null) {
        images.forEach(item => {
          list.push(item);
        });
      }
      return list;
    },

    related() {
      const icos = this.$store.state.v2Icos.related;
      const parent = this;
      const list = [];
      icos.forEach(ico => {
        const detail = ico.all_details;
        const slug = ico.name;
        const name = parent.getProp(detail["project-name"], "value");
        const score = 0;
        const cap = parent.getProp(detail["hard-cap"], "value");
        const unit = parent.getProp(detail["hard-cap-pegged-to"], "value");
        const symbol = parent.getProp(detail["token-symbol"], "value");
        const src = `https://api.ico-check.com/uploads/${parent.getProp(
          ico["images"],
          "logo_small"
        )}`;

        let sales = {};
        const keys = ["presale", "crowdsale"];

        keys.forEach(key => {
          const obj = {};
          obj[key] = {
            date: {
              start: {
                value: parent.getDate(
                  parent.getProp(detail[`${key}-start`], "new_value")
                )
              },
              end: {
                value: parent.getDate(
                  parent.getProp(detail[`${key}-end`], "new_value")
                )
              }
            },
            notes: parent.getProp(detail[`${key}-start`], "link_text_source")
          };
          sales = Object.assign({}, sales, obj);
        });

        //whitelist
        const obj = {};
        obj["whitelist"] = {
          date: {
            end: {
              value: parent.getDate(
                parent.getProp(detail["whitelist-until-date"], "new_value")
              )
            }
          },
          notes: parent.getProp(detail["whitelist-text"], "value")
        };
        sales = Object.assign({}, sales, obj);

        list.push({
          slug,
          name,
          cap,
          unit,
          symbol,
          src,
          score,
          sales
        });
      });
      return list;
    },

    cta() {
      return {
        socials: [
          {
            name: "medium",
            href: this.getDetailAttribute("project-medium-url", "value"),
            css: {
              svg: {
                height: "11px",
                breakpoints: {
                  767: {
                    height: "10px"
                  }
                }
              }
            }
          },
          {
            name: "facebook",
            href: this.getDetailAttribute("project-facebook-url", "value"),
            css: {
              svg: {
                height: "14px",
                breakpoints: {
                  767: {
                    height: "13px"
                  }
                }
              }
            }
          },
          {
            name: "twitter",
            href: this.getDetailAttribute("project-twitter-url", "value"),
            css: {
              svg: {
                height: "11px",
                breakpoints: {
                  767: {
                    height: "10px"
                  }
                }
              }
            }
          },
          {
            name: "megaphone2",
            href: this.getDetailAttribute("project-telegram-url", "value"),
            css: {
              svg: {
                height: "15px",
                breakpoints: {
                  767: {
                    height: "14px"
                  }
                }
              }
            }
          },
          {
            name: "reddit",
            href: this.getDetailAttribute("project-reddit-url", "value"),
            css: {
              svg: {
                height: "14px",
                breakpoints: {
                  767: {
                    height: "13px"
                  }
                }
              }
            }
          },
          {
            name: "github",
            href: this.getDetailAttribute("project-github-url", "value"),
            css: {
              svg: {
                height: "18px",
                breakpoints: {
                  767: {
                    height: "16px"
                  }
                }
              }
            }
          },
          {
            name: "slack2",
            href: this.getDetailAttribute("project-slack-url", "value"),
            css: {
              svg: {
                height: "15px",
                breakpoints: {
                  767: {
                    height: "13px"
                  }
                }
              }
            }
          },
          {
            name: "bitcoin2",
            href: this.getDetailAttribute("project-bitcointalk-url", "value"),
            css: {
              svg: {
                height: "15px",
                breakpoints: {
                  767: {
                    height: "13px"
                  }
                }
              }
            }
          },
          {
            name: "kakaotalk",
            href: this.getDetailAttribute("project-kakaotalk-url", "value"),
            css: {
              svg: {
                height: "15px",
                breakpoints: {
                  767: {
                    height: "13px"
                  }
                }
              }
            }
          },
          {
            name: "wechat",
            href: this.getDetailAttribute("project-wechat-url", "value"),
            css: {
              svg: {
                height: "15px",
                breakpoints: {
                  767: {
                    height: "13px"
                  }
                }
              }
            }
          },
          // {
          //   name: "steemit",
          //   href: this.getDetailAttribute("project-steemit-url", "value"),
          //   css: {
          //     svg: {
          //       height: "15px"
          //     }
          //   }
          // },
          // {
          //   name: "linkedin",
          //   href: this.getDetailAttribute("project-linkedin-url", "value"),
          //   css: {
          //     svg: {
          //       height: "12px"
          //     }
          //   }
          // },
          // {
          //   name: "discord",
          //   href: this.getDetailAttribute("project-discord-url", "value"),
          //   css: {
          //     svg: {
          //       height: "11px"
          //     }
          //   }
          // },
          // {
          //   name: "email",
          //   href: this.getDetailAttribute("project-email-url", "value"),
          //   css: {
          //     svg: {
          //       height: "12px"
          //     }
          //   }
          // },
          {
            name: "blog",
            href: this.getDetailAttribute("project-blog-url", "value"),
            css: {
              svg: {
                height: "17px",
                breakpoints: {
                  767: {
                    height: "15px"
                  }
                }
              }
            }
          }
        ]
      };
    },

    reviews() {
      const reviews = [
        {
          src: "/v2/images/logos/ico-tracker.png",
          value: this.getDetailAttribute("icotrackernet", "value"),
          href: this.getDetailAttribute("icotrackernet", "source_field")
        },
        {
          src: "/v2/images/logos/hacked.png",
          value: this.getDetailAttribute("hackedcom", "value"),
          href: this.getDetailAttribute("hackedcom", "source_field")
        },
        {
          src: "/v2/images/logos/ico-bench.png",
          value: this.getDetailAttribute("icobenchcom", "value"),
          href: this.getDetailAttribute("icobenchcom", "source_field")
        },
        {
          src: "/v2/images/logos/ico-alert.png",
          value: this.getDetailAttribute("wwwicoalertcom", "value"),
          href: this.getDetailAttribute("wwwicoalertcom", "source_field")
        },
        {
          src: "/v2/images/logos/ico-bazaar.png",
          value: this.getDetailAttribute("icobazaarcom", "value"),
          href: this.getDetailAttribute("icobazaarcom", "source_field")
        },
        {
          src: "/v2/images/logos/crush-crypto.png",
          value: this.getDetailAttribute("crushcryptocom", "value"),
          href: this.getDetailAttribute("crushcryptocom", "source_field")
        },
        {
          src: "/v2/images/logos/ico-drops.png",
          value: this.getDetailAttribute("icodrops", "value"),
          href: this.getDetailAttribute("icodrops", "source_field")
        },
        {
          src: "/v2/images/logos/tgo-networks.png",
          value: this.getDetailAttribute("tgo-network", "value"),
          href: this.getDetailAttribute("tgo-network", "source_field")
        },
        {
          src: "/v2/images/logos/top7-icos.png",
          value: this.getDetailAttribute("top-seven-ico", "value"),
          href: this.getDetailAttribute("top-seven-ico", "source_field")
        },
        {
          src: "/v2/images/logos/smith-crown.png",
          value: this.getDetailAttribute("wwwsmithandcrowncom", "value"),
          href: this.getDetailAttribute("wwwsmithandcrowncom", "source_field")
        },
        {
          src: "/v2/images/logos/ico-rating.png",
          value: this.getDetailAttribute("wwwicoratingcom", "value"),
          href: this.getDetailAttribute("wwwicoratingcom", "source_field")
        },
        {
          src: "/v2/images/logos/coin-schedule.png",
          value: this.getDetailAttribute("wwwcoinschedulecom", "value"),
          href: this.getDetailAttribute("wwwcoinschedulecom", "source_field")
        },
        {
          src: "/v2/images/logos/crypto-briefing.png",
          value: this.getDetailAttribute(
            "crypto-briefing-ico-reviews",
            "value"
          ),
          href: this.getDetailAttribute(
            "crypto-briefing-ico-reviews",
            "source_field"
          )
        },
        {
          src: "/v2/images/logos/crypto-projects.png",
          value: this.getDetailAttribute("crypto-projects", "value"),
          href: this.getDetailAttribute("crypto-projects", "source_field")
        },
        {
          src: "/v2/images/logos/ico-reports.png",
          value: this.getDetailAttribute("at-ico-reports", "value"),
          href: this.getDetailAttribute("at-ico-reports", "source_field")
        },
        {
          src: "/v2/images/logos/lendex.png",
          value: this.getDetailAttribute("lendex0", "value"),
          href: this.getDetailAttribute("lendex0", "source_field")
        },
        {
          src: "/v2/images/logos/liu-cryptos.png",
          value: this.getDetailAttribute(
            "liu-cryptos-temperature-sheet",
            "value"
          ),
          href: this.getDetailAttribute(
            "liu-cryptos-temperature-sheet",
            "source_field"
          )
        },
        {
          src: "/v2/images/logos/logo-sergio-ico.png",
          value: this.getDetailAttribute("sergiogarciafer", "value"),
          href: this.getDetailAttribute("sergiogarciafer", "source_field")
        },
        {
          src: "/v2/images/logos/mandys-ico.png",
          value: this.getDetailAttribute("get-rich-with-mandy", "value"),
          href: this.getDetailAttribute("get-rich-with-mandy", "source_field")
        },
        {
          src: "/v2/images/logos/token-metrics.png",
          value: this.getDetailAttribute("token-metrics", "value"),
          href: this.getDetailAttribute("token-metrics", "source_field")
        },
        {
          src: "/v2/images/logos/the-court.png",
          value: this.getDetailAttribute("the-court", "value"),
          href: this.getDetailAttribute("the-court", "source_field")
        },
        {
          src: "/v2/images/logos/the-kript-keeper.png",
          value: this.getDetailAttribute("the-kript-keeper", "value"),
          href: this.getDetailAttribute("the-kript-keeper", "source_field")
        },
        {
          src: "/v2/images/logos/walrus-cap.png",
          value: this.getDetailAttribute("walrus-cap", "value"),
          href: this.getDetailAttribute("walrus-cap", "source_field")
        }
      ];
      const list = [];
      reviews.forEach(item => {
        if (!this.isEmptyAndTba(item.value)) {
          list.push(item);
        }
      });
      return list;
    },

    scroll: {
      get() {
        return this.$store.state.all.body.scroll;
      },

      set(value) {
        this.$store.commit("SCROLL", value);
      }
    },

    criterias() {
      let criterias = this.details["ico_ratings"];
      let list = [
        {
          name: "Team",
          rating: 0
        },
        {
          name: "Tech",
          rating: 0
        },
        {
          name: "Metric",
          rating: 0
        },
        {
          name: "Hype",
          rating: 0
        },
        {
          name: "Overall",
          rating: 0
        }
      ];
      let checked = false;
      let score = 0;
      if (criterias != null) {
        checked = true;
        list = list.map(item => {
          criterias.forEach(criteria => {
            if (item.name == criteria.text) {
              item.rating = criteria.total;
              const decimal = (criteria.total * 25) / 100;
              score += decimal;
            }
          });
          return item;
        });
      }
      return {
        list,
        checked,
        score
      };
    },

    investment() {
      let all = null;
      const data = this.investment_raw;
      if (data != null) {
        const list = [];
        const extra = [];
        const units = ["usd", "eth", "btc"];

        units.forEach(unit => {
          list.push({
            unit,
            price: data["current-price"][`price_${unit}`],
            returns: data[`returns_${unit}`]
          });
        });
        const change = data["current-price"]["change_24hr"];
        const volume = this.$util.numberFormat(
          data["current-price"]["volume_24h"]
        );
        const cap = this.$util.numberFormat(
          data["current-price"]["market_cap"]
        );

        all = {
          list,
          change,
          extra: [
            {
              label: "24h Volume",
              value: volume
            },
            {
              label: "Market Cap",
              value: cap
            }
          ]
        };
      }

      return all;
    }
  },

  methods: {
    feedStateChanged(id) {
      this.feeds.forEach((feed, index) => {
        this.feeds[index].open = false;
      });
      this.feeds[id].open = true;
    },

    getConvertedUnit(key) {
      let unit = this.pegged_to[key];
      if (this.realCurrency != "") {
        unit = this.realCurrency;
      }
      return unit;
    },

    generateTiers(keys) {
      const tiers = [];
      let info = null;
      keys.forEach(key => {
        const price = this.getDetailAttribute(
          `${key}-price-per-token`,
          "value"
        );
        if (price != null) {
          tiers.push({
            price: {
              value: price,
              href: this.getDetailAttribute(
                `${key}-price-per-token`,
                "source_field"
              )
            },
            conversion: this.getDetailAttribute(
              `${key}-price-per-token`,
              "link_text_source"
            ),
            description: {
              value: this.getDetailAttribute(`${key}-note`, "value"),
              href: this.getDetailAttribute(`${key}-note`, "source_field")
            }
          });
        }
      });
      const length = tiers.length;
      if (length > 0) {
        let prefix = "TIER";
        let range = "1";
        if (length > 1) {
          prefix = `${prefix}S`;
          range = `${range} to ${length}`;
        }
        info = `${prefix}: ${range}`;
      }

      return {
        tiers,
        info
      };
    },

    getDate(value) {
      if (!this.isEmptyAndTba(value)) {
        return new Date(value * 1000);
      } else {
        return value;
      }
    },

    getDetailAttribute(name, attr = "value") {
      let data = null;
      if (this.details) {
        const obj = this.details[name];
        if (obj) {
          let temp = attr;
          if (attr == "new_value") {
            if (!obj.hasOwnProperty(attr)) {
              temp = "value";
            }
          }
          const val = obj[temp];
          if (!this.isEmpty(val)) {
            if (
              obj.type == "number" &&
              (attr == "value" || attr == "new_value") &&
              val != "?"
            ) {
              data = parseFloat(val);
            } else {
              data = val;
            }
          }
        }
      }
      return data;
    },

    getProp(obj, key = "value") {
      let data = null;
      if (obj != null) {
        let temp = key;
        if (key == "new_value") {
          if (!obj.hasOwnProperty(key)) {
            temp = "value";
          }
        }
        const val = obj[temp];
        if (!this.isEmpty(val)) {
          if (
            obj.type == "number" &&
            (key == "value" || key == "new_value") &&
            val != "?"
          ) {
            data = parseFloat(val);
          } else {
            data = val;
          }
        }
      }
      return data;
    },

    showDetailsChange(checked) {
      this.$set(this.details, "show", checked);
    },

    onTabClick(index) {
      this.tab.selected = index;
    },

    onDistributionClick(index) {
      const selected = this.distribution.selected;
      if (selected != index) {
        this.distribution.selected = index;
      } else {
        this.distribution.selected = -1;
      }
    },

    onProceed() {
      this.proceed = true;
    },

    isEmpty(value) {
      return this.$util.isDetailEmpty(value);
    },

    isEmptyAndTba(value) {
      return this.$util.isDetailEmpty(value) || value == "?";
    },

    validateInfo(value) {
      if (!this.isEmpty(value)) {
        return value;
      } else {
        return this.$util.getEmpty();
      }
    },

    follow() {
      this.scroll = false;
      this.$modal.show("subscribe");
    },

    onCurrencyChange(item) {
      this.currency = item.value;
    },

    defaultOnly() {
      if (this.slug === "default") {
        this.$modal.show("welcome");
      }
    },

    getInvestment() {
      this.$store.dispatch(`investment`, this.slug).then(response => {
        if (response.status == 200) {
          const investment = response.data;
          if (!(investment instanceof Array)) {
            this.investment_raw = investment;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/v2/pages/detail/scss/style.scss";
</style>