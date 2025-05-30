import { Ingredient } from '../types/Ingredient';
import meatImage from '../assets/meat.png';
import cheeseImage from '../assets/cheese.png';
import saladImage from '../assets/salad.png';
import baconImage from '../assets/bacon.png';

export const BASE_PRICE: number = 30;

export const INGREDIENTS: Ingredient[] = [
  {
    name: 'Мясо',
    price: 80,
    image: meatImage
  },
  {
    name: 'Сыр',
    price: 50,
    image: cheeseImage
  },
  {
    name: 'Салат',
    price: 10,
    image: saladImage
  },
  {
    name: 'Бекон',
    price: 60,
    image: baconImage
  }
];