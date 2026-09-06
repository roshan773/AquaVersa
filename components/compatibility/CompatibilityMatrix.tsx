'use client';

import { useState } from 'react';
import { Check, AlertTriangle, X, Info } from 'lucide-react';

interface MatrixSpecies {
  id: string;
  name: string;
  short: string;
}

const matrixSpecies: MatrixSpecies[] = [
  { id: 'neon-tetra', name: 'Neon Tetra', short: 'Neon' },
  { id: 'guppy', name: 'Guppy', short: 'Guppy' },
  { id: 'betta-fish', name: 'Betta Fish', short: 'Betta' },
  { id: 'angelfish', name: 'Angelfish', short: 'Angel' },
  { id: 'corydoras', name: 'Cory Catfish', short: 'Cory' },
  { id: 'bristlenose', name: 'Bristlenose Pleco', short: 'Pleco' },
  { id: 'molly', name: 'Molly', short: 'Molly' },
  { id: 'tiger-barb', name: 'Tiger Barb', short: 'Barb' },
  { id: 'harlequin', name: 'Harlequin Rasbora', short: 'Rasbora' },
  { id: 'zebra-danio', name: 'Zebra Danio', short: 'Danio' },
];

// Compatibility grid: 'C' = Compatible, 'W' = Warning/Caution, 'X' = Incompatible, 'S' = Same species dynamic
const compatibilityMap: Record<string, Record<string, { status: 'C' | 'W' | 'X' | 'S'; note: string }>> = {
  'neon-tetra': {
    'neon-tetra': { status: 'S', note: 'Schooling species. Keep 6–10+ together.' },
    'guppy': { status: 'C', note: 'Great peaceful community match.' },
    'betta-fish': { status: 'W', note: 'Bettas may nip if tank is under 15 gallons.' },
    'angelfish': { status: 'X', note: 'Adult Angelfish will eat Neon Tetras (natural prey).' },
    'corydoras': { status: 'C', note: 'Perfect bottom/mid layer harmony.' },
    'bristlenose': { status: 'C', note: 'Completely peaceful bottom dweller.' },
    'molly': { status: 'C', note: 'Compatible in neutral pH water.' },
    'tiger-barb': { status: 'W', note: 'Tiger Barbs can out-compete Neons for food.' },
    'harlequin': { status: 'C', note: 'Classic peaceful schooling companions.' },
    'zebra-danio': { status: 'C', note: 'Active surface/mid swimmers; peaceful match.' },
  },
  'guppy': {
    'neon-tetra': { status: 'C', note: 'Great peaceful community match.' },
    'guppy': { status: 'S', note: 'Keep 1 male to 2–3 females to balance courtship.' },
    'betta-fish': { status: 'W', note: 'Bettas may attack colourful male guppy tails.' },
    'angelfish': { status: 'W', note: 'Angels may nip guppy fry or tail fins.' },
    'corydoras': { status: 'C', note: 'Great combination across different water levels.' },
    'bristlenose': { status: 'C', note: 'Compatible bottom algae grazer.' },
    'molly': { status: 'C', note: 'Livebearer synergy in hard/neutral water.' },
    'tiger-barb': { status: 'X', note: 'Tiger Barbs will relentlessly nip guppy fins.' },
    'harlequin': { status: 'C', note: 'Peaceful mid-swimmers.' },
    'zebra-danio': { status: 'C', note: 'High energy community match.' },
  },
  'betta-fish': {
    'neon-tetra': { status: 'W', note: 'Requires 15+ gal with heavy live plant cover.' },
    'guppy': { status: 'W', note: 'Male Bettas often attack fancy long-tail male guppies.' },
    'betta-fish': { status: 'X', note: 'NEVER house two male Bettas together (lethal fighting).' },
    'angelfish': { status: 'X', note: 'Territorial clash; long fin-nipping on both sides.' },
    'corydoras': { status: 'C', note: 'Ideal peaceful bottom-dwelling tankmates.' },
    'bristlenose': { status: 'C', note: 'Ignored by Bettas; peaceful bottom grazer.' },
    'molly': { status: 'W', note: 'Active mollies may stress a slow, solitary Betta.' },
    'tiger-barb': { status: 'X', note: 'Tiger Barbs will shred the Betta’s long fins.' },
    'harlequin': { status: 'C', note: 'Calm, gentle schooling tankmate for Bettas.' },
    'zebra-danio': { status: 'W', note: 'Hyperactivity of danios can stress Bettas.' },
  },
  'angelfish': {
    'neon-tetra': { status: 'X', note: 'Adult Angelfish will swallow small Neon Tetras.' },
    'guppy': { status: 'W', note: 'Adult Angels may eat small guppies or nip delta tails.' },
    'betta-fish': { status: 'X', note: 'Severe territorial and fin-nipping conflict.' },
    'angelfish': { status: 'S', note: 'Pairs form territories; keep solitary, bonded pair, or 5+ in large tank.' },
    'corydoras': { status: 'C', note: 'Excellent peaceful bottom companions.' },
    'bristlenose': { status: 'C', note: 'Great tank cleaner; peaceful harmony.' },
    'molly': { status: 'C', note: 'Compatible in larger 30+ gal setups.' },
    'tiger-barb': { status: 'X', note: 'Barbs will nip long angelfish trailing fins.' },
    'harlequin': { status: 'W', note: 'Larger rasboras safe; tiny juveniles at risk.' },
    'zebra-danio': { status: 'C', note: 'Fast swimmers that easily avoid Angelfish.' },
  },
  'corydoras': {
    'neon-tetra': { status: 'C', note: 'Perfect peaceful mid/bottom balance.' },
    'guppy': { status: 'C', note: 'Peaceful community standard.' },
    'betta-fish': { status: 'C', note: 'Best peaceful bottom tankmate for Bettas.' },
    'angelfish': { status: 'C', note: 'Angelfish ignore bottom Corydoras.' },
    'corydoras': { status: 'S', note: 'Must be kept in schools of 6+ on soft sand.' },
    'bristlenose': { status: 'C', note: 'Share bottom peacefully.' },
    'molly': { status: 'C', note: 'Peaceful community pair.' },
    'tiger-barb': { status: 'C', note: 'Barbs stay mid/top, leaving Corys alone.' },
    'harlequin': { status: 'C', note: 'Flawless peaceful community combination.' },
    'zebra-danio': { status: 'C', note: 'High activity, zero aggression.' },
  },
  'bristlenose': {
    'neon-tetra': { status: 'C', note: 'Completely peaceful algae grazer.' },
    'guppy': { status: 'C', note: 'Zero territorial overlap.' },
    'betta-fish': { status: 'C', note: 'Excellent peaceful bottom dweller for Bettas.' },
    'angelfish': { status: 'C', note: 'Safe with Angelfish.' },
    'corydoras': { status: 'C', note: 'Peaceful cohabitation on substrate.' },
    'bristlenose': { status: 'S', note: 'Males can be territorial over caves; provide driftwood.' },
    'molly': { status: 'C', note: 'Great algae cleanup crew combination.' },
    'tiger-barb': { status: 'C', note: 'Armored plates protect Pleco from nippers.' },
    'harlequin': { status: 'C', note: 'Completely compatible.' },
    'zebra-danio': { status: 'C', note: 'Completely compatible.' },
  },
  'molly': {
    'neon-tetra': { status: 'C', note: 'Good community match in neutral water.' },
    'guppy': { status: 'C', note: 'Livebearer community match.' },
    'betta-fish': { status: 'W', note: 'Active mollies may harass slow Bettas.' },
    'angelfish': { status: 'C', note: 'Compatible in 30+ gallon aquariums.' },
    'corydoras': { status: 'C', note: 'Peaceful bottom/mid combination.' },
    'bristlenose': { status: 'C', note: 'Peaceful algae grazer companion.' },
    'molly': { status: 'S', note: 'Maintain 1 male to 2–3 females.' },
    'tiger-barb': { status: 'W', note: 'Tiger Barbs may nip lyretail molly varieties.' },
    'harlequin': { status: 'C', note: 'Peaceful community harmony.' },
    'zebra-danio': { status: 'C', note: 'High energy compatible pair.' },
  },
  'tiger-barb': {
    'neon-tetra': { status: 'W', note: 'Barbs can be boisterous during feeding.' },
    'guppy': { status: 'X', note: 'Tiger Barbs shred fancy guppy tails.' },
    'betta-fish': { status: 'X', note: 'Severe fin nipping hazard for Bettas.' },
    'angelfish': { status: 'X', note: 'Barbs relentlessly nip trailing Angel fins.' },
    'corydoras': { status: 'C', note: 'Bottom dwellers generally ignored.' },
    'bristlenose': { status: 'C', note: 'Armored bottom dweller is safe.' },
    'molly': { status: 'W', note: 'Caution with fancy long-finned mollies.' },
    'tiger-barb': { status: 'S', note: 'Keep in school of 8–12+ to reduce aggression.' },
    'harlequin': { status: 'W', note: 'Keep large school of barbs to curb nipping.' },
    'zebra-danio': { status: 'C', note: 'Fast danios easily outswim barbs.' },
  },
  'harlequin': {
    'neon-tetra': { status: 'C', note: 'Classic tranquil schooling companions.' },
    'guppy': { status: 'C', note: 'Peaceful community match.' },
    'betta-fish': { status: 'C', note: 'One of the best gentle tankmates for Bettas.' },
    'angelfish': { status: 'W', note: 'Ensure Rasboras are fully grown before introducing to Angels.' },
    'corydoras': { status: 'C', note: 'Flawless mid/bottom peaceful pairing.' },
    'bristlenose': { status: 'C', note: 'Peaceful compatibility.' },
    'molly': { status: 'C', note: 'Peaceful community match.' },
    'tiger-barb': { status: 'W', note: 'Barbs may dominate feeding.' },
    'harlequin': { status: 'S', note: 'Schooling species. Maintain 6–10+ individuals.' },
    'zebra-danio': { status: 'C', note: 'Peaceful community schooling combination.' },
  },
  'zebra-danio': {
    'neon-tetra': { status: 'C', note: 'Active surface/mid schooling pair.' },
    'guppy': { status: 'C', note: 'Active and peaceful combination.' },
    'betta-fish': { status: 'W', note: 'Hyperactivity can stress slow-swimming Bettas.' },
    'angelfish': { status: 'C', note: 'Fast danios easily stay clear of Angels.' },
    'corydoras': { status: 'C', note: 'Great top/bottom spatial distribution.' },
    'bristlenose': { status: 'C', note: 'Completely compatible.' },
    'molly': { status: 'C', note: 'High energy peaceful community match.' },
    'tiger-barb': { status: 'C', note: 'Fast swimming speed prevents bullying.' },
    'harlequin': { status: 'C', note: 'Peaceful community schooling combination.' },
    'zebra-danio': { status: 'S', note: 'Keep 6+ to encourage continuous schooling.' },
  }
};

