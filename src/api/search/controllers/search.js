module.exports = {
  async find(ctx) {
    const q = ctx.query.q || "";

    // Search products
    const products = await strapi.db.query("api::product.product").findMany({
      where: {
        title: { $containsi: q }, // tìm title chứa query, không phân biệt chữ hoa/thường
      },
      limit: 50,
    });

    // Search news
    const news = await strapi.db.query("api::news.news").findMany({
      where: {
        title: { $containsi: q },
      },
      limit: 50,
    });

    return { products, news };
  },
};