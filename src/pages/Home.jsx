import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "../data/Products.js";
import ProductCard from "../components/ProductCard.jsx";

function Home() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products") || "[]");
    const all = [...productsData];
    saved.forEach((item) => {
      const idx = all.findIndex((p) => p.id === item.id);
      if (idx === -1) all.push(item);
      else all[idx] = item;
    });

    // Select top 8 trending/featured products
    setFeaturedProducts(all.slice(0, 8));
  }, []);

  const categories = [
    {
      name: "Women",
      tagline: "Dresses, Tops & Denim",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
      query: "Women"
    },
    {
      name: "Men",
      tagline: "Blazers, Shirts & Jackets",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
      query: "Men"
    },
    {
      name: "Accessories",
      tagline: "Watches, Chains & Shades",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
      query: "Accessories"
    },
    {
      name: "Footwear",
      tagline: "Sneakers, Heels & Slides",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      query: "Footwear"
    },
    {
      name: "Bags",
      tagline: "Luxury Handbags & Totes",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
      query: "Bags"
    },
    {
      name: "Kids",
      tagline: "Cute Outfits & Shoes",
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
      query: "Kids"
    }
  ];

  return (
    <div className="home-page-container">
      {/* Announcement Bar */}
      <div className="home-top-announcement">
        <span>✨ <strong>Limited Offer:</strong> Use code <code>FASHION20</code> at checkout for 20% OFF | Free Express Delivery Over ₹999</span>
      </div>

      {/* Hero Banner */}
      <section className="hero-banner-section">
        <div className="hero-overlay-backdrop"></div>
        <div className="hero-content">
          <span className="hero-pill-tag">🔥 New Season Autumn/Winter Collection</span>
          <h1 className="hero-headline">
            Elegance In Every Stitch, <br />
            <span>Style In Every Step</span>
          </h1>
          <p className="hero-subtext">
            Explore curated runway fashion, bespoke evening gowns, tailored menswear, and luxury handcrafted accessories built to redefine everyday aesthetics.
          </p>

          <div className="hero-cta-group">
            <Link to="/products" className="hero-primary-cta">
              Explore Collection 🛍️
            </Link>
            <button
              onClick={() => navigate("/products")}
              className="hero-secondary-cta"
            >
              Browse New Drops →
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <strong>5,000+</strong>
              <span>Curated Styles</span>
            </div>
            <div className="hero-stat-item">
              <strong>50+</strong>
              <span>Designer Brands</span>
            </div>
            <div className="hero-stat-item">
              <strong>99.8%</strong>
              <span>Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="categories-showcase-section">
        <div className="section-header-centered">
          <span className="section-subtitle">Curated Departments</span>
          <h2 className="section-title">Shop By Category</h2>
          <p className="section-desc">Handpicked styles organized for seamless boutique shopping</p>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => navigate(`/products`)}
            >
              <img src={cat.image} alt={cat.name} className="category-card-image" />
              <div className="category-card-overlay">
                <h3>{cat.name}</h3>
                <p>{cat.tagline}</p>
                <span className="cat-explore-btn">Shop Now →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending / Featured Products Section */}
      <section className="trending-products-section">
        <div className="trending-header-bar">
          <div>
            <span className="section-subtitle">Must-Haves</span>
            <h2 className="section-title">Trending This Week</h2>
            <p className="section-desc">Best-selling pieces loved by our community</p>
          </div>
          <Link to="/products" className="view-all-link">
            View All Products ({productsData.length}+) →
          </Link>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner / Flash Deal */}
      <section className="promo-banner-section">
        <div className="promo-banner-content">
          <span className="promo-badge">EXCLUSIVE FLASH SALE</span>
          <h2>Upgrade Your Wardrobe With Flat 20% OFF</h2>
          <p>
            From timeless Saffiano leather bags to 18K gold-plated accessories and couture dresses. Use coupon code during checkout:
          </p>
          <div className="promo-coupon-box">
            <span className="coupon-code">FASHION20</span>
            <span className="coupon-desc">Applies to all products</span>
          </div>
          <Link to="/products" className="promo-cta-btn">
            Claim Your Discount Now
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="section-header-centered">
          <span className="section-subtitle">Our Promise</span>
          <h2 className="section-title">Why Shop With Us?</h2>
        </div>

        <div className="perks-four-grid">
          <div className="perk-box">
            <div className="perk-circle-icon">👗</div>
            <h3>100% Authentic Fashion</h3>
            <p>Every piece is sourced directly from certified brand warehouses and authenticated by experts.</p>
          </div>

          <div className="perk-box">
            <div className="perk-circle-icon">⚡</div>
            <h3>Rapid 4-Day Delivery</h3>
            <p>Express courier dispatch with live tracking updates directly to your mobile phone via SMS.</p>
          </div>

          <div className="perk-box">
            <div className="perk-circle-icon">💳</div>
            <h3>Safe & Flexible Payments</h3>
            <p>Pay effortlessly with UPI, credit/debit cards, Net Banking, or Cash on Delivery at your door.</p>
          </div>

          <div className="perk-box">
            <div className="perk-circle-icon">🛡️</div>
            <h3>7-Day Free Returns</h3>
            <p>Not the right size or fit? Request a free pickup and get instant full refunds without queries.</p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials-section">
        <div className="section-header-centered">
          <span className="section-subtitle">Real Experiences</span>
          <h2 className="section-title">Loved by 20,000+ Fashion Lovers</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testi-rating">⭐⭐⭐⭐⭐</div>
            <p className="testi-text">
              "The Zara party gown was even more breathtaking in person! The fabric drape and stitching are immaculate. Arrived in just 3 days."
            </p>
            <div className="testi-author">
              <div className="author-avatar">AM</div>
              <div>
                <h4>Aanya Malhotra</h4>
                <span>Verified Buyer • Mumbai</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testi-rating">⭐⭐⭐⭐⭐</div>
            <p className="testi-text">
              "Super fast checkout with UPI and the Nike sneakers are 100% genuine. The packaging was pristine. Definitely my new go-to store!"
            </p>
            <div className="testi-author">
              <div className="author-avatar">RS</div>
              <div>
                <h4>Rahul Sharma</h4>
                <span>Verified Buyer • Bengaluru</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testi-rating">⭐⭐⭐⭐⭐</div>
            <p className="testi-text">
              "Bought the Michael Kors leather handbag. Outstanding quality and customer support was so courteous. 5 stars all the way!"
            </p>
            <div className="testi-author">
              <div className="author-avatar">PK</div>
              <div>
                <h4>Pooja Kulkarni</h4>
                <span>Verified Buyer • Hyderabad</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