export default function CompatibilityMatrix() {
  const [selectedCell, setSelectedCell] = useState<{ s1: string; s2: string } | null>({
    s1: 'neon-tetra',
    s2: 'angelfish'
  });

  const cellInfo = selectedCell 
    ? compatibilityMap[selectedCell.s1]?.[selectedCell.s2] 
    : null;

  const species1 = selectedCell ? matrixSpecies.find(s => s.id === selectedCell.s1) : null;
  const species2 = selectedCell ? matrixSpecies.find(s => s.id === selectedCell.s2) : null;

  return (
    <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-9 shadow-sm text-left font-sans">
      
      {/* Header */}
      <div className="pb-6 mb-6 border-b border-[#edeafc]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edeafc] text-[#27187e] text-xs font-bold uppercase tracking-wider mb-2">
          <span>Quick Reference Chart</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#27187e] tracking-tight mb-2">
          Community Fish Compatibility Matrix
        </h2>
        <p className="font-readable text-sm sm:text-base text-[#27187e]/80 max-w-2xl leading-relaxed">
          Cross-reference the 10 most popular freshwater aquarium fish. Click any cell to inspect specific social dynamics and care notes.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 font-readable text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
            <Check className="w-3.5 h-3.5" /> Compatible
          </span>
          <span className="flex items-center gap-1.5 text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
            <AlertTriangle className="w-3.5 h-3.5" /> Caution / Specific Rules
          </span>
          <span className="flex items-center gap-1.5 text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md">
            <X className="w-3.5 h-3.5" /> Incompatible / High Risk
          </span>
          <span className="flex items-center gap-1.5 text-indigo-800 bg-indigo-100 px-2.5 py-1 rounded-md">
            <span>S</span> Same Species Rules
          </span>
        </div>
      </div>

      {/* Responsive Matrix Table Container */}
      <div className="overflow-x-auto pb-4 mb-6">
        <table className="w-full text-center border-collapse min-w-[640px]">
          <thead>
            <tr>
              <th className="p-2 text-left font-display text-xs text-[#27187e]/70 uppercase tracking-wider border-b-2 border-[#cfcaf5]">
                Species
              </th>
              {matrixSpecies.map(s => (
                <th key={s.id} className="p-2 font-display text-xs text-[#27187e] uppercase tracking-wider border-b-2 border-[#cfcaf5]">
                  {s.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrixSpecies.map(row => (
              <tr key={row.id} className="hover:bg-[#f7f7ff] transition-colors">
                <td className="p-2 text-left font-display text-sm text-[#27187e] font-semibold border-b border-[#edeafc] whitespace-nowrap">
                  {row.name}
                </td>
                {matrixSpecies.map(col => {
                  const data = compatibilityMap[row.id]?.[col.id];
                  const isSelected = selectedCell?.s1 === row.id && selectedCell?.s2 === col.id;

                  let bg = 'bg-gray-100 text-gray-700';
                  let icon = <Check className="w-3.5 h-3.5" />;

                  if (data?.status === 'C') {
                    bg = 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
                    icon = <Check className="w-3.5 h-3.5" strokeWidth={2.5} />;
                  } else if (data?.status === 'W') {
                    bg = 'bg-amber-100 text-amber-700 hover:bg-amber-200';
                    icon = <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2.5} />;
                  } else if (data?.status === 'X') {
                    bg = 'bg-rose-100 text-rose-700 hover:bg-rose-200';
                    icon = <X className="w-3.5 h-3.5" strokeWidth={2.5} />;
                  } else if (data?.status === 'S') {
                    bg = 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200';
                    icon = <span className="text-[11px] font-bold">S</span>;
                  }

                  return (
                    <td key={col.id} className="p-1 border-b border-[#edeafc]">
                      <button
                        onClick={() => setSelectedCell({ s1: row.id, s2: col.id })}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-sans transition-all cursor-pointer mx-auto ${bg} ${
                          isSelected ? 'ring-2 ring-[#27187e] scale-105 shadow-sm' : ''
                        }`}
                        title={`${row.name} + ${col.name}`}
                      >
                        {icon}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Cell Detail Card */}
      {selectedCell && cellInfo && species1 && species2 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#edeafc] border border-[#cfcaf5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                cellInfo.status === 'C' ? 'bg-emerald-600 text-white' :
                cellInfo.status === 'W' ? 'bg-amber-600 text-white' :
                cellInfo.status === 'X' ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'
              }`}>
                {cellInfo.status === 'C' ? 'Compatible' : cellInfo.status === 'W' ? 'Caution' : cellInfo.status === 'X' ? 'Incompatible' : 'Same Species'}
              </span>
              <h4 className="font-display text-xl text-[#27187e]">
                {species1.name} + {species2.name}
              </h4>
            </div>
            <p className="font-readable text-sm text-[#27187e]/90 font-medium">
              {cellInfo.note}
            </p>
          </div>
          <div className="text-xs font-readable text-[#27187e]/70 shrink-0">
            Click any cell in the grid above to inspect pairing.
          </div>
        </div>
      )}

    </div>
  );
}
