const faqs = [
	{ 
		section: 'Website FAQ',
		list:
		[
			{
				question: 'Why did you make this website?',
				answer: 'We made this website to contribute to the crypto community.  We believe that by simplifying access to information, everyone can make their own due diligence and make informed decisions on ICO investing.'
			},
			{
				question: 'How do we use the ICO detail pages?',
				answer: 'We have a sample ICO detail page that details how we collect data and how you can use that data to make better decisions. <a href="/default-ico" target="_blank">LINK</a>'
			},
			{
				question: 'How do you compute for the token price displayed per tier?',
				answer: 'The price displayed on each tier is inclusive of any bonuses or discounts that the ICO has applied. This is so you get a idea of the real price of each token without going thru the tedious process of computing for each tier individually.'
			},
			{
				question: 'Why aren\'t some tiers shown?',
				answer: 'Due to space constraints, our site cannot list more than 6 tiers for presale or crowdsale. If an ICO has more than 6 tiers, we list the highest and lowest price and link to the price matrix  of the ICO. This is to give you an indication of the price range of the ICO.'
			},
			{
				question: 'Why are your tiers different from that shown on the website of the ICO?',
				answer: 'Our tiers start with Tier 1 having the highest discount irregardless of the tiering system of the ICO. This is to make it easy to compare different ICOs and offers a standardized method of presenting price data.'
			},
			{
				question: 'Why don\'t you list when tokens are listed on exchanges anymore?',
				answer: 'ICOs have been very careful to not mention listing on exchanges since the US SEC stopped the Munchee tokensale. For further reading you may check out the US SEC statement regarding this matter: <a href="https://www.sec.gov/litigation/admin/2017/33-10445.pdf" target="_blank">LINK</a>'
			},
			{
				question: 'How do you compute for tokens in circulation?',
				answer: 'Our tokens in circulation includes all tokens that are not locked or vested.'
			},
			{
				question: 'I saw some wrong information on your ICO detail pages, where can I contact you about it?',
				answer: 'Please send an email to: <a href="mailto:mail@ico-check.com">mail@ico-check.com</a> or get in touch with us on our telegram chat channel at <a href="https://t.me/icocheck_chat" target="_blank">https://t.me/icocheck_chat</a>.'
			},
			{
				question: 'I saw some bugs on your website, where can I inform you about bugs?',
				answer: 'Please send an email to: <a href="mailto:mail@ico-check.com">mail@ico-check.com</a> or get in touch with us on our telegram chat channel at <a href="https://t.me/icocheck_chat" target="_blank">https://t.me/icocheck_chat</a>.'
			},
			{
				question: 'I want to get in touch with your for marketing, listing, advertisement or other business purposes, who do I contact?',
				answer: 'Please send an email to: <a href="mailto:mail@ico-check.com">mail@ico-check.com</a> or get in touch with us on our telegram chat channel at <a href="https://t.me/icocheck_chat" target="_blank">https://t.me/icocheck_chat</a>.'
			}
		]
	},

	{ 
		section: 'ICO Questions',
		list:
		[
			{
				question: 'What is an ICO?',
				answer: 'An abbreviation for Initial Coin Offering. This is the cryptocurrency equivalent of an initial public offering (IPO) or crowdsourcing.  ICOs sell their currency or tokens to fund a project.'
			}, 
			{
				question: 'What are the benefits of investing in an ICO?',
				answer: 'Investing in an ICO allows you to get tokens at a fixed price with a usually much lower cost than from buying one exchanges.'
			}, 
			{
				question: 'What are the drawbacks of investing in an ICO?',
				answer: 'Some drawbacks of investing in an ICO are: greater risk since some products are still in development. This topic will be covered in greater detail in our blogposts/articles.'
			}, 
			{
				question: 'When do I receive my tokens?',
				answer: 'It depends on the ICO. With some, you receive your tokens immediately after contributing. With others you recieve your tokens sometime after the ICO is completed.'
			}, 
			{
				question: 'When can I transfer tokens I received in my ICO?',
				answer: 'Not all tokens in your wallet can be transferred or sold after you receive them. Most ICOs have a period where you cannot move the tokens in your wallet. For the ICOs we list, we try to get the dates when the tokens in your wallet can be sold or transferred.'
			}, 
			{
				question: 'The tokens don\'t show up on my wallet.',
				answer: 'You might have to add a custom token in your wallet. Adding custom tokens involves inputting the token contract address, decimals and the token symbol. The ICO will usually provide these details. MyEtherWallet has a good guide detailing how to add tokens here: <a href="https://myetherwallet.github.io/knowledge-base/send/adding-new-token-and-sending-custom-tokens.html" target="_blank">LINK</a>'
			}, 
			{
				question: 'Why shouldn\'t I send my payment from an exchange wallet?',
				answer: 'Most exchanges do not support adding new tokens and you will lose your tokens if you send from an exchange wallet. Your best bet would be to withdraw the cryptocurrency that you use for participation in an ICO and send it to a wallet.'
			}
		]
	}
]

module.exports = {
	faqs
}
