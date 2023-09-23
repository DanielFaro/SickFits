import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';
import { CartItemCreateInput } from '../.keystone/schema-types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('Adding to Cart!!');
  // Query the current user see if signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // Query the current users cart
  console.log('## context in addToCarts ==', context);
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity',
  });
  // See if the current item is in their cart
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1`
    );
    // IF so, increment by 1,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, no-return-await
    return await context.lists.CartItem.updateOne({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      id: existingCartItem.id,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }

  // If item doesn't exist in cart
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } }, // connect creates relationships, since we have a relationship defined in CartItem Schema
      user: { connect: { id: sesh.itemId } },
    },
  });
}

export default addToCart;
