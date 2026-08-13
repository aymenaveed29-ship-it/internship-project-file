// React Hooks
// useReducer manages the complete checkout form state
import { useReducer, useEffect, useMemo } from "react";
// useContext gives us access to the global cart
import { useContext } from "react";
// useNavigate lets us move the user to another route
// after the order is successfully placed
import { useNavigate } from "react-router-dom";
// Cart Context
import { CartContext } from "../context/CartContext";
// Website components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Toast notification
import { toast } from "react-toastify";
// Page styling
import "../styles/checkoutpage.css";

// Initial Checkout Form State

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "cod",
};

// Reducer Function
// The reducer receives the current state and an action.
// Based on the action type, it returns the updated state.
function checkoutReducer(state, action) {

  switch (action.type) {

    // Update one input field
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    // Reset the complete form
    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

// Checkout Component
function CheckoutPage() {

  // useReducer manages all checkout form fields
  const [formData, dispatch] = useReducer(
    checkoutReducer,
    initialState
  );

  // Get cart information and the clearCart function
  const {
    cartItems,
    clearCart,
  } = useContext(CartContext);

  // Used to navigate after order placement
  const navigate = useNavigate();

  // Calculate Subtotal

  // useMemo prevents recalculating the subtotal unless
  // cartItems actually change.
  const subtotal = useMemo(() => {

    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  }, [cartItems]);

  // Tax

  const tax = useMemo(() => {
    return subtotal * 0.05;
  }, [subtotal]);

  // Shipping
  // Free shipping for orders above $500
  const shipping = useMemo(() => {
    return subtotal >= 500 ? 0 : 20;
  }, [subtotal]);

  // Final Total
  const grandTotal = useMemo(() => {
    return subtotal + tax + shipping;
  }, [subtotal, tax, shipping]);

  // useEffect + Cleanup
  useEffect(() => {
    // This runs when the Checkout page opens
    console.log("Checkout page mounted");
    // Cleanup runs when the user leaves Checkout
    return () => {
      console.log("Checkout page unmounted");

    };

  }, []);

  // Handle Input Changes

  const handleChange = (e) => {

    // Send an action to the reducer
    dispatch({
      type: "UPDATE_FIELD",

      // Which field changed?
      field: e.target.name,

      // What value did the user enter?
      value: e.target.value,
    });

  };

  // Handle Form Submission

  const handleSubmit = (e) => {

    // Prevent normal browser form submission
    e.preventDefault();

    // Don't allow checkout with an empty cart
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {

      toast.error("Please complete all required fields.");

      return;
    }


    // Show success message
    toast.success("Order placed successfully!");

    // Clear cart after successful order
    clearCart();

    // Reset checkout form
    dispatch({
      type: "RESET_FORM",
    });

    // Navigate back to home page
    setTimeout(() => {

      navigate("/");

    }, 1200);

  };

  // Empty Cart Protection

  if (cartItems.length === 0) {

    return (
      <>
        <Navbar />

        <section className="checkout-empty">

          <h1>Your cart is empty</h1>

          <p>
            Add some products before proceeding to checkout.
          </p>

          <button
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>

        </section>

        <Footer />
      </>
    );
  }

  // Checkout UI
  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>
            Complete your details to place your order.
          </p>
        </div>


        <div className="checkout-layout">

          {/* ==========================================
              LEFT SIDE — CUSTOMER FORM
          ========================================== */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h2>Customer Information</h2>


            {/* Full Name */}

            <div className="form-group">

              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>


            {/* Email */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />

            </div>


            {/* Phone */}

            <div className="form-group">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03XX XXXXXXX"
                required
              />

            </div>


            {/* Address */}

            <div className="form-group">

              <label htmlFor="address">
                Shipping Address
              </label>

              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows="4"
                required
              />

            </div>


            {/* City + Postal Code */}

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Lahore"
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="postalCode">
                  Postal Code
                </label>

                <input
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="54000"
                  required
                />

              </div>

            </div>


            {/* ==========================================
                PAYMENT METHOD
            ========================================== */}

            <h2>Payment Method</h2>
            <div className="payment-options">

              <label>

                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={
                    formData.paymentMethod === "cod"
                  }
                  onChange={handleChange}
                />

                Cash on Delivery

              </label>

              <label>

                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={
                    formData.paymentMethod === "card"
                  }
                  onChange={handleChange}
                />

                Credit / Debit Card

              </label>
              <label>

                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={
                    formData.paymentMethod === "bank"
                  }
                  onChange={handleChange}
                />
                Bank Transfer

              </label>

            </div>


            {/* ==========================================
                PLACE ORDER
            ========================================== */}

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order
            </button>
          </form>


          {/* ==========================================
              RIGHT SIDE — ORDER SUMMARY
          ========================================== */}

          <aside className="order-summary">

            <h2>Order Summary</h2>

            {/* Product List */}

            <div className="summary-products">

              {cartItems.map((item) => (

                <div
                  className="summary-product"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>

                    <h3>{item.name}</h3>

                    <p>
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <strong>
                    $
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </strong>

                </div>

              ))}

            </div>


            {/* Billing */}

            <div className="summary-line">

              <span>Subtotal</span>

              <strong>
                ${subtotal.toFixed(2)}
              </strong>

            </div>
            <div className="summary-line">

              <span>Tax (5%)</span>

              <strong>
                ${tax.toFixed(2)}
              </strong>

            </div>

            <div className="summary-line">

              <span>Shipping</span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `$${shipping.toFixed(2)}`}
              </strong>

            </div>
            <hr />
            <div className="summary-total">

              <span>Grand Total</span>

              <strong>
                ${grandTotal.toFixed(2)}
              </strong>

            </div>

          </aside>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default CheckoutPage;