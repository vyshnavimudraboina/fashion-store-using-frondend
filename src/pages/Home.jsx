
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* Welcome Section */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 20px",
          backgroundColor: "#fff0f3",
          borderRadius: "12px",
          margin: "20px"
        }}
      >
        <h1>Welcome to Fashion Store</h1>

        <p>
          Discover the latest fashion trends and find your perfect style.
          Explore our beautiful collection of clothing, shoes, bags and
          accessories.
        </p>

        <Link
          to="/products"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            backgroundColor: "#a52a4a",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            marginTop: "15px"
          }}
        >
          Shop Now
        </Link>
      </section>

      {/* Explore Section */}
      <section style={{ textAlign: "center", padding: "35px 20px" }}>
        <h2>Explore Our Collection</h2>

        <p>
          Looking for something stylish and unique? We have everything
          you need to upgrade your wardrobe.
        </p>

        <p>
          From everyday outfits to special occasion styles,
          discover fashion that matches your personality.
        </p>

        <Link
          to="/products"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            backgroundColor: "#a52a4a",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            marginTop: "10px"
          }}
        >
          Visit & Explore Products
        </Link>
      </section>

      {/* Highlights */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          padding: "25px"
        }}
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>👗</h2>
          <h3>Latest Trends</h3>
          <p>Discover fashionable and trendy collections.</p>
        </div>

        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>🛍️</h2>
          <h3>Wide Collection</h3>
          <p>Explore clothes, shoes, bags and accessories.</p>
        </div>

        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>✨</h2>
          <h3>Your Style</h3>
          <p>Choose your favorites and express your personality.</p>
        </div>
      </section>

      {/* Final Section */}
      <section
        style={{
          textAlign: "center",
          padding: "35px 20px",
          backgroundColor: "#fff0f3",
          margin: "20px",
          borderRadius: "12px"
        }}
      >
        <h2>Fashion Starts Here!</h2>
        <p>
          Don't wait to refresh your style. Visit our store
          and discover your favorite fashion products today.
        </p>

        <Link
          to="/products"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            backgroundColor: "#a52a4a",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px"
          }}
        >
          Start Shopping
        </Link>
      </section>

    </div>
  );
}

export default Home;
