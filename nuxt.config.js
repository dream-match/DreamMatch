// import colors from 'vuetify/lib/util/colors'
export default {
  target: 'static',

  head: {
    titleTemplate: '%s ',
    title: 'DreamMatch',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['@/assets/main.scss'],

  build: {
    terser: {
      terserOptions: {
        compress: { drop_console: true },
      },
    },
  },
  plugins: [
    { src: '~/plugins/init', mode: 'client' },
    { src: '~/plugins/editor', mode: 'client' },
    { src: '~/plugins/vuefire', mode: 'client' },
  ],
  generate: {
    fallback: true,
  },
  components: [
    {
      path: '@/components',
      pathPrefix: true,
    },
    {
      path: '@/components/atom',
      pathPrefix: false,
    },
  ],

  buildModules: [
    '@nuxtjs/eslint-module',

    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
  ],

  srcDir: 'src',
  modules: ['@nuxtjs/pwa', '@nuxtjs/firebase'],

  pwa: {
    manifest: {
      lang: 'ja',
    },
    meta: {
      name: 'DreamMatch',
      author: 'いなりずし',
      description: '夢をつなげます',
      theme_color: '#696969',
      lang: 'ja',
      ogHost: 'https://dreammatch-c9d8c.web.app/',
      ogImage: 'https://dreammatch-c9d8c.web.app/icon.png',
    },
  },

  firebase: {
    config: {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID,
    },
    onFirebaseHosting: true,
    // terminateDatabasesAfterGenerate: true,
    services: {
      auth: {
        // emulatorPort: process.env.NODE_ENV === 'development' && useE ? 9099 : undefined,
        // onAuthStateChangedMutation: 'auth/ON_AUTH_STATE_CHANGED_MUTATION',
      },
      firestore: {
        enablePersistence: true,
        // emulatorPort: process.env.NODE_ENV === 'development' && useE ? 8080 : undefined,
        //  emulatorHost: "localhost"
      },
      storage: true,
      analytics: {
        collectionEnabled: true, // default
      },
    },
  },
  vuetify: {
    theme: { dark: true },
  },
}
