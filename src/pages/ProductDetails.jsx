import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import productsData from "../data/Products.js";
import { addToCart } from "../features/cartSlice";
import { addWishlist, removeWishlist } from "../features/wishlistSlice";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState("details"); // 'details' | 'specs' | 'delivery'

  const wishlist = useSelector((state) => state.wishlist || []);

  const savedProducts =
    JSON.parse(localStorage.getItem("products")) || productsData;

  const product = savedProducts.find(
    (item) => String(item.id) === id
  );

  if (!product) {
    return (
      <div className="empty-cart-card" style={{ margin: "60px auto" }}>
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="shop-now-btn">
          Back to Collection
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const originalPrice = product.originalPrice || Math.round(product.price * 1.35);
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  // Related products from same category
  const relatedProducts = savedProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        selectedSize: selectedSize || product.size,
        quantity
      })
    );
    alert(`Added ${quantity} × "${product.name}" to cart! 🛒`);
  };

  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please log in to place an order.");
      navigate("/login", {
        state: {
          from: {
            pathname: "/checkout",
            state: {
              directItem: {
                ...product,
                selectedSize: selectedSize || product.size,
                quantity
              }
            }
          }
        }
      });
      return;
    }

    navigate("/checkout", {
      state: {
        directItem: {
          ...product,
          selectedSize: selectedSize || product.size,
          quantity
        }
      }
    });
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeWishlist(product.id));
    } else {
      dispatch(addWishlist(product));
      alert(`"${product.name}" added to Wishlist! ❤️`);
    }
  };

  return (
    <div className="product-details-container">
      {/* Breadcrumb Navigation */}
      <nav className="details-breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span className="current-crumb">{product.name}</span>
      </nav>

      {/* Main Details Presentation Card */}
      <div className="product-details-main-card">
        {/* Left Column: Image Presentation */}
        <div className="details-image-gallery">
          <div className="main-image-display">
            <img src={product.image} alt={product.name} />
            {product.badge && <span className="details-badge-pill">{product.badge}</span>}
            {discountPercent > 0 && <span className="details-discount-tag">-{discountPercent}% OFF</span>}
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="details-content-column">
          <div className="details-brand-rating-row">
            <span className="details-brand-badge">{product.brand}</span>
            <span className="details-rating-badge">
              ⭐ {product.rating || 4.5} ({product.reviewsCount || 48} reviews)
            </span>
          </div>

          <h1 className="details-product-title">{product.name}</h1>

          <div className="details-pricing-block">
            <span className="details-final-price">₹{product.price.toLocaleString("en-IN")}</span>
            {originalPrice > product.price && (
              <span className="details-original-price">₹{originalPrice.toLocaleString("en-IN")}</span>
            )}
            <span className="details-tax-note">Inclusive of all taxes</span>
          </div>

          {/* Stock Indicator */}
          <div className="details-stock-status">
            {product.stock > 0 ? (
              <span className="stock-in">
                🟢 In Stock & Ready to Ship ({product.stock} units available)
              </span>
            ) : (
              <span className="stock-out">🔴 Out of Stock</span>
            )}
          </div>

          <p className="details-short-desc">{product.description}</p>

          {/* Size Selector */}
          <div className="details-option-group">
            <label className="option-label">
              <strong>Select Size:</strong>
            </label>
            <div className="size-selector-pills">
              {["XS", "S", "M", "L", "XL"].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  className={`size-btn ${selectedSize === sz ? "active" : ""}`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="details-option-group">
            <label className="option-label">
              <strong>Quantity:</strong>
            </label>
            <div className="qty-controls">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="qty-count">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="details-cta-actions">
            <button
              type="button"
              className="details-cart-cta"
              onClick={handleAddToCart}
            >
              🛒 Add To Cart
            </button>

            <button
              type="button"
              className="details-buy-cta"
              onClick={handleBuyNow}
            >
              ⚡ Buy Now
            </button>

            <button
              type="button"
              className={`details-wishlist-cta ${isWishlisted ? "active" : ""}`}
              onClick={handleWishlistToggle}
              title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
            >
              {isWishlisted ? "❤️ Saved" : "🤍 Wishlist"}
            </button>
          </div>

          {/* Information Tabs */}
          <div className="details-tabs-container">
            <div className="tabs-header">
              <button
                type="button"
                className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Features
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
                onClick={() => setActiveTab("specs")}
              >
                Specifications
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === "delivery" ? "active" : ""}`}
                onClick={() => setActiveTab("delivery")}
              >
                Delivery & Returns
              </button>
            </div>

            <div className="tabs-content-body">
              {activeTab === "details" && (
                <div>
                  <p>{product.description}</p>
                  <ul className="details-bullets">
                    <li>100% Genuine product authenticated by designer experts</li>
                    <li>Premium breathable fabric tailored for durability and comfort</li>
                    <li>Crafted with ethical environmental manufacturing standards</li>
                  </ul>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="specs-table">
                  <div className="spec-row">
                    <span>Brand</span>
                    <strong>{product.brand}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Category</span>
                    <strong>{product.category}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Type</span>
                    <strong>{product.type || "Fashion Wear"}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Color</span>
                    <strong>{product.color || "Standard"}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Care</span>
                    <strong>Dry Clean / Hand Wash Only</strong>
                  </div>
                </div>
              )}

              {activeTab === "delivery" && (
                <div>
                  <p>🚚 <strong>Express Shipping:</strong> Delivered within 3-5 business days across India.</p>
                  <p>📦 <strong>Free Shipping:</strong> On all orders above ₹999.</p>
                  <p>🔄 <strong>7 Days Return Policy:</strong> Effortless doorstep returns & exchanges.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="section-header-centered">
            <span className="section-subtitle">Complete The Look</span>
            <h2 className="section-title">Similar Styles You Might Love</h2>
          </div>

          <div className="products-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
