import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star } from "lucide-react";

import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

function Products() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const searchRef = useRef(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return [...products]
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesCategory =
          category === "All" ? true : product.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return 0;
      });
  }, [products, search, category, sort]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-400">
            Shop
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">
            Explore Products
          </h1>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              ref={searchRef}
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-slate-950 sm:w-72"
            />
          </div>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-950"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-950"
          >
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-bold text-slate-500">
            Loading products...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-bold text-slate-500">
            No matching products found.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </main>
  );
}

function ProductCard({ product, addToCart }) {
  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart(product);
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover"
        />
      </Link>

      <div className="p-5">
        <p className="text-sm font-bold text-slate-400">{product.category}</p>

        <Link to={`/products/${product._id}`}>
          <h3 className="mt-2 text-lg font-black text-slate-950 hover:text-slate-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex gap-1 text-amber-500">
          {[1, 2, 3, 4, 5].map((item) => (
            <Star key={item} size={15} fill="currentColor" />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p>
            <span className="text-xl font-black">${product.price}</span>

            {product.oldPrice > 0 && (
              <span className="ml-2 text-sm text-slate-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default Products;