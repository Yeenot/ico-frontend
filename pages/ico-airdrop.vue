<template>
  <div></div>
  <!-- <div class="container-fluid standard-container">
    <div class="row">
      <div class="col-xs-12">
        <div>
          <div class="page-content">
            <div class="headline">
              <h1>List of upcoming and running airdrops</h1>
              <p>All important airdrop info is provided so you don't miss the best airdrops.</p>
            </div>
            <div class="table-responsive">
              <v-table class="airdrop-table">
                <template slot="thead">
                  <tr>
                    <th v-for="header in headers">
                      {{ header.label }}
                    </th>
                  </tr>
                </template>
                <template slot="tbody">
                  <template v-for="(ico, index) in airdrop">
                    <tr class="spacer"
                        v-if="index > 0">
                      <td>
                      </td>
                    </tr>
                    <tr>
                      <td class="name">
                        <a href="/viewly"
                           target="_blank">
                          <span>
                            <img class="list-logo"
                                 src="https://api.ico-check.com/uploads/viewly-view-ico-list-240-240.png">
                            Viewly
                          </span>
                        </a>
                      </td>
                      <td>
                        <a href="https://viewly.com/">www.viewly.com</a>
                      </td>
                      <td>
                        Feb 4 2018 08:00 UTC
                      </td>
                      <td>
                        Feb 14 2018 08:00 UTC
                      </td>
                      <td>
                        BTC
                      </td>
                      <td>
                        <a href="https://copy-airdrop-form.kickoffpages.com/"
                           target="_blank">
                          https://copy-airdrop-form.kickoffpages.com/
                        </a>
                      </td>
                      <td>
                        None
                      </td>
                    </tr>
                  </template>
                </template>
              </v-table>
            </div>
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
// import VTable from "~/components/vuejs-table";

// export default {
//   name: "Airdrop",
//   middleware: "hide",

//   components: {
//     VTable
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
//     return {};
//   },

//   computed: {
//     Title() {
//       return "Airdrop - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com";
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
//       return [
//         {
//           label: "name",
//           key: "name"
//         },

//         {
//           label: "link",
//           key: "link"
//         },

//         {
//           label: "time start",
//           key: "start"
//         },

//         {
//           label: "time end",
//           key: "end"
//         },

//         {
//           label: "blockchain",
//           key: "blockchain"
//         },

//         {
//           label: "link to blogpost",
//           key: "blogpost-link"
//         },

//         {
//           label: "links to airdop",
//           key: "airdrop"
//         }
//       ];
//     },

//     airdrop() {
//       return [{}, {}, {}, {}, {}, {}, {}];
//     }
//   },

//   methods: {}
// };
</script>

<style type="text/css">
/* .airdrop-table .table {
  width: 100%;
  table-layout: fixed;
}

.airdrop-table thead tr th:nth-child(1) {
  width: 17%;
}

.airdrop-table thead tr th:nth-child(2) {
  width: 13%;
}

.airdrop-table thead tr th:nth-child(3) {
  width: 16%;
}

.airdrop-table thead tr th:nth-child(4) {
  width: 16%;
}

.airdrop-table thead tr th:nth-child(5) {
  width: 11%;
}

.airdrop-table thead tr th:nth-child(6) {
  width: 14%;
}

.airdrop-table thead tr th:nth-child(7) {
  width: 13%;
}

.airdrop-table tbody tr:not(.spacer) td {
  word-wrap: break-word;
  padding: 22px 15px !important;
}

.airdrop-table tr th {
  word-wrap: break-word;
  padding-left: 15px !important;
  padding-right: 15px !important;
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
  margin-bottom: 0;
}

.headline {
  font-size: 17px;
  text-align: center;
  margin-bottom: 47px;
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

.airdrop-table .table tr th {
  background-color: #ecf0f1;
}

.airdrop-table .table tr th + th,
.airdrop-table .table tbody tr:not(.spacer) td + td {
  border-left: 0;
} */
