import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    axios.get("http://127.0.0.1:5000/get_wishlist")
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error("Error fetching wishlist:", err));
  };

  const removeFromWishlist = (productId) => {
    axios.post("http://127.0.0.1:5000/remove_from_wishlist", { id: productId })
      .then(() => {
        alert("Removed from wishlist!");
        fetchWishlist(); // Refresh wishlist
      })
      .catch((err) => alert("Error removing product"));
  };

  return (
    <div>
      <Navbar />
      <h1>Your Wishlist</h1>
      <div className="wishlist-container">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product.id} className="wishlist-item">
              <img src={product.image} alt={product.name} className="wishlist-image" />
              <div>
                <h3>{product.name}</h3>
                <p>Brand: {product.brand}</p>
                <p>Price: ₹{product.price}</p>
                <button className="remove-btn" onClick={() => removeFromWishlist(product.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>

      <style jsx>{`
        .wishlist-container {
          padding: 20px;
        }
        .wishlist-item {
          display: flex;
          gap: 15px;
          border-bottom: 1px solid #ddd;
          padding: 10px;
        }
        .wishlist-image {
          width: 150px;
          height: 150px;
          border-radius: 5px;
        }
        .remove-btn {
          margin-top: 5px;
          padding: 5px 10px;
          background-color: red;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
