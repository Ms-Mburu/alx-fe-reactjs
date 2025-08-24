import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username required";
    if (!formData.email) newErrors.email = "Email required";
    if (!formData.password) newErrors.password = "Password required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formData);
      setFormData({ username: "", email: "", password: "" });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <p>{errors.username}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
