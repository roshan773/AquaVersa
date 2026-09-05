'use client';

import { useState, useEffect, useRef } from 'react';
import { Layers, HelpCircle, AlertTriangle, CheckCircle2, Trash2, RefreshCw, Sparkles, Plus, Move, Info, Compass } from 'lucide-react';
import { storage, KEYS, unlockAchievement } from '@/lib/storage';
import GlobalCTA from '@/components/ui/GlobalCTA';

interface PlacedItem {
  id: string;
  type: 'plant' | 'rock' | 'wood' | 'fish';
  name: string;
  label: string;
  x: number;
  y: number;
  color: string;
}

export default function AquascapePlannerPage() {
  const [tankSize, setTankSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [style, setStyle] = useState<'nature' | 'jungle' | 'iwagumi' | 'minimal'>('nature');
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<{ activeId: string | null; startX: number; startY: number; itemStartX: number; itemStartY: number }>({
    activeId: null,
    startX: 0,
    startY: 0,
    itemStartX: 0,
    itemStartY: 0
  });

  useEffect(() => {
    const saved = storage.get<{ tankSize: 'small' | 'medium' | 'large'; style: 'nature' | 'jungle' | 'iwagumi' | 'minimal'; items: PlacedItem[] }>(
      KEYS.AQUASCAPE,
      { tankSize: 'medium', style: 'nature', items: [] }
    );
    setTankSize(saved.tankSize);
    setStyle(saved.style);
    setPlacedItems(saved.items);
    setIsMounted(true);
  }, []);

  const saveCurrentLayout = (items: PlacedItem[], size: typeof tankSize, st: typeof style) => {
    storage.set(KEYS.AQUASCAPE, {
      tankSize: size,
      style: st,
      items
    });
  };

  const handleAddItem = (type: PlacedItem['type'], name: string, label: string, color: string) => {
    const newItem: PlacedItem = {
      id: `${type}-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      type,
      name,
      label,
      x: 40 + Math.random() * 20,
      y: type === 'fish' ? 20 + Math.random() * 30 : 65 + Math.random() * 10,
      color
    };
    const updated = [...placedItems, newItem];
    setPlacedItems(updated);
    saveCurrentLayout(updated, tankSize, style);
    setSelectedItemId(newItem.id);

    if (updated.length >= 5) {
      unlockAchievement('aquascape-plan');
    }
  };

  const handleRemoveItem = (id: string) => {
    const updated = placedItems.filter(item => item.id !== id);
    setPlacedItems(updated);
    saveCurrentLayout(updated, tankSize, style);
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const handleReset = () => {
    setPlacedItems([]);
    setSelectedItemId(null);
    saveCurrentLayout([], tankSize, style);
  };

  const handlePointerDown = (e: React.PointerEvent, item: PlacedItem) => {
    e.stopPropagation();
    setSelectedItemId(item.id);
    if (!canvasRef.current) return;

    dragInfo.current = {
      activeId: item.id,
      startX: e.clientX,
      startY: e.clientY,
      itemStartX: item.x,
      itemStartY: item.y
    };
    
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const { activeId, startX, startY, itemStartX, itemStartY } = dragInfo.current;
    if (!activeId || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    const pctDeltaX = (deltaX / rect.width) * 100;
    const pctDeltaY = (deltaY / rect.height) * 100;

    let newX = Math.max(0, Math.min(100, itemStartX + pctDeltaX));
    let newY = Math.max(0, Math.min(100, itemStartY + pctDeltaY));

    const item = placedItems.find(p => p.id === activeId);
    if (item && item.type !== 'fish') {
      newY = Math.max(30, Math.min(85, newY));
    } else if (item && item.type === 'fish') {
      newY = Math.max(10, Math.min(80, newY));
    }

    const updated = placedItems.map(p => 
      p.id === activeId ? { ...p, x: parseFloat(newX.toFixed(1)), y: parseFloat(newY.toFixed(1)) } : p
    );
    setPlacedItems(updated);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const { activeId } = dragInfo.current;
    if (activeId) {
      const target = e.target as HTMLElement;
      try {
        target.releasePointerCapture(e.pointerId);
      } catch (err) {}
      saveCurrentLayout(placedItems, tankSize, style);
    }
    dragInfo.current.activeId = null;
  };

  const handleSuggestedLayout = (selectedStyle: typeof style) => {
    setStyle(selectedStyle);
    let items: PlacedItem[] = [];

    if (selectedStyle === 'iwagumi') {
      items = [
        { id: 'rock-1', type: 'rock', name: 'Main Stone', label: 'Oyaishi Stone', x: 45, y: 55, color: 'bg-[#27187e]' },
        { id: 'rock-2', type: 'rock', name: 'Secondary', label: 'Fukuishi Stone', x: 30, y: 65, color: 'bg-[#1b1059]' },
        { id: 'rock-3', type: 'rock', name: 'Helper Stone', label: 'Soishi Stone', x: 60, y: 70, color: 'bg-[#3b28ab]' },
        { id: 'plant-1', type: 'plant', name: 'Monte Carlo', label: 'Carpet Plant', x: 20, y: 80, color: 'bg-[#edeafc]' },
        { id: 'plant-2', type: 'plant', name: 'Monte Carlo', label: 'Carpet Plant', x: 40, y: 82, color: 'bg-[#edeafc]' },
        { id: 'plant-3', type: 'plant', name: 'Monte Carlo', label: 'Carpet Plant', x: 75, y: 81, color: 'bg-[#edeafc]' },
        { id: 'fish-1', type: 'fish', name: 'Tetra', label: 'Neon Tetra', x: 50, y: 25, color: 'bg-[#ffffff]' },
        { id: 'fish-2', type: 'fish', name: 'Tetra', label: 'Neon Tetra', x: 58, y: 20, color: 'bg-[#ffffff]' }
      ];
    } else if (selectedStyle === 'jungle') {
      items = [
        { id: 'wood-1', type: 'wood', name: 'Wood Branch', label: 'Driftwood Root', x: 50, y: 50, color: 'bg-[#12093d]' },
        { id: 'plant-1', type: 'plant', name: 'Amazon Sword', label: 'Amazon Sword', x: 20, y: 45, color: 'bg-[#edeafc]' },
        { id: 'plant-2', type: 'plant', name: 'Amazon Sword', label: 'Amazon Sword', x: 80, y: 45, color: 'bg-[#edeafc]' },
        { id: 'plant-3', type: 'plant', name: 'Jungle Val', label: 'Jungle Val', x: 10, y: 35, color: 'bg-[#cfcaf5]' },
        { id: 'plant-4', type: 'plant', name: 'Jungle Val', label: 'Jungle Val', x: 90, y: 35, color: 'bg-[#cfcaf5]' },
        { id: 'plant-5', type: 'plant', name: 'Java Fern', label: 'Java Fern', x: 45, y: 65, color: 'bg-[#edeafc]' },
        { id: 'fish-1', type: 'fish', name: 'Angelfish', label: 'Angelfish', x: 35, y: 30, color: 'bg-[#ffffff]' }
      ];
    } else if (selectedStyle === 'minimal') {
      items = [
        { id: 'wood-1', type: 'wood', name: 'Bonsai Wood', label: 'Centerwood', x: 50, y: 55, color: 'bg-[#12093d]' },
        { id: 'plant-1', type: 'plant', name: 'Anubias', label: 'Anubias Nana', x: 48, y: 62, color: 'bg-[#edeafc]' },
        { id: 'plant-2', type: 'plant', name: 'Anubias', label: 'Anubias', x: 55, y: 65, color: 'bg-[#edeafc]' },
        { id: 'fish-1', type: 'fish', name: 'Betta', label: 'Betta Fish', x: 30, y: 25, color: 'bg-[#ffffff]' }
      ];
    } else {
      items = [
        { id: 'wood-1', type: 'wood', name: 'Wood Root', label: 'Island Branch', x: 35, y: 55, color: 'bg-[#12093d]' },
        { id: 'rock-1', type: 'rock', name: 'River Rock', label: 'River Rock', x: 60, y: 68, color: 'bg-[#27187e]' },
        { id: 'plant-1', type: 'plant', name: 'Java Fern', label: 'Java Fern', x: 32, y: 62, color: 'bg-[#edeafc]' },
        { id: 'plant-2', type: 'plant', name: 'Anubias', label: 'Anubias', x: 62, y: 65, color: 'bg-[#edeafc]' },
        { id: 'plant-3', type: 'plant', name: 'Sword', label: 'Background Sword', x: 78, y: 45, color: 'bg-[#cfcaf5]' },
        { id: 'fish-1', type: 'fish', name: 'Guppy', label: 'Guppy', x: 50, y: 28, color: 'bg-[#ffffff]' }
      ];
    }

    setPlacedItems(items);
    setSelectedItemId(null);
    saveCurrentLayout(items, tankSize, selectedStyle);
    unlockAchievement('aquascape-plan');
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#27187e] bg-[#f7f7ff] font-readable font-semibold">
        Loading visual planner...
      </div>
    );
  }

  const selectedItem = placedItems.find(item => item.id === selectedItemId);

  return (
    <div className="min-h-screen bg-[#f7f7ff] text-[#27187e] pt-32 pb-24 text-left marine-pattern-light font-readable">
      <div className="site-container">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b-2 border-[#cfcaf5]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edeafc] border border-[#cfcaf5] text-[#27187e] font-readable text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#27187e]" />
            <span>Visual Hardscape &amp; Aquascape Canvas</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#27187e] tracking-tight mb-4">
            AQUASCAPE VISUAL PLANNER
          </h1>
          <p className="text-base sm:text-lg text-[#27187e]/85 font-readable max-w-2xl leading-relaxed">
            Architect custom hardscape compositions, substrate layers, and botanical focal points using drag-and-drop spatial placement.
          </p>
        </div>

        {/* Canvas & Controls Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Canvas Viewport */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Sizing & Style Bar */}
            <div className="flex flex-wrap justify-between items-center bg-[#ffffff] border-2 border-[#cfcaf5] p-4 sm:p-5 rounded-3xl gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold text-[#27187e]/80 tracking-wider">Canvas Volume</span>
                <div className="flex bg-[#f7f7ff] border border-[#cfcaf5] p-1 rounded-xl">
                  {(['small', 'medium', 'large'] as const).map(sz => (
                    <button
                      key={sz}
                      onClick={() => { setTankSize(sz); saveCurrentLayout(placedItems, sz, style); }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                        tankSize === sz ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm' : 'text-[#27187e]'
                      }`}
                    >
                      {sz === 'small' ? '10 Gal' : sz === 'medium' ? '29 Gal' : '55 Gal'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold text-[#27187e]/80 tracking-wider">Scaping Archetype</span>
                <div className="flex bg-[#f7f7ff] border border-[#cfcaf5] p-1 rounded-xl flex-wrap">
                  {(['nature', 'jungle', 'iwagumi', 'minimal'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => handleSuggestedLayout(st)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                        style === st ? 'bg-[#27187e] text-[#f7f7ff] shadow-sm' : 'text-[#27187e]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Glass Aquarium Viewport */}
            <div 
              ref={canvasRef}
              onPointerMove={handlePointerMove}
              className={`relative w-full bg-[#12093d] rounded-3xl border-4 border-[#27187e] shadow-2xl overflow-hidden cursor-crosshair transition-all duration-300 ${
                tankSize === 'small' ? 'h-72' : tankSize === 'medium' ? 'h-88' : 'h-96'
              }`}
            >
              <div className="absolute top-4 left-6 bg-[#f7f7ff]/20 px-3 py-1 rounded-lg text-xs uppercase font-bold text-[#f7f7ff] pointer-events-none backdrop-blur-sm border border-[#f7f7ff]/30">
                {tankSize === 'small' ? '10 Gallon Nano Tank' : tankSize === 'medium' ? '29 Gallon Standard Tank' : '55 Gallon Showcase Tank'}
              </div>

              {/* Substrate bed line */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#1b1059] border-t-2 border-[#3b28ab] pointer-events-none" />

              {/* Placed drag elements */}
              {placedItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    onPointerDown={(e) => handlePointerDown(e, item)}
                    onPointerUp={handlePointerUp}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing select-none transition-transform duration-75 group ${
                      isSelected ? 'scale-110 z-30' : 'z-10'
                    }`}
                  >
                    <div className={`px-3.5 py-1.5 rounded-full border-2 text-xs font-bold shadow-lg flex items-center gap-1.5 ${
                      isSelected 
                        ? 'bg-[#ffffff] text-[#27187e] border-[#27187e] ring-4 ring-[#cfcaf5]' 
                        : 'bg-[#edeafc] text-[#27187e] border-[#cfcaf5]'
                    }`}>
                      <Move className="w-3 h-3 opacity-60" />
                      <span>{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear & Helper info */}
            <div className="flex justify-between items-center text-xs text-[#27187e]/80 px-2 font-medium">
              <span>💡 Touch or click and drag elements to position inside the water column or substrate bed.</span>
              {placedItems.length > 0 && (
                <button
                  onClick={handleReset}
                  className="font-bold text-xs uppercase tracking-wider text-[#27187e] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Clear Layout
                </button>
              )}
            </div>

          </div>

          {/* Right: Palettes & Element Spawner */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#ffffff] border-2 border-[#cfcaf5] rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
              <h3 className="font-display text-2xl text-[#27187e] border-b border-[#edeafc] pb-3">
                Element Library
              </h3>

              {/* Add Plants */}
              <div>
                <span className="text-xs uppercase font-bold text-[#27187e]/80 tracking-wider block mb-2">
                  Aquatic Plants
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Java Fern', label: 'Java Fern', color: 'bg-[#edeafc]' },
                    { name: 'Anubias', label: 'Anubias Nana', color: 'bg-[#edeafc]' },
                    { name: 'Amazon Sword', label: 'Amazon Sword', color: 'bg-[#cfcaf5]' },
                    { name: 'Monte Carlo', label: 'Monte Carlo', color: 'bg-[#edeafc]' }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAddItem('plant', p.name, p.label, p.color)}
                      className="p-2.5 rounded-xl border-2 border-[#cfcaf5] hover:border-[#27187e] bg-[#f7f7ff] text-xs font-semibold text-[#27187e] transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>+ {p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Hardscape */}
              <div>
                <span className="text-xs uppercase font-bold text-[#27187e]/80 tracking-wider block mb-2">
                  Hardscape &amp; Wood
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Driftwood', label: 'Driftwood Root', color: 'bg-[#12093d]' },
                    { name: 'Dragon Stone', label: 'Dragon Stone', color: 'bg-[#27187e]' },
                    { name: 'Seiryu Stone', label: 'Seiryu Stone', color: 'bg-[#27187e]' },
                    { name: 'Bonsai Wood', label: 'Bonsai Wood', color: 'bg-[#12093d]' }
                  ].map((h, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAddItem(h.name.includes('Stone') ? 'rock' : 'wood', h.name, h.label, h.color)}
                      className="p-2.5 rounded-xl border-2 border-[#cfcaf5] hover:border-[#27187e] bg-[#f7f7ff] text-xs font-semibold text-[#27187e] transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>+ {h.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Fauna */}
              <div>
                <span className="text-xs uppercase font-bold text-[#27187e]/80 tracking-wider block mb-2">
                  Fish Fauna
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Neon Tetra', label: 'Neon Tetra', color: 'bg-[#ffffff]' },
                    { name: 'Betta Fish', label: 'Betta Fish', color: 'bg-[#ffffff]' },
                    { name: 'Corydoras', label: 'Corydoras Cat', color: 'bg-[#ffffff]' },
                    { name: 'Angelfish', label: 'Angelfish', color: 'bg-[#ffffff]' }
                  ].map((f, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAddItem('fish', f.name, f.label, f.color)}
                      className="p-2.5 rounded-xl border-2 border-[#cfcaf5] hover:border-[#27187e] bg-[#f7f7ff] text-xs font-semibold text-[#27187e] transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>+ {f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected item delete */}
              {selectedItem && (
                <div className="p-4 bg-[#edeafc] rounded-2xl border border-[#cfcaf5] flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#27187e]/70 block">Active Selection</span>
                    <strong className="text-sm text-[#27187e]">{selectedItem.label}</strong>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(selectedItem.id)}
                    className="p-2 bg-[#ffffff] hover:bg-[#cfcaf5] text-[#27187e] rounded-xl border border-[#cfcaf5] transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      <GlobalCTA
        badge="BOTANICAL & SPECIES INTEGRATION"
        title={
          <>
            Pair your visual layout <br className="hidden sm:inline" />
            with real biological species.
          </>
        }
        description="Explore lighting requirements and fish cohabitation rules across our species library."
        primaryAction={{
          label: 'Browse Plant Catalog',
          href: '/plants',
        }}
        secondaryAction={{
          label: 'Stocking Density Planner',
          href: '/stocking-planner',
        }}
      />
    </div>
  );
}
