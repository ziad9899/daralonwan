import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Handshake,
  KeyRound,
  Building2,
  Trees,
  Home as HomeIcon,
  Compass,
} from "lucide-react";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

export default function Home() {
  const featured = properties.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      <Hero />
      <Stats />
      <Featured properties={featured} />
      <Categories />
      <WhyUs />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-ink/85 via-ink/70 to-ink/40" />
      </div>

      <div className="relative container-wrap pt-20 pb-32 md:pt-28 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-4 py-1.5 text-xs font-bold text-gold-soft tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            مجموعة عقارية موثوقة في المملكة
          </span>
          <h1 className="mt-6 font-display font-extrabold text-sand text-4xl md:text-6xl lg:text-7xl leading-[1.1]">
            عقارات مختارة بعناية{" "}
            <span className="block text-gold-soft mt-2">لأسلوب حياة أفضل</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-sand/85 leading-relaxed max-w-2xl">
            استعرض فلل وشقق وأراضٍ مختارة في أفضل المواقع، مع تجربة بحث سهلة
            وتواصل مباشر مع مستشارين عقاريين يفهمون السوق المحلي.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 max-w-4xl"
        >
          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3 text-sm text-sand/80"
        >
          <span className="text-xs font-bold tracking-wider text-gold-soft">
            تصفّح حسب:
          </span>
          {["فيلا", "شقة", "أرض", "دوبلكس"].map((t) => (
            <Link
              key={t}
              to={`/properties?type=${encodeURIComponent(t)}`}
              className="rounded-full border border-white/20 bg-white/5 hover:bg-white/15 px-4 py-1.5 text-sm font-bold transition"
            >
              {t}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "+1,200", label: "عقار تم بيعه" },
    { value: "+450", label: "عميل سعيد" },
    { value: "12", label: "مدينة نخدمها" },
    { value: "9.2/10", label: "تقييم العملاء" },
  ];
  return (
    <section className="container-wrap -mt-14 relative z-10">
      <div className="bg-white rounded-2xl shadow-card border border-line grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-line">
        {items.map((it) => (
          <div key={it.label} className="px-6 py-7 text-center">
            <div className="font-display font-extrabold text-2xl md:text-3xl text-ink">
              {it.value}
            </div>
            <div className="mt-1 text-xs md:text-sm font-semibold text-ink-soft">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured({ properties }: { properties: typeof import("../data/properties").properties }) {
  return (
    <section className="container-wrap py-20">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <span className="section-eyebrow">عقارات مميّزة</span>
          <h2 className="section-title mt-3">اختيارات تستحق المشاهدة</h2>
          <p className="mt-3 text-ink-soft max-w-xl text-sm md:text-base">
            مجموعة منتقاة من أبرز العقارات في الرياض وجدة والمنطقة الشرقية،
            بمواقع مدروسة وأسعار تنافسية.
          </p>
        </div>
        <Link
          to="/properties"
          className="hidden md:inline-flex items-center gap-1 text-sm font-bold text-ink hover:text-gold-deep transition"
        >
          <span>عرض الكل</span>
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </div>

      <div className="mt-8 md:hidden flex justify-center">
        <Link to="/properties" className="btn-ghost">
          <span>عرض كل العقارات</span>
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    {
      icon: HomeIcon,
      title: "فلل سكنية",
      desc: "تصاميم معاصرة بمساحات مدروسة",
      to: "/properties?type=فيلا",
    },
    {
      icon: Building2,
      title: "شقق فاخرة",
      desc: "في أبراج راقية بإطلالات مميزة",
      to: "/properties?type=شقة",
    },
    {
      icon: Trees,
      title: "أراضٍ منتقاة",
      desc: "للاستثمار والسكن في مواقع نامية",
      to: "/properties?type=أرض",
    },
    {
      icon: Compass,
      title: "دوبلكس",
      desc: "خصوصية ومساحة لعائلة كبيرة",
      to: "/properties?type=دوبلكس",
    },
  ];
  return (
    <section className="bg-white border-y border-line">
      <div className="container-wrap py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-eyebrow">تصفّح حسب التصنيف</span>
          <h2 className="section-title mt-3">اعثر على ما يناسب أسلوب حياتك</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {cats.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                to={c.to}
                className="group block rounded-2xl border border-line bg-sand p-5 md:p-6 hover:border-gold hover:bg-white hover:shadow-card transition-all"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white border border-line text-gold-deep group-hover:bg-gold group-hover:text-white group-hover:border-gold transition">
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="mt-4 font-display font-bold text-ink text-lg">
                  {c.title}
                </div>
                <p className="mt-1 text-sm text-ink-soft leading-relaxed">
                  {c.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    {
      icon: ShieldCheck,
      title: "عقارات موثّقة",
      desc: "كل عقار يمر بمراجعة لمعلوماته ووثائقه قبل عرضه على المنصة.",
    },
    {
      icon: Handshake,
      title: "مستشار شخصي",
      desc: "يتابع معك كل خطوة من الاستفسار إلى توقيع العقد دون عناء.",
    },
    {
      icon: KeyRound,
      title: "تسليم احترافي",
      desc: "عملية تسليم منظمة مع متابعة ما بعد البيع لضمان راحتك.",
    },
  ];

  return (
    <section className="container-wrap py-20">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
          <span className="section-eyebrow">لماذا تختارنا</span>
          <h2 className="section-title mt-3">
            خبرة عقارية تختصر عليك الوقت والجهد
          </h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            نعمل مع شبكة موثوقة من المالكين والمكاتب العقارية لنقدم لك خيارات
            متنوّعة بأسعار عادلة، ونلتزم بالشفافية في كل خطوة.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            <span>تحدّث مع مستشار</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`card p-6 ${i === 1 ? "sm:translate-y-6" : ""}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/10 text-gold-deep">
                <it.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display font-bold text-lg text-ink">
                {it.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container-wrap pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-ink text-sand p-10 md:p-14">
        <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-emerald-brand/15 blur-3xl" />
        <div className="relative grid md:grid-cols-[1.5fr_auto] items-center gap-8">
          <div>
            <span className="section-eyebrow text-gold-soft">جاهز للبدء؟</span>
            <h2 className="mt-3 font-display font-extrabold text-3xl md:text-4xl">
              احجز جلسة استشارية مجانية مع مستشار عقاري
            </h2>
            <p className="mt-3 text-sand/75 max-w-2xl">
              نساعدك على تحديد ميزانيتك، وتضييق خياراتك، وزيارة العقارات التي
              تهمّك دون أي التزام مسبق.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <Link to="/contact" className="btn-gold justify-center">
              <span>تواصل معنا</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              to="/properties"
              className="btn justify-center bg-white/10 hover:bg-white/20 text-sand border border-white/15"
            >
              <span>تصفّح العقارات</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
