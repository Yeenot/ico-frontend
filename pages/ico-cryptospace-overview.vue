<template>
	<div></div>
	<!-- <div class="container-fluid standard-container cryptospace-overview">
		<div class="row">
			<div class="col-xs-12">
				<div>
					<div class="page-content">
						<div class="headline">
							<h1>Crypto Influencer List</h1>
							<p>The ico-check team has compiled a list of top crypto influencers on various platforms like youtube, telegram and facebook. We also have a list of the best crypto groups on telegram, facebook, slack and other platforms. This list is a work in progress and will be constanty updated with the latest subscriber counts and hottest crypto groups and influencers . If you want your group listed here please contact <a href="mailto:mail@ico-check.com">mail@ico-check.com</a>.</p>
						</div>
						<tab-links class="cryptospace-tab-links"
						           :tabs="categories"
						           :current="current.index"
						           :onSelected="onCategorySelected"></tab-links>
						<tab-wrapper class="cryptospace-tab-wrapper"
						             :current="current.index">
							<tab-panel label="influencer"
							           key="influencer">
								<div class="filter">
									<dropdown :items="platforms"
									          :onItemSelected="onPlatformsSelected"
									          :options="PlatformOptions">
									</dropdown>
								</div>
								<div class="table-responsive cryptospace-table">
									<v-table class="influencer-table">
										<template slot="thead">
											<tr>
												<th class="disable-text-highlight"
												    v-for="header in headers.influencer"
												    :class="ThClass(header)"
												    v-on:click="onSort(header, 'influencer')">
													{{ header.label }}

													<template v-if="header.sortable">
														<span v-if="sort['influencer'].key === header.key">
															<span v-if="sort['influencer'].type !== 0">
																<span class="fa fa-sort-asc sort-icon"
																      v-if="isAscending('influencer')"></span>
																<span class="fa fa-sort-desc sort-icon"
																      v-else></span>
															</span>
															<span class="fa fa-sort sort-icon"
															      v-else></span>
														</span>
													</template>
												</th>
											</tr>
										</template>
										<template slot="tbody">
											<template v-for="(ico, index) in influencer">
												<tr class="spacer"
												    v-if="index > 0">
													<td>
													</td>
												</tr>
												<tr>
													<td class="name">
														{{ ico.name }}
													</td>
													<td>
														{{ ico.platform }}
													</td>
													<td>
														<a :href="ico.link"
														   target="_blank">
															Link
														</a>
													</td>
													<td v-html="format(ico.description)">
													</td>
													<td>
														{{ ico.subscribers }}
													</td>
												</tr>
											</template>
										</template>
									</v-table>
								</div>
							</tab-panel>

							<tab-panel label="groups"
							           key="groups">
								<div class="table-responsive cryptospace-table">
									<v-table class="groups-table">
										<template slot="thead">
											<tr>
												<th class="disable-text-highlight"
												    v-for="header in headers.groups"
												    :class="ThClass(header)"
												    v-on:click="onSort(header, 'groups')">
													{{ header.label }}

													<template v-if="header.sortable">
														<span v-if="sort['groups'].key === header.key">
															<span v-if="sort['groups'].type !== 0">
																<span class="fa fa-sort-asc sort-icon"
																      v-if="isAscending('groups')"></span>
																<span class="fa fa-sort-desc sort-icon"
																      v-else></span>
															</span>
															<span class="fa fa-sort sort-icon"
															      v-else></span>
														</span>
													</template>
												</th>
											</tr>
										</template>
										<template slot="tbody">
											<template v-for="(ico, index) in groups">
												<tr class="spacer"
												    v-if="index > 0">
													<td>
													</td>
												</tr>
												<tr>
													<td class="name">
														{{ ico.name }}
													</td>
													<td>
														<a :href="ico.link"
														   target="_blank">
															Link
														</a>
													</td>
													<td v-html="format(ico.description)">
													</td>
													<td>
														{{ ico.subscribers }}
													</td>
												</tr>
											</template>
										</template>
									</v-table>
								</div>
							</tab-panel>
						</tab-wrapper>
					</div>
				</div>
			</div>
		</div>
	</div> -->
