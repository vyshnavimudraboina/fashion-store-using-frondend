
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  removeFromCart,
  updateQuantity,
  clearCart
} from "../features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart || []);

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const subtotal = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  const discountAmount =
    appliedDiscount > 0
      ? Math.round((subtotal * appliedDiscount) / 100)
      : 0;

  const discountedSubtotal = subtotal - discountAmount;
  const shipping =
    discountedSubtotal > 999 || cart.length === 0 ? 0 : 99;
  const grandTotal = discountedSubtotal + shipping;

  const handleApplyCoupon = (e) => {
    e.preventDefault();

    const code = couponCode.trim().toUpperCase();

    if (code === "FASHION20") {
      setAppliedDiscount(20);
      toast.success("Coupon FASHION20 applied! You saved 20%. 🎉");
    } else {
      setAppliedDiscount(0);
      toast.error("Invalid coupon code. Try using FASHION20.");
    }
  };

  function handleClearCart() {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
      toast.success("Cart cleared successfully!");
    }
  }

  function handleRemoveItem(id) {
    dispatch(removeFromCart(id));
    toast.info("Product removed from Cart!");
  }

  function handleCheckout() {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      toast.warning("Please log in to proceed to checkout.");

      navigate("/login", {
        state: { from: { pathname: "/checkout" } }
      });
      return;
    }

    navigate("/checkout");
  }

  return (
    <div className="cart-page-container">
      <div className="cart-page-header">
        <span className="products-subtag">Your Bag</span>
        <h1>Shopping Bag ({cart.length})</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Shopping Bag is Empty</h2>
          <p>
            Looks like you haven't added any luxury pieces to your bag yet.
          </p>
          <Link to="/products" className="shop-now-btn">
            Discover New Arrivals
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-header-actions">
              <span>
                {cart.length} {cart.length === 1 ? "Item" : "Items"} in your bag
              </span>

              <button
                type="button"
                className="clear-cart-link"
                onClick={handleClearCart}
              >
                Clear All Items
              </button>
            </div>

            <div className="cart-list">
              {cart.map((item) => {
                const qty = item.quantity || 1;
                const itemTotal = item.price * qty;

                return (
                  <div key={item.id} className="cart-item-card">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    <div className="cart-item-details">
                      <h3>
                        <Link to={`/products/${item.id}`}>
                          {item.name}
                        </Link>
                      </h3>

                      <p className="cart-item-meta">
                        <span>
                          <strong>Brand:</strong> {item.brand}
                        </span>

                        {item.selectedSize && (
                          <span>
                            {" "}• <strong>Size:</strong> {item.selectedSize}
                          </span>
                        )}

                        {item.color && (
                          <span>
                            {" "}• <strong>Color:</strong> {item.color}
                          </span>
                        )}
                      </p>

                      <p className="cart-item-unit-price">
                        ₹{item.price.toLocaleString("en-IN")} each
                      </p>

                      <div className="cart-qty-wrapper">
                        <label>Quantity:</label>

                        <div className="qty-controls">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: qty - 1
                                })
                              )
                            }
                          >
                            -
                          </button>

                          <span className="qty-count">{qty}</span>

                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: qty + 1
                                })
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <div className="cart-item-total">
                        ₹{itemTotal.toLocaleString("en-IN")}
                      </div>

                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coupon Code */}
            <div className="cart-coupon-box">
              <h4>Have a Promo Code?</h4>

              <p className="coupon-hint-text">
                Use <strong>FASHION20</strong> for an instant 20% discount!
              </p>

              <form
                onSubmit={handleApplyCoupon}
                className="coupon-form-row"
              >
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                <button type="submit" className="apply-coupon-btn">
                  Apply
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="cart-summary-section">
            <div className="summary-card">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {appliedDiscount > 0 && (
                <div
                  className="summary-row discount-row"
                  style={{ color: "#16a34a" }}
                >
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>
                    -₹{discountAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="summary-row">
                <span>Shipping Fee</span>
                <span>
                  {shipping === 0 ? (
                    <strong style={{ color: "#16a34a" }}>FREE</strong>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              {shipping > 0 && (
                <p className="free-shipping-hint">
                  Add ₹
                  {(1000 - discountedSubtotal).toLocaleString("en-IN")}
                  {" "}more for FREE Delivery!
                </p>
              )}

              <hr className="summary-divider" />

              <div className="summary-row grand-total-row">
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>

              <button
                type="button"
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout 🔒
              </button>

              <Link
                to="/products"
                className="continue-shopping-link"
              >
                ← Continue Shopping
              </Link>

              <div className="trust-pills-footer">
                <span>🔒 256-Bit SSL Encrypted</span>
                <span>⚡ 4-Day Pan-India Delivery</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
