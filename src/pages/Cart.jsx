import { useContext, useMemo } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import "../styles/cart.css";

function Cart() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <>
      <Navbar />

      <section className="cart-page">

        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (

          <h2>Your cart is empty.</h2>

        ) : (

          <>
            {cartItems.map((item) => (

              <div className="cart-item" key={item.id}>

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-info">

                  <h2>{item.name}</h2>

                  <p>${item.price}</p>

                  <div className="quantity">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

            <div className="bill">

              <h3>
                Subtotal :
                ${subtotal.toFixed(2)}
              </h3>

              <h3>
                Tax :
                ${tax.toFixed(2)}
              </h3>

              <h2>
                Grand Total :
                ${total.toFixed(2)}
              </h2>

            </div>

          </>

        )}

      </section>

    </>
  );
}

export default Cart;