</template>


<script>
export default {
  middleware: "hide"
};
// import TabLinks from "@/components/tabs/links.vue";
// import TabWrapper from "@/components/tabs/wrapper.vue";
// import TabPanel from "@/components/tabs/panel.vue";
// import VTable from "~/components/vuejs-table";
// import Dropdown from "@/components/dropdown";

// export default {
//   name: "cryptospace-overview",
//   middleware: "hide",

//   components: {
//     TabLinks,
//     TabWrapper,
//     TabPanel,
//     VTable,
//     Dropdown
//   },

//   head() {
//     return {
//       title: this.Title,
//       meta: [
//         { name: "Content-Type", content: "text/html" },
//         { hid: "description", name: "description", content: this.Description },
//         { name: "image", content: this.MetaImage },
//         { name: "og:title", content: this.Title },
//         { name: "og:description", content: this.Description },
//         { name: "og:image", content: this.MetaImage },
//         { name: "twitter:card", content: "summary" },
//         { name: "twitter:title", content: this.Title },
//         { name: "twitter:description", content: this.Description },
//         { name: "twitter:image", content: this.MetaImage },

//         { "http-equiv": "cache-control", content: "max-age=2592000, public" },
//         { "http-equiv": "pragma", content: "max-age=2592000, public" },
//         { "http-equiv": "expires", content: "1" }
//       ],
//       __dangerouslyDisableSanitizers: ["script"],
//       script: [
//         {
//           type: "application/ld+json",
//           innerHTML: `{ "@context": "http://schema.org", "@type": "PostalAddress", "name": "ico-check.com", "url": "${
//             this.HostName
//           }", "logo": "${this.Logo}" }`
//         }
//       ]
//     };
//   },

//   async fetch({ store }) {},

//   data() {
//     return {
//       current: {
//         index: 0
//       },

//       platform: "",

//       sort: {
//         influencer: {
//           key: "name",
//           type: 1
//         },
//         groups: {
//           key: "name",
//           type: 1
//         }
//       },

//       categories: [
//         {
//           label: "Influencer",
//           value: "influencer"
//         },

//         {
//           label: "Groups",
//           value: "groups"
//         }
//       ]
//     };
//   },

//   computed: {
//     Title() {
//       return "Cryptospace Overview - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com";
//     },

//     Description() {
//       return "Ico-check.com is an up to date ICO checker website. The ultimate Listing Tracker of active ICOs and upcoming ICOs. Discover the best Initial Coin Offering, ICO release date and ICO analysis.";
//     },

//     MetaImage() {
//       return (
//         this.HostName + "/images/ico-check-cryptocurrency-list-preview.jpeg"
//       );
//     },

//     HostName() {
//       return this.$store.state.settings.hostname;
//     },

//     headers() {
//       const headers = {
//         influencer: [
//           {
//             label: "influencer name",
//             key: "name",
//             sortable: true
//           },

//           {
//             label: "platform",
//             key: "platform",
//             sortable: true
//           },

//           {
//             label: "links",
//             key: "link"
//           },

//           {
//             label: "description",
//             key: "description"
//           },

//           {
//             label: "subscribers",
//             key: "subscribers",
//             sortable: true
//           }
//         ],

//         groups: [
//           {
//             label: "name",
//             key: "name",
//             sortable: true
//           },

//           {
//             label: "links",
//             key: "links"
//           },

//           {
//             label: "description",
//             key: "description"
//           },

//           {
//             label: "subscribers",
//             key: "subscribers",
//             sortable: true
//           }
//         ]
//       };
//       return headers;
//     },

