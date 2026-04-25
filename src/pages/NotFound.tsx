import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-wrap py-24 md:py-32 grid place-items-center text-center">
      <div className="max-w-md">
        <div className="font-display font-extrabold text-7xl md:text-8xl text-gold tracking-tight">
          404
        </div>
        <h1 className="mt-3 font-display font-bold text-2xl text-ink">
          الصفحة التي تبحث عنها غير موجودة
        </h1>
        <p className="mt-2 text-ink-soft">
          قد يكون الرابط قديمًا أو أن الصفحة قد نُقلت.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" />
            <span>الرئيسية</span>
          </Link>
          <Link to="/properties" className="btn-ghost">
            <span>تصفّح العقارات</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
