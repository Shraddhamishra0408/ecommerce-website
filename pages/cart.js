import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/get_cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    axios.post("http://127.0.0.1:5000/update_cart_quantity", { id: productId, quantity: newQuantity })
      .then(() => {
        setCart(cart.map(product => 
          product.id === productId ? { ...product, quantity: newQuantity } : product
        ));
      })
      .catch((err) => console.error("Error updating quantity:", err));
  };

  const removeFromCart = (productId) => {
    axios.post("http://127.0.0.1:5000/remove_from_cart", { id: productId })
      .then(() => setCart(cart.filter(product => product.id !== productId)))
      .catch((err) => console.error("Error removing from cart:", err));
  };

  const saveForLater = (productId) => {
    axios.post("http://127.0.0.1:5000/save_for_later", { id: productId })
      .then(() => setCart(cart.filter(product => product.id !== productId)))
      .catch((err) => console.error("Error saving for later:", err));
  };

  return (
    <div>
      <Navbar />
      <h1>Your Cart</h1>
      <div className="cart-container">
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img src={product.image} alt={product.name} className="cart-image" />
              <div>
                <h3>{product.name}</h3>
                <p>Brand: {product.brand}</p>
                <p>Price: ₹{product.price}</p>
                <div className="quantity-selector">
                  <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                </div>
                <p>Total: ₹{product.price * product.quantity}</p>
                <div className="cart-buttons">
                  <button className="remove-btn" onClick={() => removeFromCart(product.id)}>Remove</button>
                  <button className="save-btn" onClick={() => saveForLater(product.id)}>Save for Later</button>
                  <button className="buy-btn">Buy This Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <style jsx>{`
        .cart-container {
          padding: 20px;
        }
        .cart-item {
          display: flex;
          gap: 15px;
          border-bottom: 1px solid #ddd;
          padding: 10px;
        }
        .cart-image {
          width: 150px;
          height: 150px;
          border-radius: 5px;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .quantity-selector button {
          background-color: #ff5733;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
        }
        .cart-buttons {
          margin-top: 10px;
          display: flex;
          gap: 10px;
        }
        .remove-btn, .save-btn, .buy-btn {
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }
        .remove-btn {
          background-color: red;
          color: white;
        }
        .save-btn {
          background-color: orange;
          color: white;
        }
        .buy-btn {
          background-color: green;
          color: white;
        }
      `}</style>
    </div>
  );
}
