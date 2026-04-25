import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import Logo from "./Logo";

const navItems = [
  { to: "/", label: "الرئيسية" },
  { to: "/properties", label: "العقارات" },
  { to: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-sand/90 backdrop-blur border-b border-line shadow-soft"
          : "bg-sand/60 backdrop-blur"
      }`}
    >
      <div className="container-wrap flex items-center justify-between h-[72px]">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-bold transition rounded-lg ${
                  isActive
                    ? "text-ink"
                    : "text-ink-soft hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 right-3 left-3 h-[2px] bg-gold rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full bg-white border border-line px-3 py-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/15 text-gold-deep">
                  <User className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-ink">{user.name}</span>
              </div>
              <button
                onClick={signOut}
                className="btn-ghost !py-2 !px-3"
                aria-label="تسجيل خروج"
              >
                <LogOut className="h-4 w-4" />
                <span>خروج</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary !py-2.5">
              <LogIn className="h-4 w-4" />
              <span>تسجيل / دخول</span>
            </Link>
          )}
        </div>

        <button
          className="md:hidden grid h-10 w-10 place-items-center rounded-xl bg-white border border-line"
          onClick={() => setOpen((v) => !v)}
          aria-label="القائمة"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-sand">
          <div className="container-wrap py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-bold ${
                    isActive
                      ? "bg-white text-ink shadow-soft"
                      : "text-ink-soft hover:bg-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="h-px bg-line my-2" />
            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold-deep">
                    <User className="h-4 w-4" />
                  </span>
                  <div className="text-sm">
                    <div className="font-bold text-ink">{user.name}</div>
                    <div className="text-ink-soft text-xs">{user.phone}</div>
                  </div>
                </div>
                <button onClick={signOut} className="btn-ghost w-full justify-center">
                  <LogOut className="h-4 w-4" />
                  <span>تسجيل خروج</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary w-full justify-center">
                <LogIn className="h-4 w-4" />
                <span>تسجيل / دخول</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
