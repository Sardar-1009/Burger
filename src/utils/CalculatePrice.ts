export const calculatePrice = (burgerState: { [key: string]: number }): number => {
    const basePrice = 30; 
    const prices = {
      Meat: 80,
      Cheese: 50,
      Salad: 10,
      Bacon: 60,
    };
    return basePrice + Object.keys(burgerState).reduce((sum, ingredient) => sum + (burgerState[ingredient] || 0) * prices[ingredient], 0);
  };