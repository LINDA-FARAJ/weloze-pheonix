import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import phoenixLogo from "./assets/w_phoenix_transparent.png";
import codyImage from "./assets/cody.jpg";
import malazImage from "./assets/malaz.jpg";
import promoVideo from "./assets/cody-promo.mp4";
import codyVideo from "./assets/cody.mp4";
import malazepromoVideo from "./assets/malaze promo.mp4";
import malazeVideo from "./assets/malaz.mp4";
import arabescImage from "./assets/16.png";
import japaneseAcademyImage from "./assets/17.png";
import silkRoadImage from "./assets/20.png";
import forSyriaSafetyImage from "./assets/8.png";
import fashionImage from "./assets/fashon.jpg";
import bannanImage from "./assets/bannan.jpg";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// FadeIn via IntersectionObserver
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
};
const projects = [
  {
      
    id: "fashion-one",
    title: "Fashion One | منصة الموضة",
    desc: "منصة سوق إلكتروني حديثة تُعيد تعريف تجربة تسوق الأزياء من خلال الربط بين المبدعين والمصممين المستقلين والمتاجر المميزة في مساحة واحدة.",
    image: fashionImage,
    tag: "E-commerce • Next.js",
    tech: ["Next.js", "Tailwind", "Vercel"],
    meta: "متعدد البائعين • Responsive",
  },
  {
    id: "bannan",
    title: "Banaan - متجر الحقائب التعليمية",
    desc: "متجر إلكتروني مبتكر متخصص في إحياء الفنون اليدوية من خلال تقديم حقائب تعليمية متكاملة DIY Craft Kits مع فيديو تعليمي.",
    image: bannanImage,
    tag: "E-commerce • DIY Kits",
    tech: ["React", "Tailwind", "فيديو تعليمي"],
    meta: "توصيل شامل • دفع آمن",
  },{
    id: "cody",
    title: "Cody - المساعد الذكي",
    desc: "تطبيق ذكاء اصطناعي بشخصية روبوت لطيف، يساعد المستخدمين بذكاء وتفاعل. واجهة عصرية، ردود فورية، وتجربة لا تُنسى.",
    image: codyImage,
    tag: "AI • Flutter",
    tech: ["Flutter", "AI", "UI/UX"],
    meta: "21 يوم • +5k مستخدم",
  },
  {
    id: "malaz",
    title: "ملاذ - دليل الأماكن",
    desc: "تطبيق سياحي متكامل لاكتشاف المطاعم، الحدائق، والمعالم. خرائط تفاعلية، حجز فوري، وتجربة مستخدم سلسة.",
    image: malazImage,
    tag: "Maps • حجز",
    tech: ["Flutter", "Maps", "حجز"],
    meta: "+10k تحميل • 4.8 ⭐",
  },
  {
    id: "arabesc",
    title: "Arabesc Restaurant & Cafe",
    desc: "موقع WordPress مخصص لمطعم سوري في Hachioji اليابان. يجمع بين النكهات الشرقية الأصيلة وتجربة رقمية عصرية.",
    image: arabescImage,
    tag: "WordPress • WooCommerce",
    tech: ["WordPress", "WooCommerce", "عربي/ياباني"],
    meta: "مطعم • حجز طاولات",
  },
  {
    id: "japanese-academy",
    title: "Japanese Academy",
    desc: "منصة تعليمية متكاملة لتعلم اللغة اليابانية. واجهة نظيفة ومنظمة بتصميم UI/UX مدروس.",
    image: japaneseAcademyImage,
    tag: "React • TypeScript",
    tech: ["React", "TypeScript", "تعليم"],
    meta: "تعليم • منصة طلاب",
  },
  {
    id: "silk-road",
    title: "Silk Road Lodge",
    desc: "منصة حجز فندقي أنيقة في قلب تدمر التاريخي. محتوى متعدد اللغات وتصميم يمزج التراث بالضيافة العصرية.",
    image: silkRoadImage,
    tag: "Laravel • React",
    tech: ["Laravel", "Tailwind", "حجز"],
    meta: "فندق • Palmyra",
  },
  {
    id: "for-syria-safety",
    title: "For Syria Safety",
    desc: "منصة إنسانية لتوعية السوريين بمخاطر الألغام ومخلفات الحرب. تبليغ عن أماكن مشبوهة وموارد تثقيفية.",
    image: forSyriaSafetyImage,
    tag: "Humanitarian • React",
    tech: ["React", "Laravel", "إنساني"],
    meta: "توعية • سلامة مجتمع",
  },
];
function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = projects.find(p => p.id === id);
  useEffect(() => window.scrollTo(0, 0), []);
  if (!project) return null;
  return (
    <div className="min-h-screen bg-[#0D0502] text-white p-8">
      <button
        onClick={() => {
          navigate("/", {
            state: {
              scrollTo: "works",
            },
          });
        }}
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#FF6A00]/20 bg-white/[0.03] text-sm text-white/70 hover:text-white hover:border-[#FF6A00]/50 hover:bg-[#FF6A00]/10 transition"
      >
        <span className="group-hover:-translate-x-1 transition">
          →
        </span>

        العودة للمشاريع
      </button>
      <h1 className="mt-8 text-3xl font-bold">{project.title}</h1>

      {/* ===== PROJECT DETAILS MODAL - FULL PRESERVED DESIGN ===== */}
      {/* ===== FASHION ONE ===== */}
      {id === "fashion-one" && (
        <div className="rounded- border border-[#FF6A00]/20 bg-[#0D0502]/95 overflow-hidden shadow-[0_0_80px_rgba(255,106,0,0.15)]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#D00000]/10 to-transparent" />
            <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 p-8 md:p-10">
              <div>
                <div className="inline-flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#0D0502]/60 border border-[#FF6A00]/30 text- font-bold">E-COMMERCE</span>
                  <span className="px-3 py-1 rounded-full bg-[#FF6A00] text- font-bold">Multi-Vendor</span>
                </div>
                <h1 className="text- md:text- font-[800] leading-[1.1]">Fashion One | منصة الموضة والأزياء المتكاملة</h1>
                <p className="mt-4 text- md:text- text-white/60 leading-[1.9]">منصة سوق إلكتروني حديثة تُعيد تعريف تجربة تسوق الأزياء من خلال الربط بين المبدعين والمصممين المستقلين والمتاجر المميزة في مساحة واحدة. تجربة استكشاف فريدة لاقتناء أحدث الصيحات والقطع الحصرية.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["React.js", "Next.js", "Tailwind CSS", "Vercel", "Responsive", "Minimalist Design"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded- overflow-hidden border border-[#FF6A00]/20 bg-[#150800]/80 shadow-[0_0_30px_rgba(255,106,0,0.2)]">
                <img src={fashionImage} alt="Fashion One" className="w-full h- object-cover" />
              </div>
            </div>
          </div>
          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10 grid md:grid-cols-[1.2fr_0.8fr] gap-10">
            <div>
              <h3 className="text- font-bold">أبرز المميزات</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "واجهة تسوق متعددة البائعين: تصفح واستكشاف المتاجر والمبدعين بحرية وسلاسة.",
                  "تجربة مستخدم سريعة وتفاعلية UX/UI بتصميم Minimalist يركز على المحتوى البصري.",
                  "تصنيف وتصفية ذكية: نظام بحث وفلترة يتلاءم مع الفئات المختلفة للملابس والإكسسوارات.",
                  "استجابة كاملة للموبايل Responsive متوافق كلياً مع الشاشات والأجهزة المحمولة.",
                  "تمكين العلامات التجارية من الوصول إلى جمهور أوسع بأسلوب عرض عصري وجذاب.",
                ].map((t,i) => (
                  <li key={i} className="flex gap-3 text- leading-[1.8] text-white/70">
                    <span className="mt- w-1.5 h-1.5 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00] flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="rounded- border border-[#FF6A00]/20 bg-gradient-to-br from-[#1A0A05] to-[#0D0502] p-5">
                <div className="text- font-bold mb-3">رابط المشروع</div>
                <a href="https://fashion-one-xi.vercel.app" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded- bg-gradient-to-r from-[#D00000] to-[#FF6A00] shadow-[0_0_22px_rgba(255,106,0,0.35)] hover:brightness-110 transition">
                  <span className="flex items-center gap-2 text- font-bold">↗ عرض الموقع المباشر</span>
                  <span className="text- opacity-80">LIVE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== BANAAN ===== */}
      {id === "bannan" && (
        <div className="rounded- border border-[#FF6A00]/20 bg-[#0D0502]/95 overflow-hidden shadow-[0_0_80px_rgba(255,106,0,0.15)]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#D00000]/10 to-transparent" />
            <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 p-8 md:p-10">
              <div>
                <div className="inline-flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#0D0502]/60 border border-[#FF6A00]/30 text- font-bold">CRAFT STORE</span>
                  <span className="px-3 py-1 rounded-full bg-[#FF6A00] text- font-bold">DIY Kits</span>
                </div>
                <h1 className="text- md:text- font-[800] leading-[1.1]">Banaan | متجر الحقائب التعليمية</h1>
                <p className="mt-4 text- md:text- text-white/60 leading-[1.9]">متجر إلكتروني مبتكر متخصص في إحياء الفنون اليدوية من خلال تقديم حقائب تعليمية متكاملة DIY Craft Kits. كل حقيبة تحتوي على الخامات والأدوات مع فيديو تعليمي تفاعلي خطوة بخطوة.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["DIY Kits", "Video Tutorial", "E-commerce", "Responsive", "دفع آمن"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded- overflow-hidden border border-[#FF6A00]/20 bg-[#150800]/80 shadow-[0_0_30px_rgba(255,106,0,0.2)]">
                <img src={bannanImage} alt="Banaan" className="w-full h- object-cover" />
              </div>
            </div>
          </div>
          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10 grid md:grid-cols-[1.2fr_0.8fr] gap-10">
            <div>
              <h3 className="text- font-bold">أبرز المميزات</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "حقائب تعليمية شاملة DIY Kits تحتوي على جميع الأدوات والخامات المطلوبة دون الحاجة لشراء مستلزمات خارجية.",
                  "دعم بالفيديو التعليمي: ربط المنتجات بشروحات فيديو تفاعلية بأسلوب سلس وممتع.",
                  "تجربة تسوق متكاملة وآمنة مع واجهات واضحة (الرئيسية، التصنيفات، المنتجات، من نحن).",
                  "نظام توصيل شامل لجميع المحافظات مع دفع آمن 100%.",
                  "تصميم عصري وجذاب UI/UX يضمن استجابة كاملة مع جميع الأجهزة.",
                ].map((t,i) => (
                  <li key={i} className="flex gap-3 text- leading-[1.8] text-white/70">
                    <span className="mt- w-1.5 h-1.5 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00] flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="rounded- border border-[#FF6A00]/20 bg-gradient-to-br from-[#1A0A05] to-[#0D0502] p-5">
                <div className="text- font-bold mb-3">التقنيات المستخدمة</div>
                <div className="flex flex-wrap gap-2">
                  {["React.js","Next.js","Tailwind CSS","Vercel"].map(t=> <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== CODY ===== */}
      {id === "cody" && (
        <div className="rounded-[16px] border border-[#FF6A00]/20 bg-[#0D0502]/95 overflow-hidden shadow-[0_0_80px_rgba(255,106,0,0.15)]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#D00000]/10 to-transparent" />
            <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 p-8 md:p-10">
              <div>
                <div className="inline-flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#FF6A00] text-[11px] font-bold">AI • Flutter</span>
                  <span className="px-3 py-1 rounded-full bg-[#0D0502]/60 border border-[#FF6A00]/30 text-[11px] font-bold">تم الإطلاق في 21 يوم</span>
                </div>
                <h1 className="text-[28px] md:text-[44px] font-[800] leading-[1.1]">Cody — المساعد الذكي للمبرمجين</h1>
                <p className="mt-4 text-[14px] md:text-[16px] text-white/60 leading-[1.9]">تطبيق ذكاء اصطناعي بشخصية روبوت لطيف يساعد المطورين على بناء مشاريع كاملة عبر شات AI فقط. واجهة تفاعلية، لوحة تحكم، وإدارة مشاريع ذكية.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Flutter", "Firebase", "AI Chat", "Dart", "Dashboard"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[12px]">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-[16px] overflow-hidden border border-[#FF6A00]/20 bg-[#150800]/80 shadow-[0_0_30px_rgba(255,106,0,0.2)]">
                <img src={codyImage} alt="Cody" className="w-full h-[320px] object-cover" />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10">
            <h2 className="text-[18px] font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#FF0000] to-[#FF6A00] inline-block" /> الفيديوهات التوضيحية
            </h2>
            <p className="mt-2 text-[12.5px] text-white/50">فيديوهان يوضحان رحلة المستخدم داخل التطبيق</p>
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              <div className="rounded-[14px] overflow-hidden border border-[#FF6A00]/20 bg-black shadow-[0_0_30px_rgba(255,106,0,0.18)]">
                <div className="px-4 py-2.5 bg-[#0D0502]/80 border-b border-[#FF6A00]/10 flex items-center justify-between">
                  <span className="text-[12px] font-bold">الفيديو 1 — عرض التطبيق الكامل</span>
                  <span className="text-[10px] text-white/40">FULL DEMO</span>
                </div>
                <video controls playsInline className="w-full aspect-video object-contain bg-black" poster={codyImage}>
                  <source src={codyVideo} type="video/mp4" />
                </video>
              </div>
              <div className="rounded-[14px] overflow-hidden border border-[#FF6A00]/20 bg-black shadow-[0_0_30px_rgba(255,106,0,0.18)]">
                <div className="px-4 py-2.5 bg-[#0D0502]/80 border-b border-[#FF6A00]/10 flex items-center justify-between">
                  <span className="text-[12px] font-bold">الفيديو 2 — برومو المشروع</span>
                  <span className="text-[10px] text-white/40">UI FLOW</span>
                </div>
                <video controls playsInline className="w-full aspect-video object-contain bg-black" poster={promoVideo}>
                  <source src={promoVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10 grid md:grid-cols-[1.2fr_0.8fr] gap-10">
            <div>
              <h3 className="text-[16px] font-bold">شرح الواجهات بالتفصيل</h3>
              <ul className="mt-5 space-y-4">
                {[
                  { t: "شاشة تسجيل الدخول وإنشاء حساب", d: "واجهة ترحيبية بشخصية Cody، حقول اسم وإيميل وباسوورد مع تصميم متدرج." },
                  { t: "لوحة التحكم Dashboard", d: "عرض جميع المشاريع، نسب الإنجاز، إحصائيات، وإدارة سريعة." },
                  { t: "قائمة المشاريع المكتملة بنجاح", d: "شبكة مشاريع مع أيقونات Cody، أسماء الصفحات، والانتقال للوحة التحكم." },
                  { t: "عرض المشروع الخاص", d: "صفحة تعرض تفاصيل مشروعك، صفحاته، وميزاته مع إمكانية التعديل." },
                  { t: "إضافة مشروع وميزات جديدة", d: "نماذج إدخال اسم المشروع، الوصف، اللغة، وإضافة Features بسهولة." },
                  { t: "شات ذكاء اصطناعي لكتابة الكود", d: "كتابة صفحة كاملة، جزء محدد من الكود، تعديل الرسائل، وإضافة الكود لمشروع جديد أو قديم." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00] flex-shrink-0" />
                    <div>
                      <div className="text-[13px] font-bold">{item.t}</div>
                      <div className="text-[12px] leading-[1.8] text-white/55 mt-1">{item.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="rounded-[14px] border border-[#FF6A00]/15 bg-[#140804]/80 p-5">
                <div className="text-[11px] tracking-widest text-white/40">WHAT WE OFFER</div>
                <ul className="mt-3 space-y-2">
                  {[
                    "لوحة تحكم لإضافة/تعديل/حذف مشروع",
                    "عرض جميع مشاريعك في مكان واحد",
                    "شات AI متخصص للكود فقط",
                    "مشاريع مفضلة تعمل عليها باستمرار",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] text-white/70"><span className="text-[#FF6A00]">✓</span>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[14px] border border-[#FF6A00]/20 bg-gradient-to-br from-[#1A0A05] to-[#0D0502] p-5">
                <div className="text-[13px] font-bold mb-3">الروابط الرسمية</div>
                <div className="space-y-3">
                  <a href="https://github.com/boshraKurdi/Cody" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-[12px] bg-gradient-to-r from-[#D00000] to-[#FF6A00] shadow-[0_0_22px_rgba(255,106,0,0.35)] hover:brightness-110 transition">
                    <span className="flex items-center gap-2 text-[13px] font-bold"><span className="text-[16px]">↗</span> عرض الكود على GitHub</span>
                    <span className="text-[10px] opacity-80">Cody</span>
                  </a>
                  <a href="https://linda-faraj.github.io/cody-poster" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-[12px] border border-[#FF6A00]/50 bg-[#0D0502]/40 hover:bg-[#FF6A00]/10 transition">
                    <span className="flex items-center gap-2 text-[13px] font-bold"><span>◍</span> عرض البوستر</span>
                    <span className="text-[10px] text-white/50">poster</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MALAZ ===== */}
      {id === "malaz" && (
        <div className="rounded-[16px] border border-[#FF6A00]/20 bg-[#0D0502]/95 overflow-hidden shadow-[0_0_80px_rgba(255,106,0,0.15)]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#D00000]/10 to-transparent" />
            <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 p-8 md:p-10">
              <div>
                <div className="inline-flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#0D0502]/60 border border-[#FF6A00]/30 text-[11px] font-bold">TOURISM</span>
                  <span className="px-3 py-1 rounded-full bg-[#FF6A00] text-[11px] font-bold">+10k تحميل</span>
                </div>
                <h1 className="text-[28px] md:text-[44px] font-[800] leading-[1.1]">ملاذ — دليل الأماكن السياحية</h1>
                <p className="mt-4 text-[14px] md:text-[16px] text-white/60 leading-[1.9]">تطبيق سياحي متكامل لاكتشاف المطاعم، الحدائق، والأماكن السياحية. خرائط تفاعلية، تصنيفات، حجز فوري، وتجربة عربية دافئة وسريعة.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Flutter", "Maps", "UI/UX", "Firebase", "Geolocation"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[12px]">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-[16px] overflow-hidden border border-[#FF6A00]/20 bg-[#150800]/80 shadow-[0_0_30px_rgba(255,106,0,0.2)]">
                <img src={malazImage} alt="Malaz" className="w-full h-[320px] object-cover" />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10">
            <h2 className="text-[18px] font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#FF0000] to-[#FF6A00] inline-block" />
              الفيديو التوضيحي
            </h2>
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              <div className="rounded-[14px] overflow-hidden border border-[#FF6A00]/20 bg-black shadow-[0_0_30px_rgba(255,106,0,0.18)]">
                <div className="px-4 py-2.5 bg-[#0D0502]/80 border-b border-[#FF6A00]/10 flex items-center justify-between">
                  <span className="text-[12px] font-bold">عرض ملاذ — تجربة المستخدم</span>
                  <span className="text-[10px] text-white/40">DEMO 1</span>
                </div>
                <video controls playsInline className="w-full aspect-video object-contain bg-black" poster={malazImage}>
                  <source src={malazepromoVideo} type="video/mp4" />
                </video>
              </div>
              <div className="rounded-[14px] overflow-hidden border border-[#FF6A00]/20 bg-black shadow-[0_0_30px_rgba(255,106,0,0.18)]">
                <div className="px-4 py-2.5 bg-[#0D0502]/80 border-b border-[#FF6A00]/10 flex items-center justify-between">
                  <span className="text-[12px] font-bold">شرح واجهات ملاذ</span>
                  <span className="text-[10px] text-white/40">DEMO 2</span>
                </div>
                <video controls playsInline className="w-full aspect-video object-contain bg-black" poster={malazeVideo}>
                  <source src={malazeVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10 grid md:grid-cols-[1.2fr_0.8fr] gap-10">
            <div>
              <h3 className="text-[16px] font-bold">شرح الواجهات</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "شاشة البحث عن الأماكن — بحث سريع مع اقتراحات ذكية.",
                  "تصنيفات (cafe, restaurant, park) — فلترة بصرية بأيقونات واضحة.",
                  "تفاصيل المكان مع صور، وصف، ساعات العمل، وقائمة الطعام.",
                  "خريطة تفاعلية لتحديد الموقع والاتجاهات.",
                  "تقييمات المستخدمين وتعليقات مع صور فعلية.",
                  "حجز سريع ومشاركة المكان مع الأصدقاء.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 text-[13px] leading-[1.8] text-white/70">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00] flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="rounded-[14px] border border-[#FF6A00]/20 bg-gradient-to-br from-[#1A0A05] to-[#0D0502] p-5">
                <div className="text-[13px] font-bold mb-3">الروابط الرسمية</div>
                <div className="space-y-3">
                  <a href="https://github.com/LINDA-FARAJ/malaze" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-[12px] bg-gradient-to-r from-[#D00000] to-[#FF6A00] shadow-[0_0_22px_rgba(255,106,0,0.35)]">
                    <span className="flex items-center gap-2 text-[13px] font-bold"><span className="text-[16px]">↗</span> عرض الكود على GitHub</span>
                    <span className="text-[10px] opacity-80">malaze</span>
                  </a>
                  <a href="https://github.com/LINDA-FARAJ/malaze" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-[12px] border border-[#FF6A00]/50 bg-[#0D0502]/40 hover:bg-[#FF6A00]/10 transition">
                    <span className="flex items-center gap-2 text-[13px] font-bold"><span>◍</span> عرض البوستر</span>
                    <span className="text-[10px] text-white/50">poster</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== ARABESC ===== */}
      {id === "arabesc" && (
        <div className="rounded-[16px] border border-[#FF6A00]/20 bg-[#0D0502]/95 overflow-hidden shadow-[0_0_80px_rgba(255,106,0,0.15)]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#D00000]/10 to-transparent" />
            <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 p-8 md:p-10">
              <div>
                <div className="inline-flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#0D0502]/60 border border-[#FF6A00]/30 text-[11px] font-bold">RESTAURANT</span>
                  <span className="px-3 py-1 rounded-full bg-[#FF6A00] text-[11px] font-bold">WordPress</span>
                </div>
                <h1 className="text-[28px] md:text-[44px] font-[800] leading-[1.1]">Arabesc Restaurant & Cafe</h1>
                <p className="mt-4 text-[14px] md:text-[16px] text-white/60 leading-[1.9]">موقع WordPress مخصص لـ Arabesc، مطعم سوري في Hachioji، اليابان؛ مصمم ليربط النكهات الشرقية الأصيلة بتجربة رقمية عصرية وسهلة الاستخدام.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["WordPress", "WooCommerce", "Arabic/Japanese", "Online Order"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[12px]">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-[16px] overflow-hidden border border-[#FF6A00]/20 bg-[#150800]/80 shadow-[0_0_30px_rgba(255,106,0,0.2)]">
                <img src={arabescImage} alt="Arabesc" className="w-full h-[320px] object-cover" />
              </div>
            </div>
          </div>
          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10 grid md:grid-cols-[1.2fr_0.8fr] gap-10">
            <div>
              <h3 className="text-[16px] font-bold">مميزات الموقع</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "قائمة طعام ثنائية اللغة (ياباني/إنجليزي) مع صور احترافية.",
                  "نظام طلبات داخلي Store Order مع سلة مشتريات.",
                  "تصميم مستوحى من رمضان والزخرفة العربية الأصيلة.",
                  "متجاوب بالكامل مع دعم اللغة اليابانية RTL.",
                  "تكامل مع WooCommerce لإدارة الطلبات.",
                  "أزرار تواصل سريع وخرائط Google.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 text-[13px] leading-[1.8] text-white/70">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00] flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="rounded-[14px] border border-[#FF6A00]/20 bg-gradient-to-br from-[#1A0A05] to-[#0D0502] p-5">
                <div className="text-[13px] font-bold mb-3">رابط المشروع</div>
                <a href="https://arabesc.jp/en/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-[12px] bg-gradient-to-r from-[#D00000] to-[#FF6A00] shadow-[0_0_22px_rgba(255,106,0,0.35)] hover:brightness-110 transition">
                  <span className="flex items-center gap-2 text-[13px] font-bold">↗ عرض الموقع المباشر</span>
                  <span className="text-[10px] opacity-80">LIVE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== JAPANESE ACADEMY ===== */}
      {id === "japanese-academy" && (
        <div className="rounded-[16px] border border-[#FF6A00]/20 bg-[#0D0502]/95 overflow-hidden shadow-[0_0_80px_rgba(255,106,0,0.15)]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#D00000]/10 to-transparent" />
            <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 p-8 md:p-10">
              <div>
                <div className="inline-flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#0D0502]/60 border border-[#FF6A00]/30 text-[11px] font-bold">EDUCATION</span>
                  <span className="px-3 py-1 rounded-full bg-[#FF6A00] text-[11px] font-bold">React Platform</span>
                </div>
                <h1 className="text-[28px] md:text-[44px] font-[800] leading-[1.1]">Japanese Academy</h1>
                <p className="mt-4 text-[14px] md:text-[16px] text-white/60 leading-[1.9]">منصة تعليمية شاملة لـ Japanese Academy تركز على UI/UX نظيف ومنظم لتحسين تجربة تعلم اللغة أونلاين وتسهيل وصول الطلاب للموارد.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["React", "Zod", "React-Hook-Form", "Animate.css", "Bootstrap", "TypeScript"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[12px]">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-[16px] overflow-hidden border border-[#FF6A00]/20 bg-[#150800]/80 shadow-[0_0_30px_rgba(255,106,0,0.2)]">
                <img src={japaneseAcademyImage} alt="Japanese Academy" className="w-full h-[320px] object-cover" />
              </div>
            </div>
          </div>
          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10 grid md:grid-cols-[1.2fr_0.8fr] gap-10">
            <div>
              <h3 className="text-[16px] font-bold">مميزات المنصة</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "لوحة مواد دراسية ومستويات دراسية منظمة.",
                  "نظام آراء الطلاب والأسئلة الشائعة.",
                  "واجهة عربية بالكامل مع دعم RTL.",
                  "نماذج تسجيل دخول مع React-Hook-Form + Zod Validation.",
                  "أنيميشن ناعم بـ Animate.css لتحسين التجربة.",
                  "تصميم متجاوب Bootstrap مع TypeScript للأمان.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 text-[13px] leading-[1.8] text-white/70">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00] flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="rounded-[14px] border border-[#FF6A00]/20 bg-gradient-to-br from-[#1A0A05] to-[#0D0502] p-5">
                <div className="text-[13px] font-bold mb-3">رابط المشروع</div>
                <a href="https://japaneseacademy.jp/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-[12px] bg-gradient-to-r from-[#D00000] to-[#FF6A00] shadow-[0_0_22px_rgba(255,106,0,0.35)] hover:brightness-110 transition">
                  <span className="flex items-center gap-2 text-[13px] font-bold">↗ عرض الموقع المباشر</span>
                  <span className="text-[10px] opacity-80">LIVE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== SILK ROAD ===== */}
      {id === "silk-road" && (
        <div className="rounded-[16px] border border-[#FF6A00]/20 bg-[#0D0502]/95 overflow-hidden shadow-[0_0_80px_rgba(255,106,0,0.15)]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#D00000]/10 to-transparent" />
            <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 p-8 md:p-10">
              <div>
                <div className="inline-flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#0D0502]/60 border border-[#FF6A00]/30 text-[11px] font-bold">HOTEL BOOKING</span>
                  <span className="px-3 py-1 rounded-full bg-[#FF6A00] text-[11px] font-bold">Laravel • React</span>
                </div>
                <h1 className="text-[28px] md:text-[44px] font-[800] leading-[1.1]">Silk Road Lodge</h1>
                <p className="mt-4 text-[14px] md:text-[16px] text-white/60 leading-[1.9]">منصة حجز فندقي أنيقة في قلب تدمر التاريخي. محتوى متعدد اللغات، تصميم CSS مخصص، وتدفق حجز بديهي يمزج التراث بالضيافة العصرية. (قيد التطوير)</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["React", "i18next", "Tailwind CSS", "Laravel", "React-Query"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[12px]">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-[16px] overflow-hidden border border-[#FF6A00]/20 bg-[#150800]/80 shadow-[0_0_30px_rgba(255,106,0,0.2)]">
                <img src={silkRoadImage} alt="Silk Road Lodge" className="w-full h-[320px] object-cover" />
              </div>
            </div>
          </div>
          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10 grid md:grid-cols-[1.2fr_0.8fr] gap-10">
            <div>
              <h3 className="text-[16px] font-bold">مميزات المنصة</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "نظام حجز غرف متكامل مع تقويم توفر.",
                  "دعم تعدد اللغات i18next (EN/AR).",
                  "تصميم تراثي يعكس روح طريق الحرير في تدمر.",
                  "لوحة تحكم Laravel لإدارة الغرف والحجوزات.",
                  "React-Query لإدارة البيانات وسرعة التحميل.",
                  "تجربة حجز بثلاث خطوات بسيطة وسلسة.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 text-[13px] leading-[1.8] text-white/70">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00] flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="rounded-[14px] border border-[#FF6A00]/20 bg-gradient-to-br from-[#1A0A05] to-[#0D0502] p-5">
                <div className="text-[13px] font-bold mb-3">رابط المشروع</div>
                <a href="https://silkroadlodge.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-[12px] bg-gradient-to-r from-[#D00000] to-[#FF6A00] shadow-[0_0_22px_rgba(255,106,0,0.35)] hover:brightness-110 transition">
                  <span className="flex items-center gap-2 text-[13px] font-bold">↗ عرض الموقع المباشر</span>
                  <span className="text-[10px] opacity-80">LIVE</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== FOR SYRIA SAFETY ===== */}
      {id === "for-syria-safety" && (
        <div className="rounded-[16px] border border-[#FF6A00]/20 bg-[#0D0502]/95 overflow-hidden shadow-[0_0_80px_rgba(255,106,0,0.15)]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6A00]/20 via-[#D00000]/10 to-transparent" />
            <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 p-8 md:p-10">
              <div>
                <div className="inline-flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#0D0502]/60 border border-[#FF6A00]/30 text-[11px] font-bold">HUMANITARIAN</span>
                  <span className="px-3 py-1 rounded-full bg-[#FF6A00] text-[11px] font-bold">React • Laravel</span>
                </div>
                <h1 className="text-[28px] md:text-[44px] font-[800] leading-[1.1]">For Syria Safety</h1>
                <p className="mt-4 text-[14px] md:text-[16px] text-white/60 leading-[1.9]">منصة إنسانية تهدف لمساعدة السوريين عبر رفع الوعي وكشف الألغام والقنابل غير المنفجرة. تبليغ، تتبع، وموارد تعليمية لسلامة المجتمع.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["React", "Laravel", "Redux Toolkit", "TypeScript"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[12px]">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-[16px] overflow-hidden border border-[#FF6A00]/20 bg-[#150800]/80 shadow-[0_0_30px_rgba(255,106,0,0.2)]">
                <img src={forSyriaSafetyImage} alt="For Syria Safety" className="w-full h-[320px] object-cover" />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 border-t border-[#FF6A00]/10">
            <h2 className="text-[18px] font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#FF0000] to-[#FF6A00] inline-block" /> الفيديو التوضيحي
            </h2>
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              <div className="rounded-[14px] overflow-hidden border border-[#FF6A00]/20 bg-black shadow-[0_0_30px_rgba(255,106,0,0.18)]">
                <div className="px-4 py-2.5 bg-[#0D0502]/80 border-b border-[#FF6A00]/10 flex items-center justify-between">
                  <span className="text-[12px] font-bold">عرض المنصة — فيديو توضيحي</span>
                  <span className="text-[10px] text-white/40">DEMO</span>
                </div>
                <iframe className="w-full aspect-video bg-black" src="https://www.youtube.com/embed/izCklNw_P4I" title="For Syria Safety Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className="rounded-[14px] border border-[#FF6A00]/15 bg-[#140804]/80 p-5 flex flex-col justify-center">
                <div className="text-[11px] tracking-widest text-white/40">KEY FEATURES</div>
                <ul className="mt-3 space-y-2">
                  {[
                    "تبليغ عن ألغام مشبوهة مع موقع GPS وصور.",
                    "تتبع فرق الإزالة وحالة المناطق.",
                    "موارد تعليمية لسلامة الأطفال والمجتمع.",
                    "لوحة تحكم للمسؤولين والمتطوعين.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] text-white/70"><span className="text-[#FF6A00]">✓</span>{t}</li>
                  ))}
                </ul>
                <div className="mt-6 space-y-3">
                  <a href="https://github.com/SaraAlsukary/for-syria-" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-[12px] bg-gradient-to-r from-[#D00000] to-[#FF6A00] shadow-[0_0_22px_rgba(255,106,0,0.35)] hover:brightness-110 transition">
                    <span className="flex items-center gap-2 text-[13px] font-bold">↗ عرض الكود على GitHub</span>
                    <span className="text-[10px] opacity-80">for-syria</span>
                  </a>
                  <a href="https://youtu.be/izCklNw_P4I?si=L29W9PrPnFxevCGAsafety" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-[12px] border border-[#FF6A00]/50 bg-[#0D0502]/40 hover:bg-[#FF6A00]/10 transition">
                    <span className="flex items-center gap-2 text-[13px] font-bold">◍ مشاهدة على يوتيوب</span>
                    <span className="text-[10px] text-white/50">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [flameWidth, setFlameWidth] = useState(140);
  const [flicker, setFlicker] = useState(0);
  const [activeSection, setActiveSection] = useState("main");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo === "works") {
      setTimeout(() => {
        document.getElementById("works")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // تنظيف state حتى لا يعيد الـ scroll عند refresh
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const flickerInt = setInterval(() => setFlicker(Math.random()), 120);
    const flameInt = setInterval(() => setFlameWidth(130 + Math.random() * 30), 80);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(flickerInt);
      clearInterval(flameInt);
    };
  }, []);

  // Prevent body scroll when modal open

  useEffect(() => {
    const sections = [
      "main",
      "about",
      "services",
      "production",
      "why",
      "works",
      "packages",
      "contact",
    ];

    const handleActiveSection = () => {
      const triggerPoint = window.innerHeight * 0.35;

      let currentSection = "main";

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= triggerPoint) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleActiveSection, {
      passive: true,
    });

    handleActiveSection();

    return () => {
      window.removeEventListener("scroll", handleActiveSection);
    };
  }, []);
  return (
    <div dir="rtl" lang="ar" className="relative min-h-screen bg-[#0D0502] text-white overflow-x-hidden selection:bg-[#FF6A00]/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap');
        *{font-family:'Cairo','Tajawal',system-ui,sans-serif}
        @keyframes floatLogo { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        @keyframes flickerGlow { 0%{opacity:0.85;filter:blur(0px)} 50%{opacity:1;filter:blur(0.6px)} 100%{opacity:0.9} }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes flameFlow {
          0% { transform: translateY(-100%) translateX(-50%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(200%) translateX(-50%); opacity: 0; }
        }
        @keyframes windowFlicker { 0%,100%{opacity:0.95} 50%{opacity:0.45} 70%{opacity:1} }
        .glow-red { text-shadow: 0 0 15px rgba(208,0,0,0.9), 0 0 44px rgba(255,106,0,0.6), 0 0 70px rgba(255,106,0,0.28); }
        .glow-orange { box-shadow: 0 0 20px rgba(255,106,0,0.7), 0 0 60px rgba(208,0,0,0.35); }
        /* Scrollbar for modal */
        ::-webkit-scrollbar { width: 1px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #FF6A00; border-radius: 10px; }
        ::-webkit-scrollbar-track { background: #0D0502; }
        @keyframes mobileMenuIn {
  0% {
    opacity: 0;
    transform: translateY(-12px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes mobileItemIn {
  0% {
    opacity: 0;
    transform: translateX(18px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
      `}</style>

      {/* ===== Fixed continuous background ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#0D0502]">
        {/* CENTRAL FLAME WATERFALL - REALISTIC FROM SEGESTA FIXED */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 z-[5] pointer-events-none"
          style={{
            width: `${flameWidth * 0.7}px`,
            height: '100vh',
            background: `linear-gradient(180deg, transparent 0%, #FFD700 12%, #FF9A00 24%, #FF6A00 42%, #8B0000 68%, #FF6A00 88%, #FFD700 100%)`,
            boxShadow: `0 0 ${flameWidth * 0.3}px rgba(255,106,0,0.9), 0 0 ${flameWidth * 0.6}px rgba(255,215,0,0.5), inset 0 0 20px rgba(253, 181, 181, 0.83)`,
            opacity: 0.60,
            filter: 'blur(0.2px)',
            transition: 'width 0.08s linear',
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 w-[28%] h-[45%] bg-[#FF0000] rounded-full blur-[2px]" style={{ top: '-10%', animation: 'flameFlow 1.2s linear infinite', boxShadow: '0 0 20px white, 0 0 40px #FFD700' }} />
            <div className="absolute left-1/2 w-[12%] h-[35%] bg-[#FF0000] rounded-full blur-[1px]" style={{ top: '-10%', animation: 'flameFlow 1.8s linear infinite 0.4s', opacity: 0.2 }} />
          </div>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="absolute rounded-full" style={{ left: `${15 + Math.random() * 70}%`, bottom: `${(i * 7) % 90}%`, width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, background: i % 2 === 0 ? '#FFD700' : '#FF8C00', boxShadow: `0 0 6px ${i % 2 === 0 ? '#FFD700' : '#FF6A00'}`, transform: `translateY(${-scrollY * (0.3 + (i % 4) * 0.15)}px)`, opacity: 0.9 }} />
          ))}
        </div>

        {/* Global ember particles - 28 */}
        {Array.from({ length: 28 }).map((_, i) => {
          const x = (i * 37) % 100;
          const speed = 0.22 + (i % 5) * 0.09;
          const top = (i * 97 + scrollY * speed) % 1200 - 100;
          return (
            <div
              key={`ember-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${x}vw`,
                top: `${top}px`,
                width: `${1 + (i % 3)}px`,
                height: `${1 + (i % 3)}px`,
                background: i % 2 === 0 ? "#FF6A00" : "#FFD700",
                opacity: 0.65,
                boxShadow: i % 3 === 0 ? "0 0 6px #FF6A00" : "none",
              }}
            />
          );
        })}
      </div>


      {/* ===== RESPONSIVE NAVBAR ===== */}

      <nav
        className="
    fixed
    top-3
    left-3
    right-3
    z-[100]
    min-h-16
    px-4
    md:px-6
    lg:px-8
    flex
    items-center
    justify-between
    rounded-2xl
    border
    border-[#FF6A00]/20
   bg-[#080808]
    shadow-[0_8px_35px_rgba(208,0,0,0.35),0_0_25px_rgba(255,60,0,0.12)]
    transition-all
    duration-500
  "
      >
        {/* =====================================================
    LOGO
===================================================== */}

        <a
          href="#main"
          onClick={() => {
            setActiveSection("main");
            setMobileMenuOpen(false);
          }}
          className="
    relative
    group
    flex
    items-center
    justify-center
    shrink-0
    outline-none
    cursor-pointer
  "
          aria-label="الرئيسية"
        >
          <span
            className="
      absolute
      w-16
      h-16
      rounded-full
      bg-[#FF6A00]/20
      blur-2xl
      transition-all
      duration-500
      pointer-events-none
      opacity-0
      group-hover:opacity-100
    "
          />

          <img
            src={phoenixLogo}
            alt="W Phoenix"
            className="
      relative
      z-10
      h-9
      md:h-11
      w-auto
      object-contain
      transition-all
      duration-500
      drop-shadow-[0_0_0px_rgba(255,106,0,0)]
      group-hover:drop-shadow-[0_0_18px_rgba(255,106,0,0.9)]
      group-hover:scale-105
    "
          />
        </a>


        {/* =====================================================
    MOBILE MENU BUTTON
===================================================== */}

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="
    lg:hidden
    relative
    flex
    items-center
    justify-center
    w-10
    h-10
    rounded-xl
    border
    border-[#FF6A00]/30
    bg-[#0D0502]/70
    text-[#FFB347]
    shadow-[0_0_15px_rgba(255,106,0,0.15)]
    transition-all
    duration-300
    hover:border-[#FF6A00]
    hover:bg-[#FF6A00]/10
    hover:shadow-[0_0_20px_rgba(255,106,0,0.35)]
  "
          aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className="
      text-[24px]
      leading-none
      transition-all
      duration-300
    "
          >
            {mobileMenuOpen ? "×" : "☰"}
          </span>
        </button>


        {/* =====================================================
    DESKTOP NAVIGATION
    تظهر فقط من lg وما فوق
===================================================== */}

        <div className="hidden lg:flex items-center gap-1">
          {[
            { href: "#main", label: "الرئيسية" },
            { href: "#about", label: "ما يميزنا" },
            { href: "#services", label: "خدماتنا" },
            { href: "#production", label: "مراحل الإنتاج" },
            { href: "#why", label: "من نحن" },
            { href: "#works", label: "مشاريعنا" },
            { href: "#packages", label: "باقاتنا" },
            { href: "#contact", label: "تواصل معنا" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveSection(link.href.replace("#", ""));
              }}
              className={`
        relative
        group
        px-3
        py-2
        text-sm
        md:text-base
        transition-all
        duration-500
        ${activeSection === link.href.replace("#", "")
                  ? "text-[#FFB347]"
                  : "text-white/80"
                }
      `}
            >
              {/* Glow behind text */}
              <span
                className="
          absolute
          inset-0
          rounded-full
          bg-[#FF6A00]/30
          blur-xl
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          pointer-events-none
        "
              />

              <span
                className="
          absolute
          inset-0
          rounded-full
          bg-[#FF6A00]/15
          blur-2xl
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          pointer-events-none
        "
              />

              {/* Text */}
              <span
                className={`
          relative
          z-10
          transition-all
          duration-500
          group-hover:text-[#FFB347]
          ${activeSection === link.href.replace("#", "")
                    ? "text-[#FFB347] [text-shadow:0_0_8px_rgba(255,106,0,0.9),0_0_18px_rgba(255,106,0,0.55)]"
                    : ""
                  }
        `}
              >
                {link.label}
              </span>

              {/* Underline */}
              <span
                className={`
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          h-[2px]
          rounded-full
          bg-gradient-to-r
          from-[#FF6A00]
          to-[#FFD700]
          shadow-[0_0_8px_#FF6A00]
          transition-all
          duration-500
          ease-out
          ${activeSection === link.href.replace("#", "")
                    ? "w-[60%]"
                    : "w-0 group-hover:w-[60%]"
                  }
        `}
              />
            </a>
          ))}
        </div>
        {/* =====================================================
      DESKTOP CONSULTATION BUTTON
      ===================================================== */}
        <a
          href="#contact"
          className="
      hidden
      lg:flex
      relative
      group
      items-center
      justify-center
      min-h-[44px]
      px-6
      md:px-7
      py-3
      rounded-full
      text-sm
      md:text-base
      font-bold
      text-white
      bg-gradient-to-r
      from-[#D00000]
      via-[#FF3D00]
      to-[#FF6A00]
      border
      border-[#FF6A00]/50
      shadow-[0_5px_20px_rgba(208,0,0,0.35)]
      transition-all
      duration-500
      hover:scale-105
      hover:shadow-[0_0_30px_rgba(255,60,0,0.75),0_8px_25px_rgba(208,0,0,0.5)]
    "
        >
          {/* Button glow */}
          <span
            className="
        absolute
        inset-0
        rounded-full
        bg-[#FF6A00]/50
        blur-xl
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-500
        -z-10
      "
          />

          <span className="relative z-10 whitespace-nowrap">
            استشارة مجانية
          </span>
        </a>


        {/* =====================================================
      MOBILE DROPDOWN MENU
      تظهر فقط على الشاشات الأصغر من lg
  ===================================================== */}
        {mobileMenuOpen && (
          <>
            {/* خلفية شفافة خلف القائمة */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="
          fixed
          inset-0
          top-[84px]
          z-[-1]
          bg-black/30
        "
            />

            {/* القائمة */}
            <div
              className="
          lg:hidden
          absolute
          top-[calc(100%+10px)]
          left-0
          right-0
          overflow-hidden
          rounded-2xl
          border
          border-[#FF6A00]/25
          bg-[#080808]/97
          backdrop-blur-2xl
          shadow-[0_20px_60px_rgba(0,0,0,0.75),0_0_35px_rgba(255,60,0,0.18)]
          animate-[mobileMenuIn_0.3s_ease-out]
        "
            >

              {/* Glow أعلى القائمة */}
              <div
                className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[220px]
            h-[80px]
            bg-[#FF6A00]/10
            blur-3xl
            pointer-events-none
          "
              />

              {/* خط علوي */}
              <div
                className="
            absolute
            top-0
            left-[15%]
            right-[15%]
            h-[1px]
            bg-gradient-to-r
            from-transparent
            via-[#FF6A00]
            to-transparent
            shadow-[0_0_12px_#FF6A00]
          "
              />

              <div className="relative p-3">

                {/* عنوان صغير */}
                <div className="px-4 pt-2 pb-3 text-right">
                  <div className="text-[9px] tracking-[0.3em] text-[#FF6A00]/70">
                    W PHOENIX
                  </div>

                  <div className="mt-1 text-[12px] text-white/40">
                    من الفكرة إلى التحليق 🔥
                  </div>
                </div>


                {/* الروابط */}
                {[
                  { href: "#main", label: "الرئيسية" },
                  { href: "#about", label: "ما يميزنا" },
                  { href: "#services", label: "خدماتنا" },
                  { href: "#production", label: "مراحل الإنتاج" },
                  { href: "#why", label: "من نحن" },
                  { href: "#works", label: "مشاريعنا" },
                  { href: "#packages", label: "باقاتنا" },
                  { href: "#contact", label: "تواصل معنا" },
                ].map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                group
                relative
                flex
                items-center
                justify-between
                w-full
                px-4
                py-3
                mb-1
                rounded-xl
                text-[13px]
                md:text-[14px]
                text-white/75
                transition-all
                duration-300
                hover:bg-[#FF6A00]/10
                hover:text-[#FFB347]
              "
                    style={{
                      animation: `mobileItemIn 0.3s ease-out ${index * 45}ms both`,
                    }}
                  >

                    {/* خط برتقالي عند Hover */}
                    <span
                      className="
                  absolute
                  right-0
                  top-1/2
                  -translate-y-1/2
                  w-[2px]
                  h-0
                  rounded-full
                  bg-gradient-to-b
                  from-[#FF6A00]
                  to-[#FFD700]
                  shadow-[0_0_12px_#FF6A00]
                  group-hover:h-7
                  transition-all
                  duration-300
                "
                    />

                    {/* النص */}
                    <span className="relative z-10">
                      {link.label}
                    </span>

                    {/* السهم */}
                    <span
                      className="
                  text-[#FF6A00]/50
                  group-hover:text-[#FFB347]
                  group-hover:-translate-x-1
                  transition-all
                  duration-300
                  text-[14px]
                "
                    >
                      ←
                    </span>
                  </a>
                ))}


                {/* فاصل */}
                <div
                  className="
              my-3
              h-[1px]
              bg-gradient-to-r
              from-transparent
              via-[#FF6A00]/20
              to-transparent
            "
                />


                {/* زر الاستشارة داخل القائمة */}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
              relative
              flex
              items-center
              justify-center
              w-full
              px-5
              py-3
              rounded-xl
              font-bold
              text-[13px]
              text-white
              bg-gradient-to-r
              from-[#D00000]
              via-[#FF3D00]
              to-[#FF6A00]
              border
              border-[#FF6A00]/40
              shadow-[0_5px_25px_rgba(208,0,0,0.35)]
              hover:shadow-[0_0_30px_rgba(255,60,0,0.65)]
              hover:scale-[1.01]
              transition-all
              duration-300
            "
                >
                  <span>
                    استشارة مجانية 🔥
                  </span>
                </a>

              </div>

              {/* خط سفلي */}
              <div
                className="
            h-[2px]
            w-full
            bg-gradient-to-r
            from-transparent
            via-[#FF6A00]/50
            to-transparent
          "
              />
            </div>
          </>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="main" className="relative z-20 w-full overflow-hidden  pt-[72px]">
        {/* Parallax mountains */}
        <div
          className="absolute top-[0px] left-0 right-0 h-[320px] pointer-events-none opacity-50"
          style={{ transform: `translateY(${scrollY * 0.18}px)` }}
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 320 L0 200 L280 60 L540 190 L760 30 L1080 170 L1260 90 L1440 210 L1440 320 Z" fill="#FF6A00" fillOpacity="0.18" />
            <path d="M0 320 L0 240 L200 120 L480 220 L700 90 L1000 210 L1440 160 L1440 320 Z" fill="#D00000" fillOpacity="0.12" />
          </svg>
        </div>

        {/* Isometric buildings with flickering windows */}
        <div className="absolute top-[190px] left-0 right-0 h-[520px] pointer-events-none hidden md:flex" style={{ transform: `translateY(${scrollY * 0.09}px)` }}>
          <div className="flex-1 flex items-end gap-[3px] pr-[190px] pl-4">
            {[130, 190, 150, 210, 170].map((h, i) => (
              <div key={`l-${i}`} className="flex-1 border border-[#FF6A00]/20 bg-gradient-to-b from-[#2A0A00]/90 to-[#1A0500]/95 relative overflow-hidden" style={{ height: h + 60 }}>
                <div className="grid grid-cols-3 gap-[7px] p-[12px]">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-[12px] bg-black/40 relative"
                      style={{
                        background: idx % 2 === 0 ? `rgba(255,215,0,${0.55 + Math.sin(flicker * 10 + i + idx) * 0.25})` : "rgba(0,0,0,0.45)",
                        boxShadow: idx % 2 === 0 ? "0 0 8px rgba(255,106,0,0.8)" : "none",
                        animation: idx % 2 === 0 ? "windowFlicker 1.2s infinite" : "none",
                        animationDelay: `${idx * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-[380px] shrink-0" />
          <div className="flex-1 flex items-end gap-[3px] pl-[190px] pr-4">
            {[170, 210, 150, 190, 130].map((h, i) => (
              <div key={`r-${i}`} className="flex-1 border border-[#FF6A00]/20 bg-gradient-to-b from-[#2A0A00]/90 to-[#1A0500]/95 relative overflow-hidden" style={{ height: h + 60 }}>
                <div className="grid grid-cols-3 gap-[7px] p-[12px]">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="h-[12px] bg-black/40"
                      style={{
                        background: (idx + i) % 3 === 0 ? `rgba(255,215,0,${0.6})` : "rgba(0,0,0,0.45)",
                        boxShadow: (idx + i) % 3 === 0 ? "0 0 8px rgba(255,106,0,0.7)" : "none",
                        animation: (idx + i) % 3 === 0 ? "windowFlicker 1s infinite" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero center */}
        <div className="relative min-h-[860px] flex flex-col items-center justify-center px-6 pt-10 pb-24" style={{ transform: `translateY(${scrollY * -0.12}px)` }}>
          <div className="relative" style={{ animation: "floatLogo 4s ease-in-out infinite" }}>
            <img src={phoenixLogo} alt="W Phoenix Transparent Logo" className="w-[280px] md:w-[400px] h-auto object-contain drop-shadow-[0_0_50px_rgba(255,106,0,0.7)] drop-shadow-[0_0_90px_rgba(208,0,0,0.35)]" />
            <div className="absolute inset-0 blur-[40px] -z-10 bg-gradient-to-b from-[#FFD700]/10 via-[#FF6A00]/15 to-transparent rounded-full" />
          </div>

          <FadeIn delay={150}>
            <h1 className="mt-10 text-center text-[30px] md:text-[42px] font-black leading-[1.15] tracking-tight glow-red max-w-[780px]">
              نحول أفكارك إلى تطبيقات تنبض بالحياة
            </h1>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="mt-5 text-center text-[13.5px] md:text-[15px] leading-[1.9] text-white/70 max-w-[640px]">
              نحن <span className="text-[#FFB347] font-bold">Weloze Phoenix</span> — نبعث أفكارك من الرماد. مثل طائر الفينيق، نأخذ فكرتك الخام ونصهرها في لهب الكود، لنطلقها تطبيقًا سريعًا، جميلًا، لا يموت.
              <br />
              <span className="text-[#FFB347]/80 text-[12.5px]">من الفكرة إلى الإطلاق، معك خطوة بخطوة — بدون تعقيد </span>
            </p>
          </FadeIn>

          <FadeIn delay={450} className="mt-8 flex flex-col md:flex-row items-center gap-4">
            <div className="flex gap-3">
              <button onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })} className="h-[46px] px-7 rounded-[2px] bg-gradient-to-l from-[#D00000] to-[#FF6A00] text-[13px] font-bold tracking-wide glow-orange hover:brightness-110 transition flex items-center gap-2">
                ابدأ مشروعك الآن <span className="text-[16px]">🔥</span>
              </button>
              <button onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })} className="h-[46px] px-7 rounded-[2px] border border-[#FF6A00]/50 bg-[#0D0502]/40 text-[13px] font-semibold tracking-wide hover:bg-[#FF6A00]/10 hover:border-[#FF6A00] transition">
                شاهد أعمالنا
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={600}>
            <div className="mt-10 flex items-center justify-center gap-2 text-[11px] tracking-[0.16em] text-white/45 text-center">
              <span className="w-[34px] h-[1px] bg-[#FF6A00]/60 shrink-0" />
              <span>فريق عمل قوي جاهز 24 ساعه • 4 سنوات خبرة للنهوض من الرماد </span>
              <span className="w-[34px] h-[1px] bg-[#FF6A00]/60 shrink-0" />
            </div>
          </FadeIn>

          <FadeIn delay={800} className="mt-14">
            {/* Lava river with shimmer */}
            <div className="w-[320px] md:w-[360px] h-[12px] rounded-full bg-gradient-to-r from-[#D00000] via-[#FF6A00] to-[#FFD700] shadow-[0_0_28px_rgba(255,106,0,0.8),0_0_60px_rgba(255,215,0,0.35)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-[40%] blur-[2px]" style={{ animation: "shimmer 2s linear infinite" }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="relative z-20 bg-[#0D0502]/92 border-y border-[#FF6A00]/10 px-6 md:px-[80px] py-[88px] md:py-[120px]">
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-start">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-[40px] h-[2px] bg-[#FF6A00]" />
              <span className="text-[#FF6A00] text-[18px]">🔥</span>
            </div>
            <h2 className="text-[30px] md:text-[42px] font-extrabold leading-[1.1]">لديك فكرة<br />مركونة على الرف او لديك تطبيق قديم وغير مواكب للتقنيات الحديثة؟</h2>
            <div className="mt-8 space-y-6 text-[14px] leading-[1.9] text-white/65">
              <p>كثيرٌ من رواد الأعمال لديهم فكرة قوية… لكنها تموت قبل أن تولد. مطور يختفي، تصميم معقد، تكلفة فلكية، وتطبيق بطيء لا يعمل</p>
              <p className="text-white/85 font-semibold">اتينا لنكسر الحلقة.</p>
              <div className="pt-4 grid grid-cols-1 gap-4">
                {[
                  { t: "قبل الفينيق", d: "فكرة محبوسة، مطورين يختفون، تكلفة عالية، لا يوجد إطلاق للموقع." },
                  { t: "بعد الفينيق", d: "فكرة تتحول لتطبيق حي، إطلاق سريع، متابعة يومية، نمو مستمر." },
                ].map((item) => (
                  <div key={item.t} className="flex gap-4 p-4 rounded-[6px] border border-[#FF6A00]/15 bg-[#150800]/70 hover:border-[#FF6A00]/40 hover:bg-[#1F0B00]/80 hover:-translate-y-[1px] hover:shadow-[0_8px_25px_rgba(255,106,0,0.12)] transition-all duration-300">
                    <div className="w-[36px] h-[36px] shrink-0 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#D00000] flex items-center justify-center text-[14px]">{item.t.includes("قبل") ? "🌑" : "🔥"}</div>
                    <div>
                      <div className="font-bold text-white text-[13px] mb-1">{item.t}</div>
                      <div className="text-[12.5px] leading-[1.7]">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="h-[42px] px-6 rounded-[2px] bg-gradient-to-l from-[#D00000] to-[#FF6A00] text-[12px] font-bold glow-orange">احجز استشارتك المجانية الآن →</button>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="relative h-[460px] md:h-[520px] border border-[#FF6A00]/25 bg-gradient-to-b from-[#2A0A00] to-[#0D0502] overflow-hidden rounded-[8px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,106,0,0.15),transparent_70%)]" />
              <div className="relative p-6 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] tracking-[0.2em] text-[#FF6A00]">W PHOENIX • PROCESS</div>
                  <div className="w-2 h-2 rounded-full bg-[#FF0000] shadow-[0_0_10px_#FF0000]" style={{ opacity: 0.6 + flicker * 0.4 }} />
                </div>
                <div className="space-y-4">
                  {["اكتشاف الفكرة", "صهر التصميم", "تحليل النظام ", "إيقاد نار الكود", "الإطلاق الكامل للمشروع"].map((s, idx) => (
                    <div key={s} className="flex items-center gap-4">
                      <div className="w-[36px] h-[36px] rounded-full bg-[#FF6A00]/20 border border-[#FF6A00]/30 flex items-center justify-center text-[12px] font-bold text-[#FFB347]">{idx + 1}</div>
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-[#FF6A00]/60 to-transparent" />
                      <div className="text-[12px] text-white/70">{s}</div>
                    </div>
                  ))}
                </div>
                <div className="h-[4px] w-full bg-gradient-to-r from-[#D00000] via-[#FF6A00] to-[#FFD700] rounded-full" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="relative z-20 bg-[#150800]/92 px-6 md:px-[80px] py-[96px] md:py-[120px] border-b border-[#FF6A00]/10">
        <div className="max-w-[1180px] mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-[40px] h-[2px] bg-[#FF6A00]" />
              <span className="text-[11px] tracking-[0.25em] text-[#FFB347]"> الانطلاقة الكاملة: </span>
            </div>
            <h2 className="text-[30px] md:text-[44px] font-extrabold leading-[1.1]">ماذا نصنع لك؟<br /><span className="text-white/60 text-[22px] md:text-[26px] font-bold">أربع أفكار، وصولاً  لهوية بصرية كاملة واحدة لا تموت.</span></h2>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "📱", title: "تطبيق موبايل احترافي تفاعلي", desc: "تطبيق واحد يعمل على iOS و Android بسرعة البرق. 60fps، أداء ناري، وتجربة لا تُنسى.", tags: ["flutter", "iOS + Android", "أداء 60fps"] },
              { icon: "🌐", title: "مواقع تحول الزائر لعميل", desc: "موقع سريع، SEO جاهز، وتصميم يباع قبل أن تتكلم. من صفحة هبوط إلى متجر متكامل.", tags: ["Next.js", "SEO", "React.js", "laravel"] },
              { icon: "🎨", title: "تصميم UI/UX يحرق المنافسين", desc: "تصميم يفهم المستخدم قبل أن يضغط. ألوان متناسقة، حركة سلسة.", tags: ["Figma"] },
              { icon: "🧠", title: "أنظمة ذكية تنمو معك", desc: "لوحة تحكم، API ,ذكاء اصطناعي، وربط مع كل شيء. نظام يكبر معك ، بتطوير مستمر.", tags: ["API", "AI Ready"] },
            ].map((s, i) => (
              <FadeIn key={s.title} delay={i * 120}>
                <div className="group h-full min-h-[300px] p-6 rounded-[8px] border border-[#FF6A00]/20 bg-gradient-to-b from-[#1F0B00]/80 to-[#0D0502]/90 hover:border-[#FF6A00]/45 hover:from-[#2A0A00]/90 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,106,0,0.18)]">
                  <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[#FF6A00] to-[#D00000] flex items-center justify-center text-[20px] shadow-[0_0_18px_rgba(255,106,0,0.5)]">{s.icon}</div>
                  <h3 className="mt-5 text-[16px] font-bold leading-[1.3]">{s.title}</h3>
                  <p className="mt-3 text-[12.5px] leading-[1.8] text-white/60">{s.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[10px] border border-[#FF6A00]/20 bg-[#FF6A00]/10 text-[#FFB347]">{t}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* ===== HOW WE WORK ===== */}
      <section id="production" className="relative z-20 bg-[#0D0502]/92 px-6 md:px-[80px] py-[96px] md:py-[120px]">
        <div className="max-w-[1180px] mx-auto">
          <FadeIn>
            <h2 className="text-[26px] md:text-[34px] font-extrabold text-center">كيف نحول فكرتك لطائر فينيق؟</h2>
            <p className="mt-3 text-center text-[12.5px] text-white/55">4 مراحل، كل مرحلة ولادة جديدة — من الرماد إلى التحليق.</p>
          </FadeIn>
          <div className="relative mt-16">
            <div className="hidden md:block absolute top-[36px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#D00000] via-[#FF6A00] to-[#FFD700] opacity-40" />
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { n: "01", t: "الاكتشاف", d: "نجلس معك، نفهم فكرتك، نحلل السوق، ونرسم خارطة الفينيق. 3 أيام ونعرف بالضبط ماذا سنبني.", time: "7 أيام" },
                { n: "02", t: "التصميم الناري", d: "نصمم واجهات تنبض بالحياة، بروتوتايب تفاعلي، واختبار مع مستخدمين حقيقيين.", time: "10 أيام" },
                { n: "03", t: "الصهر والبناء", d: "كود نظيف، سريع، قابل للتوسع. تحديث يومي، ومعاينة حية كل 48 ساعة.", time: "2-1 أشهر" },
                { n: "04", t: "الإطلاق والتحليق", d: "نطلق، ندرب فريقك، نراقب الأداء، ونضمن أن طائرك لا يسقط أبداً.", time: "إطلاق" },
              ].map((step, i) => (
                <FadeIn key={step.n} delay={i * 150} className="relative text-center group">
                  <div className="mx-auto w-[72px] h-[72px] rounded-full bg-[#150800] border-2 border-[#FF6A00]/40 flex items-center justify-center font-black text-[18px] text-[#FFB347] shadow-[0_0_24px_rgba(255,106,0,0.25)] relative z-10 group-hover:border-[#FF6A00] group-hover:bg-[#FF6A00]/10 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(255,106,0,0.4)] transition-all duration-300">
                    {step.n}
                    <div className="absolute inset-[-6px] rounded-full border border-[#FFD700]/20" style={{ animation: "floatLogo 3s ease-in-out infinite" }} />
                  </div>
                  <h3 className="mt-5 font-bold text-[15px]">{step.t}</h3>
                  <p className="mt-2 text-[12px] leading-[1.8] text-white/60 px-2">{step.d}</p>
                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/20 text-[10px] text-[#FFB347]">{step.time}</div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY PHOENIX ===== */}
      <section id="why" className="relative z-20 bg-[#150800]/88 px-6 md:px-[80px] py-[96px] md:py-[110px] border-y border-[#FF6A00]/10">
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <FadeIn>
            <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] mx-auto">
              <div className="absolute inset-0 rounded-full border border-[#FF6A00]/20 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.14),transparent_70%)]" />
              <div className="absolute inset-[44px] rounded-full border border-[#D00000]/30 flex items-center justify-center">
                <div className="text-[90px] opacity-20">♾</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={phoenixLogo} alt="logo" className="w-[120px] opacity-60" />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <h2 className="text-[28px] md:text-[40px] font-extrabold leading-[1.15]">لماذا تختار الفينيق؟<br /><span className="text-[#FFB347] text-[18px] md:text-[20px]">لأننا لا نبني تطبيقات… نحن نبعثها.</span></h2>
            <div className="mt-8 space-y-6">
              {[
                { title: "نهضنا من الرماد بأنفسنا 🔥", desc: "4 سنوات، +العديد من المشاريع، فشلنا، احترقنا، ونهضنا. كل سطر كود مر بصهر النار." },
                { title: "شفافية كنار واضحة", desc: "تحديث يومي، معاينة حية، لا اختفاء. تعرف أين وصل مشروعك في كل لحظة." },
                { title: "سرعة الفينيق، لا بسرعة سلحفاة", desc: "إطلاق أول نسخة خلال 3 أسابيع. لا شهور انتظار. نطير، لا نزحف." },
              ].map((b) => (
                <div key={b.title} className="flex gap-3">
                  <div className="mt-1 w-[28px] h-[28px] shrink-0 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#D00000] flex items-center justify-center text-[12px]">🔥</div>
                  <div>
                    <div className="font-bold text-[14px]">{b.title}</div>
                    <div className="mt-1 text-[12.5px] leading-[1.7] text-white/60">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== PROJECTS SECTION - REPLACES TESTIMONIAL ===== */}
      {/* ===== WORKS - SWIPER ===== */}
      <section
        id="works"
        className="relative z-20 bg-[#0D0502]/92 px-6 md:px-16 py-24 md:py-32 overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto flex flex-col items-center">

          {/* TITLE */}
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#FF6A00]/20 bg-[#FF6A00]/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />

              <span className="text-[10px] md:text-[11px] tracking-[0.2em] text-[#FFB347]">
                OUR LEGACY
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold">
              مشاريع صنعتها النار
            </h2>
          </FadeIn>

          {/* SWIPER */}
          <div className="relative mt-14 w-full">

            <Swiper
              modules={[
                EffectCoverflow,
                Navigation,
                Pagination,
                Autoplay
              ]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView="auto"
              spaceBetween={20}

              speed={850}

              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 180,
                modifier: 1.15,
                slideShadows: false,
              }}

              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                waitForTransition: true,
              }}

              navigation={{
                nextEl: ".w-next",
                prevEl: ".w-prev",
              }}

              pagination={{
                clickable: true,
                el: ".w-dots",
              }}

              className="w-full !pb-10"
            >

              {projects.map((p) => (
                <SwiperSlide
                  key={p.id}
                  className="!w-[300px] md:!w-[350px] !h-auto"
                >

                  {/* CARD */}
                  <div
                    onClick={() => navigate(`/project/${p.id}`)}
                    className="
                group
                relative
                w-[300px]
                h-[500px]
                md:w-[350px]
                md:h-[520px]

                rounded-[22px]

                bg-[#121212]/95
                backdrop-blur-xl

                border
                border-white/[0.08]

                overflow-hidden

                flex
                flex-col

                cursor-pointer

                transition-all
                duration-700
                ease-[cubic-bezier(0.16,1,0.3,1)]

                hover:border-[#FF6A00]/50

                hover:shadow[
                  0_25px_70px_rgba(0,0,0,0.7),
                  0_0_40px_rgba(255,106,0,0.22)
                ]
              "
                  >

                    {/* IMAGE */}
                    <div className="relative w-full h-[230px] md:h-[255px] overflow-hidden bg-[#080808] shrink-0">

                      <img
                        src={p.image}
                        alt={p.title}
                        className="
                    w-full
                    h-full
                    object-cover

                    group-hover:scale-[1.07]

                    transition-transform
                    duration-[1000ms]
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                  "
                      />

                      {/* DARK GRADIENT */}
                      <div className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#0D0502]
                  via-black/10
                  to-transparent
                " />

                      {/* CATEGORY */}
                      <div className="
                  absolute
                  top-4
                  left-4

                  px-3
                  py-1.5

                  rounded-full

                  bg-black/65
                  backdrop-blur-md

                  border
                  border-white/10

                  text-[10px]
                  text-[#FFB347]
                ">
                        {p.tag}
                      </div>

                      {/* CENTER INDICATOR */}
                      <div className="
                  absolute
                  bottom-4
                  right-4

                  px-3
                  py-1.5

                  rounded-full

                  bg-[#FF6A00]/90

                  text-[10px]
                  font-semibold
                  text-white

                  opacity-0
                  translate-y-2

                  group-hover:opacity-100
                  group-hover:translate-y-0

                  transition-all
                  duration-500
                ">
                        اضغط للتفاصيل ←
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 md:p-6 flex flex-col flex-1">

                      <h3 className="
                  text-[17px]
                  md:text-[18px]
                  font-bold
                  leading-tight
                  text-white
                ">
                        {p.title}
                      </h3>

                      <p className="
                  mt-3
                  text-[12px]
                  md:text-[12.5px]
                  leading-[1.8]
                  text-white/50
                  line-clamp-3
                ">
                        {p.desc}
                      </p>

                      {/* TECH */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.tech.map((t: string) => (
                          <span
                            key={t}
                            className="
                        px-2.5
                        py-1
                        rounded-full

                        text-[9px]

                        border
                        border-white/10

                        bg-white/[0.05]

                        text-white/60

                        transition-colors
                        duration-300

                        group-hover:border-[#FF6A00]/20
                        group-hover:text-[#FFB347]
                      "
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* FOOTER */}
                      <div className="
                  mt-auto
                  pt-5
                  border-t
                  border-white/[0.06]

                  flex
                  items-center
                  justify-between
                ">

                        <span className="
                    text-[10px]
                    text-white/30
                  ">
                          {p.meta}
                        </span>

                        <span className="
                    w-9
                    h-9
                    rounded-full

                    bg-[#FF6A00]

                    flex
                    items-center
                    justify-center

                    text-white

                    group-hover:scale-110
                    group-hover:shadow-[0_0_20px_rgba(255,106,0,0.45)]

                    transition-all
                    duration-500
                  ">
                          →
                        </span>

                      </div>
                    </div>

                  </div>

                </SwiperSlide>
              ))}

            </Swiper>


{/* CONTROLS */}
<div
  className="
    relative
    mt-6
    w-full
    h-10
    flex
    items-center
    justify-center
  "
>
  {/* مجموعة التحكم كاملة في المنتصف */}
  <div
    className="
      flex
      items-center
      justify-center
      gap-5
    "
  >

    {/* PREVIOUS */}
    <button
      type="button"
      className="
        w-prev
        w-10
        h-10
        shrink-0

        rounded-full

        bg-white/[0.05]
        border
        border-white/10

        flex
        items-center
        justify-center

        text-white/50
        text-base

        hover:bg-[#FF6A00]/15
        hover:border-[#FF6A00]/40
        hover:text-[#FF6A00]

        transition-all
        duration-300
      "
    >
      →
    </button>

    {/* PAGINATION */}
    <div
      className="
        w-dots
        flex
        items-center
        justify-center
        gap-2
        shrink-0
      "
    />

    {/* NEXT */}
    <button
      type="button"
      className="
        w-next
        w-10
        h-10
        shrink-0

        rounded-full

        bg-white/[0.05]
        border
        border-white/10

        flex
        items-center
        justify-center

        text-white/50
        text-base

        hover:bg-[#FF6A00]/15
        hover:border-[#FF6A00]/40
        hover:text-[#FF6A00]

        transition-all
        duration-300
      "
    >
      ←
    </button>

  </div>
</div>





    

          </div>
        </div>

        {/* SWIPER EFFECT */}
        <style>{`

    /* كل بطاقة */
    #works .swiper-slide {
      opacity: 0.35;
      transform: scale(0.82);
      filter: blur(1px);

      transition:
        transform 850ms cubic-bezier(0.16, 1, 0.3, 1),
        opacity 700ms ease,
        filter 700ms ease;
    }

    /* البطاقات القريبة من الوسط */
    #works .swiper-slide-prev,
    #works .swiper-slide-next {
      opacity: 0.62;
      transform: scale(0.88);
      filter: blur(0.4px);
    }

    /* البطاقة المركزية */
    #works .swiper-slide-active {
      opacity: 1;
      transform: scale(1);
      filter: blur(0);

      z-index: 5;
    }

    /* Glow للبطاقة المركزية */
    #works .swiper-slide-active > div {
      border-color: rgba(255,106,0,0.42);

      box-shadow:
        0 25px 70px rgba(0,0,0,0.65),
        0 0 45px rgba(255,106,0,0.12);

      transition:
        border-color 700ms ease,
        box-shadow 700ms ease;
    }

    /* عند الانتقال للبطاقة الجديدة */
    #works .swiper-slide-active img {
      transform: scale(1.02);

      transition:
        transform 900ms cubic-bezier(0.16,1,0.3,1);
    }

    /* النقاط */
    #works .w-dots .swiper-pagination-bullet {
      width: 6px;
      height: 6px;

      margin: 0 3px !important;

      background: rgba(255,255,255,0.2);

      opacity: 1;

      border-radius: 999px;

      transition:
        width 400ms ease,
        background 300ms ease,
        box-shadow 300ms ease;
    }

    #works .w-dots .swiper-pagination-bullet-active {
      width: 22px;

      background: #FF6A00;

      box-shadow:
        0 0 12px rgba(255,106,0,0.55);
    }

    /* إخفاء Scrollbar */
    #works .swiper {
      overflow: visible;
    }

    /* الموبايل */
    @media (max-width: 768px) {

      #works .swiper-slide-prev,
      #works .swiper-slide-next {
        opacity: 0.35;
        transform: scale(0.82);
      }

      #works .swiper-slide-active {
        transform: scale(1);
      }

    }

  `}</style>
      </section>
      {/* ===== PACKAGES ===== */}
      <section id="packages" className="relative z-20 bg-[#150800]/92 px-6 md:px-[80px] py-[96px] md:py-[120px] border-y border-[#FF6A00]/10">
        <div className="max-w-[1180px] mx-auto">
          <FadeIn>
            <h2 className="text-center text-[28px] md:text-[36px] font-extrabold">اختر قوة فينيقك</h2>
            <p className="mt-2 text-center text-[12.5px] text-white/55">كل باقة مصممة لمرحلة مختلفة من رحلتك — من الشرارة الأولى إلى التحليق العالي.</p>
          </FadeIn>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "الانطلاقة المتكاملة", price: "يبدأ من 1500$  ", popular: true, feats: ["تطبيق Flutter كامل", "تصميم UI/UX احترافي", "لوحة تحكم", "إطلاق متاجر", "دعم 3 أشهر"], cta: "الأكثر طلباً" },
              { name: "Reborn — إعادة الإحياء", price: "يبدأ 1300$", popular: false, feats: ["إعادة بناء تطبيق قديم", "تحسين أداء 3x", "تصميم جديد", "إصلاح أخطاء", "دعم شهرين"], cta: "أعد إحياء تطبيقك" },
              { name: "Content — نظام المحتوى", price: "يبدأ من 2500$ ", popular: false, feats: ["موقع / متجر", "نظام إدارة محتوى", "SEO", "تحليلات", "دعم شهر"], cta: "انطلق بموقعك" },
              { name: "التدقيق المجاني", price: "مجاناً", popular: false, feats: ["تدقيق تطبيقك الحالي", "تقرير أداء مفصل", "خطة تحسين", "استشارة 30 دقيقة", "بدون التزام"], cta: "احصل على التدقيق", free: true },
            ].map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 100}>
                <div className={`relative h-full rounded-[10px] border p-6 flex flex-col ${pkg.popular ? "border-[#FF6A00] bg-gradient-to-b from-[#2A0A00]/95 to-[#1A0500]/90 shadow-[0_0_30px_rgba(255,106,0,0.22)] scale-[1.02]" : (pkg as any).free ? "border-[#FFD700]/30 bg-[#0D0502]/80" : "border-[#FF6A00]/15 bg-[#0D0502]/70"} `}>
                  {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#D00000] text-[10px] font-bold">الأكثر طلباً 🔥</div>}
                  <h3 className="font-bold text-[14px]">{pkg.name}</h3>
                  <div className="mt-2 text-[13px] font-black text-[#FFB347]">{pkg.price}</div>
                  <div className="mt-5 space-y-2.5">
                    {pkg.feats.map((f) => (
                      <div key={f} className="flex gap-2 text-[11.5px] text-white/65"><span className="text-[#FF6A00]">✓</span>{f}</div>
                    ))}
                  </div>
                  <button className={`mt-7 h-[40px] rounded-[4px] text-[12px] font-bold transition ${pkg.popular ? "bg-gradient-to-l from-[#D00000] to-[#FF6A00] glow-orange" : (pkg as any).free ? "border border-[#FFD700]/40 hover:bg-[#FFD700]/10" : "border border-[#FF6A00]/30 hover:bg-[#FF6A00]/10"}`}>{pkg.cta}</button>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300} className="mt-10 text-center text-[11px] text-white/40">كل الباقات تشمل: كود نظيف قابل للتوسع • تحديث يومي • ضمان استرداد 14 يوم إذا لم نبدأ</FadeIn>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="contact" className="relative z-20">
        <div className="relative bg-gradient-to-b from-[#0D0502] via-[#8B2500] to-[#FF6A00] px-6 md:px-[80px] py-[92px] md:py-[120px] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[180px] bg-[#0D0502] rounded-b-[50%] md:rounded-b-[300px]" />
          <div className="relative max-w-[760px] mx-auto text-center">
            <FadeIn>
              <div className="mx-auto w-[96px] h-[96px] rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF6A00] shadow-[0_0_50px_rgba(255,106,0,0.8),0_0_90px_rgba(255,215,0,0.3)] flex items-center justify-center" style={{ animation: "floatLogo 4s ease-in-out infinite" }}>
                <img src={phoenixLogo} alt="phoenix" className="w-[56px] h-auto brightness-110" />
              </div>
              <h2 className="mt-8 text-[30px] md:text-[42px] font-black leading-[1.1] text-white">جاهز تبعث فكرتك<br />من الرماد؟</h2>
              <p className="mt-4 text-[13.5px] leading-[1.8] text-white/80 max-w-[520px] mx-auto">لا تخلي فكرتك تموت على الرف. احجز استشارتك المجانية الآن، وخلال 48 ساعة نرجع لك بخطة إطلاق كاملة — بدون التزام، بدون لف ودوران.</p>
              <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
                <a
                  href="https://www.instagram.com/w_phoenix2026?utm_source=qr&igsi=czIwMWJoa2Q2cng2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[48px] px-8 rounded-[4px] bg-[#0D0502] text-white font-bold text-[13px] border border-white/10 hover:bg-black transition shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex items-center justify-center"
                >
                  ابدأ مشروعك الآن 🔥 — استشارة مجانية
                </a>

                <a
                  href="https://wa.me/qr/2JYYDILTC5PWI1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[48px] px-8 rounded-[4px] bg-white/10 backdrop-blur border border-white/20 text-white font-semibold text-[13px] hover:bg-white/15 transition flex items-center justify-center"
                >
                  واتساب مباشر
                </a>
              </div>
              <div className="mt-6 text-[11px] text-white/60">⏱ نرد خلال ساعتين • 🔒 سرية تامة لفكرتك • 🚀 إطلاق أول نسخة خلال 3 أسابيع</div>
            </FadeIn>
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="absolute text-white/30 text-[14px]" style={{ left: `${(i * 22 + scrollY * 0.08) % 100}vw`, top: `${90 + i * 36}px`, transform: `scale(${0.8 + i * 0.15})` }}>🪽</div>
          ))}
        </div>
      </section>



      {/* ===== FOOTER ===== */}
      <footer className="relative z-20 bg-[#0D0502] border-t border-[#FF6A00]/10 px-6 md:px-[80px] py-[56px]">
        <div className="max-w-[1180px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <img src={phoenixLogo} alt="W Phoenix Transparent Footer Logo" className="h-[36px] w-auto object-contain opacity-90 drop-shadow-[0_0_14px_rgba(255,106,0,0.45)]" />
            <div className="h-[28px] w-[1px] bg-[#FF6A00]/20 hidden md:block" />
            <div className="text-[11px] leading-[1.6] text-white/45">
              <div className="font-bold tracking-[0.2em] text-white/70">W PHOENIX • WELOZE</div>
              <div>نحول الرماد إلى تحليق. تطبيقات تنبض بالحياة.</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-[11px] text-white/55">
            <a href="#" className="hover:text-[#FFB347] transition">سياسة الخصوصية</a>
            <a href="#" className="hover:text-[#FFB347] transition">شروط الخدمة</a>
            <a href="mailto:weloze.pheonix@gamil.com" className="hover:text-[#FFB347] transition">weloze.pheonix@gamil.com</a>
          </div>
          <div className="text-[10px] tracking-[0.18em] text-white/25">© 2026 W PHOENIX • Projects Cody + Malaz</div>
        </div>
      </footer>
    </div>
  );

}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weloze-pheonix/" element={<Home />} />

        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/weloze-pheonix/project/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
