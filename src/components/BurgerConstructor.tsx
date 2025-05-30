import React, { JSX } from 'react';
import { type BurgerIngredient } from '../types/Ingredient';

interface BurgerDisplayProps {
  ingredients: BurgerIngredient[];
  totalPrice: number;
  basePrice: number;
}

const BurgerDisplay: React.FC<BurgerDisplayProps> = ({ 
  ingredients, 
  totalPrice, 
  basePrice 
}) => {
  const renderIngredientLayers = (): JSX.Element[] => {
    const layers: JSX.Element[] = [];
    
    ingredients.forEach((ingredient: BurgerIngredient) => {
      for (let i = 0; i < ingredient.count; i++) {
        let layerClass = '';
        
        switch (ingredient.name) {
          case 'Мясо':
            layerClass = 'Meat';
            break;
          case 'Сыр':
            layerClass = 'Cheese';
            break;
          case 'Салат':
            layerClass = 'Salad';
            break;
          case 'Бекон':
            layerClass = 'Bacon';
            break;
        }
        
        layers.push(
          <div
            key={`${ingredient.name}-${i}`}
            className={layerClass}
          />
        );
      }
    });
    
    return layers;
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Бургер</h2>
      </div>
      
      <div className="flex flex-col items-center p-6">
        <div className="Burger">
          <div className="BreadTop">
            <div className="Seeds1"></div>
            <div className="Seeds2"></div>
          </div>
          
          {renderIngredientLayers()}
          
          <div className="BreadBottom"></div>
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-4">
            Цена: {totalPrice} сом
          </div>
          <div className="text-sm text-gray-500">
            Базовая цена булочки: {basePrice} сом
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerDisplay;