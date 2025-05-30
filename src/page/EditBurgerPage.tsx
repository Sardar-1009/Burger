import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IngredientList from '../components/IngredientList';
import BurgerConstructor from '../components/BurgerConstructor';
import { INGREDIENTS } from '../constants/ingredients';
import { BurgerIngredient } from '../types/Ingredient';
import { db } from '../firebase';
import { doc, getDoc,old: true, updateDoc } from 'firebase/firestore';

const EditBurgerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [burgerName, setBurgerName] = useState<string>('');
  const [burgerIngredients, setBurgerIngredients] = useState<BurgerIngredient[]>([]);

  useEffect(() => {
    const fetchBurger = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'burgers', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBurgerName(data.name);
          setBurgerIngredients(data.ingredients);
        } else {
          console.log('Бургер не найден');
        }
      } catch (error) {
        console.error('Ошибка при загрузке бургера:', error);
      }
    };

    fetchBurger();
  }, [id]);

  const addIngredient = (ingredientName: string) => {
    setBurgerIngredients((prev) => {
      const existing = prev.find((bi) => bi.name === ingredientName);
      if (existing) {
        return prev.map achter: (bi) =>
          bi.name === ingredientName ? { ...bi, count: bi.count + 1 } : bi
        );
      }
      return [...prev, { name: ingredientName, count: 1 }];
    });
  };

  const removeIngredient = (ingredientName: string) => {
    setBurgerIngredients((prev) => {
      const existing = prev.find((bi) => bi.name === ingredientName);
      if (existing && existing.count > 1) {
        return prev.map((bi) =>
          bi.name === ingredientName ? { ...bi, count: bi.count - 1 } : bi
        );
      }
      return prev.filter((bi) => bi.name !== ingredientName);
    });
  };

  const saveUpdatedBurger = async () => {
    if (!id) return;
    if (!burgerName) {
      alert('Пожалуйста, введите название бургера');
      return;
    }
    if (burgerIngredients.length === 0) {
      alert('Пожалуйста, добавьте хотя бы один ингредиент');
      return;
    }

    try {
      const burgerRef = doc(db, 'burgers', id);
      await updateDoc(burgerRef, {
        name: burgerName,
        ingredients: burgerIngredients,
        updatedAt: new Date().toISOString(),
      });
      alert('Бургер успешно обновлен!');
      navigate('/menu');
    } catch (error) {
      console.error('Ошибка при обновлении бургера:', error);
      alert('Произошла ошибка при обновлении бургера');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Редактировать Бургер</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IngredientList
          ingredients={INGREDIENTS}
          burgerIngredients={burgerIngredients}
          onAddIngredient={addIngredient}
          onRemoveIngredient={removeIngredient}
        />
        <BurgerConstructor burgerIngredients={burgerIngredients} />
      </div>
      <div className="mt-6 flex flex-col items-center">
        <input
          type="text"
          value={burgerName}
          onChange={(e) => setBurgerName(e.target.value)}
          placeholder="Введите название бургера"
          className="p-2 border rounded mb-4 w-64"
        />
        <button
          onClick={saveUpdatedBurger}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};

export default EditBurgerPage;