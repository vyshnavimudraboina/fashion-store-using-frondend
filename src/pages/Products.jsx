
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/Products";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
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

      if (budget === "1000-3000") {
        return product.price >= 1000 && product.price <= 3000;
      }

      if (budget === "3000-5000") {
        return product.price > 3000 && product.price <= 5000;
      }

      if (budget === "above5000") return product.price > 5000;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }

      if (sortBy === "lowToHigh") {
        return a.price - b.price;
      }

      if (sortBy === "highToLow") {
        return b.price - a.price;
      }

      return 0;
    });

  return (
    <div className="products-page">

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
        marginBottom: "20px"
      }}>
        <div>
          <h1>Our Fashion Collection</h1>
          <p>Explore our latest fashion products</p>
        </div>

        <Link
          to="/add-product"
          style={{
            backgroundColor: "#e91e63",
            color: "white",
            padding: "12px 22px",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold"
          }}
        >
          + Add Product
        </Link>
      </div>

      <div className="products-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Accessories">Accessories</option>
          <option value="Shoes">Shoes</option>
          <option value="Bags">Bags</option>
        </select>

        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="All">All Budgets</option>
          <option value="under1000">Below ₹1,000</option>
          <option value="1000-3000">₹1,000 - ₹3,000</option>
          <option value="3000-5000">₹3,000 - ₹5,000</option>
          <option value="above5000">Above ₹5,000</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="rating">Top Rated</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h2>No Products Found</h2>
        )}
      </div>

    </div>
  );
}

export default Products;
