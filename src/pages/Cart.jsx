import Navbar from "../components/Navbar";

function Cart() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "80px", textAlign: "center" }}>
        <h1>Your Cart</h1>
        <p>Your selected products will appear here.</p>
      </div>
    </>
  );
}

export default Cart;