//     influencer() {
//       const influencer = [
//         {
//           name: "Vincent Briatore",
//           platform: "Youtube",
//           link: "https://telegram.me/joinchat/BpTIDjwx_ayUl5zN84uQBw",
//           description:
//             "I'm an Italian-American Fintech Entrepreneur, Developer, Programmer, Digital Asset Analyst, & ICO Investor. I have made over 12 million dollars by investing, and trading cryptocurrencies. ",
//           subscribers: "28140"
//         },
//         {
//           name: "Abel Ruiz",
//           platform: "Youtube",
//           link: "https://telegram.me/joinchat/BpTIDjwx_ayUl5zN84uQBw",
//           description:
//             "All Things Art, Fashion, Photography, Travel & Motivation. Encouraging young millennials to design better versions of themselves and pass the torch onto others.",
//           subscribers: "1300"
//         },
//         {
//           name: "Crypto Crows",
//           platform: "Facebook",
//           link: "https://telegram.me/joinchat/BpTIDjwx_ayUl5zN84uQBw",
//           description:
//             "Cryptocurrency Trading and ICO Reviews. I am a crypto swing trader, miner and researcher that helps educate crypto enthusiasts on my opinion for good ICO buys, ICO's to stay away from and swing trading signals. <br/>To enable screen reader support, press Ctrl+Alt+Z To learn about keyboard shortcuts, press Ctrl+slash",
//           subscribers: "36752"
//         },
//         {
//           name: "Ivan on Tech",
//           platform: "Youtube",
//           link: "https://telegram.me/joinchat/BpTIDjwx_ayUl5zN84uQBw",
//           description:
//             "My name is Ivan Liljeqvist and I'm a software developer from Sweden. This channel is all about cryptocurrencies and the blockchain technology. ",
//           subscribers: "113256"
//         },
//         {
//           name: "Abel Ruiz",
//           platform: "Facebook",
//           link: "https://telegram.me/joinchat/BpTIDjwx_ayUl5zN84uQBw",
//           description:
//             "All Things Art, Fashion, Photography, Travel & Motivation. Encouraging young millennials to design better versions of themselves and pass the torch onto others.",
//           subscribers: "1300s"
//         }
//       ];
//       const filter = this.filter(influencer);
//       const clone = this.cloneAndSort(filter, "influencer");
//       return clone;
//     },

//     groups() {
//       const groups = [
//         {
//           name: "Pietz Crypto",
//           link: "https://t.me/pietzcrypto",
//           description: "Telegram Cryptocurrency Discussion",
//           subscribers: "1041"
//         },
//         {
//           name: "WhaleClub",
//           link: "https://telegram.me/joinchat/BpTIDjwx_ayUl5zN84uQBw",
//           description:
//             "Top 5 cap crypto ONLY, but we trade the pulse of whatever is moving",
//           subscribers: "32164"
//         },
//         {
//           name: "ICO Countdown",
//           link: "http://telegram.me/icocountdown",
//           description: "",
//           subscribers: "19043"
//         },
//         {
//           name: "TheCoinFarm",
//           link: "https://telegram.me/thecoinfarm",
//           description:
//             "Cryptocurrency TA *Traders* & BTCVIX ref links — not Bitcoin maximalists, fundamentalists, or serial bagholders.",
//           subscribers: "27343"
//         },
//         {
//           name: "CryptoSuperbSignals",
//           link: "https://t.me/cryptosuperbsignals",
//           description:
//             "All Things Art, Fashion, Photography, Travel & Motivation. Encouraging young millennials to design better versions of themselves and pass the torch onto others.",
//           subscribers: "454"
//         }
//       ];
//       const clone = this.cloneAndSort(groups, "groups");
//       return clone;
//     },

//     platforms() {
//       return this.$store.state.cryptospace.platforms;
//     },

//     PlatformOptions() {
//       return this.$store.state.cryptospace.platformOptions;
//     }
//   },

//   methods: {
//     format(str) {
//       return this.$util.formatContent(str);
//     },

//     cloneAndSort(data, group) {
//       const parent = this;
//       const sort = this.sort[group];
//       const clone = this.$util.clone(data);
//       clone.sort(function(a, b) {
//         const aString = a[sort.key].toString();
//         const bString = b[sort.key].toString();

