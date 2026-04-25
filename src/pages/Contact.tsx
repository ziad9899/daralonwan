import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Send,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Tag,
} from "lucide-react";
import { AGENCY_PHONE, AGENCY_WHATSAPP, buildWhatsAppLink } from "../lib/whatsapp";

const requestTypes = [
  "استفسار عام",
  "شراء عقار",
  "تأجير عقار",
  "بيع عقار خاص بي",
  "استشارة استثمارية",
];

interface Errors {
  name?: string;
  phone?: string;
  message?: string;
}

interface SavedRequest {
  id: string;
  name: string;
  phone: string;
  type: string;
  message: string;
  createdAt: number;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState(requestTypes[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Errors = {};
    if (!name.trim() || name.trim().length < 3) e.name = "الرجاء إدخال الاسم الكامل";
    const cleaned = phone.replace(/\s|-/g, "");
    if (!/^(\+?9665|05)\d{8}$/.test(cleaned)) e.phone = "أدخل رقم جوال سعودي صحيح";
    if (!message.trim() || message.trim().length < 10) {
      e.message = "اكتب رسالة لا تقل عن 10 أحرف";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    // Persist request locally (Local Demo only — no real backend)
    const req: SavedRequest = {
      id: `req-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      type,
      message: message.trim(),
      createdAt: Date.now(),
    };
    try {
      const raw = localStorage.getItem("ofq-contact-requests");
      const list: SavedRequest[] = raw ? JSON.parse(raw) : [];
      list.unshift(req);
      localStorage.setItem("ofq-contact-requests", JSON.stringify(list.slice(0, 50)));
    } catch {
      // ignore quota errors
    }

    setSubmitting(false);
    setDone(true);
  };

  const reset = () => {
    setName("");
    setPhone("");
    setType(requestTypes[0]);
    setMessage("");
    setErrors({});
    setDone(false);
  };

  const wa = buildWhatsAppLink(
    AGENCY_WHATSAPP,
    "السلام عليكم، أرغب في استشارة بشأن عقار."
  );

  return (
    <div className="container-wrap py-10 md:py-16">
      <header className="text-center max-w-2xl mx-auto mb-10">
        <span className="section-eyebrow">تواصل معنا</span>
        <h1 className="section-title mt-3">نحن هنا للإجابة على استفساراتك</h1>
        <p className="mt-3 text-ink-soft">
          فريقنا جاهز لمساعدتك في إيجاد العقار المناسب أو تقييم عقارك الحالي.
          راسلنا وسنرد عليك خلال ساعات الدوام.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card p-7 md:p-10"
        >
          {done ? (
            <div className="py-10 text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-emerald-brand/15 text-emerald-brand mb-4"
              >
                <CheckCircle2 className="h-8 w-8" />
              </motion.span>
              <h2 className="font-display font-extrabold text-2xl text-ink">
                تم استلام طلبك بنجاح
              </h2>
              <p className="mt-2 text-ink-soft max-w-md mx-auto">
                شكرًا لتواصلك معنا. سيتواصل معك أحد مستشارينا في أقرب وقت ممكن.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle className="h-4 w-4" />
                  <span>محادثة فورية على واتساب</span>
                </a>
                <button onClick={reset} className="btn-ghost">
                  إرسال رسالة أخرى
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <h2 className="font-display font-bold text-xl text-ink mb-2">
                أرسل رسالتك
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <FieldInput
                  icon={User}
                  label="الاسم الكامل"
                  placeholder="مثال: نوف العتيبي"
                  value={name}
                  onChange={setName}
                  error={errors.name}
                />
                <FieldInput
                  icon={Phone}
                  label="رقم الجوال"
                  placeholder="05XXXXXXXX"
                  value={phone}
                  onChange={setPhone}
                  type="tel"
                  dir="ltr"
                  error={errors.phone}
                />
              </div>

              <div>
                <label className="label">نوع الطلب</label>
                <div className="flex items-center gap-2 rounded-xl bg-white border border-line px-3">
                  <Tag className="h-4 w-4 text-ink-soft" />
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-transparent border-0 py-3 text-sm font-bold text-ink focus:outline-none cursor-pointer"
                  >
                    {requestTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="label">الرسالة</label>
                <div
                  className={`flex items-start gap-2 rounded-xl bg-white border px-3 py-2 transition focus-within:border-gold ${
                    errors.message ? "border-red-300" : "border-line"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 text-ink-soft shrink-0 mt-2" />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="اكتب تفاصيل طلبك أو سؤالك..."
                    className="w-full bg-transparent border-0 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none resize-none"
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-600 font-semibold">{errors.message}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex-1 justify-center !py-3.5"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>إرسال الرسالة</span>
                    </>
                  )}
                </button>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp justify-center"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>أو راسلنا على واتساب</span>
                </a>
              </div>
            </form>
          )}
        </motion.div>

        {/* Info */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
        >
          <InfoCard
            icon={Phone}
            title="اتصل بنا مباشرة"
            value={AGENCY_PHONE}
            href={`tel:${AGENCY_PHONE}`}
            ltr
          />
          <InfoCard
            icon={Mail}
            title="البريد الإلكتروني"
            value="hello@daralonwan.sa"
            href="mailto:hello@daralonwan.sa"
            ltr
          />
          <InfoCard
            icon={MapPin}
            title="مقرنا الرئيسي"
            value="الرياض — حي الياسمين، طريق الملك فهد"
          />
          <InfoCard
            icon={Clock}
            title="ساعات العمل"
            value="السبت – الخميس | 9:00 ص – 9:00 م"
          />

          <div className="card p-6 bg-ink text-sand border-ink">
            <h3 className="font-display font-bold text-lg">تحتاج رد فوري؟</h3>
            <p className="mt-2 text-sm text-sand/75">
              راسلنا على واتساب وسيرد عليك أحد مستشارينا خلال دقائق.
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center mt-5"
            >
              <MessageCircle className="h-4 w-4" />
              <span>بدء محادثة واتساب</span>
            </a>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}

function FieldInput({
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

function InfoCard({
  icon: Icon,
  title,
  value,
  href,
  ltr,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
  ltr?: boolean;
}) {
  const Tag: any = href ? "a" : "div";
  const props = href ? { href } : {};
  return (
    <Tag
      {...props}
      className={`card p-5 flex items-center gap-4 ${href ? "hover:border-gold transition" : ""}`}
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/10 text-gold-deep shrink-0">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="text-xs font-bold text-ink-soft">{title}</div>
        <div
          className="font-bold text-ink truncate"
          dir={ltr ? "ltr" : undefined}
        >
          {value}
        </div>
      </div>
    </Tag>
  );
}
