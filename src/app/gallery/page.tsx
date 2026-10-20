import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import GalleryViewer from "@/components/gallery/GalleryViewer";

export const metadata = {
  title: "Photo Gallery | Lahore Elite School",
  description:
    "Explore authentic glimpses of campus life, award ceremonies, science exhibitions, sports galas, and classroom activities at Lahore Elite School.",
};

export default function GalleryPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Campus Moments
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-school-navy">
              Campus Life & Event Gallery
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              Celebrating our students&apos; dynamic learning experiences, annual award ceremonies,
              and extracurricular triumphs in Lahore.
            </p>
          </div>

          <GalleryViewer />
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
