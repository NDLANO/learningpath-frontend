const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.LEARINGPATH_HOST || 'localhost',
  port: process.env.LEARINGPATH_PORT || '3000',
  googleTagMangerId: process.env.GOOGLE_TAG_MANGER_ID || undefined,
  ndlaApiUrl: process.env.NDLA_API_URL || 'http://api.test.ndla.no',
  ndlaApiKey: process.env.NDLA_API_KEY || 'ndlalearningpathfrontend',
  app: {
    title: 'NDLA Læringsstier',
    head: {
      meta: [
        {name: 'description', content: 'NDLA Læringsstier meta description'},
        {property: 'og:site_name', content: 'NDLA Læringsstier'},
      ]
    }
  },

}, environment);
