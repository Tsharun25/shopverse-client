import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DollarSign, Package, ShoppingCart, Trash2, Users } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";

function AdminDashboard() {
  const { user } = useAuth();
  const { products, fetchProducts } = useProducts();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    image: "",
    stock: "",
    featured: true,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      await api.post("/products", {
        ...formData,
        price: Number(formData.price),
        oldPrice: Number(formData.oldPrice || 0),
        stock: Number(formData.stock || 0),
      });

      toast.success("Product created successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        category: "",
        image: "",
        stock: "",
        featured: true,
      });

      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Product create failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);

      const { data } = await api.get("/orders");

      setOrders(data.orders || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, {
        status,
      });

      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
          Admin Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Hello Admin, {user?.name || "Admin"} 🔥
        </h1>

        <p className="mt-3 max-w-2xl text-slate-300">
          Manage products, orders, customers, revenue, and store performance.
        </p>
      </div>

      <section className="mt-8 grid gap-6 md:grid-cols-4">
        <AdminCard icon={<DollarSign />} title="Revenue" value="$0" />
        <AdminCard
          icon={<ShoppingCart />}
          title="Orders"
          value={orders.length}
        />
        <AdminCard
          icon={<Package />}
          title="Products"
          value={products.length}
        />
        <AdminCard icon={<Users />} title="Customers" value="1" />
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleCreateProduct}
          className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-black text-slate-950">Add Product</h2>

          <div className="mt-6 space-y-4">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Fashion, Electronics, Bags"
              required
            />

            <div>
              <label className="text-sm font-bold text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-950"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <Input
                label="Old Price"
                name="oldPrice"
                type="number"
                value={formData.oldPrice}
                onChange={handleChange}
              />
            </div>

            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <Input
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              required
            />

            <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Product
            </label>
          </div>

          <button
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">Product List</h2>

          <div className="mt-6 space-y-4">
            {products.length === 0 ? (
              <p className="text-slate-500">No products found.</p>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-black text-slate-950">
                      {product.name}
                    </h3>

                    <p className="text-sm font-semibold text-slate-400">
                      {product.category}
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-950">
                      ${product.price} · Stock: {product.stock}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              Recent Orders
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest customer orders from the store.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOrders}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {ordersLoading ? (
            <p className="font-bold text-slate-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="font-bold text-slate-500">No orders found.</p>
          ) : (
            orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-400">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>

                    <h3 className="mt-1 font-black text-slate-950">
                      {order.user?.name ||
                        order.shippingAddress?.name ||
                        "Customer"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {order.items?.length || 0} item(s) · ${order.totalPrice}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={order.status}
                      onChange={(event) =>
                        handleUpdateOrderStatus(order._id, event.target.value)
                      }
                      className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-bold capitalize text-slate-700 outline-none focus:border-slate-950"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">
                      {order.paymentMethod === "cash_on_delivery"
                        ? "COD"
                        : "Card"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-950"
      />
    </div>
  );
}

function AdminCard({ icon, title, value }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-950">
        {icon}
      </div>

      <p className="mt-5 text-sm font-bold text-slate-500">{title}</p>
      <h3 className="mt-1 text-3xl font-black text-slate-950">{value}</h3>
    </div>
  );
}

export default AdminDashboard;
