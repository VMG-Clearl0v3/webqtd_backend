import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::new.new', ({ strapi }) => ({
  async find(ctx) {
    // ✅ Lấy dữ liệu và populate quan hệ
    const entries = await strapi.db.query('api::new.new').findMany({
      populate: {
        category: true,
        image: true,
      },
      orderBy: { date: 'desc' },
    });

    return { data: entries };
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    // ✅ Lấy một bản ghi cụ thể và populate
    const entry = await strapi.db.query('api::new.new').findOne({
      where: { id: Number(id) },
      populate: {
        category: true,
        image: true,
      },
    });

    if (!entry) {
      return ctx.notFound('Tin không tồn tại');
    }

    return { data: entry };
  },
}));