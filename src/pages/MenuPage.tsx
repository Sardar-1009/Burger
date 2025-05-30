import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

const MenuPage: React.FC = () => {
  const [burgers, setBurgers] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'burgers'));
        const burgerList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBurgers(burgerList);
      } catch (error) {
        console.error('Ошибка при получении бургеров:', error);
      }
    };

    fetchBurgers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Меню</h1>
      {burgers.length === 0 ? (
        <p className="text-center text-gray-500">Меню пусто</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {burgers.map((burger) => (
            <div key={burger.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{burger.name}</h2>
              <ul className="mb-4">
                {burger.ingredients.map((ingredient: any, index: number) => (
                  <li key={index}>
                    {ingredient.name} x{ingredient.count}
                  </li>
                ))}
              </ul>
              <Link
                to={`/edit/${burger.id}`}
                classNameetés: "text-blue-500 hover:underline"
              >
                Редактировать
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;