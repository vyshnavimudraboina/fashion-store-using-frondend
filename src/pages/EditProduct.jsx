
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productsData from "../data/Products";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    image: "",
    description: "",
    price: "",
    category: "",
    type: "",
    rating: "",
    stock: "",
    color: "",
    size: ""
  });

  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const allProducts = [...productsData];

    savedProducts.forEach((savedProduct) => {
      const index = allProducts.findIndex(
        (product) => product.id === savedProduct.id
      );

      if (index === -1) {
        allProducts.push(savedProduct);
      } else {
        allProducts[index] = savedProduct;
      }
    });

    const selectedProduct = allProducts.find(
      (product) => String(product.id) === String(id)
    );

    if (selectedProduct) {
      setFormData({
        ...selectedProduct,
        price: selectedProduct.price ?? "",
        rating: selectedProduct.rating ?? "",
        stock: selectedProduct.stock ?? ""
      });
    } else {
      toast.error("Product Not Found!");
      navigate("/products");
    }
  }, [id, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const savedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const allProducts = [...productsData];

    savedProducts.forEach((savedProduct) => {
      const index = allProducts.findIndex(
        (product) => product.id === savedProduct.id
      );

      if (index === -1) {
        allProducts.push(savedProduct);
      } else {
        allProducts[index] = savedProduct;
      }
    });

    const updatedProducts = allProducts.map((product) =>
      String(product.id) === String(id)
        ? {
            ...formData,
            id: product.id,
            price: Number(formData.price),
            rating: Number(formData.rating),
            stock: Number(formData.stock)
          }
        : product
    );

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    toast.success("Product Updated Successfully!");
    navigate("/products");
  }

  return (
    <div className="form-container">
      <h2>Edit Product</h2>

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
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
