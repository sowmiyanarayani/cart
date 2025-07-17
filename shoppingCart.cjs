const config = require('./config.json');
const {
  getDiscountPercent,
  getTaxPercent,
  getPayableQuantity,
  applyItemCostBasedDiscount,
  applyPromoCode
} = require('./cartUtils.cjs');

const {
  carts,
  itemDiscounts,
  categoryDiscounts,
  taxRates,
  itemsWithOffer,
  promoCode
} = config;

const calculateItemTotal = (item) => {
  const payableQty = getPayableQuantity(item, itemsWithOffer);
  const subtotal = item.price * payableQty;

  const discountPercent = getDiscountPercent(item, itemDiscounts, categoryDiscounts);
  const discountAmount = (subtotal * discountPercent) / 100;
  const afterDiscount = subtotal - discountAmount;

  const costAfterExtraDiscount = applyItemCostBasedDiscount(afterDiscount);
  const taxPercent = getTaxPercent(item, taxRates);
  const taxAmount = (costAfterExtraDiscount * taxPercent) / 100;

  const finalTotal = costAfterExtraDiscount + taxAmount;

  return {
    Name: item.name,
    Category: item.category,
    Quantity: item.quantity,
    PayableQty: payableQty,
    UnitPrice: item.price,
    Subtotal: subtotal,
    DiscountPercent: discountPercent,
    CostAfterDiscount: afterDiscount,
    ExtraDiscounted: costAfterExtraDiscount,
    TaxPercent: taxPercent,
    FinalTotal: Math.round(finalTotal),
  };
};

const main = (code ) => {
  const shoppingCart = carts.map(calculateItemTotal);
  const grandTotal = shoppingCart.reduce((sum, item) => sum + item.FinalTotal, 0);
  const totalAfterPromo = applyPromoCode(grandTotal, code, promoCode);

  console.table(shoppingCart);
  console.log("Grand Total:", grandTotal);
  console.log("Final Payable Amount:", totalAfterPromo);
};

main("SAVE10");
