import "../styles/products.css";
import mattress1 from "../assets/images/mattress1.jpg";
import mattress2 from "../assets/images/mattress2.jpg";
import mattress3 from "../assets/images/mattress3.jpg";
import mattress4 from "../assets/images/mattress4.jpg";
function Products() {
    const products = [
        {
            id:1,
            name:"Dream Comfort Mattress",
            price:"$599",
            image: mattress1,
            
        },

        {
            id:2,
            name:"Luxury Hybrid Mattress",
            price:"$799",
            image:mattress2,
        },

        {
            id:3,
            name:"Memory Foam Mattress",
            price:"$499",
            image:mattress3,
        },

        {
            id:4,
            name:"Premium Pillow Set",
            price:"$99",
            image:mattress4,
        }

    ];

    return (
        <section className="products">
            <h2>Featured Products</h2>
            <p>
                Discover our best-selling products.
            </p>

            <div className="product-grid">

                {
                    products.map((product)=>(
                        <div className="product-card" key={product.id}>

                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <h3>{product.name}</h3>

                            <div className="rating">
                                ⭐⭐⭐⭐⭐
                            </div>

                            <h4>{product.price}</h4>

                            <button>
                                Add to Cart
                            </button>

                        </div>
                    ))
                }

            </div>
        </section>
    );
}

export default Products;