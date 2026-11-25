import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top-banner">
        <div className="footer-perk-item">
          <span className="perk-icon">🚚</span>
          <div>
            <h4>Free Shipping</h4>
            <p>On all orders above ₹999 across India</p>
          </div>
        </div>

        <div className="footer-perk-item">
          <span className="perk-icon">🔄</span>
          <div>
            <h4>7 Days Easy Return</h4>
            <p>Hassle-free instant exchanges & returns</p>
          </div>
        </div>

        <div className="footer-perk-item">
          <span className="perk-icon">🔒</span>
          <div>
            <h4>100% Secure Payment</h4>
            <p>Cards, UPI, Net Banking & Cash on Delivery</p>
          </div>
        </div>

        <div className="footer-perk-item">
          <span className="perk-icon">✨</span>
          <div>
            <h4>Guaranteed Authenticity</h4>
            <p>100% Genuine luxury & designer brands</p>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-col brand-col">
          <h2 className="footer-logo">Fashion Store</h2>
          <p className="footer-desc">
            Discover contemporary trends, high-street luxury, and effortless styling curated for modern lifestyles. Elevate your wardrobe with confidence.
          </p>
          <div className="social-links-row">
            <span className="social-circle">📸</span>
            <span className="social-circle">📘</span>
            <span className="social-circle">🐦</span>
            <span className="social-circle">📌</span>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/wishlist">My Wishlist</Link></li>
            <li><Link to="/cart">Shopping Bag</Link></li>
            <li><Link to="/orders">Track My Orders</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Top Categories</h3>
          <ul>
            <li><Link to="/products?category=Women">Women's Couture</Link></li>
            <li><Link to="/products?category=Men">Men's Apparel</Link></li>
            <li><Link to="/products?category=Accessories">Luxury Accessories</Link></li>
            <li><Link to="/products?category=Footwear">Designer Footwear</Link></li>
            <li><Link to="/products?category=Bags">Bags & Clutches</Link></li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h3>Join The Style Club</h3>
          <p>Get exclusive early access to flash sales, new drops, and ₹500 off your first purchase.</p>
          <form
            className="footer-newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing! Your ₹500 coupon code is: FASHION20");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
            />
            <button type="submit">Join</button>
          </form>
          <p className="security-tagline">🔒 Your privacy is respected. No spam ever.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Fashion Store. All Rights Reserved. Curated with elegance.</p>
        <div className="payment-badges-row">
          <span className="pay-badge">💳 VISA</span>
          <span className="pay-badge">💳 Mastercard</span>
          <span className="pay-badge">⚡ UPI</span>
          <span className="pay-badge">🏦 Net Banking</span>
          <span className="pay-badge">💵 COD</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
