import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for password toggle

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.includes("@")) errors.email = "Enter a valid email";
    if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Signup Successful!");
      console.log(formData);
      setFormData({ name: "", email: "", password: "" }); // Clear form
      setErrors({});
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <h1>Create an Account</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">Already have an account? <a href="/login">Login here</a></p>
      </div>

      <style jsx>{`
        .signup-container {
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
        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .input-group {
          position: relative;
        }
        input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }
        .input-error {
          border: 1px solid red;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
          text-align: left;
        }
        .password-field {
          display: flex;
          align-items: center;
        }
        .toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 18px;
          color: #888;
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
        .login-link {
          margin-top: 15px;
          font-size: 14px;
        }
        .login-link a {
          color: #007bff;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
