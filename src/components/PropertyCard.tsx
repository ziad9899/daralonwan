import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import type { Property } from "../data/properties";
import { formatPrice } from "../data/properties";
import { buildWhatsAppLink } from "../lib/whatsapp";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const wa = buildWhatsAppLink(
    property.agent.whatsapp,
    `السلام عليكم، أود الاستفسار عن: ${property.title} (رقم العقار: ${property.id}).`
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group card flex flex-col hover:shadow-card hover:-translate-y-1 transition-all duration-300"
    >
      <Link to={`/properties/${property.id}`} className="relative block overflow-hidden">
        <div className="aspect-[4/3] bg-line overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="rounded-full bg-ink/90 backdrop-blur px-3 py-1 text-xs font-bold text-sand">
            {property.listing}
          </span>
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">
            {property.type}
          </span>
        </div>
        {property.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold tracking-widest text-gold-deep">
            مميّز
          </span>
        )}
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link
            to={`/properties/${property.id}`}
            className="font-display font-bold text-lg text-ink hover:text-gold-deep transition line-clamp-2"
          >
            {property.title}
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-ink-soft mb-4">
          <MapPin className="h-4 w-4 text-gold" />
          <span>
            {property.city} — {property.district}
          </span>
        </div>

        {property.bedrooms > 0 && (
          <div className="flex items-center gap-4 text-sm text-ink-soft mb-4 pb-4 border-b border-line">
            <Spec icon={<Bed className="h-4 w-4" />} value={`${property.bedrooms} غرف`} />
            <Spec icon={<Bath className="h-4 w-4" />} value={`${property.bathrooms} حمّام`} />
            <Spec
              icon={<Maximize2 className="h-4 w-4" />}
              value={`${property.area} م²`}
            />
          </div>
        )}
        {property.bedrooms === 0 && (
          <div className="flex items-center gap-4 text-sm text-ink-soft mb-4 pb-4 border-b border-line">
            <Spec
              icon={<Maximize2 className="h-4 w-4" />}
              value={`${property.area} م²`}
            />
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] text-ink-soft font-semibold">السعر</div>
            <div className="text-xl font-extrabold text-ink leading-tight">
              {formatPrice(property.price)}
              {property.listing === "للإيجار" && (
                <span className="text-xs font-bold text-ink-soft mr-1">
                  / سنويًا
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-emerald-brand text-white hover:bg-emerald-deep transition shadow-soft"
              aria-label="تواصل عبر واتساب"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <Link
              to={`/properties/${property.id}`}
              className="inline-flex items-center gap-1 rounded-full bg-ink text-sand px-4 py-2.5 text-xs font-bold hover:bg-black transition"
            >
              <span>تفاصيل</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Spec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-gold">{icon}</span>
      <span className="font-semibold">{value}</span>
    </span>
  );
}
