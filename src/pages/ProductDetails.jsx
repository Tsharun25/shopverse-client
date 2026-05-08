import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";

import api from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/products/${id}`);

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-2xl font-black text-slate-500">
          Loading product...
        </h1>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-2xl font-black text-red-500">Product not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="h-[600px] w-full rounded-[1.5rem] object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-400">
            {product.category}
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950">
            {product.name}
          </h1>

          <div className="mt-5 flex gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star key={item} size={18} fill="currentColor" />
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-5xl font-black text-slate-950">
              ${product.price}
            </span>

            {product.oldPrice > 0 && (
              <span className="text-2xl text-slate-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            {product.description}
          </p>

          <div className="mt-8">
            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => addToCart(product)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800"
            >
              <ShoppingBag size={18} />
              Add To Cart
            </button>

            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-bold text-slate-800 hover:bg-slate-50">
              <Heart size={18} />
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
