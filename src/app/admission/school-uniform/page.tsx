import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Sparkles, Sun, Snowflake, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "School Uniform Guide | Lahore Elite School",
  description:
    "Official uniform guidelines for boys and girls across summer and winter seasons at Lahore Elite School.",
};

export default function SchoolUniformPage() {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-school-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-school-navy bg-school-gold-light px-3 py-1 rounded-full border border-school-gold/30">
              Discipline & Identity
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-school-navy">
              Official School Uniform Guidelines
            </h1>
            <p className="text-sm sm:text-base text-school-muted">
              Wearing the prescribed Lahore Elite School uniform fosters equality, neatness, and institutional pride.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Boys Uniform */}
            <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
              <div className="bg-school-navy text-white p-6">
                <h2 className="text-xl font-bold">Boys&apos; Uniform Specification</h2>
                <p className="text-xs text-school-gold">Playgroup to Class 10</p>
              </div>
              <div className="p-6 space-y-6">
                {/* Summer */}
                <div className="space-y-2 border-b pb-4">
                  <h3 className="font-bold text-school-navy text-sm flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Summer Season (April – October)</span>
                  </h3>
                  <ul className="text-xs text-school-muted space-y-1.5 pl-4 list-disc">
                    <li>White formal short/half-sleeved shirt with embroidered school crest on chest pocket.</li>
                    <li>Navy blue trousers (Classes 1 - 10) / Navy shorts (Pre-School).</li>
                    <li>Official Lahore Elite School striped navy & gold necktie.</li>
                    <li>Plain black formal leather shoes with black laces.</li>
                    <li>Plain navy blue or white socks.</li>
                  </ul>
                </div>

                {/* Winter */}
                <div className="space-y-2">
                  <h3 className="font-bold text-school-navy text-sm flex items-center space-x-2">
                    <Snowflake className="w-4 h-4 text-sky-500" />
                    <span>Winter Season (November – March)</span>
                  </h3>
                  <ul className="text-xs text-school-muted space-y-1.5 pl-4 list-disc">
                    <li>White formal full-sleeved shirt with school tie.</li>
                    <li>Navy blue V-neck pullover sweater with golden stripe at neckline.</li>
                    <li>Single-breasted navy blazer with embossed school crest (Classes 6 to 10).</li>
                    <li>Navy blue warm trousers.</li>
                    <li>Plain black formal shoes and warm navy socks.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Girls Uniform */}
            <div className="bg-white rounded-2xl border border-school-border shadow-sm overflow-hidden">
              <div className="bg-school-navy text-white p-6">
                <h2 className="text-xl font-bold">Girls&apos; Uniform Specification</h2>
                <p className="text-xs text-school-gold">Playgroup to Class 10</p>
              </div>
              <div className="p-6 space-y-6">
                {/* Summer */}
                <div className="space-y-2 border-b pb-4">
                  <h3 className="font-bold text-school-navy text-sm flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Summer Season (April – October)</span>
                  </h3>
                  <ul className="text-xs text-school-muted space-y-1.5 pl-4 list-disc">
                    <li>White shalwar kameez with navy blue shirt collar and cuffs (or navy pinafore with white shirt for primary grades).</li>
                    <li>White dupatta / sash with school crest printed / embroidered.</li>
                    <li>Plain black formal school shoes (flat soles, no heels).</li>
                    <li>Plain white socks.</li>
                    <li>Simple black or navy hair ribbons or band.</li>
                  </ul>
                </div>

                {/* Winter */}
                <div className="space-y-2">
                  <h3 className="font-bold text-school-navy text-sm flex items-center space-x-2">
                    <Snowflake className="w-4 h-4 text-sky-500" />
                    <span>Winter Season (November – March)</span>
                  </h3>
                  <ul className="text-xs text-school-muted space-y-1.5 pl-4 list-disc">
                    <li>Full-sleeved white shalwar kameez with dupatta / white shirt with pinafore.</li>
                    <li>Navy blue front-open cardigan or V-neck school sweater.</li>
                    <li>Official navy blue blazer with embroidered LES shield crest.</li>
                    <li>Black formal shoes and warm white or black stockings/socks.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* General Appearance Box */}
          <div className="bg-white rounded-2xl p-6 border border-school-border shadow-sm space-y-3">
            <h3 className="font-bold text-school-navy text-base">General Grooming & Appearance Code</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-school-muted">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                <span>Uniforms must be neat, clean, and well-ironed each morning.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                <span>Boys must maintain a disciplined, short haircut. Fancy styles are not permitted.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-school-success shrink-0 mt-0.5" />
                <span>Jewelry, nail polish, makeup, and non-prescribed accessories are strictly prohibited.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
