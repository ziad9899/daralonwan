import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, Wallet } from "lucide-react";
import { cities, propertyTypes } from "../data/properties";

const budgets = [
  { label: "أي ميزانية", value: "" },
  { label: "حتى 500 ألف", value: "0-500000" },
  { label: "500 ألف – مليون", value: "500000-1000000" },
  { label: "مليون – 2 مليون", value: "1000000-2000000" },
  { label: "2 – 4 مليون", value: "2000000-4000000" },
  { label: "أكثر من 4 مليون", value: "4000000-99999999" },
];

export default function SearchBar() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (budget) params.set("budget", budget);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur rounded-2xl shadow-card border border-white/60 p-3 grid grid-cols-1 md:grid-cols-[1.2fr_1.2fr_1.2fr_auto] gap-3"
    >
      <Field icon={<MapPin className="h-4 w-4" />} label="المدينة">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-transparent border-0 text-sm font-bold text-ink focus:outline-none cursor-pointer"
        >
          <option value="">كل المدن</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Field>

      <Field icon={<Building2 className="h-4 w-4" />} label="نوع العقار">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-transparent border-0 text-sm font-bold text-ink focus:outline-none cursor-pointer"
        >
          <option value="">كل الأنواع</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field icon={<Wallet className="h-4 w-4" />} label="الميزانية">
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full bg-transparent border-0 text-sm font-bold text-ink focus:outline-none cursor-pointer"
        >
          {budgets.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        className="btn-gold !rounded-2xl !py-4 md:px-7 justify-center"
      >
        <Search className="h-4 w-4" />
        <span>ابحث الآن</span>
      </button>
    </form>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-line bg-sand/40 hover:bg-sand transition">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-gold-deep border border-line">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold tracking-wider text-ink-soft">
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}
