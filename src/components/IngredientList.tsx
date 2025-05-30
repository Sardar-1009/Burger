import React from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Ingredient, BurgerIngredient } from '../types/Ingredient';
import { INGREDIENTS } from '../constants/ingredients';

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
  const ingredientData = INGREDIENTS.find((ing) => ing.name === ingredient.name);
  const price = ingredientData ? ingredientData.price : 0;

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <button
        onClick={() => onAdd(ingredient.name)}
        className="flex items-center space-x-3 flex-1 p-2 rounded"
      >
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
          <img 
            src={ingredient.image} 
            alt={ingredient.name}
            className="w-10 h-10 object-cover rounded"
          />
        </div>
        <span className="font-medium text-gray-800">{ingredient.name} - {price} сом</span>
      </button>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-lg min-w-[30px] text-center text-gray-800">x{count}</span>
        <IconButton
          onClick={() => onRemove(ingredient.name)}
          disabled={count === 0}
          sx={{ color: 'red' }}
        >
          <Delete fontSize="small" />
        </IconButton>
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
        <h2 className="text-xl font-semibold text-gray-800 text-center">Ингредиенты</h2>
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