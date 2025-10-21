import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::new.new', ({ strapi }) => ({
  async find(ctx) {
    // ép populate về đúng object (Strapi yêu cầu kiểu object, không phải array)
    ctx.query = {
      ...ctx.query,
      populate: {
        category: true,
        image: true,
      },
    };

    // ✅ Gọi hàm gốc, Strapi tự lo pagination + meta + filtering
    const response = await super.find(ctx);

    return response; // { data, meta }
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        category: true,
        image: true,
      },
    };

    const response = await super.findOne(ctx);
    return response; // { data }
  },
}));
// import { factories } from "@strapi/strapi";

// export default factories.createCoreController("api::new.new", ({ strapi }) => ({

//   // 📄 Lấy danh sách tin (có category, image, meta, pagination)
//   async find(ctx) {
//     const { query } = ctx;

//     // Sử dụng entityService.findPage() để có pagination & meta tự động
//     const result = await strapi.entityService.findPage("api::new.new", {
//       ...query,
//       populate: {
//         category: true,
//         image: true,
//       },
//       sort: { date: "desc" },
//     });

//     return result; // ✅ Tự động trả về { data, meta }
//   },

//   // 📄 Lấy 1 tin theo id
//   async findOne(ctx) {
//     const { id } = ctx.params;

//     const entry = await strapi.entityService.findOne("api::new.new", id, {
//       populate: {
//         category: true,
//         image: true,
//       },
//     });

//     if (!entry) {
//       return ctx.notFound("Tin không tồn tại");
//     }

//     return { data: entry };
//   },
// }));