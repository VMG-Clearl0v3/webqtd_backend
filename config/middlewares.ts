export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
 {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'https://webqtd.vercel.app', // Frontend
      ],
    },
  },  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
