// Default WhatsApp number for the agency CTAs (demo)
export const AGENCY_WHATSAPP = "966550000000";
export const AGENCY_PHONE = "+966550000000";

export function buildWhatsAppLink(phone: string, message: string): string {
  const cleaned = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
