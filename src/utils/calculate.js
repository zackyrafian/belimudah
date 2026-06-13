/**
 * Calculate Discount
 * @param {number} price 
 * @param {number} discount 
 * @returns {{
 *  finalPrice: number, 
 *  save: number, 
 * }}
 */
const calculateDiscount = (price, discount) => {
  const finalPrice = price * (1 - discount / 100);
  const save = price - finalPrice;
  return {
    finalPrice,
    save,
  };
}

export { calculateDiscount }

