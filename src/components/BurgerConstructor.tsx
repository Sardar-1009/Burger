import React from 'react';
import { BurgerIngredient } from '../types/Ingredient';
import { calculatePrice } from '../utils/CalculatePrice';

interface BurgerConstructorProps {
  burgerIngredients?: BurgerIngredient[];
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ burgerIngredients = [] }) => {
  const burgerState = burgerIngredients.reduce(
    (acc, item) => {
      acc[item.name] = item.count;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const totalPrice = calculatePrice(burgerState);

  return (
    <div className="w-full md:w-2/3 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">Бургер</h2>
      <div className="burger p-4 bg-yellow-200 rounded-lg border border-yellow-300">
        <div className="bun-top bg-yellow-300 text-center py-2 mb-2 rounded-t-lg">Верхняя булка</div>
        {burgerIngredients.length === 0 ? (
          <p className="text-center text-gray-600">Нет ингредиентов</p>
        ) : (
          <ul className="list-disc pl-5">
            {burgerIngredients.map((ingredient, index) => (
              <li key={index} className="text-gray-800">
                {ingredient.name} x{ingredient.count}
              </li>
            ))}
          </ul>
        )}
        <div className="bun-bottom bg-yellow-300 text-center py-2 mt-2 rounded-b-lg">Нижняя булка</div>
      </div>
      <p className="mt-2 text-center">Цена: {totalPrice} сом</p>
    </div>
  );
};

export default BurgerConstructor;