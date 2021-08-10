const resolve = require('path').resolve;
const axios = require('axios');
require('dotenv').config();

const isVueRule = (rule) => {
  return rule.test.toString() === '/\\.vue$/'
}
const isSASSRule = (rule) => {
  return ['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1
}
const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      resolve(__dirname, 'assets/v2/scss/variables.scss'),
      resolve(__dirname, 'assets/v2/scss/mixins.scss'),
      resolve(__dirname, 'assets/v2/scss/animations.scss')
    ]
  }
}

let baseUrl = "http://localhost:8000";
if (process.env.type == "staging") {
  baseUrl = "http://xhe.ico-check.com";
} else if (process.env.type == "production") {
  baseUrl = "https://www.ico-check.com";
}

module.exports = {
  debug: process.env.type == "local" ? true : false,
  env: {
    baseUrl
  },

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      'prefix': 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: "stylesheet", href: 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.0/css/lightgallery.min.css' }
    ],
    script:[
      { src: '/js/hotjar.js' }
    ]
  },
  css: [
    '~/assets/css/draggable.css',
    '~/assets/css/tooltip.css',
    'swiper/dist/css/swiper.css'
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
    'axios',
    'cookie',
    'js-cookie',
    'moment',
    'numeral',
    'sweet-modal-vue',
    'v-tooltip',
    'vuejs-datepicker',
    'vue-chartjs',
    'vue-awesome-swiper',
    'vue-resize-directive',
    'vue-js-modal',
    'vue-disqus',
    'swiper',
    'vue-slide-up-down',
    'vue-slicksort',
    'fitty',
    'scrollbooster',
    'vue-dragscroll',
    'photoswipe'
    ],

    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
      urlLoader.test = /\.(png|jpe?g|gif)$/
      // const fileLoader = config.module.rules.find((rule) => rule.loader === 'file-loader')
      // fileLoader.test = /\.(eot|woff|ttf|woff2)(\?\S*)?$/

      config.module.rules.forEach((rule) => {
        if (isVueRule(rule)) {
          rule.options.loaders.sass.push(sassResourcesLoader)
          rule.options.loaders.scss.push(sassResourcesLoader)
        }
        if (isSASSRule(rule)) {
          rule.use.push(sassResourcesLoader)
        }
      })

      // config.module.rules.push({
      //   test: /\.svg(\?.*)?$/,
      //   loader: 'svg-inline-loader',
      //   options: { limit: 1000, name: 'v2/svg/[name].[hash:7].[ext]' },
      //   exclude: "/node_modules/"
      // })
      
      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
            {
              include: resolve(__dirname, 'assets/v2/svg/'),
              use: 'svg-inline-loader'
            },
            {
              exclude: resolve(__dirname, 'assets/v2/svg/'),
              use: 'url-loader'
            },
        ],
        exclude: "/node_modules/"
      })

      return config
    }

  },

  plugins: [
    { src: '~/plugins/analytics.js', ssr: false },
    { src: '~/plugins/helpers.js', ssr: true },
    { src: '~/plugins/resize.js', ssr: false },
    { src: '~/plugins/modal.js' },
    { src: '~/plugins/v-tooltip.js', ssr: false },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/vue-js-modal.js' },
    { src: '~/plugins/vue-slide.js', ssr: false },
    { src: '~/plugins/vue-dragscroll.js', ssr: false },
    { src: '~/plugins/eventBus.js' }
  ],

  modules: [
    ['~/modules/sitemap.js',
      { 
        'default': {
          routes() {
            const data = require('./external/data/info.js')
            return new Promise( async function(resolve) {
              let urls = [];
              const images = [];
              const info = await data.get();
              urls.push({
                url: "/",
                img: [
                  {
                    url: '/v2/images/hero.png',
                    title: 'List of Initial Coin Offerings City Banner'
                  },
                  {
                    url: '/v2/images/coin.png',
                    title: 'Cryptocurrency ICO Check Coin'
                  }
                ]
              });
              // icos
              info.icos.forEach(function(ico) {
                urls.push(ico)
                images.push(ico.img)
              });
              // blogs
              info.blogs.forEach(function(blog) {
                urls.push(blog.url)
                images.push(blog.img)
              });
              // socials
              info.social.forEach(function(item) {
                urls.push(`/ico-social/${item}`);
              });
              resolve(urls)
            })
          },
          exclude: [
            '/faq',
            '/glossary',
            '/about-us',
            '/ico-detail/**',
            '/ico-cryptocurrency-rating',
            '/ico-airdrop',
            '/ico-cryptospace-overview',
            '/ico-list',
            '/initial-coin-offering',
            '/investing-in-the-next-alternative-cryptocurrency',
            '/list-of-all-upcoming-cryptocurrencies-around-the-world',
            '/list-of-new-cryptocurrencies',
            '/best-bitcoin-alternative-currency',
            '/cryptocurrency-market-values',
          ]
        }
        
      }
    ]
  ],

  serverMiddleware: [
    '~/modules/maintenance.js'
  ]
}
