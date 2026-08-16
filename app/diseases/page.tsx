"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ShieldAlert, 
  Activity, 
  Heart, 
  CheckCircle, 
  Search, 
  HelpCircle, 
  Thermometer, 
  Info,
  Droplets,
  Layers
} from "lucide-react";
import { Disease as DiseaseType } from "@/lib/types";
import { diseasesData } from "@/data/diseases";

interface CheckerSymptom {
  id: string;
  label: string;
}

const CHECKER_SYMPTOMS: CheckerSymptom[] = [
  { id: "white-spots", label: "Small white spots (like salt grains) on body or fins" },
  { id: "golden-dust", label: "Fine golden-yellow, rust-colored, or dusty film" },
  { id: "cotton-growths", label: "Fuzzy white, grey, or brown cotton-like tufts" },
  { id: "ragged-fins", label: "Ragged, frayed, or decaying fin and tail edges" },
  { id: "bloated-belly", label: "Severely swollen, bloated, or distended abdomen" },
  { id: "pinecone-scales", label: "Scales sticking outward, resembling a pinecone" },
  { id: "pop-eye", label: "Protruding, swollen, or bulging eyes" },
  { id: "buoyancy-issue", label: "Floating uncontrollably at surface or sinking to bottom" },
  { id: "odd-swimming", label: "Swimming sideways, upside down, or struggling to swim straight" },
  { id: "flashing", label: "Rubbing, scraping, or scratching against rocks/decorations" },
  { id: "breathing-distress", label: "Rapid gill movement or gasping at the water surface" },
  { id: "clamped-fins", label: "Clamped fins (holding fins pressed tight to body)" },
  { id: "lethargy", label: "Extreme lethargy, hiding, or complete loss of appetite" }
];

const DISEASE_SYMPTOM_MAP: Record<string, string[]> = {
  "ich-white-spot": ["white-spots", "flashing", "breathing-distress", "clamped-fins", "lethargy"],
  "velvet-oodinium": ["golden-dust", "flashing", "breathing-distress", "clamped-fins", "lethargy"],
  "fin-rot": ["ragged-fins", "cotton-growths", "lethargy"],
  "dropsy": ["bloated-belly", "pinecone-scales", "pop-eye", "clamped-fins", "lethargy"],
  "swim-bladder-disorder": ["buoyancy-issue", "odd-swimming", "bloated-belly"],
  "cotton-wool-disease": ["cotton-growths", "clamped-fins", "flashing", "lethargy"]
};

