import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Package, ShoppingBag, User } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Dashboard() {
  const { user } = useAuth();
  const { cartItems } = useCart();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/orders/my-orders");
      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
          User Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-black">
          Welcome back, {user?.name || "Customer"} 👋
        </h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Track your orders, manage wishlist, and update your ShopVerse account.
        </p>
      </div>

      <section className="mt-8 grid gap-6 md:grid-cols-4">
        <DashboardCard icon={<ShoppingBag />} title="Orders" value={orders.length} />
        <DashboardCard icon={<Heart />} title="Wishlist" value="0" />
        <DashboardCard icon={<Package />} title="Cart Items" value={cartItems.length} />
        <DashboardCard icon={<User />} title="Account" value="Active" />
      </section>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-950">Recent Orders</h2>

          <Link
            to="/orders"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <p className="mt-4 text-slate-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="mt-4 text-slate-500">
            No orders yet. Once you place an order, it will appear here.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-400">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <h3 className="mt-1 font-black text-slate-950">
                      {order.items?.length || 0} item(s) · ${order.totalPrice}
                    </h3>
                  </div>

                  <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-bold capitalize text-slate-700">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function DashboardCard({ icon, title, value }) {
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

export default Dashboard;