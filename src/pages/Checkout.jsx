import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cash_on_delivery",
  });

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      return toast.error("Cart is empty");
    }

    try {
      setLoading(true);

      await api.post("/orders", {
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),

        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        },

        paymentMethod: formData.paymentMethod,

        totalPrice,
      });

      toast.success("Order placed successfully");

      clearCart();

      navigate("/orders");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Order placement failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-400">
          Checkout
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">
          Complete Your Order
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <form
          onSubmit={handlePlaceOrder}
          className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <h2 className="text-2xl font-black text-slate-950">
            Shipping Information
          </h2>

          <div className="mt-6 grid gap-5">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <div>
              <label className="text-sm font-bold text-slate-700">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-950"
              >
                <option value="cash_on_delivery">
                  Cash on Delivery
                </option>

                <option value="card">
                  Card Payment
                </option>
              </select>
            </div>
          </div>

          <button
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <div className="h-fit rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-black text-slate-950">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-black text-slate-950">
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-slate-600">
                Total
              </p>

              <h3 className="text-3xl font-black text-slate-950">
                ${totalPrice}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-950"
      />
    </div>
  );
}

export default Checkout;