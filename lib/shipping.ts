export const SHIPPING_PRICE = 700
export const FREE_SHIPPING_THRESHOLD = 5000

export function getShippingPrice(subtotal: number) {
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_PRICE
}
