
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addWishlist } from "../features/wishlistSlice";

function ProductCard({ product }) {

  const dispatch = useDispatch();

  function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      const savedProducts =
        JSON.parse(localStorage.getItem("products")) || [];

      const updatedProducts = savedProducts.filter(
        (item) => item.id !== product.id
      );

      localStorage.setItem(
        "products",
        JSON.stringify(updatedProducts)
      );

      window.location.reload();
    }
  }

  function handleWishlist() {
    dispatch(addWishlist(product));
    alert("Added to Wishlist!");
  }

  return (
    <div className="card">

      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Price: ₹{product.price}</p>

      <div className="card-actions">

        <Link
          className="view-btn"
          to={`/products/${product.id}`}
        >
          View Details
        </Link>

        <Link
          className="edit-btn"
          to={`/edit-product/${product.id}`}
        >
          Edit
        </Link>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>

      <button
        className="wishlist-btn"
        onClick={handleWishlist}
      >
        ❤️ Add To Wishlist
      </button>

    </div>
  );
}

export default ProductCard;
