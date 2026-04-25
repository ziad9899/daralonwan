export type PropertyType = "فيلا" | "شقة" | "أرض" | "دوبلكس";
export type Listing = "للبيع" | "للإيجار";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  listing: Listing;
  price: number;
  city: string;
  district: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  yearBuilt?: number;
  description: string;
  features: string[];
  images: string[];
  featured?: boolean;
  agent: {
    name: string;
    title: string;
    phone: string;
    whatsapp: string;
  };
}

const agentSalman = {
  name: "سلمان العتيبي",
  title: "مستشار عقاري معتمد",
  phone: "+966550000001",
  whatsapp: "966550000001",
};

const agentNorah = {
  name: "نورة الشهري",
  title: "أخصائية عقارات سكنية",
  phone: "+966550000002",
  whatsapp: "966550000002",
};

const agentKhaled = {
  name: "خالد القحطاني",
  title: "مدير محفظة عقارية",
  phone: "+966550000003",
  whatsapp: "966550000003",
};

// Realistic Unsplash images for property listings (no API key required, public CDN)
const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const properties: Property[] = [
  {
    id: "rh-narjis-villa-01",
    title: "فيلا حديثة بتشطيبات راقية في النرجس",
    type: "فيلا",
    listing: "للبيع",
    price: 2850000,
    city: "الرياض",
    district: "النرجس",
    bedrooms: 6,
    bathrooms: 7,
    area: 410,
    parking: 3,
    yearBuilt: 2024,
    featured: true,
    description:
      "فيلا حديثة بتصميم معاصر في قلب حي النرجس، تتميز بمداخل مستقلة، إنارة طبيعية واسعة، وتشطيبات فاخرة تشمل أرضيات بورسلين إيطالي ومطبخ مجهز بالكامل. الموقع قريب من الخدمات والمدارس الأهلية والطرق السريعة.",
    features: [
      "مدخلين منفصلين",
      "مصعد داخلي",
      "مطبخ راكب",
      "غرفة سائق وخادمة",
      "حديقة خلفية",
      "نظام كاميرات",
    ],
    images: [
      img("photo-1600596542815-ffad4c1539a9"),
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600566753190-17f0baa2a6c3"),
      img("photo-1600607687939-ce8a6c25118c"),
    ],
    agent: agentSalman,
  },
  {
    id: "rh-malqa-apt-02",
    title: "شقة بتشطيب فندقي في الملقا",
    type: "شقة",
    listing: "للبيع",
    price: 1280000,
    city: "الرياض",
    district: "الملقا",
    bedrooms: 3,
    bathrooms: 3,
    area: 175,
    parking: 2,
    yearBuilt: 2023,
    featured: true,
    description:
      "شقة عصرية في برج سكني هادئ بحي الملقا، تطل على واجهة خضراء وتحتوي على صالة رحبة بإضاءة طبيعية ممتازة، ومطبخ مفتوح على الجلسة العائلية. تشمل المرافق صالة رياضية ومسبح خاص بالسكان.",
    features: [
      "تشطيب فندقي",
      "نوافذ من الأرض إلى السقف",
      "أمن 24 ساعة",
      "مسبح للسكان",
      "صالة رياضية",
      "غرفة غسيل",
    ],
    images: [
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1560448204-e02f11c3d0e2"),
      img("photo-1560185007-cde436f6a4d0"),
      img("photo-1580587771525-78b9dba3b914"),
    ],
    agent: agentNorah,
  },
  {
    id: "rh-hittin-villa-03",
    title: "فيلا فاخرة بإطلالة في حطين",
    type: "فيلا",
    listing: "للبيع",
    price: 4750000,
    city: "الرياض",
    district: "حطين",
    bedrooms: 7,
    bathrooms: 8,
    area: 560,
    parking: 4,
    yearBuilt: 2022,
    featured: true,
    description:
      "فيلا استثنائية في حي حطين الراقي، تجمع بين الأناقة والوظيفية. تصميم داخلي بإمضاء معماري معروف، صالات استقبال منفصلة للرجال والنساء، ومجلس عربي بمدخل مستقل. الحوش الخارجي يحتضن مسبحًا وجلسة شواء.",
    features: [
      "مسبح خارجي",
      "مجلس عربي",
      "مدخلين",
      "غرفة سينما",
      "مكتب منزلي",
      "ملحق علوي",
    ],
    images: [
      img("photo-1613490493576-7fde63acd811"),
      img("photo-1600585154526-990dced4db0d"),
      img("photo-1605276374104-dee2a0ed3cd6"),
      img("photo-1600573472556-e636c2acda88"),
    ],
    agent: agentKhaled,
  },
  {
    id: "rh-narjis-land-04",
    title: "أرض سكنية على شارعين في النرجس",
    type: "أرض",
    listing: "للبيع",
    price: 1650000,
    city: "الرياض",
    district: "النرجس",
    bedrooms: 0,
    bathrooms: 0,
    area: 600,
    parking: 0,
    description:
      "قطعة أرض سكنية بموقع متميز على شارعين عرض 20 و15، مرتفعات منخفضة وجاهزة للبناء. مخططها يسمح ببناء فيلا دورين وملحق، والمنطقة محاطة بفلل حديثة وكثافة خدمات ممتازة.",
    features: [
      "زاوية شارعين",
      "مخطط معتمد",
      "قريبة من الخدمات",
      "صكوك إلكترونية",
    ],
    images: [
      img("photo-1500382017468-9049fed747ef"),
      img("photo-1542856391-010fb87dcfed"),
      img("photo-1597047084897-51e81819a499"),
    ],
    agent: agentSalman,
  },
  {
    id: "jd-shate-villa-05",
    title: "فيلا بإطلالة بحرية في الشاطئ",
    type: "فيلا",
    listing: "للبيع",
    price: 3950000,
    city: "جدة",
    district: "الشاطئ",
    bedrooms: 5,
    bathrooms: 6,
    area: 480,
    parking: 3,
    yearBuilt: 2023,
    featured: true,
    description:
      "فيلا ساحرة في حي الشاطئ، بإطلالة جانبية على البحر وتصميم مفتوح يتيح دخول النسيم البحري إلى صالات المعيشة. تتميز بحديقة استوائية ومسبح خاص ومسطحات خضراء واسعة.",
    features: [
      "إطلالة بحرية",
      "مسبح خاص",
      "حديقة استوائية",
      "مدخل خاص للضيوف",
      "غرفة سائق",
      "تكييف مركزي",
    ],
    images: [
      img("photo-1600047509807-ba8f99d2cdde"),
      img("photo-1600566753376-12c8ab7fb75b"),
      img("photo-1600210492486-724fe5c67fb0"),
      img("photo-1600210492493-0946911123ea"),
    ],
    agent: agentNorah,
  },
  {
    id: "jd-abhur-duplex-06",
    title: "دوبلكس عصري في أبحر الشمالية",
    type: "دوبلكس",
    listing: "للبيع",
    price: 2150000,
    city: "جدة",
    district: "أبحر الشمالية",
    bedrooms: 4,
    bathrooms: 5,
    area: 320,
    parking: 2,
    yearBuilt: 2024,
    description:
      "دوبلكس بتصميم معماري مميز يجمع بين الخصوصية والمساحة، يحتوي على شقة أرضية بمدخل مستقل وشقة علوية فسيحة. الموقع هادئ وقريب من الواجهة البحرية والمراكز التجارية.",
    features: [
      "مدخلين منفصلين",
      "مطبخين",
      "تراس علوي",
      "تشطيب حديث",
      "خزان مياه أرضي",
    ],
    images: [
      img("photo-1568605114967-8130f3a36994"),
      img("photo-1583608205776-bfd35f0d9f83"),
      img("photo-1572120360610-d971b9d7767c"),
      img("photo-1576941089067-2de3c901e126"),
    ],
    agent: agentKhaled,
  },
  {
    id: "jd-abhur-apt-07",
    title: "شقة للإيجار بإطلالة جزئية في أبحر",
    type: "شقة",
    listing: "للإيجار",
    price: 78000,
    city: "جدة",
    district: "أبحر الجنوبية",
    bedrooms: 3,
    bathrooms: 3,
    area: 165,
    parking: 1,
    yearBuilt: 2022,
    description:
      "شقة عصرية للإيجار السنوي في برج سكني هادئ، بإطلالة جزئية على البحر، تشمل تكييف مركزي وأجهزة كهربائية. مناسبة للعائلات الباحثة عن بيئة هادئة قريبة من الخدمات.",
    features: [
      "مفروشة بالكامل",
      "مسبح مشترك",
      "صالة رياضية",
      "أمن 24 ساعة",
      "موقف مظلل",
    ],
    images: [
      img("photo-1522708323590-d24dbb6b0267"),
      img("photo-1551361415-69c87624334f"),
      img("photo-1574691250077-03a929faece5"),
      img("photo-1556909114-f6e7ad7d3136"),
    ],
    agent: agentNorah,
  },
  {
    id: "kh-yarmuk-villa-08",
    title: "فيلا فسيحة في اليرموك",
    type: "فيلا",
    listing: "للبيع",
    price: 2250000,
    city: "الخبر",
    district: "اليرموك",
    bedrooms: 5,
    bathrooms: 6,
    area: 380,
    parking: 3,
    yearBuilt: 2021,
    description:
      "فيلا واسعة في حي اليرموك، تتميز بتصميم تقليدي راقي وغرف فسيحة مع نوافذ كبيرة. مناسبة للعائلات الكبيرة، وتقع في موقع استراتيجي قريب من المدارس والمستشفيات.",
    features: [
      "حوش أمامي وخلفي",
      "غرفة خادمة",
      "مجلس رجال",
      "مدخل سيارات مغطى",
      "مخزن خارجي",
    ],
    images: [
      img("photo-1564013799919-ab600027ffc6"),
      img("photo-1600566753086-00f18fb6b3ea"),
      img("photo-1600566752355-35792bedcfea"),
      img("photo-1600585154084-4e5fe7c39198"),
    ],
    agent: agentSalman,
  },
  {
    id: "kh-olaya-apt-09",
    title: "شقة بإطلالة في العليا",
    type: "شقة",
    listing: "للبيع",
    price: 920000,
    city: "الخبر",
    district: "العليا",
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    parking: 1,
    yearBuilt: 2023,
    description:
      "شقة هادئة في موقع حيوي بحي العليا، قريبة من واجهة الخبر البحرية ومراكز التسوق. تشطيبها مودرن وتحتوي على شرفة جانبية مناسبة للجلسات المسائية.",
    features: [
      "شرفة جانبية",
      "مطبخ راكب",
      "إنترنت ألياف",
      "موقف خاص",
      "مصعدين",
    ],
    images: [
      img("photo-1554995207-c18c203602cb"),
      img("photo-1556228720-195a672e8a03"),
      img("photo-1505691938895-1758d7feb511"),
      img("photo-1558211583-d26f610c1eb1"),
    ],
    agent: agentNorah,
  },
  {
    id: "rh-malqa-rent-10",
    title: "شقة عائلية للإيجار في الملقا",
    type: "شقة",
    listing: "للإيجار",
    price: 65000,
    city: "الرياض",
    district: "الملقا",
    bedrooms: 3,
    bathrooms: 3,
    area: 160,
    parking: 1,
    yearBuilt: 2022,
    description:
      "شقة عائلية مرتبة في برج سكني هادئ بالملقا، إيجار سنوي يشمل الصيانة. قريبة من المدارس العالمية ومحاور الطرق الرئيسية، ومناسبة للعائلات الصغيرة والمتوسطة.",
    features: [
      "صيانة دورية",
      "موقف مظلل",
      "صالة استقبال",
      "غرفة غسيل",
      "تكييف مركزي",
    ],
    images: [
      img("photo-1493809842364-78817add7ffb"),
      img("photo-1484154218962-a197022b5858"),
      img("photo-1502005229762-cf1b2da7c5d6"),
      img("photo-1493663284031-b7e3aefcae8e"),
    ],
    agent: agentKhaled,
  },
  {
    id: "qs-onaiza-villa-11",
    title: "فيلا تراثية معاصرة في عنيزة",
    type: "فيلا",
    listing: "للبيع",
    price: 1450000,
    city: "عنيزة",
    district: "الروضة",
    bedrooms: 5,
    bathrooms: 5,
    area: 420,
    parking: 3,
    yearBuilt: 2022,
    description:
      "فيلا بطابع نجدي محدّث في حي الروضة بعنيزة، تجمع بين الأصالة والحداثة. واجهة طينية أنيقة، مجلس واسع بمدخل مستقل، وحوش داخلي يضفي خصوصية ودفئًا.",
    features: [
      "طابع نجدي",
      "حوش داخلي",
      "مجلس مستقل",
      "غرفة مؤونة",
      "نظام عوازل حرارية",
    ],
    images: [
      img("photo-1600566753051-6057b76d4ce4"),
      img("photo-1572120360610-d971b9d7767c"),
      img("photo-1600585154363-67eb9e2e2099"),
      img("photo-1600573472550-8090b5e0745e"),
    ],
    agent: agentSalman,
  },
  {
    id: "qs-buraidah-land-12",
    title: "أرض تجارية على شارع رئيسي بالقصيم",
    type: "أرض",
    listing: "للبيع",
    price: 980000,
    city: "بريدة",
    district: "الصفراء",
    bedrooms: 0,
    bathrooms: 0,
    area: 750,
    parking: 0,
    description:
      "قطعة أرض تجارية على شارع رئيسي عرض 30م في حي الصفراء ببريدة، موقع استثماري ممتاز يصلح لمعارض تجارية أو مجمع خدمي. الكثافة السكانية مرتفعة والحركة مستمرة.",
    features: [
      "واجهة 25م",
      "شارع تجاري نشط",
      "مخطط معتمد",
      "خدمات متكاملة",
    ],
    images: [
      img("photo-1500382017468-9049fed747ef"),
      img("photo-1444084316824-dc26d6657664"),
      img("photo-1518770660439-4636190af475"),
    ],
    agent: agentKhaled,
  },
];

export const cities = ["الرياض", "جدة", "الخبر", "عنيزة", "بريدة"];
export const propertyTypes: PropertyType[] = ["فيلا", "شقة", "أرض", "دوبلكس"];
export const listingTypes: Listing[] = ["للبيع", "للإيجار"];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-SA").format(price) + " ر.س";
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}
