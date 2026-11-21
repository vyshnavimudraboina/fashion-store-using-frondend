import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Fashion Store</h1>

      <p>
        Discover the latest fashion trends.
        Shop your favorite clothes, shoes
        and accessories at the best prices.
      </p>

      <Link to="/products">
        Shop Now
      </Link>
    </div>
  );
}

export default Home;