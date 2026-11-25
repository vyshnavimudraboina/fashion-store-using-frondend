import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import productsData from "../data/Products";
import ProductCard from "../components/ProductCard";

function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [budget, setBudget] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    const allProducts = [...productsData];

    savedProducts.forEach((savedProduct) => {
      const index = allProducts.findIndex(
        (product) => product.id === savedProduct.id
      );

      if (index === -1) {
        allProducts.push(savedProduct);
      } else {
        allProducts[index] = savedProduct;
      }
    });

    setProducts(allProducts);
  }, []);

  const categoriesList = [
    "All",
    "Women",
    "Men",
    "Accessories",
    "Footwear",
    "Bags",
    "Kids"
  ];

  const filteredProducts = products
    .filter((product) => {
      const searchText = search.toLowerCase();
      return (
        product.name?.toLowerCase().includes(searchText) ||
        product.brand?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText) ||
        product.type?.toLowerCase().includes(searchText)
      );
    })
    .filter((product) => {
      if (category === "All") return true;
      return product.category?.toLowerCase() === category.toLowerCase();
    })
    .filter((product) => {
      if (budget === "All") return true;
      if (budget === "under1000") return product.price < 1000;
      if (budget === "1000-3000") return product.price >= 1000 && product.price <= 3000;
      if (budget === "3000-5000") return product.price > 3000 && product.price <= 5000;
      if (budget === "above5000") return product.price > 5000;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      return 0;
    });

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBudget("All");
    setSortBy("default");
  };

  return (
    <div className="products-page-container">
      {/* Products Banner Header */}
      <div className="products-hero-header">
        <div>
          <span className="products-subtag">Curated Collections</span>
          <h1>Our Fashion Catalogue</h1>
          <p>Explore luxury apparel, designer dresses, footwear, and handcrafted accessories.</p>
        </div>

        {localStorage.getItem("userRole") === "admin" && (
          <Link to="/add-product" className="add-product-cta-btn">
            <span>+</span> Add Custom Product
          </Link>
        )}
      </div>


      {/* Category Filter Pills Bar */}
      <div className="category-pills-bar">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`cat-pill-btn ${category.toLowerCase() === cat.toLowerCase() ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="catalog-controls-bar">
        {/* Search input with clear button */}
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search dresses, jackets, brands, sneakers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>

        {/* Budget Filter */}
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Price Ranges</option>
          <option value="under1000">Under ₹1,000</option>
          <option value="1000-3000">₹1,000 – ₹3,000</option>
          <option value="3000-5000">₹3,000 – ₹5,000</option>
          <option value="above5000">Above ₹5,000 (Luxury)</option>
        </select>

        {/* Sorting Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="default">Featured / Default</option>
          <option value="rating">Top Rated ⭐</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Results Count & Active Filters Bar */}
      <div className="results-count-bar">
        <span>
          Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "style" : "styles"}
          {category !== "All" && ` in ${category}`}
          {budget !== "All" && ` (${budget})`}
        </span>

        {(search || category !== "All" || budget !== "All" || sortBy !== "default") && (
          <button type="button" className="reset-filters-btn" onClick={resetFilters}>
            Reset All Filters ✕
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="empty-results-box">
            <div className="empty-results-icon">🔍</div>
            <h3>No Products Found</h3>
            <p>We couldn't find any items matching your filters.</p>
            <button type="button" className="reset-filters-btn-large" onClick={resetFilters}>
              Clear Filters & Show All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
