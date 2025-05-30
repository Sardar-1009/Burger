import React, { useState } from 'react';
import IngredientList from './components/IngredientList';
import BurgerDisplay from './components/BurgerDisplay';
import type { BurgerIngredient } from './types/Ingredient';
import { INGREDIENTS, BASE_PRICE } from './constants/ingredients';
import { calculateBurgerPrice } from './utils/CalculatePrice';
import './index.css';

const App: React.FC = () => {
  const [burgerIngredients, setBurgerIngredients] = useState<BurgerIngredient[]>(
    INGREDIENTS.map((ingredient: { name: any; }) => ({
      name: ingredient.name,
      count: 0
    }))
  );

  const handleAddIngredient = (ingredientName: string): void => {
    setBurgerIngredients((prev: BurgerIngredient[]) =>
      prev.map((ingredient: BurgerIngredient) =>
        ingredient.name === ingredientName
          ? { ...ingredient, count: ingredient.count + 1 }
          : ingredient
      )
    );
  };

  const handleRemoveIngredient = (ingredientName: string): void => {
    setBurgerIngredients((prev: BurgerIngredient[]) =>
      prev.map((ingredient: BurgerIngredient) =>
        ingredient.name === ingredientName && ingredient.count > 0
          ? { ...ingredient, count: ingredient.count - 1 }
          : ingredient
      )
    );
  };

  const totalPrice: number = calculateBurgerPrice(burgerIngredients);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">🍔 Конструктор Бургеров</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IngredientList
            ingredients={INGREDIENTS}
            burgerIngredients={burgerIngredients}
            onAddIngredient={handleAddIngredient}
            onRemoveIngredient={handleRemoveIngredient}
          />
          
          <BurgerDisplay
            ingredients={burgerIngredients}
            totalPrice={totalPrice}
            basePrice={BASE_PRICE}
          />
        </div>
      </div>
    </div>
  );
};

export default App;