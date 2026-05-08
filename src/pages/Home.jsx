import { Link } from "react-router-dom";
import { ArrowRight, RefreshCcw, ShieldCheck, Star, Truck } from "lucide-react";

import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { products, loading } = useProducts();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main>
      <section className="bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_520px] lg:py-24">
          <div>
            <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
              New Season Collection
            </span>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
              Premium shopping experience for modern customers.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A complete MERN e-commerce platform with authentication, products,
              cart, checkout, admin dashboard, and order management.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-bold text-white hover:bg-slate-800"
              >
                Shop Now <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("features")}
                className="inline-flex rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-800 hover:bg-slate-50"
              >
                Explore Features
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/70">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
              alt="ShopVerse store"
              className="h-[430px] w-full rounded-[24px] object-cover"
            />
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
          <Feature icon={<Truck />} title="Fast Delivery" text="Quick and reliable shipping." />
          <Feature icon={<ShieldCheck />} title="Secure Payment" text="Safe checkout experience." />
          <Feature icon={<RefreshCcw />} title="Easy Returns" text="Simple return management." />
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-400">
            Featured
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Popular Products
          </h2>
        </div>

        {loading && (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-bold text-slate-500">
              Loading products...
            </p>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-bold text-slate-500">
              No products found.
            </p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (event) => {
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
            onClick={handleAddToCart}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-950">
        {icon}
      </div>
      <div>
        <h3 className="font-black text-slate-950">{title}</h3>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
}

export default Home;