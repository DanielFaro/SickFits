export default function calcTotalPrice(cart) {
  console.log('## In calcTotalPrice ==', cart);
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // products can be deleted, but they should still be in cart
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
