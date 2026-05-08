import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-5xl font-black tracking-tight text-slate-950">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-black text-slate-950">
            Your cart is empty
          </h2>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-5 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-32 rounded-2xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-400">
                      {item.category}
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      {item.name}
                    </h2>

                    <p className="mt-3 text-lg font-bold text-slate-950">
                      ${item.price}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="grid h-10 w-10 place-items-center rounded-full border border-slate-300"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="text-lg font-black">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="grid h-10 w-10 place-items-center rounded-full border border-slate-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="grid h-10 w-10 place-items-center rounded-full border border-red-200 text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-950">
              Order Summary
            </h2>

            <div className="mt-8 flex items-center justify-between text-lg">
              <span className="font-semibold text-slate-500">
                Total
              </span>

              <span className="text-3xl font-black text-slate-950">
                ${totalPrice}
              </span>
            </div>

            <button className="mt-8 w-full rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white hover:bg-slate-800">
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;