//         if (sort.type % 2 !== 0) {
//           return parent.$util.naturalSorter(aString, bString);
//         } else {
//           return parent.$util.naturalSorter(bString, aString);
//         }
//       });
//       return clone;
//     },

//     filter(data) {
//       const platform = this.platform;
//       let filter = [];
//       if (platform !== "") {
//         data.forEach(item => {
//           const itemPlatform = item.platform.toLowerCase();
//           if (platform === itemPlatform) {
//             filter.push(item);
//           }
//         });
//       } else {
//         filter = data;
//       }
//       return filter;
//     },

//     isAscending(group) {
//       return !this.isDescending(group);
//     },

//     isDescending(group) {
//       return this.sort[group].type % 2 === 0;
//     },

//     onCategorySelected(index) {
//       this.current.index = index;
//     },

//     ThClass(header) {
//       const obj = {};
//       if (header.hasOwnProperty("sortable")) {
//         if (header.sortable) {
//           obj["sortable"] = true;
//         }
//       }
//       return obj;
//     },

//     onSort(header, group) {
//       const key = header.key;
//       const sortable = header.sortable;
//       if (sortable) {
//         const currentKey = this.sort[group].key;
//         if (currentKey === key) {
//           this.sort[group].type++;
//         } else {
//           this.sort[group].type = 1;
//         }
//         this.sort[group].key = key;
//       }
//     },

//     onPlatformsSelected(item) {
//       this.platform = item.value;
//     }
//   }
// };
</script>

<style type="text/css">
/* .cryptospace-table .table {
  width: 100%;
  table-layout: fixed;
}

.influencer-table thead tr th:nth-child(1) {
  width: 20%;
}

.influencer-table thead tr th:nth-child(2) {
  width: 15%;
}

.influencer-table thead tr th:nth-child(3) {
  width: 15%;
}

.influencer-table thead tr th:nth-child(5) {
  width: 15%;
}

.groups-table thead tr th:nth-child(1) {
  width: 20%;
}

.groups-table thead tr th:nth-child(2) {
  width: 20%;
}

.groups-table thead tr th:nth-child(4) {
  width: 15%;
}

.cryptospace-table tbody tr:not(.spacer) td {
  word-wrap: break-word;
  padding: 22px 15px !important;
}

.cryptospace-table tr th {
  word-wrap: break-word;
  padding-left: 15px !important;
  padding-right: 15px !important;
}

.cryptospace-tab-links li {
  font-size: 16px;
  padding: 15px 20px;
}

.cryptospace-tab-links li a {
  padding: 0 0 5px 0 !important;
}

.cryptospace-tab-links li.selected {
  background: #ffffff;
}

.cryptospace-tab-links li.selected a {
  padding-bottom: 10px;
}

.cryptospace-overview .filter .dropdown button {
  background-color: #ecf0f1;
  color: #78909c;
}*/
</style>

<style type="text/css" scoped>
/*.page-content {
  padding-top: 40px;
  padding-bottom: 40px;
  font-size: 14px;
}

h1 {
  color: #2e3d70;
  margin-bottom: 10px;
}

.page-content a {
  color: #2dafff;
  text-decoration: none;
}

.name {
  color: #11428d;
  font-size: 17px;
  font-weight: 700;
  color: #333131;
}

.name a {
  color: inherit;
}

.list-logo {
  width: 39px;
  height: 39px;
  margin-right: 7px;
}

.cryptospace-tab-wrapper {
  background-color: #fff;
  padding-top: 35px;
}

.cryptospace-table {
  background-color: #f4f8f9;
}

.cryptospace-table .table tr th {
  background-color: #ecf0f1;
  cursor: auto;
}

.cryptospace-table .table tr td a:hover {
  text-decoration: underline;
}

.cryptospace-table .table tr th.sortable {
  cursor: pointer;
}

.cryptospace-table .table tr th + th,
.cryptospace-table .table tbody tr:not(.spacer) td + td {
  border-left: 0;
}

.filter {
  margin-bottom: 20px;
  padding: 0 15px;
} */
</style>