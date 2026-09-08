import React, { useEffect, useState, useRef } from "react";
import phoenixLogo from "./assets/w_phoenix_transparent.png";
import codyImage from "./assets/cody.jpg";
import malazImage from "./assets/malaz.jpg";
import promoVideo from "./assets/cody-promo.mp4";
import codyVideo from "./assets/cody.mp4";
import malazepromoVideo from "./assets/malaze promo.mp4";
import malazeVideo from "./assets/malaz.mp4";

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

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [flameWidth, setFlameWidth] = useState(140);
  const [flicker, setFlicker] = useState(0);
  const [selectedProject, setSelectedProject] = useState<null | "cody" | "malaz">(null);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const flickerInt = setInterval(() => setFlicker(Math.random()), 120);
    const flameInt = setInterval(() => {
      setFlameWidth(130 + Math.random() * 30);
    }, 80);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(flickerInt);
      clearInterval(flameInt);
    };
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

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
            <div key={i} className="absolute rounded-full" style={{ left: `${15 + Math.random() * 70}%`, bottom: `${(i * 7) % 90}%`, width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, background: i % 2 === 0? '#FFD700' : '#FF8C00', boxShadow: `0 0 6px ${i % 2 === 0? '#FFD700' : '#FF6A00'}`, transform: `translateY(${-scrollY * (0.3 + (i % 4) * 0.15)}px)`, opacity: 0.9 }} />
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
      في الهاتف: الضغط على الشعار يفتح القائمة
      في الكمبيوتر: الشعار يرجع إلى Home
  ===================================================== */}
  <button
    type="button"
    onClick={() => {
      if (window.innerWidth < 1024) {
        setMobileMenuOpen((prev) => !prev);
      } else {
        window.location.hash = "home";
      }
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
    aria-label="فتح قائمة التنقل"
    aria-expanded={mobileMenuOpen}
  >
    {/* Logo glow */}
    <span
      className={`
        absolute
        w-16
        h-16
        rounded-full
        bg-[#FF6A00]/20
        blur-2xl
        transition-all
        duration-500
        pointer-events-none
        ${
          mobileMenuOpen
            ? "opacity-100 scale-125"
            : "opacity-0 group-hover:opacity-100"
        }
      `}
    />

    <img
      src={phoenixLogo}
      alt="W Phoenix"
      className={`
        relative
        z-10
        h-9
        md:h-11
        w-auto
        object-contain
        transition-all
        duration-500
        ${
          mobileMenuOpen
            ? "scale-110 drop-shadow-[0_0_18px_rgba(255,106,0,0.9)]"
            : "drop-shadow-[0_0_0px_rgba(255,106,0,0)] group-hover:drop-shadow-[0_0_18px_rgba(255,106,0,0.9)] group-hover:scale-105"
        }
      `}
    />

    {/* Mobile menu indicator */}
    <span
      className={`
        lg:hidden
        absolute
        -bottom-1
        -right-1
        z-20
        flex
        items-center
        justify-center
        w-5
        h-5
        rounded-full
        bg-[#0D0502]
        border
        border-[#FF6A00]/50
        shadow-[0_0_12px_rgba(255,106,0,0.45)]
        transition-all
        duration-300
        ${mobileMenuOpen ? "rotate-180" : "rotate-0"}
      `}
    >
      <span className="text-[11px] text-[#FFB347]">
        {mobileMenuOpen ? "×" : "⌄"}
      </span>
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
        className="
          relative
          group
          px-3
          py-2
          text-sm
          md:text-base
          text-white/80
          transition-all
          duration-500
          hover:text-white
        "
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
          className="
            relative
            z-10
            transition-all
            duration-500
            group-hover:text-[#FFB347]
            group-hover:[text-shadow:0_0_8px_rgba(255,106,0,0.9),0_0_18px_rgba(255,106,0,0.55)]
          "
        >
          {link.label}
        </span>

        {/* Underline */}
        <span
          className="
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            w-0
            h-[2px]
            rounded-full
            bg-gradient-to-r
            from-[#FF6A00]
            to-[#FFD700]
            shadow-[0_0_8px_#FF6A00]
            group-hover:w-[60%]
            transition-all
            duration-500
            ease-out
          "
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
            <div className="mt-10 flex items-center gap-2 text-[11px] tracking-[0.16em] text-white/45">
              <span className="w-[34px] h-[1px] bg-[#FF6A00]/60" />فريق عمل قوي جاهز 24 ساعه • 4 سنوات خبرةللنهوض من الرماد
              <span className="w-[34px] h-[1px] bg-[#FF6A00]/60" />
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
              <p>كثيرٌ من رواد الأعمال عندهم فكرة قوية… لكنها تموت قبل أن تولد. مطور يختفي، تصميم معقد، تكلفة فلكية، وتطبيق بطيء لا يعمل</p>
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
                  {["اكتشاف الفكرة", "صهر التصميم","تحليل النظام ", "إيقاد نار الكود", "الإطلاق الكامل للمشروع"].map((s, idx) => (
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
              { icon: "📱", title: "تفاعلي Flutter تطبيق", desc: "تطبيق واحد يعمل على iOS و Android بسرعة البرق. 60fps، أداء ناري، وتجربة لا تُنسى.", tags: ["iOS + Android", "أداء 60fps"] },
              { icon: "🌐", title: "مواقع تحول الزائر لعميل", desc: "موقع سريع، SEO جاهز، وتصميم يباع قبل أن تتكلم. من صفحة هبوط إلى متجر متكامل.", tags: ["Next.js", "SEO","React.js","laravel","asp.net"] },
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
      <section id="works" className="relative z-20 bg-[#0D0502]/92 px-6 md:px-[80px] py-[96px] md:py-[120px]">
        <div className="max-w-[1180px] mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-[40px] h-[2px] bg-[#FF6A00]" />
              <span className="text-[11px] tracking-[0.25em] text-[#FFB347]">OUR LEGACY • صُنع في النار</span>
            </div>
            <h2 className="text-[30px] md:text-[44px] font-extrabold leading-[1.1]">مشاريع صنعتها النار</h2>
            <p className="mt-3 text-[13px] md:text-[14px] leading-[1.8] text-white/55">من الرماد إلى التطبيق • مشاريع حقيقية نهضت مع الفينيق </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cody Card */}
            <FadeIn delay={120}>
              <div 
                onClick={() => setSelectedProject("cody")}
                className="group h-full rounded-[12px] border border-[#FF6A00]/20 bg-gradient-to-b from-[#1F0B00]/90 to-[#0D0502]/90 overflow-hidden hover:border-[#FF6A00]/50 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(255,106,0,0.28)] transition-all duration-500 cursor-pointer"
              >
                <div className="relative h-[256px] overflow-hidden border-b border-[#FF6A00]/10 bg-black">
                  <img src={codyImage} alt="Cody - المساعد الذكي" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0502] via-[#0D0502]/10 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D0502]/70 backdrop-blur border border-[#FF6A00]/20 text-[10px] text-[#FFB347]">AI • Flutter</div>
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D00000] to-[#FF6A00] text-[11px] font-bold shadow-[0_0_20px_rgba(255,106,0,0.5)]">اضغط للتفاصيل ←</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[16px] leading-[1.3]">Cody - المساعد الذكي</h3>
                  <p className="mt-3 text-[12.5px] leading-[1.8] text-white/60">
                    تطبيق ذكاء اصطناعي بشخصية روبوت لطيف، يساعد المستخدمين بذكاء وتفاعل. واجهة عصرية، ردود فورية، وتجربة لا تُنسى. مبني بـ Flutter مع تكامل AI متقدم وتصميم محبب.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Flutter", "AI", "UI/UX"].map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[10px] border border-[#FF6A00]/20 bg-[#FF6A00]/10 text-[#FFB347]">{t}</span>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#FF6A00]/10 flex items-center justify-between">
                    <span className="text-[11px] text-white/50 tracking-wide">تم الإطلاق في 21 يوم • +5k مستخدم</span>
                    <span className="text-[11px] text-[#FF6A00] group-hover:translate-x-[-2px] transition-transform">→</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Malaz Card */}
            <FadeIn delay={240}>
              <div 
                onClick={() => setSelectedProject("malaz")}
                className="group h-full rounded-[12px] border border-[#FF6A00]/20 bg-gradient-to-b from-[#1F0B00]/90 to-[#0D0502]/90 overflow-hidden hover:border-[#FF6A00]/50 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(255,106,0,0.28)] transition-all duration-500 cursor-pointer"
              >
                <div className="relative h-[256px] overflow-hidden border-b border-[#FF6A00]/10 bg-black">
                  <img src={malazImage} alt="ملاذ - دليل الأماكن" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0502] via-[#0D0502]/10 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D0502]/70 backdrop-blur border border-[#FF6A00]/20 text-[10px] text-[#FFB347]">Maps • حجز</div>
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D00000] to-[#FF6A00] text-[11px] font-bold shadow-[0_0_20px_rgba(255,106,0,0.5)]">اضغط للتفاصيل ←</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[16px] leading-[1.3]">ملاذ - دليل الأماكن</h3>
                  <p className="mt-3 text-[12.5px] leading-[1.8] text-white/60">
                    تطبيق سياحي متكامل لاكتشاف المطاعم، الحدائق، والمعالم. خرائط تفاعلية، حجز فوري، وتجربة مستخدم سلسة. تصميم عصري بألوان هادئة وتجربة تنقل مذهلة.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Flutter", "Maps", "حجز"].map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[10px] border border-[#FF6A00]/20 bg-[#FF6A00]/10 text-[#FFB347]">{t}</span>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#FF6A00]/10 flex items-center justify-between">
                    <span className="text-[11px] text-white/50 tracking-wide">+10k تحميل • 4.8 ⭐</span>
                    <span className="text-[11px] text-[#FF6A00] group-hover:translate-x-[-2px] transition-transform">→</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={360} className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-[#FF6A00]/15 bg-[#150800]/60 text-[11px] text-white/55">
              <span className="w-2 h-2 rounded-full bg-[#FF6A00] shadow-[0_0_8px_#FF6A00]" />
              مشاريع حية على المتاجر • كود نظيف • تصميم يبيع
              <span className="w-2 h-2 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700]" />
            </div>
          </FadeIn>
        </div>
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


      {/* ===== PROJECT DETAILS MODAL - FULL PRESERVED DESIGN ===== */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#0D0502]/95 backdrop-blur-[8px]">
          <div className="min-h-screen px-4 md:px-8 py-8">
            <div className="max-w-[1100px] mx-auto">
              <button onClick={() => setSelectedProject(null)} className="mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#FF6A00]/30 bg-[#0D0502]/80 hover:bg-[#FF6A00]/10 transition text-[13px] font-bold cursor-pointer">
                <span>←</span> العودة للمشاريع
              </button>

              {selectedProject === "cody" && (
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
                    <h2 className="text-[18px] font-bold flex items-center gap-2"><span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#FF0000] to-[#FF6A00] inline-block" /> الفيديوهات التوضيحية</h2>
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
                          ].map((t,i) => (
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

              {selectedProject === "malaz" && (
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
  <h2 className="text- font-bold flex items-center gap-2">
    <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#FF0000] to-[#FF6A00] inline-block" />
    الفيديو التوضيحي
  </h2>

  {/* نفس العرض تماماً - grid-cols-2 */}
  <div className="mt-6 grid md:grid-cols-2 gap-5">

    {/* الفيديو 1 */}
    <div className="rounded- overflow-hidden border border-[#FF6A00]/20 bg-black shadow-[0_0_30px_rgba(255,106,0,0.18)]">
      <div className="px-4 py-2.5 bg-[#0D0502]/80 border-b border-[#FF6A00]/10 flex items-center justify-between">
        <span className="text- font-bold">عرض ملاذ — تجربة المستخدم</span>
        <span className="text- text-white/40">DEMO 1</span>
      </div>
      <video controls playsInline className="w-full aspect-video object-contain bg-black" poster={malazImage}>
        <source src={malazepromoVideo} type="video/mp4" />
      </video>
    </div>

    {/* الفيديو 2 - نفس العرض */}
    <div className="rounded- overflow-hidden border border-[#FF6A00]/20 bg-black shadow-[0_0_30px_rgba(255,106,0,0.18)]">
      <div className="px-4 py-2.5 bg-[#0D0502]/80 border-b border-[#FF6A00]/10 flex items-center justify-between">
        <span className="text- font-bold">شرح واجهات ملاذ</span>
        <span className="text- text-white/40">DEMO 2</span>
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
                        ].map((t,i) => (
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

              <div className="mt-8 flex justify-center">
                <button onClick={() => setSelectedProject(null)} className="px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition text-[13px] cursor-pointer">إغلاق التفاصيل</button>
              </div>
              <div className="h-[40px]" />
            </div>
          </div>
        </div>
      )}

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
