import create from 'zustand';
import { BurgerIngredient } from './types';

interface BurgerState {
  ingredients: BurgerIngredient[];
  addIngredient: (name: string) => void;
  removeIngredient: (name: string) => void;
}

export const useBurgerStore = create<BurgerState>((set) => ({
  ingredients: [
    { name: 'Meat', count: 0 },
    { name: 'Cheese', count: 0 },
    { name: 'Salad', count: 0 },
    { name: 'Bacon', count: 0 },
  ],
  addIngredient: (name) =>
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) =>
        ingredient.name === name
          ? { ...ingredient, count: ingredient.count + 1 }
          : ingredient
      ),
    })),
  removeIngredient: (name) =>
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) =>
        ingredient.name === name && ingredient.count > 0
          ? { ...ingredient, count: ingredient.count - 1 }
          : ingredient
      ),
    })),
}));