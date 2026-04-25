import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Maximize2,
  Car,
  Building2,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  ChevronRight,
  Calendar,
  Home as HomeIcon,
  ArrowRight,
} from "lucide-react";
import { getPropertyById, formatPrice } from "../data/properties";
import { buildWhatsAppLink } from "../lib/whatsapp";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const property = id ? getPropertyById(id) : undefined;
  const [activeImg, setActiveImg] = useState(0);

  if (!property) {
    return (
      <div className="container-wrap py-24 text-center">
        <h1 className="font-display font-bold text-2xl">لم يتم العثور على العقار</h1>
        <p className="mt-2 text-ink-soft">قد يكون قد تم إزالته أو أن الرابط غير صحيح.</p>
        <Link to="/properties" className="btn-primary mt-6">
          العودة للعقارات
        </Link>
      </div>
    );
  }

  const wa = buildWhatsAppLink(
    property.agent.whatsapp,
    `السلام عليكم ${property.agent.name}، أود الاستفسار عن: ${property.title} (رقم العقار: ${property.id}).`
  );

  return (
    <div className="container-wrap py-6 md:py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-ink-soft mb-5">
        <Link to="/" className="hover:text-ink transition">الرئيسية</Link>
        <ChevronRight className="h-3.5 w-3.5 rotate-180" />
        <Link to="/properties" className="hover:text-ink transition">العقارات</Link>
        <ChevronRight className="h-3.5 w-3.5 rotate-180" />
        <span className="text-ink font-bold truncate max-w-[40ch]">{property.title}</span>
      </nav>

      {/* Title + actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="chip !bg-ink !text-sand !border-ink">{property.listing}</span>
            <span className="chip !bg-gold !text-white !border-gold">{property.type}</span>
            {property.featured && (
              <span className="chip !bg-emerald-brand !text-white !border-emerald-brand">
                مميّز
              </span>
            )}
          </div>
          <h1 className="font-display font-extrabold text-2xl md:text-4xl text-ink leading-tight">
            {property.title}
          </h1>
          <div className="mt-3 flex items-center gap-1.5 text-ink-soft">
            <MapPin className="h-4 w-4 text-gold" />
            <span>
              {property.city} — {property.district}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-ink-soft">السعر</div>
          <div className="font-display font-extrabold text-3xl md:text-4xl text-ink">
            {formatPrice(property.price)}
          </div>
          {property.listing === "للإيجار" && (
            <div className="text-xs text-ink-soft font-bold">إيجار سنوي</div>
          )}
        </div>
      </div>

      {/* Gallery */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <div>
          <div className="card overflow-hidden">
            <div className="relative aspect-[16/10] bg-line">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                src={property.images[activeImg]}
                alt={property.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-3 grid grid-cols-4 gap-2 bg-white">
              {property.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition ${
                    activeImg === i ? "border-gold" : "border-transparent hover:border-line"
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="card p-6 mt-6">
            <h2 className="font-display font-bold text-lg text-ink mb-4">
              مواصفات العقار
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.bedrooms > 0 && (
                <SpecBlock icon={Bed} label="غرف النوم" value={`${property.bedrooms}`} />
              )}
              {property.bathrooms > 0 && (
                <SpecBlock icon={Bath} label="دورات المياه" value={`${property.bathrooms}`} />
              )}
              <SpecBlock icon={Maximize2} label="المساحة" value={`${property.area} م²`} />
              {property.parking > 0 && (
                <SpecBlock icon={Car} label="مواقف السيارات" value={`${property.parking}`} />
              )}
              <SpecBlock icon={Building2} label="نوع العقار" value={property.type} />
              {property.yearBuilt && (
                <SpecBlock
                  icon={Calendar}
                  label="سنة البناء"
                  value={`${property.yearBuilt}`}
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div className="card p-6 mt-6">
            <h2 className="font-display font-bold text-lg text-ink mb-3">
              عن العقار
            </h2>
            <p className="text-ink-soft leading-loose">{property.description}</p>
          </div>

          {/* Features */}
          {property.features.length > 0 && (
            <div className="card p-6 mt-6">
              <h2 className="font-display font-bold text-lg text-ink mb-4">
                مميزات العقار
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-ink"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-brand shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Map (decorative — no API) */}
          <div className="card overflow-hidden mt-6">
            <div className="relative h-72 bg-gradient-to-br from-emerald-brand/15 via-sand to-gold/10">
              <DecorativeMap />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white shadow-card rounded-2xl px-5 py-3 border border-line flex items-center gap-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-white">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs text-ink-soft font-bold">الموقع</div>
                    <div className="font-bold text-ink">
                      {property.city} — {property.district}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="p-4 text-xs text-ink-soft text-center">
              يتم عرض الموقع التفصيلي عند التواصل مع المستشار العقاري.
            </div>
          </div>
        </div>

        {/* Sticky contact */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <div className="flex items-center gap-3 pb-5 border-b border-line">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold-deep font-display font-bold">
                {property.agent.name.charAt(0)}
              </span>
              <div>
                <div className="font-display font-bold text-ink">
                  {property.agent.name}
                </div>
                <div className="text-xs text-ink-soft">
                  {property.agent.title}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center"
              >
                <MessageCircle className="h-4 w-4" />
                <span>واتساب</span>
              </a>
              <a href={`tel:${property.agent.phone}`} className="btn-primary w-full justify-center">
                <Phone className="h-4 w-4" />
                <span dir="ltr">{property.agent.phone}</span>
              </a>
              <Link to="/contact" className="btn-ghost w-full justify-center">
                <span>طلب معاينة</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 pt-5 border-t border-line text-xs text-ink-soft leading-relaxed">
              عند تواصلك ستحصل على رد خلال ساعات الدوام، ويمكن تنسيق موعد
              معاينة في الوقت الذي يناسبك.
            </div>
          </div>

          <Link
            to="/properties"
            className="mt-4 flex items-center justify-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink transition"
          >
            <HomeIcon className="h-4 w-4" />
            <span>العودة لجميع العقارات</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}

function SpecBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-sand/40 p-4">
      <div className="flex items-center gap-2 text-xs font-bold text-ink-soft">
        <Icon className="h-4 w-4 text-gold" />
        <span>{label}</span>
      </div>
      <div className="mt-1.5 font-display font-bold text-ink text-lg">
        {value}
      </div>
    </div>
  );
}

function DecorativeMap() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-60"
      viewBox="0 0 600 300"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#0F766E"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="600" height="300" fill="url(#grid)" />
      <path
        d="M 0 180 C 100 160 200 200 300 180 S 500 160 600 200"
        stroke="#B68A35"
        strokeOpacity="0.35"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 0 100 C 100 130 250 80 350 110 S 550 90 600 130"
        stroke="#0F766E"
        strokeOpacity="0.3"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="120" cy="80" r="3" fill="#1F2933" opacity="0.4" />
      <circle cx="450" cy="60" r="3" fill="#1F2933" opacity="0.4" />
      <circle cx="500" cy="240" r="3" fill="#1F2933" opacity="0.4" />
      <circle cx="80" cy="240" r="3" fill="#1F2933" opacity="0.4" />
    </svg>
  );
}
