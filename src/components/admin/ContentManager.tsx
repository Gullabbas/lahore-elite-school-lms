"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Globe,
  HelpCircle,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  Trash2,
  Save,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  isPublished: boolean;
}

interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string | null;
}

interface SettingItem {
  key: string;
  value: string;
}

interface Props {
  initialFaqs: FAQItem[];
  initialGallery: GalleryPhoto[];
  initialSettings: SettingItem[];
}

export default function ContentManager({ initialFaqs, initialGallery, initialSettings }: Props) {
  const [activeTab, setActiveTab] = useState<"CHAIRMAN" | "FAQS" | "GALLERY">("CHAIRMAN");

  // Chairman State
  const chairmanTitleSetting = initialSettings.find((s) => s.key === "CHAIRMAN_TITLE")?.value || "Chairman's Message";
  const chairmanMsgSetting =
    initialSettings.find((s) => s.key === "CHAIRMAN_MESSAGE")?.value ||
    "At Lahore Elite School, we believe that education is the foundation of character, intellect, and leadership. Our institution is dedicated to nurturing academic brilliance, moral integrity, and modern technological readiness in every student entrusted to our care.";
  const chairmanQuoteSetting =
    initialSettings.find((s) => s.key === "CHAIRMAN_QUOTE")?.value ||
    "Nurturing intellect and character with unwavering commitment to excellence.";

  const [chairmanTitle, setChairmanTitle] = useState(chairmanTitleSetting);
  const [chairmanMsg, setChairmanMsg] = useState(chairmanMsgSetting);
  const [chairmanQuote, setChairmanQuote] = useState(chairmanQuoteSetting);
  const [savingChairman, setSavingChairman] = useState(false);
  const [savedChairmanNotice, setSavedChairmanNotice] = useState(false);

  // FAQs State
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqForm, setFaqForm] = useState({ category: "General", question: "", answer: "" });
  const [submittingFaq, setSubmittingFaq] = useState(false);

  // Gallery State
  const [gallery, setGallery] = useState<GalleryPhoto[]>(initialGallery);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "Activities",
    imageUrl: "/images/gallery/classroom-learning.png",
    description: "",
  });
  const [submittingGallery, setSubmittingGallery] = useState(false);

  // Handlers
  const handleSaveChairman = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingChairman(true);
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "setting", key: "CHAIRMAN_TITLE", value: chairmanTitle, category: "BRAND" }),
      });
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "setting", key: "CHAIRMAN_MESSAGE", value: chairmanMsg, category: "BRAND" }),
      });
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "setting", key: "CHAIRMAN_QUOTE", value: chairmanQuote, category: "BRAND" }),
      });
      setSavedChairmanNotice(true);
      setTimeout(() => setSavedChairmanNotice(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Error saving settings");
    } finally {
      setSavingChairman(false);
    }
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingFaq(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "faq", ...faqForm }),
      });
      const data = await res.json();
      if (data.success) {
        setFaqs([...faqs, data.faq]);
        setShowFaqModal(false);
        setFaqForm({ category: "General", question: "", answer: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingFaq(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm("Delete this FAQ item?")) return;
    try {
      const res = await fetch(`/api/content?type=faq&id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingGallery(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "gallery", ...galleryForm }),
      });
      const data = await res.json();
      if (data.success) {
        setGallery([data.item, ...gallery]);
        setShowGalleryModal(false);
        setGalleryForm({
          title: "",
          category: "Activities",
          imageUrl: "/images/gallery/classroom-learning.png",
          description: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingGallery(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm("Remove this image from gallery?")) return;
    try {
      const res = await fetch(`/api/content?type=gallery&id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setGallery((prev) => prev.filter((g) => g.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-school-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-school-gold-warm font-bold text-xs uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>Website Management</span>
          </div>
          <h1 className="text-2xl font-extrabold text-school-navy">Public Content CMS</h1>
          <p className="text-xs text-school-muted mt-1">
            Maintain public homepage content, chairman message, FAQs, and event gallery photos
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("CHAIRMAN")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "CHAIRMAN"
                ? "bg-white text-school-navy shadow"
                : "text-school-muted hover:text-school-navy"
            }`}
          >
            Chairman Vision
          </button>
          <button
            onClick={() => setActiveTab("FAQS")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "FAQS"
                ? "bg-white text-school-navy shadow"
                : "text-school-muted hover:text-school-navy"
            }`}
          >
            FAQs ({faqs.length})
          </button>
          <button
            onClick={() => setActiveTab("GALLERY")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "GALLERY"
                ? "bg-white text-school-navy shadow"
                : "text-school-muted hover:text-school-navy"
            }`}
          >
            Gallery ({gallery.length})
          </button>
        </div>
      </div>

      {/* TAB 1: CHAIRMAN */}
      {activeTab === "CHAIRMAN" && (
        <div className="bg-white rounded-2xl border border-school-border p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-school-border">
            <div>
              <h2 className="text-base font-extrabold text-school-navy">Chairman Message &amp; Vision</h2>
              <p className="text-xs text-school-muted">
                Displayed prominently on the public homepage and About Us page
              </p>
            </div>
            {savedChairmanNotice && (
              <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved successfully!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveChairman} className="space-y-4 max-w-3xl">
            <div>
              <label className="block text-xs font-bold text-school-navy mb-1">Section Title</label>
              <input
                type="text"
                value={chairmanTitle}
                onChange={(e) => setChairmanTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-school-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-school-navy mb-1">Highlight Quote</label>
              <input
                type="text"
                value={chairmanQuote}
                onChange={(e) => setChairmanQuote(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-school-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-school-navy mb-1">Full Statement / Message</label>
              <textarea
                rows={6}
                value={chairmanMsg}
                onChange={(e) => setChairmanMsg(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-school-gold leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={savingChairman}
              className="px-5 py-2.5 bg-school-navy text-white text-xs font-bold rounded-xl hover:bg-school-navy-light flex items-center space-x-2 shadow"
            >
              {savingChairman ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-school-gold" />}
              <span>Save Statement</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: FAQS */}
      {activeTab === "FAQS" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-school-muted">
              Live questions rendered dynamically on the public Admissions &amp; FAQs section
            </p>
            <button
              onClick={() => setShowFaqModal(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light shadow"
            >
              <Plus className="w-3.5 h-3.5 text-school-gold" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((f) => (
              <div
                key={f.id}
                className="bg-white p-5 rounded-2xl border border-school-border shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {f.category}
                    </span>
                    <button
                      onClick={() => handleDeleteFaq(f.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-school-navy">{f.question}</h4>
                  <p className="text-xs text-school-muted mt-2 leading-relaxed">{f.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Add FAQ */}
          {showFaqModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-school-border">
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <h3 className="text-base font-extrabold text-school-navy">Add Public FAQ</h3>
                  <button onClick={() => setShowFaqModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateFaq} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">Category</label>
                    <select
                      value={faqForm.category}
                      onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-white focus:ring-2 focus:ring-school-gold"
                    >
                      <option value="Admissions">Admissions</option>
                      <option value="Fee Payments">Fee Payments</option>
                      <option value="Academic">Academic</option>
                      <option value="Uniform">Uniform</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">Question</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. What is the minimum age for Playgroup?"
                      value={faqForm.question}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-school-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">Answer</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Provide the clear answer for prospective parents..."
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-school-gold"
                    />
                  </div>

                  <div className="pt-3 border-t flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowFaqModal(false)}
                      className="px-4 py-2 border rounded-xl text-xs text-slate-600 hover:bg-slate-50 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingFaq}
                      className="px-5 py-2 bg-school-navy text-white text-xs font-bold rounded-xl hover:bg-school-navy-light flex items-center space-x-1"
                    >
                      {submittingFaq && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>Save Question</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GALLERY */}
      {activeTab === "GALLERY" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-school-muted">
              Campus photos displayed in the public interactive gallery
            </p>
            <button
              onClick={() => setShowGalleryModal(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-school-navy text-white text-xs font-bold hover:bg-school-navy-light shadow"
            >
              <Plus className="w-3.5 h-3.5 text-school-gold" />
              <span>Add Gallery Image</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-2xl border border-school-border overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative h-44 w-full bg-slate-100">
                  <Image src={g.imageUrl} alt={g.title} fill className="object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-school-navy/80 backdrop-blur-sm text-school-gold text-[10px] font-bold rounded-full">
                    {g.category}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-school-navy">{g.title}</h4>
                    {g.description && <p className="text-[11px] text-school-muted">{g.description}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteGallery(g.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Add Gallery */}
          {showGalleryModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-school-border">
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <h3 className="text-base font-extrabold text-school-navy">Add Gallery Photo</h3>
                  <button onClick={() => setShowGalleryModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateGallery} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">Image Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Annual Sports Gala 2025"
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-school-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">Category</label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-white focus:ring-2 focus:ring-school-gold"
                    >
                      <option value="Activities">Activities</option>
                      <option value="Classroom">Classroom</option>
                      <option value="Sports">Sports</option>
                      <option value="Events">Events</option>
                      <option value="Awards">Awards</option>
                      <option value="Campus">Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">Image Path / URL</label>
                    <input
                      type="text"
                      required
                      value={galleryForm.imageUrl}
                      onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-school-gold"
                    />
                    <p className="text-[10px] text-school-muted mt-1">
                      Available assets: <code>/images/gallery/classroom-learning.png</code>, <code>/images/gallery/annual-day-stage.png</code>, <code>/images/gallery/science-lab-practical.png</code>, <code>/images/gallery/sports-cricket-match.png</code>
                    </p>
                  </div>

                  <div className="pt-3 border-t flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowGalleryModal(false)}
                      className="px-4 py-2 border rounded-xl text-xs text-slate-600 hover:bg-slate-50 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingGallery}
                      className="px-5 py-2 bg-school-navy text-white text-xs font-bold rounded-xl hover:bg-school-navy-light flex items-center space-x-1"
                    >
                      {submittingGallery && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>Add Photo</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
