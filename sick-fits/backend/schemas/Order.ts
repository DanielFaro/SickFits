import { text, select, integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Order = list({
  // TODO
  // access:
  fields: {
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }), // an order can have many order items, but not vice versa
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
