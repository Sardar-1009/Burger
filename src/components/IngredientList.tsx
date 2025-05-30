import React from 'react';
import { Delete } from '@mui/icons-material';
import { Ingredient, BurgerIngredient } from '../types/Ingredient';

interface IngredientItemProps {
  ingredient: Ingredient;
  count: number;
  onAdd: (ingredientName: string) => void;
  onRemove: (ingredientName: string) => void;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ 
  ingredient, 
  count, 
  onAdd, 
  onRemove 
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200">
      <button
        onClick={() => onAdd(ingredient.name)}
        className="flex items-center space-x-3 flex-1 hover:bg-gray-50 p-2 rounded transition-colors"
      >
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-300">
          <img 
            src={ingredient.image} 
            alt={ingredient.name}
            className="w-10 h-10 object-cover rounded"
          />
        </div>
        <span className="font-medium text-gray-800">{ingredient.name}</span>
      </button>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-lg min-w-[30px] text-center">x{count}</span>
        <button
          onClick={() => onRemove(ingredient.name)}
          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
          disabled={count === 0}
        >
          <Delete fontSize="small" />
        </button>
      </div>
    </div>
  );
};

interface IngredientListProps {
  ingredients: Ingredient[];
  burgerIngredients: BurgerIngredient[];
  onAddIngredient: (ingredientName: string) => void;
  onRemoveIngredient: (ingredientName: string) => void;
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  burgerIngredients,
  onAddIngredient,
  onRemoveIngredient
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Ингредиенты</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {ingredients.map((ingredient: Ingredient) => {
          const burgerIngredient: BurgerIngredient | undefined = burgerIngredients.find(
            (bi: BurgerIngredient) => bi.name === ingredient.name
          );
          
          return (
            <IngredientItem
              key={ingredient.name}
              ingredient={ingredient}
              count={burgerIngredient?.count || 0}
              onAdd={onAddIngredient}
              onRemove={onRemoveIngredient}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IngredientList;