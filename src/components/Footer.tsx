import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, Github, ExternalLink } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-sand">
      <div className="container-wrap py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <Logo variant="light" />
          <p className="mt-4 text-sand/70 leading-relaxed text-sm">
            دار العنوان منصة عقارية متخصصة في عرض الفلل والشقق والأراضي
            المختارة، نقدم تجربة بحث سهلة وتواصلًا مباشرًا مع مستشارين عقاريين
            موثوقين في كافة مدن المملكة.
          </p>
          <div className="mt-6 space-y-2 text-sm text-sand/80">
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-gold" />
              <span dir="ltr">+966 55 000 0000</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-gold" />
              <span dir="ltr">hello@daralonwan.sa</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-gold" />
              <span>الرياض — حي الياسمين، طريق الملك فهد</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-base mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-sand/75">
            <li><Link to="/" className="hover:text-gold transition">الرئيسية</Link></li>
            <li><Link to="/properties" className="hover:text-gold transition">العقارات</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition">تواصل معنا</Link></li>
            <li><Link to="/login" className="hover:text-gold transition">تسجيل / دخول</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-base mb-4">المدن</h4>
          <ul className="space-y-2 text-sm text-sand/75">
            <li>الرياض</li>
            <li>جدة</li>
            <li>الخبر</li>
            <li>عنيزة وبريدة</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wrap py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sand/60 text-center md:text-right">
            تم تطوير هذا النموذج بواسطة{" "}
            <a
              href="https://ofqtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gold-soft hover:text-gold transition inline-flex items-center gap-1"
            >
              أفق التقنية
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://ofqtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/5 hover:border-gold transition text-sand/80 hover:text-gold"
              aria-label="موقع أفق التقنية"
              title="موقع أفق التقنية"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/ziad9899"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/5 hover:border-gold transition text-sand/80 hover:text-gold"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://ofqtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-sand/70 hover:text-gold transition"
            >
              <span>زيارة الموقع</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
