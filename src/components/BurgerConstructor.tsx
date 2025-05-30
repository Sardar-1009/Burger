import React from 'react';
import { BurgerIngredient } from '../types/Ingredient';
import { calculatePrice } from '../utils/CalculatePrice';

const BurgerConstructor: React.FC<{ burgerIngredients?: BurgerIngredient[] }> = ({ burgerIngredients = [] }) => {
  const layers: JSX.Element[] = [];
  let currentTop = 50;

  console.log('BurgerConstructor received:', burgerIngredients);

  if (Array.isArray(burgerIngredients)) {
    burgerIngredients.forEach((ingredient, index) => {
      const { name, count } = ingredient;
      const normalizedName = name.trim().toLowerCase();
      console.log(`Processing: ${name}, normalized: ${normalizedName}, count: ${count}`);

      for (let i = 0; i < count; i++) {
        if (normalizedName === 'salad') {
          layers.push(<div key={`salad${index}-${i}`} className="lettuce" style={{ top: `${currentTop}px` }} />);
          currentTop += 15;
        } else if (normalizedName === 'cheese') {
          layers.push(<div key={`cheese${index}-${i}`} className="cheese" style={{ top: `${currentTop}px` }} />);
          currentTop += 10;
        } else if (normalizedName === 'meat') {
          layers.push(<div key={`meat${index}-${i}`} className="patty" style={{ top: `${currentTop}px` }} />);
          currentTop += 25;
        } else if (normalizedName === 'bacon') {
          layers.push(<div key={`bacon${index}-${i}`} className="bacon" style={{ top: `${currentTop}px` }} />);
          currentTop += 20;
        }
      }
    });
  }

  const burgerState = burgerIngredients.reduce(
    (acc, item) => {
      acc[item.name] = item.count;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const totalPrice = calculatePrice(burgerState);
  console.log('Calculated totalPrice:', totalPrice);

  return (
    <div className="w-full md:w-2/3 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2 text-center">Бургер</h2>
      <div className="flex justify-center">
        <div className="burger relative">
          <div className="bun-top" />
          {layers.length > 0 ? (
            layers
          ) : (
            <div className="text-center text-gray-600" style={{ top: '80px', position: 'absolute', width: '100%' }}>
              Нет ингредиентов
            </div>
          )}
          <div className="bun-bottom" style={{ top: `${currentTop}px` }} />
        </div>
      </div>
      <div className="mt-8"></div>
      <p className="text-center text-lg font-medium">Общая цена: {totalPrice} сом</p>
    </div>
  );
};

export default BurgerConstructor;