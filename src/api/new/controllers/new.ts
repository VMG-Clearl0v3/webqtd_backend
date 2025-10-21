// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::new.new', ({ strapi }) => ({
//   async find(ctx) {
//     // ✅ Lấy dữ liệu và populate quan hệ
//     const entries = await strapi.db.query('api::new.new').findMany({
//       populate: {
//         category: true,
//         image: true,
//       },
//       orderBy: { date: 'desc' },
//     });

//     return { data: entries };
//   },

//   async findOne(ctx) {
//     const { id } = ctx.params;

//     // ✅ Lấy một bản ghi cụ thể và populate
//     const entry = await strapi.db.query('api::new.new').findOne({
//       where: { id: Number(id) },
//       populate: {
//         category: true,
//         image: true,
//       },
//     });

//     if (!entry) {
//       return ctx.notFound('Tin không tồn tại');
//     }

//     return { data: entry };
//   },
// }));
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::new.new", ({ strapi }) => ({

  // 📄 Lấy danh sách tin (có category, image, meta, pagination)
  async find(ctx) {
    const { query } = ctx;

    // Sử dụng entityService.findPage() để có pagination & meta tự động
    const result = await strapi.entityService.findPage("api::new.new", {
      ...query,
      populate: {
        category: true,
        image: true,
      },
      sort: { date: "desc" },
    });

    return result; // ✅ Tự động trả về { data, meta }
  },

  // 📄 Lấy 1 tin theo id
  async findOne(ctx) {
    const { id } = ctx.params;

    const entry = await strapi.entityService.findOne("api::new.new", id, {
      populate: {
        category: true,
        image: true,
      },
    });

    if (!entry) {
      return ctx.notFound("Tin không tồn tại");
    }

    return { data: entry };
  },
}));