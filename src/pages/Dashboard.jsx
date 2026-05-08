import { Package, ShoppingBag, Heart, User } from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

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
        <DashboardCard icon={<ShoppingBag />} title="Orders" value="0" />
        <DashboardCard icon={<Heart />} title="Wishlist" value="0" />
        <DashboardCard icon={<Package />} title="Cart Items" value="0" />
        <DashboardCard icon={<User />} title="Account" value="Active" />
      </section>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-black text-slate-950">Recent Orders</h2>
        <p className="mt-3 text-slate-500">
          No orders yet. Once you place an order, it will appear here.
        </p>
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