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

function generateId() {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(8, "0");
  return `BM${randomNum}`;
}

export { calculateDiscount, generateId }

