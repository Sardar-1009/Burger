import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import IngredientList from './components/IngredientList';
import BurgerConstructor from './components/BurgerConstructor';
import ErrorBoundary from './components/ErrorBoundary';
import { INGREDIENTS } from './constants/ingredients';
import { BurgerIngredient } from './types/Ingredient';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import MenuPage from './pages/MenuPage';
import EditBurgerPage from './pages/EditBurgerPage';

const App: React.FC = () => {
  const [burgerIngredients, setBurgerIngredients] = useState<BurgerIngredient[]>([]);
  const [burgerName, setBurgerName] = useState<string>('');

  useEffect(() => {
    console.log('App state updated - burgerIngredients:', burgerIngredients);
  }, [burgerIngredients]);

  const addIngredient = (ingredientName: string) => {
    console.log('Adding ingredient in App:', ingredientName);
    setBurgerIngredients((prev) => {
      const existing = prev.find((bi) => bi.name === ingredientName);
      if (existing) {
        const updated = prev.map((bi) =>
          bi.name === ingredientName ? { ...bi, count: bi.count + 1 } : bi
        );
        console.log('Updated (existing) burgerIngredients:', updated);
        return updated;
      }
      const updated = [...prev, { name: ingredientName, count: 1 }];
      console.log('Updated (new) burgerIngredients:', updated);
      return updated;
    });
  };

  const removeIngredient = (ingredientName: string) => {
    console.log('Removing ingredient in App:', ingredientName);
    setBurgerIngredients((prev) => {
      const existing = prev.find((bi) => bi.name === ingredientName);
      if (existing && existing.count > 1) {
        const updated = prev.map((bi) =>
          bi.name === ingredientName ? { ...bi, count: bi.count - 1 } : bi
        );
        console.log('Updated (reduced) burgerIngredients:', updated);
        return updated;
      }
      const updated = prev.filter((bi) => bi.name !== ingredientName);
      console.log('Updated (removed) burgerIngredients:', updated);
      return updated;
    });
  };

  const saveBurgerToMenu = async () => {
    if (!burgerName) {
      alert('Пожалуйста, введите название бургера');
      return;
    }
    if (burgerIngredients.length === 0) {
      alert('Пожалуйста, добавьте хотя бы один ингредиент');
      return;
    }

    try {
      await addDoc(collection(db, 'burgers'), {
        name: burgerName,
        ingredients: burgerIngredients,
        createdAt: new Date().toISOString(),
      });
      alert('Бургер успешно добавлен в меню!');
      setBurgerName('');
      setBurgerIngredients([]);
    } catch (error) {
      console.error('Ошибка при добавлении бургера:', error);
      alert('Произошла ошибка при добавлении бургера');
    }
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-100 p-6">
          <nav className="mb-6">
            <Link to="/" className="mr-4 text-blue-500 hover:underline">Конструктор</Link>
            <Link to="/menu" className="text-blue-500 hover:underline">Меню</Link>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="text-3xl font-bold text-center mb-6">Конструктор Бургеров</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <IngredientList
                      ingredients={INGREDIENTS}
                      burgerIngredients={burgerIngredients}
                      onAddIngredient={addIngredient}
                      onRemoveIngredient={removeIngredient}
                    />
                    <BurgerConstructor key={JSON.stringify(burgerIngredients)} burgerIngredients={burgerIngredients} />
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
                      onClick={saveBurgerToMenu}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Добавить в меню
                    </button>
                  </div>
                </div>
              }
            />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/edit/:id" element={<EditBurgerPage />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;