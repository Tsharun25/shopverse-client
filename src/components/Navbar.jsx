import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Search, ShoppingBag, User, LogOut } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const navClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-slate-950"
      : "font-medium text-slate-500 hover:text-slate-950";

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (sectionId) => {
    navigate("/");

    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <button
          type="button"
          onClick={goHome}
          className="text-2xl font-black tracking-tight text-slate-950"
        >
          ShopVerse
        </button>

        <nav className="hidden items-center gap-10 md:flex">
          <button
            type="button"
            onClick={goHome}
            className="font-semibold text-slate-950"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="font-medium text-slate-500 hover:text-slate-950"
          >
            Products
          </button>

          <button
            type="button"
            onClick={() => goToSection("features")}
            className="font-medium text-slate-500 hover:text-slate-950"
          >
            Features
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <Search size={19} />
          </button>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <Heart size={19} />
          </button>

          <Link
            to="/cart"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <ShoppingBag size={19} />

            {cartItems.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-slate-950 text-[10px] font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="hidden items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 sm:flex"
              >
                <User size={17} />
                {user.name}
              </Link>

              <button
                type="button"
                onClick={logout}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <LogOut size={19} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
