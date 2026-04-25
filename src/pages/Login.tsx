import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  KeyRound,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

// NOTE: Local Demo Auth — registers user only in LocalStorage.
// No real backend, no password verification, no email confirmation.
// Visible UX is intentionally polished to look real for the demo.

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { user, signIn } = useAuthStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user && !success) {
      // already signed in — bounce home
      navigate("/", { replace: true });
    }
  }, [user, success, navigate]);

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (!name.trim() || name.trim().length < 3) {
      e.name = "الرجاء إدخال الاسم الكامل";
    }
    const cleanedPhone = phone.replace(/\s|-/g, "");
    if (!/^(\+?9665|05)\d{8}$/.test(cleanedPhone)) {
      e.phone = "أدخل رقم جوال سعودي صحيح";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "البريد الإلكتروني غير صحيح";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulated network latency
    await new Promise((r) => setTimeout(r, 850));
    signIn({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => navigate("/", { replace: true }), 1400);
  };

  if (success) {
    return (
      <div className="container-wrap py-20 md:py-32 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-10 text-center max-w-md"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-emerald-brand/15 text-emerald-brand mb-4"
          >
            <CheckCircle2 className="h-8 w-8" />
          </motion.span>
          <h2 className="font-display font-extrabold text-2xl text-ink">
            أهلًا بك يا {name.split(" ")[0]}
          </h2>
          <p className="mt-2 text-ink-soft">
            تم إنشاء حسابك بنجاح. يجري تحويلك إلى الرئيسية...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-wrap py-10 md:py-16">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
        {/* Visual side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block"
        >
          <div className="relative rounded-3xl overflow-hidden border border-line shadow-card">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
              alt=""
              className="h-[560px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-8 text-sand">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 px-3 py-1 text-xs font-bold text-gold-soft">
                <Sparkles className="h-3.5 w-3.5" />
                تجربة عميل متكاملة
              </span>
              <h3 className="mt-4 font-display font-extrabold text-3xl leading-tight">
                انضم إلى آلاف الباحثين عن منزل العمر
              </h3>
              <p className="mt-2 text-sand/80 text-sm leading-relaxed max-w-md">
                إنشاء الحساب يستغرق ثوانٍ، ويمنحك متابعة طلباتك وحفظ العقارات
                المفضلة لديك.
              </p>
              <div className="mt-6 flex items-center gap-5 text-xs">
                <Trust label="بياناتك محمية" icon={ShieldCheck} />
                <Trust label="بدون رسوم" icon={KeyRound} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-7 md:p-10 max-w-md w-full mx-auto lg:mx-0"
        >
          <span className="section-eyebrow">إنشاء حساب</span>
          <h1 className="mt-2 font-display font-extrabold text-2xl md:text-3xl text-ink">
            أهلًا بك في دار العنوان
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            سجّل بياناتك للوصول إلى تجربة عقارية مخصصة لك.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <Input
              icon={User}
              label="الاسم الكامل"
              placeholder="مثال: عبدالله الراشد"
              value={name}
              onChange={setName}
              error={errors.name}
              autoFocus
            />
            <Input
              icon={Phone}
              label="رقم الجوال"
              placeholder="05XXXXXXXX"
              value={phone}
              onChange={setPhone}
              error={errors.phone}
              type="tel"
              dir="ltr"
            />
            <Input
              icon={Mail}
              label="البريد الإلكتروني"
              placeholder="name@example.com"
              value={email}
              onChange={setEmail}
              error={errors.email}
              type="email"
              dir="ltr"
            />

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center !py-3.5 mt-6"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جاري إنشاء الحساب...</span>
                </>
              ) : (
                <span>متابعة وإنشاء الحساب</span>
              )}
            </button>

            <p className="text-[11px] text-ink-soft text-center leading-relaxed mt-4">
              بإكمال التسجيل، فإنك توافق على شروط الاستخدام وسياسة الخصوصية الخاصة بدار العنوان.
            </p>
          </form>

          <div className="mt-6 pt-6 border-t border-line text-center text-sm text-ink-soft">
            <Link to="/" className="font-bold text-ink hover:text-gold-deep transition">
              العودة للرئيسية
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Input({
  icon: Icon,
  label,
  value,
  onChange,
  error,
  ...rest
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <div>
      <label className="label">{label}</label>
      <div
        className={`flex items-center gap-2 rounded-xl bg-white border px-3 transition focus-within:border-gold ${
          error ? "border-red-300" : "border-line"
        }`}
      >
        <Icon className="h-4 w-4 text-ink-soft shrink-0" />
        <input
          {...rest}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-0 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none"
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-semibold">{error}</p>
      )}
    </div>
  );
}

function Trust({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sand/80">
      <Icon className="h-4 w-4 text-gold-soft" />
      <span className="font-bold">{label}</span>
    </span>
  );
}
