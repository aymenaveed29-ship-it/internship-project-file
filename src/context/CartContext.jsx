import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  // Load cart from localStorage when app starts
  //Whenever the cart changes, automatically change in browser
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    console.log(cartItems);
}, [cartItems]);

  // Add product
  const addToCart = (product) => {
  setCartItems((prevCart) => {
    const existing = prevCart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...prevCart,
      {
        ...product,
        quantity: 1,
      },
    ];
  });
};
  // Remove product completely
  const removeFromCart = (id) => {

    setCartItems(
      cartItems.filter((item) => item.id !== id)
    );

  };

  // Increase quantity
  const increaseQuantity = (id) => {

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );

  };

  // Decrease quantity
  const decreaseQuantity = (id) => {

    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  };

  // Clear cart
  const clearCart = () => {

    setCartItems([]);

  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export default CartProvider;
