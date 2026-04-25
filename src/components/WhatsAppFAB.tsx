import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { AGENCY_WHATSAPP, buildWhatsAppLink } from "../lib/whatsapp";

export default function WhatsAppFAB() {
  const link = buildWhatsAppLink(
    AGENCY_WHATSAPP,
    "السلام عليكم، أرغب في الاستفسار عن العقارات المعروضة لديكم."
  );

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-emerald-brand px-4 py-3 text-white shadow-gold hover:bg-emerald-deep transition-colors"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="font-bold text-sm hidden sm:inline">واتساب مباشر</span>
    </motion.a>
  );
}
