import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/get_wishlist")
      .then((res) => {
        console.log("Wishlist Data:", res.data); // Debugging
        setWishlist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setLoading(false);
      });
  }, []);

  const removeFromWishlist = (productId) => {
    axios.post("http://127.0.0.1:5000/remove_from_wishlist", { id: productId })
      .then(() => setWishlist(wishlist.filter(product => product.id !== productId)))
      .catch((err) => console.error("Error removing from wishlist:", err));
  };

  return (
    <div>
      <Navbar />
      <h1>Your Wishlist</h1>

      {loading ? <p>Loading...</p> : (
        <div className="wishlist-container">
          {wishlist.length > 0 ? (
            wishlist.map((product, index) => (
              <div key={index} className="wishlist-item">
                <img src={product.image} alt={product.name} className="wishlist-image" />
                <div className="wishlist-details">
                  <h3>{product.name}</h3>
                  <p>Brand: {product.brand}</p>
                  <p className="price">Price: ₹{product.price}</p>
                  <button className="remove-btn" onClick={() => removeFromWishlist(product.id)}>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      )}

      <style jsx>{`
        .wishlist-container {
          padding: 20px;
        }
        .wishlist-item {
          display: flex;
          gap: 15px;
          border-bottom: 1px solid #ddd;
          padding: 10px;
          align-items: center;
        }
        .wishlist-image {
          width: 150px;
          height: 150px;
          border-radius: 5px;
        }
        .wishlist-details {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .price {
          font-size: 18px;
          font-weight: bold;
          
        }
        .remove-btn {
          padding: 8px 12px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: background 0.3s ease-in-out;
          width: fit-content;
        }
        .remove-btn:hover {
          background-color: darkred;
        }
      `}</style>
    </div>
  );
}
