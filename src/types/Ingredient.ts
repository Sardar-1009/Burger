interface Ingredient {
  name: string;
  price: number;
  image: string;
}

interface BurgerIngredient {
  name: string;
  count: number;
}

export type { Ingredient, BurgerIngredient };