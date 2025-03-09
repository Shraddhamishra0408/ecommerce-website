import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/get_products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (productId) => {
    axios.post("http://127.0.0.1:5000/add_to_cart", { id: productId })
      .then(() => alert("Added to cart!"))
      .catch(() => alert("Already in cart!"));
  };

  const addToWishlist = (productId) => {
    axios.post("http://127.0.0.1:5000/add_to_wishlist", { id: productId })
      .then(() => alert("Added to wishlist!"))
      .catch(() => alert("Already in wishlist!"));
  };

  return (
    <div>
      <Navbar />

      {/* Banner Section */}
      <div className="banner">
        <h1>Trade-in-offer</h1>
        <h2>Super value deals</h2>
        <h3 className="green-text">On all products</h3>
        <p>Save more with coupons & up to <span className="discount">70% off</span></p>
        <button className="shop-now">Shop Now</button>
      </div>

      {/* Products Section */}
      <div className="products-container">
        <h2 className="section-title">Latest Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="brand">{product.brand}</h3>
              <h4 className="product-name">{product.name}</h4>
              <p className="price">₹{product.price}</p>
              <div className="buttons">
                <button className="add-to-cart" onClick={() => addToCart(product.id)}>
                  <FaShoppingCart className="cart-icon" /> Add to Cart
                </button>
                <button className="wishlist-btn" onClick={() => addToWishlist(product.id)}>
                  <FaHeart className="wishlist-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        /* Banner Styling */
        .banner {
          background: url('/banner.jpg') no-repeat center center;
          background-size: cover;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 50px;
          color: black;
          position: relative;
        }
        h1 { font-size: 50px; margin: 10px 0; font-weight: bold; }
        h2 { font-size: 40px; margin: 10px 0; font-weight: bold; }
        .green-text { font-size: 30px; margin: 10px 0; color: green; }
        p { font-size: 24px; font-weight: bold; }
        .discount { font-size: 26px; color: black; font-weight: bold; }
        .shop-now {
          margin-top: 15px;
          padding: 8px 16px;
          font-size: 18px;
          font-weight: bold;
          color: white;
          background-color: red;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width:fit-content;
        }
        .shop-now:hover { background-color: darkred; }

        /* Product Section */
        .products-container {
          padding: 50px 20px;
          text-align: center;
          background: #f8f8f8;
        }
        .section-title {
          font-size: 28px;
          margin-bottom: 20px;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          justify-content: center;
        }
        .product-card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .product-image {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 10px;
        }
        .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .add-to-cart, .wishlist-btn {
          padding: 8px 12px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .add-to-cart {
          background-color: #ff5733;
          color: white;
        }
        .wishlist-btn {
          background-color: transparent;
          color: red;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}
