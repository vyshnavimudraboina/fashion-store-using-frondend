import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeWishlist } from "../features/wishlistSlice";
import { addToCart } from "../features/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist || []);

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(removeWishlist(product.id));
    alert(`Moved "${product.name}" to your Cart! 🛒`);
  };

  const handleBuyNow = (product) => {
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
  };

  return (
    <div className="wishlist-page-container">
      <div className="wishlist-header-bar">
        <div>
          <span className="products-subtag">Saved For Later</span>
          <h1>My Wishlist ({wishlist.length})</h1>
        </div>

        {wishlist.length > 0 && (
          <Link to="/products" className="continue-shopping-pill">
            ← Continue Browsing
          </Link>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-cart-card">
          <div className="empty-cart-icon">💖</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Explore our fashion collection and tap the heart icon on your favorite items to save them here.</p>
          <Link to="/products" className="shop-now-btn">
            Explore Trending Fashion
          </Link>
        </div>
      ) : (
        <div className="wishlist-items-grid">
          {wishlist.map((product) => {
            const originalPrice = product.originalPrice || Math.round(product.price * 1.35);

            return (
              <div key={product.id} className="wishlist-card-enhanced">
                <div className="wishlist-media-box">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <button
                    type="button"
                    className="wishlist-remove-pill"
                    onClick={() => dispatch(removeWishlist(product.id))}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>

                <div className="wishlist-card-body">
                  <span className="card-brand-tag">{product.brand}</span>
                  <h3 className="wishlist-card-title">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>

                  <div className="card-pricing-row">
                    <span className="current-price">₹{product.price.toLocaleString("en-IN")}</span>
                    {originalPrice > product.price && (
                      <span className="strike-price">₹{originalPrice.toLocaleString("en-IN")}</span>
                    )}
                  </div>

                  <div className="wishlist-action-btns">
                    <button
                      type="button"
                      className="wishlist-move-cart-btn"
                      onClick={() => handleMoveToCart(product)}
                    >
                      🛒 Move to Cart
                    </button>

                    <button
                      type="button"
                      className="wishlist-buy-btn"
                      onClick={() => handleBuyNow(product)}
                    >
                      ⚡ Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
