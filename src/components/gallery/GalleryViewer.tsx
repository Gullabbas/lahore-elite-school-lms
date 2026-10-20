"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  eventDate?: string;
}

const defaultPhotos: GalleryPhoto[] = [
  {
    id: "1",
    title: "Annual Award Ceremony 2025",
    description: "Honoring academic board toppers, debating champions, and student council members.",
    category: "Awards",
    imageUrl: "/images/gallery/award-ceremony.png",
    eventDate: "March 2025",
  },
  {
    id: "2",
    title: "Interactive Classroom Learning",
    description: "Students engaged in collaborative group assignments and multimedia discussions.",
    category: "Classroom",
    imageUrl: "/images/gallery/Lahore Elite School Reffference Images (1).jpeg",
    eventDate: "September 2025",
  },
  {
    id: "3",
    title: "Sports Day & Physical Education",
    description: "Relay races, football tournaments, and athletic drills on campus ground.",
    category: "Sports",
    imageUrl: "/images/gallery/Lahore Elite School Reffference Images (2).jpeg",
    eventDate: "October 2025",
  },
  {
    id: "4",
    title: "Junior Campus Activity Center",
    description: "Creative play, arts and crafts, and sensory motor activities for junior grades.",
    category: "Activities",
    imageUrl: "/images/gallery/Lahore Elite School Reffference Images (3).jpeg",
    eventDate: "August 2025",
  },
  {
    id: "5",
    title: "Science & Robotics Exhibition",
    description: "Models and experimental demonstrations presented by high school science students.",
    category: "Classroom",
    imageUrl: "/images/gallery/Lahore Elite School Reffference Images (4).jpeg",
    eventDate: "November 2025",
  },
  {
    id: "6",
    title: "Primary Section Reading Corner",
    description: "Fostering early reading habits through engaging bilingual storybooks and phonics.",
    category: "Classroom",
    imageUrl: "/images/gallery/Lahore Elite School Reffference Images (5).jpeg",
    eventDate: "May 2025",
  },
  {
    id: "7",
    title: "Parent-Teacher Engagement Conference",
    description: "Quarterly review sessions discussing student holistic progress and examination readiness.",
    category: "Events",
    imageUrl: "/images/gallery/Lahore Elite School Reffference Images (6).jpeg",
    eventDate: "October 2025",
  },
  {
    id: "8",
    title: "Al-Nisa Campus Assembly Grounds",
    description: "Morning assembly, recitation of holy Quran, and national anthem pledge.",
    category: "Campus",
    imageUrl: "/images/gallery/Lahore Elite School Reffference Images (7).jpeg",
    eventDate: "Ongoing",
  },
];

const categories = ["All", "Awards", "Classroom", "Sports", "Activities", "Events", "Campus"];

export default function GalleryViewer() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedCategory === "All"
      ? defaultPhotos
      : defaultPhotos.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
  };

  const prevPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat
                ? "bg-school-navy text-white shadow-md scale-105"
                : "bg-white text-school-muted hover:text-school-navy border border-school-border hover:border-school-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(idx)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-school-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-school-navy/80 backdrop-blur-sm text-school-gold text-[10px] font-bold px-2.5 py-1 rounded-md">
                {photo.category}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-school-navy text-sm mb-1 group-hover:text-school-navy-light transition-colors line-clamp-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-school-muted line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>
              </div>

              {photo.eventDate && (
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-[11px] text-school-muted space-x-1">
                  <Calendar className="w-3 h-3 text-school-gold" />
                  <span>{photo.eventDate}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-school-gold hover:text-school-navy text-white transition-all"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-school-gold hover:text-school-navy text-white transition-all"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={filteredPhotos[activePhotoIndex].imageUrl}
                alt={filteredPhotos[activePhotoIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center text-white space-y-1">
              <h3 className="text-xl font-bold text-school-gold">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                {filteredPhotos[activePhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
