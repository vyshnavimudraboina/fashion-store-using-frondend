
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const savedProducts =
    JSON.parse(localStorage.getItem("products")) || productsData;

  const product = savedProducts.find(
    (item) => String(item.id) === id
  );

  if (!product) {
    return <h2>Product Not Found!</h2>;
  }

  return (
    <div className="details-page">
      <div className="details-card">
        <img
          src={product.image}
          alt={product.name}
          className="details-image"
        />

        <div className="details-info">
          <h1>{product.name}</h1>

          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Type:</strong> {product.type}</p>
          <h2 className="details-price">₹{product.price}</h2>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Rating:</strong> ⭐ {product.rating}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Size:</strong> {product.size}</p>

          <button
            className="back-btn"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
