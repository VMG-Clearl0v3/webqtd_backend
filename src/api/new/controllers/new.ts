import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::new.new", ({ strapi }) => ({

  // ✅ Danh sách tin tức (có phân trang)
  async find(ctx) {
    const query = ctx.request.query;

    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const start = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      strapi.db.query("api::new.new").findMany({
        where: query.filters || {},
        orderBy: { date: "desc" },
        offset: start,
        limit: pageSize,
        populate: {
          category: { select: ["id", "name", "slug"] },
          image: true,
        },
      }),
      strapi.db.query("api::new.new").count({ where: query.filters || {} }),
    ]);

    return {
      data,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total,
        },
      },
    };
  },

  // ✅ Lấy 1 tin cụ thể
  async findOne(ctx) {
    const { id } = ctx.params;
    const data = await strapi.db.query("api::new.new").findOne({
      where: { id: Number(id) },
      populate: {
        category: { select: ["id", "name", "slug"] },
        image: true,
      },
    });

    if (!data) {
      return ctx.notFound("Không tìm thấy tin tức");
    }

    return { data };
  },

  // ✅ Tin mới nhất
async latest(ctx) {
  const limit = Number(ctx.query.limit) || 3;

  const data = await strapi.db.query("api::new.new").findMany({
    orderBy: { date: "desc" },
    limit,
    populate: {
      category: { select: ["id", "name", "slug"] },
      image: true,
    },
  });

  return { data };
}

  // ✅ Tin liên quan
  async related(ctx) {
    const { categoryId, excludeId } = ctx.request.query;

    if (!categoryId) {
      return ctx.badRequest("Thiếu categoryId");
    }

    const data = await strapi.db.query("api::new.new").findMany({
      where: {
        category: Number(categoryId),
        id: { $ne: Number(excludeId) || 0 },
      },
      orderBy: { date: "desc" },
      limit: 4,
      populate: {
        category: { select: ["id", "name", "slug"] },
        image: true,
      },
    });

    return { data };
  },
}));