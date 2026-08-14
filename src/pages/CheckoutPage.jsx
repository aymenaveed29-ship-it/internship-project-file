
// React Hooks
// useReducer manages the complete checkout form state
// useEffect handles side effects and cleanup
// useMemo calculates derived billing values efficiently
// useState tracks whether the order has been placed
import { useReducer, useEffect, useMemo, useState, useContext} from "react";

// React Router
// Link is used for the Continue Shopping button
import { Link } from "react-router-dom";
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
// It decides how the checkout form state should change.
function checkoutReducer(state, action) {

  switch (action.type) {

    // Update one form field
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    // Reset the whole form
    case "RESET_FORM":
      return initialState;

    // Keep current state for unknown actions
    default:
      return state;
  }
}

// Checkout Page Component=
function CheckoutPage() {
  // Checkout form state
  const [formData, dispatch] = useReducer(
    checkoutReducer,
    initialState
  );
  // Tracks whether the order was completed


  const [orderPlaced, setOrderPlaced] = useState(false);

  // Get cart data and cart functions
  const {
    cartItems,
    clearCart,
  } = useContext(CartContext);
  // Calculate Subtotal

  const subtotal = useMemo(() => {

    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

  }, [cartItems]);

  // Calculate Tax
  const tax = useMemo(() => {
    return subtotal * 0.05;
  }, [subtotal]);

  // Calculate Shipping
  const shipping = useMemo(() => {
    return subtotal >= 500 ? 0 : 20;
  }, [subtotal]);

  // Calculate Final Total
  const grandTotal = useMemo(() => {
    return subtotal + tax + shipping;
  }, [subtotal, tax, shipping]);


  // ==========================================
  // useEffect + Cleanup
  // ==========================================

  useEffect(() => {

    // Runs when CheckoutPage mounts
    console.log("Checkout page mounted");

    // Cleanup function runs when leaving CheckoutPage
    return () => {
      console.log("Checkout page unmounted");
    };

  }, []);
  // ==========================================
  // Handle Input Changes
  // ==========================================

  const handleChange = (e) => {

    dispatch({

      // Tell the reducer which type of update to perform
      type: "UPDATE_FIELD",

      // Name of the field that changed
      field: e.target.name,

      // New value entered by the user
      value: e.target.value,
    });

  };
  // ==========================================
  // Handle Order Submission
  // ==========================================

  const handleSubmit = (e) => {

    // Prevent the browser from reloading
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {

      toast.error(
        "Please complete all required fields."
      );

      return;
    }
    clearCart();
    // Tell React to show the success screen
    setOrderPlaced(true);
    dispatch({
      type: "RESET_FORM",
    });

  };
  // ==========================================
  // SUCCESS SCREEN
  // ==========================================
  if (orderPlaced) {

    return (
      <>
        <Navbar />

        <section className="order-success">

          {/* Green circular tick */}
          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Placed Successfully!
          </h1>

          <p>
            Thank you for shopping with DreamNest.
            Your order has been received successfully.
          </p>

          {/* Return to Home */}
          <Link
            to="/"
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>

        </section>

        <Footer />
      </>
    );
  }

  // This only appears when the user visits
  // checkout with no items in the cart.
  if (cartItems.length === 0) {

    return (
      <>
        <Navbar />

        <section className="checkout-empty">

          <h1>Your Cart Is Empty</h1>

          <p>
            Add some products before proceeding
            to checkout.
          </p>

          <Link
            to="/shop"
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>

        </section>

        <Footer />
      </>
    );
  }


  // ==========================================
  // NORMAL CHECKOUT PAGE
  // ==========================================

  return (
    <>
      <Navbar />

      <main className="checkout-page">

        {/* Page Heading */}
        <div className="checkout-header">

          <h1>Checkout</h1>

          <p>
            Complete your details to place your order.
          </p>

        </div>


        <div className="checkout-layout">

          {/* ==========================================
              LEFT SIDE - CUSTOMER FORM
          ========================================== */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h2>
              Customer Information
            </h2>


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

            <h2>
              Payment Method
            </h2>

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
                PLACE ORDER BUTTON
            ========================================== */}

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order
            </button>

          </form>


          {/* ==========================================
              RIGHT SIDE - ORDER SUMMARY
          ========================================== */}

          <aside className="order-summary">

            <h2>
              Order Summary
            </h2>


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

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <strong>
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </strong>

                </div>

              ))}

            </div>


            {/* Billing */}

            <div className="summary-line">

              <span>
                Subtotal
              </span>

              <strong>
                ${subtotal.toFixed(2)}
              </strong>

            </div>


            <div className="summary-line">

              <span>
                Tax (5%)
              </span>

              <strong>
                ${tax.toFixed(2)}
              </strong>

            </div>


            <div className="summary-line">

              <span>
                Shipping
              </span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `$${shipping.toFixed(2)}`}
              </strong>

            </div>


            <hr />


            {/* Grand Total */}

            <div className="summary-total">

              <span>
                Grand Total
              </span>

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