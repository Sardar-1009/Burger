import React from 'react';
import { BurgerIngredient } from '../types/Ingredient';
import { calculatePrice } from '../utils/CalculatePrice';

interface BurgerConstructorProps {
  burgerIngredients: BurgerIngredient[];
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ burgerIngredients }) => {
  const layers: JSX.Element[] = [];
  let currentTop = 60;

  burgerIngredients.forEach((ingredient, index) => {
    const { name, count } = ingredient;
    for (let i = 0; i < count; i++) {
      if (name === 'Salad') {
        layers.push(<div key={`salad${index}-${i}`} className="lettuce" style={{ top: `${currentTop}px` }}></div>);
        currentTop += 20;
      } else if (name === 'Cheese') {
        layers.push(<div key={`cheese${index}-${i}`} className="cheese" style={{ top: `${currentTop}px` }}></div>);
        currentTop += 10;
      } else if (name === 'Meat') {
        layers.push(<div key={`meat${index}-${i}`} className="patty" style={{ top: `${currentTop}px` }}></div>);
        currentTop += 40;
      } else if (name === 'Bacon') {
        layers.push(<div key={`bacon${index}-${i}`} className="patty" style={{ background: '#b5651d', top: `${currentTop}px` }}></div>);
        currentTop += 40;
      }
    }
  });

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
      <div className="burger relative mx-auto">
        <div className="bun-top"></div>
        {layers}
        <div className="bun-bottom"></div>
      </div>
      <p className="mt-2 text-center">Цена: {totalPrice} сом</p>
    </div>
  );
};

export default BurgerConstructor;