/**
 * new router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::new.new');
// export default {
//   routes: [
//     {
//       method: "GET",
//       path: "/news",
//       handler: "new.find",
//       config: { auth: false },
//     },
//     {
//       method: "GET",
//       path: "/news/:id",
//       handler: "new.findOne",
//       config: { auth: false },
//     },
//   {
//       method: 'GET',
//       path: '/news/latest',
//       handler: 'new.latest',
//       config: {
//         auth: false, // cho phép truy cập public
//       },
//     },
//     {
//       method: "GET",
//       path: "/news-related",
//       handler: "new.related",
//       config: { auth: false },
//     },
//   ],
// };