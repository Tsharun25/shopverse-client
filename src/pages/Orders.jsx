import { useEffect, useState } from "react";
import { PackageCheck } from "lucide-react";

import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/orders/my-orders");

      setOrders(data.orders);
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
    <main className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-400">
          My Orders
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">
          Order History
        </h1>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-bold text-slate-500">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <PackageCheck className="mx-auto text-slate-400" size={44} />
          <h2 className="mt-4 text-2xl font-black text-slate-950">
            No orders yet
          </h2>
          <p className="mt-2 text-slate-500">
            Your placed orders will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-400">
                    Order ID
                  </p>
                  <h2 className="mt-1 font-black text-slate-950">
                    #{order._id.slice(-8).toUpperCase()}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold capitalize text-slate-700">
                    {order.status}
                  </span>

                  <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">
                    ${order.totalPrice}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-black text-slate-950">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        Qty: {item.quantity} · ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="font-bold text-slate-950">
                  Shipping: {order.shippingAddress.name}, {order.shippingAddress.phone}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {order.shippingAddress.address}, {order.shippingAddress.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Orders;