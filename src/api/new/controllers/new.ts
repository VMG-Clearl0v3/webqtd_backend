import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::new.new", ({ strapi }) => ({
  // 📄 Lấy danh sách tin tức (có category + image + meta pagination)
  async find(ctx) {
    const { query } = ctx;

    const result = await strapi.entityService.findPage("api::new.new", {
      ...query,
      populate: {
        category: {
          fields: ["id", "name", "slug", "description"], // chọn field cần lấy
        },
        image: true, // lấy toàn bộ thông tin media
      },
      sort: { date: "desc" },
    });

    return result; // ✅ trả { data, meta } đầy đủ
  },

  // 📄 Lấy 1 bài cụ thể (có category + image)
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.findOne("api::new.new", id, {
      populate: {
        category: {
          fields: ["id", "name", "slug", "description"],
        },
        image: true,
      },
    });

    return { data: entity };
  },
}));