/**
 * blog-post controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
  async find(ctx) {
    // Make this endpoint public
    ctx.query = {
      ...ctx.query,
      populate: '*',
    };
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    // Make this endpoint public
    ctx.query = {
      ...ctx.query,
      populate: '*',
    };
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },
}));
