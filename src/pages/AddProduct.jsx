
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/Products.js";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    image: "",
    description: "",
    price: "",
    category: "",
    type: "",
    rating: 0,
    stock: 0,
    color: "",
    size: ""
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    const existingProducts =
      JSON.parse(localStorage.getItem("products")) || productsData;

    const newProduct = {
      ...formData,
      id: Date.now(),
      price: Number(formData.price),
      rating: Number(formData.rating),
      stock: Number(formData.stock)
    };

    const updatedProducts = [
      ...existingProducts,
      newProduct
    ];

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    alert("Product Added Successfully!");

    navigate("/products");
  }

  return (
    <div className="form-container">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="type"
          placeholder="Product Type"
          value={formData.type}
          onChange={handleChange}
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
        />

        <input
          type="text"
          name="size"
          placeholder="Size"
          value={formData.size}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
