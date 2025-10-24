import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::new.new", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;

    try {
      const result = await strapi.entityService.findPage("api::new.new", {
        ...query,
        populate: {
          category: { fields: ["id", "name", "slug"] },
          image: true,
        },
        sort: { date: "desc" },
      });

      // result: PaginatedResult
      const data = result.results; // ✅ đúng key
      const meta = { pagination: result.pagination };

      ctx.body = { data, meta }; // ✅ trả chuẩn Strapi
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.entityService.findOne("api::new.new", id, {
        populate: {
          category: { fields: ["id", "name", "slug", "description"] },
          image: true,
        },
      });

      ctx.body = { data: entity };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  },
}));
// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::new.new', ({ strapi }) => ({
//   async find(ctx) {
//     // ⚙️ Bổ sung populate, vẫn dùng controller gốc để giữ pagination
//     ctx.query = {
//       ...ctx.query,
//       populate: {
//         category: true,
//         image: true,
//       },
//       sort: { date: 'desc' },
//     };

//     const { data, meta } = await super.find(ctx);
//     return { data, meta };
//   },

//   async findOne(ctx) {
//     ctx.query = {
//       ...ctx.query,
//       populate: {
//         category: true,
//         image: true,
//       },
//     };

//     const { data } = await super.findOne(ctx);
//     return { data };
//   },
// }));
// import { factories } from "@strapi/strapi";

// export default factories.createCoreController("api::new.new", ({ strapi }) => ({
//   /**
//    * Lấy danh sách tin (có phân trang + populate category, image)
//    */
//   async find(ctx) {
//     try {
//       // ⚙️ Ép populate + sort vào query
//       ctx.query = {
//         ...ctx.query,
//         populate: {
//           category: { fields: ["id", "name", "slug"] },
//           image: true,
//         },
//         sort: { date: "desc" },
//       };

//       // 🧩 Gọi hàm gốc để tận dụng phân trang, lọc, tìm kiếm...
//       const { data, meta } = await super.find(ctx);

//       // ✅ Giữ đúng cấu trúc trả về: { data, meta }
//       ctx.body = { data, meta };
//     } catch (error: any) {
//       strapi.log.error("❌ Lỗi find news:", error);
//       ctx.status = 500;
//       ctx.body = { error: error.message || "Lỗi máy chủ" };
//     }
//   },

//   /**
//    * Lấy chi tiết tin theo id hoặc slug
//    */
//   async findOne(ctx) {
//     try {
//       ctx.query = {
//         ...ctx.query,
//         populate: {
//           category: { fields: ["id", "name", "slug", "description"] },
//           image: true,
//         },
//       };

//       const response = await super.findOne(ctx);

//       // ✅ Trả chuẩn Strapi: { data }
//       ctx.body = { data: response.data };
//     } catch (error: any) {
//       strapi.log.error("❌ Lỗi findOne news:", error);
//       ctx.status = 500;
//       ctx.body = { error: error.message || "Lỗi máy chủ" };
//     }
// =======
// import { factories } from "@strapi/strapi";

// export default factories.createCoreController("api::new.new", ({ strapi }) => ({

//   // ✅ Danh sách tin tức (có phân trang)
//   async find(ctx) {
//     const query = ctx.request.query;

//     const page = Number(query.page) || 1;
//     const pageSize = Number(query.pageSize) || 10;
//     const start = (page - 1) * pageSize;

//     const [data, total] = await Promise.all([
//       strapi.db.query("api::new.new").findMany({
//         where: query.filters || {},
//         orderBy: { date: "desc" },
//         offset: start,
//         limit: pageSize,
//         populate: {
//           category: { select: ["id", "name", "slug"] },
//           image: true,
//         },
//       }),
//       strapi.db.query("api::new.new").count({ where: query.filters || {} }),
//     ]);

//     return {
//       data,
//       meta: {
//         pagination: {
//           page,
//           pageSize,
//           pageCount: Math.ceil(total / pageSize),
//           total,
//         },
//       },
//     };
//   },

//   // ✅ Lấy 1 tin cụ thể
//   async findOne(ctx) {
//     const { id } = ctx.params;
//     const data = await strapi.db.query("api::new.new").findOne({
//       where: { id: Number(id) },
//       populate: {
//         category: { select: ["id", "name", "slug"] },
//         image: true,
//       },
//     });

//     if (!data) {
//       return ctx.notFound("Không tìm thấy tin tức");
//     }

//     return { data };
//   },

//   // ✅ Tin mới nhất
// async latest(ctx) {
//   const limit = Number(ctx.query.limit) || 3;

//   const data = await strapi.db.query("api::new.new").findMany({
//     orderBy: { date: "desc" },
//     limit,
//     populate: {
//       category: { select: ["id", "name", "slug"] },
//       image: true,
//     },
//   });

//   return { data };
// }

//   // ✅ Tin liên quan
//   async related(ctx) {
//     const { categoryId, excludeId } = ctx.request.query;

//     if (!categoryId) {
//       return ctx.badRequest("Thiếu categoryId");
//     }

//     const data = await strapi.db.query("api::new.new").findMany({
//       where: {
//         category: Number(categoryId),
//         id: { $ne: Number(excludeId) || 0 },
//       },
//       orderBy: { date: "desc" },
//       limit: 4,
//       populate: {
//         category: { select: ["id", "name", "slug"] },
//         image: true,
//       },
//     });

//     return { data };
// >>>>>>> 405c7d71c9e847cfdc14656922bad552434f59b3
//   },
// }));