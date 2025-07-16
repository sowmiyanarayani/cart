const getDiscountPercent = (item, itemDiscounts, categoryDiscounts) => {
  const itemLevel = itemDiscounts[item.name];
  const categoryLevel = categoryDiscounts[item.category];

  return itemLevel ?? categoryLevel ?? 0;
};

const getTaxPercent = (item, taxRates) =>
  taxRates[item.category] || 0;

const getPayableQuantity = (item, itemsWithOffer) =>
  itemsWithOffer.includes(item.name)
    ? item.quantity - Math.floor(item.quantity / 3)
    : item.quantity;

const applyPercentageDiscount = (amount) => amount > 200 ?  amount - (amount * 2) / 100 : amount;

const applyFixedAmount = (amount) => amount >= 100 ?  amount - 5 : amount;

const applyItemCostBasedDiscount = (amount) =>amount ? applyPercentageDiscount(amount) : applyFixedAmount(amount);
    

const applyPromoCode = (total, code, promoCode) =>
  promoCode[code] && total > 2000
    ? total - (total * promoCode[code]) / 100
    : total;

export {
getDiscountPercent,
getTaxPercent,
getPayableQuantity,
applyItemCostBasedDiscount,
applyPromoCode
}