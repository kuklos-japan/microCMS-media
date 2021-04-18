import dotenv from 'dotenv';
import api from './instance/axios';
dotenv.config();
const { API_KEY, SERVICE_ID, GA_ID } = process.env;

export default {
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined,
    serviceId: process.env.NODE_ENV !== 'production' ? SERVICE_ID : undefined,
  },
  privateRuntimeConfig: {
    apiKey: API_KEY,
    serviceId: SERVICE_ID,
  },
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja',
    },
    titleTemplete: '%s | Crypto Money',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Crypto Money blog [1]',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'CryptoMoneyブログ',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://blog.enteri-o.com',
      },
      { hid: 'og:title', property: 'og:title', content: 'CryptoMoneyブログ' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Crypto Money blog [2]',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://blog.enteri-o.com/images/ogp.png',
      },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@CryptoM41344897' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://blog.enteri-o.com/favicon.png',
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: 'https://blog.enteri-o.com/feed.xml',
        title: 'Atom',
      },
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js',
        async: true,
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#331cbf' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/styles/reset.css',
    '@/assets/styles/colors.css',
    {
      src: '~/node_modules/highlight.js/styles/hybrid.css',
      lang: 'css',
    },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-scrollto'],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/pwa'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/dayjs'],
    [
      '@nuxtjs/google-analytics',
      {
        id: GA_ID,
      },
    ],
    ['@nuxtjs/sitemap'],
    '@nuxtjs/feed',
    '@nuxtjs/proxy',
  ],
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
  proxy: ['http://localhost:9000/.netlify'],
  pwa: {
    workbox: {
      offlineAssets: [
        '/images/banner_logo.svg',
        '/images/icon_author.svg',
        '/images/icon_clock.svg',
        '/images/icon_facebook.svg',
        '/images/icon_feed.svg',
        '/images/icon_hatena.svg',
        '/images/icon_menu.svg',
        '/images/icon_quote.svg',
        '/images/icon_search.svg',
        '/images/icon_twitter.svg',
        '/images/icon_link.svg',
        '/images/logo.svg',
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://images.microcms-assets.io/.*',
          handler: 'staleWhileRevalidate',
        },
      ],
    },
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          preserve: false,
          importFrom: ['assets/styles/colors.css'],
        },
        'postcss-nested': {},
      },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'pages',
      });
      routes.push({
        path: '/category/:categoryId/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'categories',
      });
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
        name: 'custom',
      });
    },
  },
  generate: {
    interval: 100,
    async routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      const limit = 50;
      const popularArticles = await api
        .get('popular-articles')
        .then(({ data }) => {
          return data.articles;
        });
      const banner = await api.get('banner').then(({ data }) => {
        return data;
      });

      // 詳細ページ
      const getArticles = (offset = 0) => {
        return api
          .get(`blog?offset=${offset}&limit=${limit}&depth=2`)
          .then(async (res) => {
            let articles = [];
            if (res.data.totalCount > offset + limit) {
              articles = await getArticles(offset + limit);
            }
            return [
              ...res.data.contents.map((content) => ({
                route: `/${content.id}`,
                payload: { content, popularArticles, banner },
              })),
              ...articles,
            ];
          });
      };
      const articles = await getArticles();

      // 一覧ページ
      const index = {
        route: '/',
        payload: { popularArticles, banner },
      };

      // 一覧のページング
      const pages = await api.get(`blog?limit=1&fields=id`).then((res) =>
        range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
          route: `/page/${p}`,
          payload: { popularArticles, banner },
        }))
      );

      // 検索ページ
      const search = {
        route: '/search',
        payload: { popularArticles, banner },
      };

      const categories = await api
        .get(`categories?fields=id`)
        .then(({ data }) => {
          return data.contents.map((content) => content.id);
        });

      // カテゴリーページ
      const categoryPages = await Promise.all(
        categories.map((category) =>
          api
            .get(`blog?limit=1&fields=id&filters=category[equals]${category}`)
            .then((res) => {
              return range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
                route: `/category/${category}/page/${p}`,
                payload: { popularArticles, banner },
              }));
            })
        )
      );
      const flattenCategoryPages = [].concat.apply([], categoryPages);
      return [index, search, ...articles, ...pages, ...flattenCategoryPages];
    },
    dir: 'dist',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://blog.enteri-o.com',
    exclude: ['/draft', '/404'],
    gzip: true,
    trailingSlash: true,
  },
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: 'Crypto Money ブログ',
          link: 'https://blog.enteri-o.com/feed.xml',
          description:
            'Crypto Money blog [3]',
        };

        const posts = await api.get(`blog`).then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://blog.enteri-o.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    {
      path: '/feed_update.xml',
      async create(feed) {
        feed.options = {
          title: '更新情報｜CryptoMoneyブログ',
          link: 'https://blog.enteri-o.com/feed.xml',
          description:
            'Crypto Money blog [4]',
        };

        const posts = await api
          .get(`blog?filters=category[equals]update`)
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://blog.enteri-o.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    {
      path: '/feed_usecase.xml',
      async create(feed) {
        feed.options = {
          title: '導入事例｜CryptoMoneyブログ',
          link: 'https://blog.enteri-o.com/feed.xml',
          description:
            'Crypto Money blog [5]',
        };

        const posts = await api
          .get(`blog?filters=category[equals]usecase`)
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://blog.enteri-o.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
};
