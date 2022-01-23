const contents = require("./store/data.json");
export default {
  //mode: 'spa',//universal
  ssr: false,
  target: "static",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "まいにちものづくり | %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "作ってきたりバズってきた作品など",
      },
      { hid: "og:site_name", property: "og:site_name", content: "ゆうもや" },
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:url", property: "og:url", content: "https://mononichi.com/" },
      { hid: "og:title", property: "og:title", content: "ゆうもや" },
      {
        hid: "og:description",
        property: "og:description",
        content: "作ってきたりバズってきた作品など",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://mononichi.com/ogpimg.png",
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@takex5g" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["normalize.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/markdownit",
    "nuxt-webfontloader",
    "@nuxtjs/google-analytics",
    "@nuxtjs/sitemap",
    "@nuxt/content",
  ],
  /*server: {
    port: 3000, // デフォルト: 3000
    host: '192.168.0.50' // デフォルト: localhost
  },*/
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  markdownit: {
    runtime: true,
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードに変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    use: [
      [
        "markdown-it-link-attributes",
        {
          // 外部リンク別タブ
          attrs: {
            target: "_blank",
            rel: "noopener",
          },
        },
      ],
    ],
  },
  webfontloader: {
    google: {
      families: [
        "Montserrat&display=swap",
        "Noto+Sans+JP:wght@400;700&display=swap",
      ],
    },
  },
  googleAnalytics: {
    id: "UA-115898188-2",
  },
  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://mononichi.com",
    exclude: [],
  },
  generate: {
    routes() {
      return contents.products.map((product) => {
        return `works/${product.caption}`;
      });
    },
  },
};
