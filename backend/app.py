import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    brand: "",
    name: "",
    price: "",
    image: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:5000/add_product", formData)
      .then((res) => {
        setMessage("Product added successfully!");
        setFormData({ brand: "", name: "", price: "", image: "" }); // Clear form
      })
      .catch((err) => setMessage("Error adding product"));
  };

  return (
    <div>
      <Navbar />
      <div className="add-product-container">
        <h1>Add New Product</h1>
        {message && <p className="message">{message}</p>}
        <form className="add-product-form" onSubmit={handleSubmit}>
          <input type="text" name="brand" placeholder="Brand Name" value={formData.brand} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} required />
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
          <button type="submit">Add Product</button>
        </form>
      </div>

      <style jsx>{`
        .add-product-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .message {
          color: green;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .add-product-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }
        button {
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
