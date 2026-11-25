import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, removeWishlist } from "../features/wishlistSlice";
import { addToCart } from "../features/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist || []);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const isAdmin = localStorage.getItem("userRole") === "admin";

  const originalPrice = product.originalPrice || Math.round(product.price * 1.35);
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);


  function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (confirmDelete) {
      const savedProducts =
        JSON.parse(localStorage.getItem("products")) || [];

      const updatedProducts = savedProducts.filter(
        (item) => item.id !== product.id
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      window.location.reload();
    }
  }

  function handleWishlistToggle() {
    if (isWishlisted) {
      dispatch(removeWishlist(product.id));
    } else {
      dispatch(addWishlist(product));
      alert(`"${product.name}" added to Wishlist! ❤️`);
    }
  }

  function handleAddToCart() {
    dispatch(addToCart({ ...product, quantity: 1 }));
    alert(`"${product.name}" added to cart! 🛒`);
  }

  function handleBuyNow() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please log in to place an order.");
      navigate("/login", {
        state: {
          from: {
            pathname: "/checkout",
            state: { directItem: { ...product, quantity: 1 } }
          }
        }
      });
      return;
    }

    navigate("/checkout", {
      state: { directItem: { ...product, quantity: 1 } }
    });
  }

  return (
    <div className="product-card-enhanced">
      {/* Top Media & Badges */}
      <div className="card-media-wrapper">
        <Link to={`/products/${product.id}`} className="card-image-link">
          <img
            src={product.image}
            alt={product.name}
            className="product-main-img"
            loading="lazy"
          />
        </Link>

        {product.badge && (
          <span className="product-badge-pill">{product.badge}</span>
        )}

        {discountPercent > 0 && (
          <span className="product-discount-pill">-{discountPercent}%</span>
        )}

        <button
          type="button"
          className={`wishlist-heart-btn ${isWishlisted ? "active" : ""}`}
          onClick={handleWishlistToggle}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Card Content */}
      <div className="card-body-content">
        <div className="card-meta-top">
          <span className="card-brand-tag">{product.brand}</span>
          <span className="card-rating-tag">⭐ {product.rating || 4.5} ({product.reviewsCount || 48})</span>
        </div>

        <h3 className="card-product-title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="card-category-info">
          <span>{product.category}</span>
          {product.color && <span> • {product.color}</span>}
          {product.size && <span> • Size: {product.size}</span>}
        </div>

        {/* Pricing with Original Price & Savings */}
        <div className="card-pricing-row">
          <span className="current-price">₹{product.price.toLocaleString("en-IN")}</span>
          {originalPrice > product.price && (
            <span className="strike-price">₹{originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>

        {/* Primary Order & Cart Actions */}
        <div className="card-buy-actions-row">
          <button
            type="button"
            className="btn-add-to-cart"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>

          <button
            type="button"
            className="btn-buy-now"
            onClick={handleBuyNow}
          >
            ⚡ Buy Now
          </button>
        </div>

        {/* Secondary Card Options: Admin gets Edit & Delete, regular users get View Details */}
        <div className="card-secondary-actions">
          <Link
            to={`/products/${product.id}`}
            className="card-quick-view-btn"
          >
            View Details
          </Link>

          {isAdmin && (
            <>
              <Link
                to={`/edit-product/${product.id}`}
                className="card-edit-btn"
                title="Admin: Edit product"
              >
                ✏️ Edit
              </Link>

              <button
                type="button"
                className="card-delete-btn"
                onClick={handleDelete}
                title="Admin: Delete product"
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductCard;
