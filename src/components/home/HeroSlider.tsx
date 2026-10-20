"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GraduationCap, ArrowRight, BookOpen, Sparkles } from "lucide-react";

const slides = [
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
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] overflow-hidden bg-school-navy text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Image with Dark Navy Gradient Overlay */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center scale-105 transition-transform duration-10000"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-school-navy-deep/95 via-school-navy/85 to-school-navy/60" />
            <div className="absolute inset-0 bg-school-navy-deep/40 mix-blend-multiply" />
          </div>

          {/* Slide Content */}
          <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center space-x-2 bg-school-gold/20 border border-school-gold/40 text-school-gold px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm animate-in fade-in duration-500">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {slide.title}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-school-gold">
                {slide.subtitle}
              </p>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                {slide.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={slide.primaryCta.href}
                  className="px-6 py-3.5 rounded-lg bg-school-gold text-school-navy-deep font-bold text-sm sm:text-base shadow-lg hover:bg-school-gold-warm hover:shadow-xl transition-all flex items-center space-x-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>{slide.primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href={slide.secondaryCta.href}
                  className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/30 backdrop-blur-sm transition-all flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4 text-school-gold" />
                  <span>{slide.secondaryCta.text}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Left/Right Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-school-gold hover:text-school-navy text-white transition-all backdrop-blur-sm border border-white/20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-school-gold hover:text-school-navy text-white transition-all backdrop-blur-sm border border-white/20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === current ? "w-8 bg-school-gold" : "w-2.5 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
