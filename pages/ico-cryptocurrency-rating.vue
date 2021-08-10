<template>
	<div></div>
	<!-- <div>
		<page title="ICO CHECK RATING">
			<div class="row standard-row content"
			     slot="content">
				<div class="col-xs-12 page-content">
					<span style="font-weight: 700;">We have implemented a 5 checkmark system to rate upcoming ICOs:</span><br />
					Each category is rateable in increments of:

					<ol>
						<li>
							No Check
						</li>
						<li>
							Half Check
						</li>
						<li>
							Full Check
						</li>
					</ol>
					<br />
					<br />
					<h6 style="font-size: 24px; font-weight: 700; margin-bottom: 42px; color: inherit;">There are 5 categories we rate:</h6>
					<h2 style="font-size: 20px; margin-bottom: 18px;">Team</h2>
					<span style="font-weight: 700;">Metrics based on experience of team and impact of advisors.</span><br />
					<ol>
						<li>
							<u>No Check</u>: Team has little or no experience in blockchain and/or market they are entering. Advisors have little experience in the field and are not known or well connected.
						</li>
						<li>
							<u>Half Check</u>: Good Team and has some experience in blockchain and/or market they are entering. Advisors are knowledgeable in their field and but less known and connected.
						</li>
						<li>
							<u>Full Check</u>: Great Team, comprised of veterans and experts in their field. Advisors are well known experts in field and well connected.
						</li>
					</ol>
					<br />
					<h2 style="font-size: 20px;">Product/Tech</h2>
					<span style="font-weight: 700;">Deals with how innovative the product or service is and how useful it is on the blockchain.</span><br />
					<ol>
						<li>
							<u>No Check</u>: Product or tech is not innovative and just put on blockchain to raise funds or be cool.
						</li>
						<li>
							<u>Half Check</u>: Product or tech is somewhat innovative or an old product/tech that derives some benefits from being on the blockchain.
						</li>
						<li>
							<u>Full Check</u>: Product or Tech is very innovative and has a great use case. Blockchainization greatly benefits product or tech.
						</li>
					</ol>
					<br />
					<h2 style="font-size: 20px;">Token Metrics</h2>
					<span style="font-weight: 700;">Deals with token usage, token distribution and market cap. Bonus points if tokens are registered securities or are blockchain/infrastructure tokens.</span><br />
					<ol>
						<li>
							<u>No Check</u>: Unclear reason why tokenization is required. Low or nonexistent vesting period for team and advisors. High market cap. Exchange listings unlikely.
						</li>
						<li>
							<u>Half Check</u>: Decent use case for token, 6-12 month vesting period for team and advisors. Medium market cap. Exchange listings likely.
						</li>
						<li>
							<u>Full Check</u>: Great use case for token, team and advisor tokens are vested over a longer period of time (greater than or equal to 1 yr). Tokens are registered securities. Token is a blockchain/infrastructure token. Low market Cap. Confirmed exchange listings.
						</li>
					</ol>
					<br />
					<h2 style="font-size: 20px;">Misc</h2>
					<span style="font-weight: 700;">Sum of other miscellaneous factors, internal and external to the ICO and how they lead to how good it is to invest into. Factors that we use to rate in this area are things that don't fit the above categories like how long the company has been in operation, presence of MVP, legal factors, tie ups, partnerships etc.</span><br />
					<ol>
						<li>
							<u>No Check</u>: Misc. Internal and external factors are not that good for the ICO.
						</li>
						<li>
							<u>Half Check</u>: Misc. and external factors are decent for the ICO.
						</li>
						<li>
							<u>Full Check</u>: Misc. and external factors are positive for the ICO.
						</li>
					</ol>
					<br />
					<h2 style="font-size: 20px;">Hype</h2>
					<span style="font-weight: 700;">Deals with how much hype and press the ICO is generating. </span><br />
					<ol>
						<li>
							<u>No Check</u>: Weak Hype, small amount of people on telegram, slack or discord. Little to no discussion on social media. Only few articles published on blog &amp; press coverage nonexistent.
						</li>
						<li>
							<u>Half Check</u>: Decent hype, some people on telegram, slack or discord. Some discussion on social media, some articles published and decent media coverage.
						</li>
						<li>
							<u>Full Check</u>: Extremely good hype, lots of people on telegram, slack or discord. Social media is full of good discussion, many articles published, lots of media coverage.
						</li>
					</ol>
					<br />
					<p>&nbsp;</p>
					<h2 style="font-size: 20px;">Disclaimer</h2>
					<p>&nbsp;</p>
					<p>
						The information provided in our ICO ratings are for informational purposes only. It should not be considered investment, legal or financial advice to invest in any ICO we rate. We cannot substitute for professional advice and independent factual verification before every ICO investment.

						ico-check.com does not endorse any initial coin offerings advertised on our ICO website <a href="https://www.ico-check.com"
						   target="_blank">https://www.ico-check.com</a>, does not make any guarantee or any other promise as to results that may be obtained from using our ratings. No one should make any investment decision without first consulting their own financial advisor and conducting their own research and due diligence.

						To the maximum extent permitted by law, ico-check.com disclaims any and all liability in the event any information, analysis, opinions, commentary, advice and/or recommendations prove to be inaccurate, incomplete or unreliable, or result in any losses.
					</p>
				</div>
			</div>
		</page>
	</div> -->
</template>

<script>
export default {
  middleware: "hide"
};
// import Page from "~/components/layouts/page";

// export default {
//   name: "rating",
//   middleware: "hide",

//   components: {
//     Page
//   },

//   head() {
//     return {
//       title: this.Title,
//       meta: [
//         {
//           name: "google-site-verification",
//           content: "_NoSyh4vxpf1Ud3_Wq3rHHM6e1RP6qPRqpqgCbd7IF0"
//         },
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
//       ]
//     };
//   },

//   data: () => ({
//     collapsed: {
//       section: -1,
//       item: -1
//     }
//   }),

//   computed: {
//     Title() {
//       return "Rating - ICO Calendar, ICO Cryptocurrency, ICO Coin, ICO Tracker & ICO Schedule -  ico-check.com";
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
//     }
//   },

//   methods: {}
// };
</script>

<style type="text/css">
</style>

<style type="text/css" scoped>
/* .page-content {
  padding-top: 40px;
} */
</style>