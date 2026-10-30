"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Sparkles,
  Play,
  Pause,
  Compass,
} from "lucide-react";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  badge: string;
  tagline: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Welcome to Lahore Elite School",
    subtitle: "Nurturing Academic Brilliance & Ethical Leadership",
    description:
      "A premier educational institution in Lahore dedicated to fostering intellectual curiosity, moral values, and academic excellence across Al-Nisa and Sabzazar Campuses.",
    image: "/images/hero/slider-campus-gate.jpg",
    primaryCta: { text: "Apply for Admission", href: "/admission/admission-process" },
    secondaryCta: { text: "Explore Our School", href: "/about" },
    badge: "Admissions Open 2025-26",
    tagline: "Multan Road, Lahore • Al-Nisa & Sabzazar Campuses",
  },
  {
    id: 2,
    title: "Building Bright Futures Through Quality Education",
    subtitle: "From Playgroup to Matriculation Excellence",
    description:
      "Modern classrooms, well-equipped science and computer laboratories, dedicated educators, and holistic student development programs tailored for lifelong success.",
    image: "/images/hero/slider-classroom.jpg",
    primaryCta: { text: "Explore Programs", href: "/programs/pre-school" },
    secondaryCta: { text: "Fee Structure", href: "/admission/fee-structure" },
    badge: "Comprehensive Curriculum",
    tagline: "STEM • English Mastery • Moral Leadership",
  },
  {
    id: 3,
    title: "Learning, Leadership and Discipline",
    subtitle: "Shaping the Innovators of Tomorrow",
    description:
      "Instilling character, confidence, and critical thinking skills within a secure, supportive, and stimulating learning environment on Multan Road, Lahore.",
    image: "/images/hero/slider-award-ceremony.jpg",
    primaryCta: { text: "View Campus Life", href: "/gallery" },
    secondaryCta: { text: "Contact Campuses", href: "/contact" },
    badge: "Student Achievements",
    tagline: "State-of-the-Art Facilities • Qualified Faculty",
  },
];

const AUTOPLAY_INTERVAL = 6500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Touch Swipe coordinates
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Slide transition handlers
  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // 3D Parallax Mouse Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Touch handlers for mobile / tablet swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Calculate 3D transforms based on mouse coordinates
  const tiltX = isHovering ? mousePos.y * -10 : 0;
  const tiltY = isHovering ? mousePos.x * 12 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[580px] sm:h-[640px] md:h-[680px] lg:h-[730px] overflow-hidden bg-school-navy text-white perspective-1200 select-none"
    >
      {/* 3D Spatial Stage */}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out transform-style-3d"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === current;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform-style-3d ${
                isActive
                  ? "opacity-100 scale-100 z-10 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-z-20 z-0 pointer-events-none"
              }`}
            >
              {/* Background Imagery with 3D Depth */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className={`object-cover object-center transition-transform duration-7000 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  priority={index === 0}
                />

                {/* 2026 Apple / Samsung Cinematic Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-school-navy-deep/95 via-school-navy/80 to-school-navy-deep/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-school-navy-deep via-transparent to-school-navy-deep/50" />

                {/* Specular Ambient Glow Spot */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    background: isHovering
                      ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255, 208, 47, 0.16), transparent 50%)`
                      : "radial-gradient(circle at 30% 40%, rgba(255, 208, 47, 0.12), transparent 60%)",
                  }}
                />
              </div>

              {/* Foreground Content with Parallax Elevation */}
              <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center z-10">
                <div
                  className="max-w-2xl sm:max-w-3xl space-y-5 sm:space-y-6 pt-6 sm:pt-0 transition-transform duration-700 ease-out"
                  style={{
                    transform: isHovering
                      ? `translateZ(45px) translateX(${mousePos.x * -16}px) translateY(${mousePos.y * -16}px)`
                      : "translateZ(0px)",
                  }}
                >
                  {/* Glowing 3D Glass Badge */}
                  <div className="inline-flex items-center space-x-2.5 bg-white/10 backdrop-blur-xl border border-school-gold/40 text-school-gold px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,208,47,0.25)]">
                    <span className="w-2 h-2 rounded-full bg-school-gold animate-ping" />
                    <Sparkles className="w-3.5 h-3.5 text-school-gold" />
                    <span>{slide.badge}</span>
                    <span className="text-white/40 hidden sm:inline">•</span>
                    <span className="text-slate-300 font-normal lowercase tracking-normal hidden sm:inline">
                      {slide.tagline}
                    </span>
                  </div>

                  {/* Main Cinematic Title */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Subtitle with Warm Gold Accent */}
                  <p className="text-base sm:text-xl lg:text-2xl font-bold text-school-gold tracking-tight drop-shadow">
                    {slide.subtitle}
                  </p>

                  {/* Description Paragraph */}
                  <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-xl sm:max-w-2xl font-normal drop-shadow-sm">
                    {slide.description}
                  </p>

                  {/* 3D Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3">
                    <Link
                      href={slide.primaryCta.href}
                      className="btn-shimmer px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-school-gold to-school-gold-warm text-school-navy-deep font-extrabold text-sm sm:text-base shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2.5 group"
                    >
                      <GraduationCap className="w-5 h-5 text-school-navy-deep group-hover:rotate-12 transition-transform" />
                      <span>{slide.primaryCta.text}</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={slide.secondaryCta.href}
                      className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl glass-surface-dark text-white font-bold text-sm sm:text-base hover:bg-school-navy/90 hover:border-school-gold transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 border border-white/20 shadow-lg"
                    >
                      <BookOpen className="w-4 h-4 text-school-gold" />
                      <span>{slide.secondaryCta.text}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating 3D Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/10 hover:bg-school-gold hover:text-school-navy text-white transition-all backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 group"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/10 hover:bg-school-gold hover:text-school-navy text-white transition-all backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 group"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Apple-Style Bottom Floating Control Dock */}
      <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 max-w-[92vw] sm:max-w-none">
        <div className="flex items-center space-x-3 sm:space-x-4 px-4 sm:px-5 py-2.5 rounded-full bg-school-navy-deep/85 backdrop-blur-2xl border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
          {/* Slide Indicator Number */}
          <span className="font-mono text-[11px] sm:text-xs font-black tracking-wider text-school-gold shrink-0">
            0{current + 1} <span className="text-white/40">/</span> 0{slides.length}
          </span>

          <div className="w-px h-4 bg-white/20 shrink-0" />

          {/* Interactive Segmented Timeline Progress */}
          <div className="flex items-center space-x-2">
            {slides.map((slide, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrent(idx)}
                  className="group relative py-1 focus:outline-none"
                  aria-label={`Jump to slide ${idx + 1}`}
                >
                  <div
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 overflow-hidden ${
                      isActive ? "w-10 sm:w-16 bg-white/20" : "w-4 sm:w-6 bg-white/30 hover:bg-white/50"
                    }`}
                  >
                    {isActive && (
                      <div
                        key={`bar-${current}-${isPaused}`}
                        className="h-full bg-gradient-to-r from-school-gold to-school-gold-warm rounded-full"
                        style={{
                          animation: isPaused
                            ? "none"
                            : `shimmer ${AUTOPLAY_INTERVAL}ms linear forwards`,
                          width: "100%",
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="w-px h-4 bg-white/20 shrink-0" />

          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-1 rounded-full text-slate-300 hover:text-school-gold transition-colors shrink-0"
            title={isPaused ? "Play Autoplay" : "Pause Autoplay"}
            aria-label={isPaused ? "Play Autoplay" : "Pause Autoplay"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
