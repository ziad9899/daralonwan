import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  ArrowDownUp,
  MapPin,
  Building2,
  Bed,
  Tag,
  Wallet,
  SearchX,
} from "lucide-react";
import {
  properties as allProperties,
  cities,
  propertyTypes,
  listingTypes,
  type PropertyType,
  type Listing,
} from "../data/properties";
import PropertyCard from "../components/PropertyCard";

type SortKey = "newest" | "price-asc" | "price-desc";

interface FilterState {
  city: string;
  type: PropertyType | "";
  listing: Listing | "";
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
}

const emptyFilters: FilterState = {
  city: "",
  type: "",
  listing: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
};

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortKey>("newest");
  const [open, setOpen] = useState(false);

  // Read URL params once on mount
  useEffect(() => {
    const next: FilterState = { ...emptyFilters };
    const city = searchParams.get("city");
    const type = searchParams.get("type");
    const listing = searchParams.get("listing");
    const budget = searchParams.get("budget");
    const bedrooms = searchParams.get("bedrooms");

    if (city) next.city = city;
    if (type && (propertyTypes as string[]).includes(type)) next.type = type as PropertyType;
    if (listing && (listingTypes as string[]).includes(listing)) next.listing = listing as Listing;
    if (bedrooms) next.bedrooms = bedrooms;
    if (budget && budget.includes("-")) {
      const [min, max] = budget.split("-");
      next.minPrice = min;
      next.maxPrice = max;
    }
    setFilters(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let list = allProperties.filter((p) => {
      if (filters.city && p.city !== filters.city) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.listing && p.listing !== filters.listing) return false;
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.bedrooms) {
        const min = Number(filters.bedrooms);
        if (p.bedrooms < min) return false;
      }
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [filters, sort]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const reset = () => {
    setFilters(emptyFilters);
    setSearchParams({});
  };

  return (
    <div className="container-wrap py-8 md:py-12">
      <header className="mb-8">
        <span className="section-eyebrow">العقارات المتاحة</span>
        <h1 className="section-title mt-3">استعرض الخيارات وقارن بسهولة</h1>
        <p className="mt-2 text-ink-soft">
          استخدم الفلاتر للوصول الأسرع إلى العقار الذي يناسبك.
        </p>
      </header>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block">
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            activeCount={activeCount}
            onReset={reset}
          />
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="text-sm text-ink-soft">
              <span className="font-bold text-ink">{filtered.length}</span>{" "}
              عقار مطابق
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden btn-ghost !py-2 !px-3"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>الفلاتر</span>
                {activeCount > 0 && (
                  <span className="grid place-items-center min-w-5 h-5 px-1 rounded-full bg-gold text-white text-[10px] font-bold">
                    {activeCount}
                  </span>
                )}
              </button>
              <div className="relative">
                <ArrowDownUp className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft pointer-events-none" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none bg-white border border-line rounded-full pr-9 pl-4 py-2 text-sm font-bold text-ink focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="newest">الأحدث أولًا</option>
                  <option value="price-asc">السعر: من الأقل</option>
                  <option value="price-desc">السعر: من الأعلى</option>
                </select>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState onReset={reset} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/60"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-sand overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-line bg-white">
              <h3 className="font-display font-bold text-lg">الفلاتر</h3>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg bg-sand"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                activeCount={activeCount}
                onReset={reset}
              />
              <button
                onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center mt-4"
              >
                عرض النتائج ({filtered.length})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function FiltersPanel({
  filters,
  setFilters,
  activeCount,
  onReset,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  activeCount: number;
  onReset: () => void;
}) {
  const update = (k: keyof FilterState, v: string) =>
    setFilters({ ...filters, [k]: v });

  return (
    <div className="card p-5 lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gold" />
          <h3 className="font-display font-bold text-base">تصفية النتائج</h3>
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs font-bold text-gold-deep hover:text-gold flex items-center gap-1"
          >
            <X className="h-3.5 w-3.5" />
            مسح
          </button>
        )}
      </div>

      <div className="space-y-5">
        <FilterGroup label="النوع" icon={<Tag className="h-3.5 w-3.5" />}>
          <ChipGroup
            value={filters.listing}
            options={listingTypes.map((l) => ({ label: l, value: l }))}
            onChange={(v) => update("listing", v)}
          />
        </FilterGroup>

        <FilterGroup label="المدينة" icon={<MapPin className="h-3.5 w-3.5" />}>
          <select
            value={filters.city}
            onChange={(e) => update("city", e.target.value)}
            className="input"
          >
            <option value="">كل المدن</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FilterGroup>

        <FilterGroup
          label="نوع العقار"
          icon={<Building2 className="h-3.5 w-3.5" />}
        >
          <ChipGroup
            value={filters.type}
            options={propertyTypes.map((t) => ({ label: t, value: t }))}
            onChange={(v) => update("type", v)}
          />
        </FilterGroup>

        <FilterGroup label="السعر (ر.س)" icon={<Wallet className="h-3.5 w-3.5" />}>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              inputMode="numeric"
              placeholder="من"
              value={filters.minPrice}
              onChange={(e) => update("minPrice", e.target.value)}
              className="input"
            />
            <input
              type="number"
              inputMode="numeric"
              placeholder="إلى"
              value={filters.maxPrice}
              onChange={(e) => update("maxPrice", e.target.value)}
              className="input"
            />
          </div>
        </FilterGroup>

        <FilterGroup label="عدد الغرف" icon={<Bed className="h-3.5 w-3.5" />}>
          <ChipGroup
            value={filters.bedrooms}
            options={[
              { label: "1+", value: "1" },
              { label: "2+", value: "2" },
              { label: "3+", value: "3" },
              { label: "4+", value: "4" },
              { label: "5+", value: "5" },
            ]}
            onChange={(v) => update("bedrooms", v)}
          />
        </FilterGroup>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-ink-soft">
        <span className="text-gold-deep">{icon}</span>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

function ChipGroup({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(active ? "" : o.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
              active
                ? "bg-ink text-sand border-ink"
                : "bg-white text-ink-soft border-line hover:border-ink/40 hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="card p-12 text-center">
      <span className="grid h-16 w-16 mx-auto place-items-center rounded-2xl bg-sand text-gold-deep mb-4">
        <SearchX className="h-7 w-7" />
      </span>
      <h3 className="font-display font-bold text-xl text-ink">
        لا توجد نتائج مطابقة
      </h3>
      <p className="mt-2 text-ink-soft text-sm">
        جرّب توسيع نطاق الفلاتر أو إعادة تعيينها لرؤية المزيد من العقارات.
      </p>
      <button onClick={onReset} className="btn-ghost mt-6 mx-auto">
        إعادة تعيين الفلاتر
      </button>
    </div>
  );
}
