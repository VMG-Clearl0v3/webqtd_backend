export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
 {
    name: 'strapi::cors',
    config: {
      origin: ['https://webqtd.vercel.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