export default function Diseases() {
  const [diseases] = useState<DiseaseType[]>(diseasesData);
  const [activeTab, setActiveTab] = useState<"library" | "checker" | "quarantine">("library");
  
  // Library State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Checker State
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  // Filter diseases based on search and category type
  const filteredDiseases = diseases.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All" || d.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Handle symptom checkbox toggle
  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  // Reset checker
  const resetChecker = () => {
    setSelectedSymptoms([]);
  };

  // Calculate matching diseases
  const getDiagnosedDiseases = () => {
    if (selectedSymptoms.length === 0) return [];
    
    return diseases.map(disease => {
      const mappedSymptoms = DISEASE_SYMPTOM_MAP[disease.slug] || [];
      const matches = mappedSymptoms.filter(s => selectedSymptoms.includes(s));
      const matchPercentage = Math.round((matches.length / mappedSymptoms.length) * 100);
      return {
        ...disease,
        matchPercentage,
        matchingCount: matches.length
      };
    })
    .filter(d => d.matchingCount > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const diagnosticResults = getDiagnosedDiseases();

  // Helper for rendering disease type badges
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "Parasitic":
        return "bg-red-600 text-white border border-red-500/30 shadow-md backdrop-blur-sm";
      case "Bacterial":
        return "bg-purple-600 text-white border border-purple-500/30 shadow-md backdrop-blur-sm";
      case "Fungal":
        return "bg-amber-500 text-slate-950 border border-amber-400/30 shadow-md backdrop-blur-sm";
      default:
        return "bg-blue-600 text-white border border-blue-500/30 shadow-md backdrop-blur-sm";
    }
  };

  return (
    <div className="flex flex-col w-full py-12 bg-background min-h-screen">
      {/* Clinically Designed Hero Section */}
      <section className="container mx-auto px-4 text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-cyan-500/5 blur-3xl pointer-events-none -z-10" />
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-semibold mb-4 border border-red-500/20 shadow-sm text-sm">
          <ShieldAlert className="w-4 h-4 animate-pulse" /> Fish Health & Diagnostic Hub
        </div>
        <h1 className="text-4xl md:text-6xl font-poppins font-extrabold mb-6 tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          Aquarium Diseases & Care
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Quickly identify common ailments using our interactive symptom checker, browse treatment guidelines, and learn preventative protocols.
        </p>
      </section>

      {/* Dynamic Navigation Tabs */}
      <div className="container mx-auto px-4 mb-10">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl max-w-2xl mx-auto border border-border">
          <button
            onClick={() => setActiveTab("library")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "library"
                ? "bg-white dark:bg-slate-800 shadow-md text-cyan-600 dark:text-cyan-400"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="w-4 h-4" /> Disease Library
          </button>
          <button
            onClick={() => setActiveTab("checker")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "checker"
                ? "bg-white dark:bg-slate-800 shadow-md text-cyan-600 dark:text-cyan-400"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Activity className="w-4 h-4" /> Symptom Checker
          </button>
          <button
            onClick={() => setActiveTab("quarantine")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "quarantine"
                ? "bg-white dark:bg-slate-800 shadow-md text-cyan-600 dark:text-cyan-400"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className="w-4 h-4" /> Quarantine Guide
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 max-w-7xl">
        <AnimatePresence mode="wait">
          {activeTab === "library" && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Search & Dynamic Filters */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/60 border border-border p-4 rounded-3xl backdrop-blur-sm">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search name, description, symptoms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-background/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 text-sm transition-all"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  {["All", "Parasitic", "Bacterial", "Fungal"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
                        selectedType === type
                          ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 shadow-sm"
                          : "bg-background/50 text-muted-foreground hover:text-foreground border-border"
                      }`}
                    >
                      {type} Category
                    </button>
                  ))}
                </div>
              </div>

              {/* Disease Grid */}
              {filteredDiseases.length === 0 ? (
                <div className="text-center py-16 bg-card/40 border border-border rounded-3xl">
                  <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No diseases match your search criteria.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDiseases.map((d) => (
                    <div
                      key={d.id}
                      className="glass border border-border/80 dark:border-slate-800/80 rounded-2xl p-6 hover:shadow-xl hover:border-cyan-500/30 transition-all flex flex-col justify-between group bg-white/40 dark:bg-slate-900/40 backdrop-blur-md"
                    >
                      <div>
                        {/* Premium Image Header */}
                        <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-muted/80 shadow-inner">
                          <Image
                            src={d.image}
                            alt={d.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-3 left-3">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getTypeBadgeClass(d.type)}`}>
                              {d.type}
                            </span>
                          </div>
                        </div>

                        {/* Title & Info */}
                        <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {d.name}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                          {d.description}
                        </p>

                        {/* Specs Panel */}
                        <div className="space-y-2 mb-6 border-t border-border/50 pt-4 text-xs">
                          <p>
                            <span className="font-bold text-muted-foreground uppercase tracking-wider">Susceptible:</span>{" "}
                            <span className="text-foreground/90">{d.susceptible.join(", ")}</span>
                          </p>
                          <p>
                            <span className="font-bold text-muted-foreground uppercase tracking-wider">Affected:</span>{" "}
                            <span className="text-foreground/90">{d.affected.join(", ")}</span>
                          </p>
                          <div className="bg-red-500/5 dark:bg-red-950/10 p-3 rounded-lg border border-red-500/10 text-red-600 dark:text-red-400 text-xs">
                            <span className="font-bold">Cure Summary:</span> {d.cure}
                          </div>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-col gap-3 pt-2">
                        <Link
                          href={`/diseases/${d.slug}`}
                          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-slate-900 dark:text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 text-sm"
                        >
                          View Treatment Details <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "checker" && (
            <motion.div
              key="checker"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Symptom Checker Checklist */}
              <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                      <Activity className="w-6 h-6" /> Symptom Selector
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check all the signs your fish are displaying in the tank.
                    </p>
                  </div>
                  <button
                    onClick={resetChecker}
                    className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/10"
                  >
                    Reset Selected
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {CHECKER_SYMPTOMS.map((symptom) => (
                    <label
                      key={symptom.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedSymptoms.includes(symptom.id)
                          ? "bg-cyan-500/5 border-cyan-500/30 text-cyan-700 dark:text-cyan-300"
                          : "bg-background hover:bg-muted/50 border-border text-foreground"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSymptoms.includes(symptom.id)}
                        onChange={() => toggleSymptom(symptom.id)}
                        className="mt-1 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500 dark:bg-slate-900"
                      />
                      <span className="text-sm font-medium leading-tight">{symptom.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Diagnostic Results Panel */}
              <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
                    <HelpCircle className="w-6 h-6 text-cyan-500" /> Diagnostic Result
                  </h2>

                  {selectedSymptoms.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <Info className="w-12 h-12 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        Select one or more symptoms on the left to start the instant diagnostic tool.
                      </p>
                    </div>
                  ) : diagnosticResults.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        No standard diseases directly match this specific combination of symptoms. If symptoms persist, check water quality or consult an expert.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-2xl text-xs leading-relaxed text-cyan-700 dark:text-cyan-300">
                        <strong>Note:</strong> This is a matching helper tool based on common pathogen parameters. It does not replace professional veterinary consultation.
                      </div>
                      
                      <div className="space-y-4">
                        {diagnosticResults.map((result) => (
                          <div
                            key={result.id}
                            className="p-4 rounded-2xl border border-border bg-background hover:border-cyan-500/20 transition-all space-y-3"
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-bold text-sm text-foreground">{result.name}</h3>
                              <span className={`text-[10px] px-2 py-0.5 font-semibold rounded-full ${getTypeBadgeClass(result.type)}`}>
                                {result.matchPercentage}% Match
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                              <div
                                className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${result.matchPercentage}%` }}
                              />
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {result.description}
                            </p>

                            <Link
                              href={`/diseases/${result.slug}`}
                              className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 mt-1 transition-colors"
                            >
                              Explore Treatment Guide <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedSymptoms.length > 0 && (
                  <div className="border-t border-border mt-6 pt-4 text-center">
                    <button
                      onClick={resetChecker}
                      className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                    >
                      Clear Diagnostics
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "quarantine" && (
            <motion.div
              key="quarantine"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Quarantine Header Banner */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div className="bg-cyan-500 text-slate-900 p-4 rounded-2xl shrink-0">
                  <Thermometer className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Setting Up a Hospital / Quarantine Tank</h2>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    A quarantine tank protects your main display ecosystem from infectious pathogens and provides a quiet, stress-free space for sick fish to heal while undergoing medication cycles.
                  </p>
                </div>
              </div>

              {/* Step checklist */}
              <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                {[
                  {
                    step: 1,
                    title: "Select a Dedicated Quarantine Tank",
                    desc: "Use a simple, budget 5 to 10-gallon glass aquarium with no substrate (gravel/sand). Keeping the bottom bare-bottom makes it easy to monitor waste, vacuum clean, and prevents medications from getting absorbed by gravel."
                  },
                  {
                    step: 2,
                    title: "Install Seeded Sponge Filter & Heater",
                    desc: "Use a clean, gentle sponge filter powered by an air pump. Ideally, seed the sponge filter by letting it run in your main cycled tank beforehand so it contains beneficial bacteria. Install a small heater and set the temperature to match the current disease treatment (e.g., 78°F–82°F depending on disease)."
                  },
                  {
                    step: 3,
                    title: "Provide Stress Relief & Cover",
                    desc: "Do not add live plants or complex decor that can absorb chemicals or disintegrate in medications. Instead, place clean PVC pipe fittings or plastic caves in the tank. These give sick fish safe places to hide and reduce cortisol stress."
                  },
                  {
                    step: 4,
                    title: "Acclimatize and Isolate Sick Fish",
                    desc: "Carefully catch the sick fish from your display tank and slowly acclimate them to the quarantine water. Make sure water params (temp, pH) are close. Avoid transferring any water from the sick tank or main tank; maintain dedicated siphon hoses and nets."
                  },
                  {
                    step: 5,
                    title: "Follow Medication Protocols & Perform Water Changes",
                    desc: "Dose the target medication (antibiotics, copper, anti-parasitic) following packaging guidelines exactly. Turn off carbon filter media as it neutralizes medication. Perform regular daily or bi-daily 25-50% water changes to remove waste, replacing medication dosage proportionally."
                  },
                  {
                    step: 6,
                    title: "Post-Recovery Monitoring",
                    desc: "Once the fish shows no symptoms, keep them in quarantine for an additional 7–14 days. This ensures all life stages of the parasite or bacteria are fully gone. Acclimate the fish back to the display tank gently once fully cleared."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 md:gap-6 items-start border-b border-border/50 last:border-0 pb-6 last:pb-0">
                    <span className="w-10 h-10 rounded-2xl bg-cyan-500 text-slate-900 font-extrabold flex items-center justify-center text-base shrink-0 shadow-md border border-cyan-400">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
