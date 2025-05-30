import { INGREDIENTS } from '../constants/ingredients';

export const calculatePrice = (burgerState: { [key: string]: number }): number => {
  const ingredientsTotal = Object.entries(burgerState).reduce((total, [name, count]) => {
    const ingredient = INGREDIENTS.find((ing) => ing.name === name);
    const price = (ingredient?.price || 0) * count;
    console.log(`Calculating for ${name}: ${count} x ${ingredient?.price || 0} = ${price}`);
    return total + price;
  }, 0);
  const finalPrice = ingredientsTotal + 30;
  console.log(`Ingredients total: ${ingredientsTotal}, Final price with buns: ${finalPrice}`);
  return finalPrice;
};