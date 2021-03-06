const isDark = new Date().getHours() > 19 && new Date().getHours() < 7;
const axios = require('axios');
const minifyTheme = require('minify-css-string');

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    // title: '不才的博客',
    titleTemplate: (title) => {
      return title ? `${title} - 不才的博客` : '不才的博客'
    },
    htmlAttrs: {
      lang: "zh-CN"
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '这是不才的博客，用于记录生活、学习笔记。专注WEB前端，全面发展，做一个有梦想又憨憨的咸鱼。网站内容不定期更新，欢迎大家关注，共同交流进步。' },
      { hid: 'keywords', name: 'keywords', content: "个人博客,不才,不才的博客,前端,web,javascript,vue,react,nodejs,不才 Blog,bucai,blog" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://hm.baidu.com/hm.js?a30ef10be90b4a2b118c6cfe5e2275b9', async: true }, /*引入百度统计的js*/
    ]
  },
  extractCSS: true,
  optimizeCSS: {
    assetNameRegExp: /\.optimize\.css$/g,
    // cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fafafa' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/common.scss',
    // { src: "mavon-editor/dist/css/index.css" },
    { src: "mavon-editor/dist/markdown/github-markdown.min.css" },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/axios.js',
    './plugins/constant.js',
    './plugins/global-components',
    './plugins/filters.js',
    './plugins/utils.js',
    { src: './plugins/baiduGa.js', ssr: false }, /* 百度统计 */
    // { src: './plugins/vue-mavon-editor', ssr: false },
    { src: './plugins/file.js', ssr: false },
    // { src: './plugins/vue-cropper.js', ssr: false },
    { src: './plugins/dom.js', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  //  modules: [

  //   ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa',
    ['@nuxtjs/vuetify', {

      theme: {
        options: { minifyTheme: minifyTheme.default },
        icons: {
          iconfont: 'mdi',
        },
        themes: {
          light: {
            // primary: "#ffeb3b",
            // secondary: "#ffc107",
            // accent: "#3f51b5",
            // error: "#673ab7",
            // warning: "#9c27b0",
            // info: "#e91e63",
            // success: "#00bcd4"
          },
        },
        // light: true,
        dark: isDark
      },
      // treeShake: true
    }]
  ],
  vuetify: {
    treeShake: true,
    defaultAssets: {
      // nuxt.config.js
      font: false,
      icons: 'mdi'
    }
  },
  sitemap: {
    hostname: "https://www.notbucai.com/",
    gzip: true,
    routes: async () => {
      const list = [];
      const res = await axios.get('https://www.notbucai.com/api/article/list/all?page_index=1&page_size=100000000')
      const resData = res.data;
      if (resData.code === 0) {
        const a_list = resData.data.list.map((item) => `/article/${item._id}`);
        list.push(...a_list);
      }
      return list;
    }
  },
  styleResources: {
    scss: './assets/variables.scss',
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,

  },
  proxy: {
    '/api/': { target: process.env.NODE_ENV === 'development' ? 'http://localhost:9905/' : 'http://bucai-blog-server:9905/', pathRewrite: { '^/api/': '' } }
  },

  /*
  ** Build configuration
  */
  build: {
    plugins: [],
    vendor: [
      // 'vue-cropperjs',
      // 'mavon-editor',
      'highlight.js',
    ],
    extractCSS: true,
    splitChunks: {
      // layouts: true
    },
    minimize: true,
    // quiet: true,
    analyze: process.env.ENV_ANALYZE == 'analyze',
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {

    }
  }
}
