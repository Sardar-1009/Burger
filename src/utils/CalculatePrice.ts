import type { BurgerIngredient } from '../types/Ingredient';
import { INGREDIENTS, BASE_PRICE } from '../constants/ingredients';

export const calculateBurgerPrice = (burgerIngredients: BurgerIngredient[]): number => {
  let totalPrice: number = BASE_PRICE;
  
  burgerIngredients.forEach((burgerIngredient: BurgerIngredient) => {
    const ingredient = INGREDIENTS.find((ing: { name: string; }) => ing.name === burgerIngredient.name);
    if (ingredient) {
      totalPrice += ingredient.price * burgerIngredient.count;
    }
  });
  
  return totalPrice;
};