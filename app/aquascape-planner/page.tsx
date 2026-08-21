'use client';

import { useState, useEffect, useRef } from 'react';
import { Layers, HelpCircle, AlertTriangle, CheckCircle2, Trash2, RefreshCw, Sparkles, Plus, Move, Info } from 'lucide-react';
import { storage, KEYS, unlockAchievement } from '@/lib/storage';

interface PlacedItem {
  id: string;
  type: 'plant' | 'rock' | 'wood' | 'fish';
  name: string;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
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

  // Load from local storage
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
      x: 40 + Math.random() * 20, // default center
      y: type === 'fish' ? 20 + Math.random() * 30 : 65 + Math.random() * 10, // fish float, plants/rocks rest near bottom
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

  // Draggable logic using Pointer Events (mouse & touch unified)
  const handlePointerDown = (e: React.PointerEvent, item: PlacedItem) => {
    e.stopPropagation();
    setSelectedItemId(item.id);
    if (!canvasRef.current) return;

    // Capture initial pointer coordinates and item coordinate percentages
    dragInfo.current = {
      activeId: item.id,
      startX: e.clientX,
      startY: e.clientY,
      itemStartX: item.x,
      itemStartY: item.y
    };
    
    // Set pointer capture to receive moves even if dragging outside the element
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const { activeId, startX, startY, itemStartX, itemStartY } = dragInfo.current;
    if (!activeId || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Convert pixels to percentages of canvas dimensions
    const pctDeltaX = (deltaX / rect.width) * 100;
    const pctDeltaY = (deltaY / rect.height) * 100;

    let newX = Math.max(0, Math.min(100, itemStartX + pctDeltaX));
    let newY = Math.max(0, Math.min(100, itemStartY + pctDeltaY));

    // Limit elements types to realistic water levels
    const item = placedItems.find(p => p.id === activeId);
    if (item && item.type !== 'fish') {
      // Plants, rocks, and wood stay in the lower 60% of the tank
      newY = Math.max(30, Math.min(85, newY));
    } else if (item && item.type === 'fish') {
      // Fish stay in water, upper 80%
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

  // Pre-configured layout suggestions
  const handleSuggestedLayout = (selectedStyle: typeof style) => {
    setStyle(selectedStyle);
    let items: PlacedItem[] = [];

    if (selectedStyle === 'iwagumi') {
      // Iwagumi layout: main stones (Oyaishi) and carpeting plants (Monte Carlo)
      items = [
        { id: 'rock-1', type: 'rock', name: 'Main Stone', label: '🪨 Oyaishi Stone', x: 45, y: 55, color: 'bg-slate-500' },
        { id: 'rock-2', type: 'rock', name: 'Fukuishi Stone', label: '🪨 Secondary Stone', x: 30, y: 65, color: 'bg-slate-400' },
        { id: 'rock-3', type: 'rock', name: 'Soishi Stone', label: '🪨 Helper Stone', x: 60, y: 70, color: 'bg-slate-600' },
        { id: 'plant-1', type: 'plant', name: 'Monte Carlo', label: '🌱 Carpet Plant', x: 20, y: 80, color: 'bg-emerald-500' },
        { id: 'plant-2', type: 'plant', name: 'Monte Carlo', label: '🌱 Carpet Plant', x: 40, y: 82, color: 'bg-emerald-500' },
        { id: 'plant-3', type: 'plant', name: 'Monte Carlo', label: '🌱 Carpet Plant', x: 75, y: 81, color: 'bg-emerald-500' },
        { id: 'fish-1', type: 'fish', name: 'Tetra', label: '🐟 Neon Tetra', x: 50, y: 25, color: 'bg-cyan-500' },
        { id: 'fish-2', type: 'fish', name: 'Tetra', label: '🐟 Neon Tetra', x: 58, y: 20, color: 'bg-cyan-500' }
      ];
    } else if (selectedStyle === 'jungle') {
      // Jungle style: driftwood center, swords background, valisneria
      items = [
        { id: 'wood-1', type: 'wood', name: 'Driftwood Branch', label: '🪵 Driftwood Root', x: 50, y: 50, color: 'bg-amber-800' },
        { id: 'plant-1', type: 'plant', name: 'Amazon Sword', label: '🌿 Amazon Sword', x: 20, y: 45, color: 'bg-emerald-600' },
        { id: 'plant-2', type: 'plant', name: 'Amazon Sword', label: '🌿 Amazon Sword', x: 80, y: 45, color: 'bg-emerald-600' },
        { id: 'plant-3', type: 'plant', name: 'Jungle Val', label: '🌱 Jungle Val', x: 10, y: 35, color: 'bg-emerald-700' },
        { id: 'plant-4', type: 'plant', name: 'Jungle Val', label: '🌱 Jungle Val', x: 90, y: 35, color: 'bg-emerald-700' },
        { id: 'plant-5', type: 'plant', name: 'Java Fern', label: '🌿 Java Fern', x: 45, y: 65, color: 'bg-emerald-500' },
        { id: 'fish-1', type: 'fish', name: 'Angelfish', label: '🐠 Angelfish', x: 35, y: 30, color: 'bg-yellow-400' }
      ];
    } else if (selectedStyle === 'minimal') {
      items = [
        { id: 'wood-1', type: 'wood', name: 'Bonsai Wood', label: '🪵 Centerwood', x: 50, y: 55, color: 'bg-amber-900' },
        { id: 'plant-1', type: 'plant', name: 'Anubias', label: '🌱 Anubias Nana', x: 48, y: 62, color: 'bg-emerald-600' },
        { id: 'plant-2', type: 'plant', name: 'Anubias', label: '🌱 Anubias', x: 55, y: 65, color: 'bg-emerald-600' },
        { id: 'fish-1', type: 'fish', name: 'Betta', label: '🐠 Betta Fish', x: 30, y: 25, color: 'bg-red-500' }
      ];
    } else {
      // Nature style: mixed
      items = [
        { id: 'wood-1', type: 'wood', name: 'Wood Root', label: '🪵 Island Branch', x: 35, y: 55, color: 'bg-amber-800' },
        { id: 'rock-1', type: 'rock', name: 'Rock', label: '🪨 River Rock', x: 60, y: 68, color: 'bg-slate-500' },
        { id: 'plant-1', type: 'plant', name: 'Java Fern', label: '🌿 Java Fern', x: 32, y: 62, color: 'bg-emerald-500' },
        { id: 'plant-2', type: 'plant', name: 'Anubias', label: '🌱 Anubias', x: 62, y: 65, color: 'bg-emerald-600' },
        { id: 'plant-3', type: 'plant', name: 'Sword', label: '🌿 Background Sword', x: 78, y: 45, color: 'bg-emerald-600' },
        { id: 'fish-1', type: 'fish', name: 'Guppy', label: '🐟 Guppy', x: 50, y: 28, color: 'bg-orange-400' }
      ];
    }

    setPlacedItems(items);
    setSelectedItemId(null);
    saveCurrentLayout(items, tankSize, selectedStyle);
    unlockAchievement('aquascape-plan');
  };

  const getSubstrateColor = () => {
    switch (style) {
      case 'iwagumi': return 'from-stone-300 to-stone-400 border-stone-500'; // light cosmetic sand
      case 'jungle': return 'from-amber-950 to-slate-950 border-amber-900'; // rich organic aqua-soil
      case 'minimal': return 'from-yellow-100 to-amber-200 border-yellow-300'; // soft river sand
      default: return 'from-slate-700 to-slate-800 border-slate-600'; // regular aquarium gravel
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground bg-background">
        Loading planner...
      </div>
    );
  }

  const selectedItem = placedItems.find(item => item.id === selectedItemId);

  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Aquascape Planner</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Design your virtual aquarium layout. Choose a style, add plants, driftwood, rocks, and fish, and arrange them using touch-friendly drag controls.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Editor Canvas Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Controls bar */}
              <div className="flex flex-wrap justify-between items-center bg-card border border-border p-4 rounded-2xl gap-4 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tank Size</span>
                  <div className="flex bg-background border border-border p-1 rounded-xl">
                    {(['small', 'medium', 'large'] as const).map(sz => (
                      <button
                        key={sz}
                        onClick={() => { setTankSize(sz); saveCurrentLayout(placedItems, sz, style); }}
                        className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                          tankSize === sz ? 'bg-cyan-500 text-slate-900' : 'text-muted-foreground'
                        }`}
                      >
                        {sz === 'small' ? '10 Gal' : sz === 'medium' ? '29 Gal' : '55 Gal'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Scaping Style</span>
                  <div className="flex bg-background border border-border p-1 rounded-xl flex-wrap">
                    {(['nature', 'jungle', 'iwagumi', 'minimal'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => handleSuggestedLayout(st)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                          style === st ? 'bg-cyan-500 text-slate-900' : 'text-muted-foreground'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* The Tank Canvas */}
              <div 
                ref={canvasRef}
                onPointerMove={handlePointerMove}
                className={`relative w-full bg-gradient-to-b from-cyan-950 via-cyan-900 to-cyan-950 rounded-3xl border-4 border-slate-500 dark:border-slate-800 shadow-2xl overflow-hidden cursor-crosshair transition-all duration-300 ${
                  tankSize === 'small' ? 'h-64' : tankSize === 'medium' ? 'h-80' : 'h-96'
                }`}
              >
                {/* Water reflection sheen lines */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-40 pointer-events-none"></div>
                <div className="absolute top-4 left-6 bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-mono text-cyan-200 pointer-events-none">
                  {tankSize === 'small' ? '10 Gallon Nano' : tankSize === 'medium' ? '29 Gallon Standard' : '55 Gallon Showcase'}
                </div>

                {/* Placed drag elements */}
                {placedItems.map((item) => {
                  const isSelected = selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      onPointerDown={(e) => handlePointerDown(e, item)}
                      onPointerUp={handlePointerUp}
                      style={{ 
                        left: `${item.x}%`, 
                        top: `${item.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`absolute select-none flex items-center justify-center px-3 py-1.5 rounded-full border shadow-md font-mono text-xs font-bold text-white transition-shadow cursor-grab active:cursor-grabbing ${item.color} ${
                        isSelected 
                          ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-cyan-950 scale-105 border-white' 
                          : 'border-white/20'
                      }`}
                    >
                      {item.label}
                      {isSelected && (
                        <div className="absolute -top-1.5 -right-1.5 bg-rose-500 rounded-full p-0.5 border border-white hover:bg-rose-600 transition-colors pointer-events-auto" onClick={(e) => { e.stopPropagation(); handleRemoveItem(item.id); }}>
                          <Trash2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Substrate Bed */}
                <div 
                  className={`absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b ${getSubstrateColor()} border-t pointer-events-none`}
                ></div>
              </div>

              {/* Instructions */}
              <div className="flex gap-3 text-xs bg-muted/40 p-4 border border-border rounded-2xl text-left font-sans text-muted-foreground">
                <Info className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground block font-bold mb-0.5">Scaper controls:</strong>
                  Click elements in the toolbox on the right to inject them into the center water column. Use your mouse/finger to drag elements inside the tank. Click on an element to display its delete button. Use the top filters to trigger suggested default layouts.
                </div>
              </div>
            </div>

            {/* Toolbox Sidebar Column */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <div className="bg-card border border-border rounded-3xl p-6 shadow-md space-y-5">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-foreground font-poppins">Scaper Toolbox</h3>
                  {placedItems.length > 0 && (
                    <button 
                      onClick={handleReset}
                      className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Clear All
                    </button>
                  )}
                </div>

                {/* Toolbox Items */}
                <div className="space-y-4 font-sans text-sm">
                  {/* Category: Plants */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Plants</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleAddItem('plant', 'java-fern', '🌿 Java Fern', 'bg-emerald-600')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-500" /> Java Fern
                      </button>
                      <button 
                        onClick={() => handleAddItem('plant', 'anubias', '🌱 Anubias', 'bg-emerald-500')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-500" /> Anubias
                      </button>
                      <button 
                        onClick={() => handleAddItem('plant', 'sword', '🌿 Sword Plant', 'bg-emerald-700')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-500" /> Amazon Sword
                      </button>
                      <button 
                        onClick={() => handleAddItem('plant', 'val', '🌱 Jungle Val', 'bg-teal-600')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-500" /> Jungle Val
                      </button>
                    </div>
                  </div>

                  {/* Category: Rocks & Wood */}
                  <div className="space-y-2 pt-2 border-t border-border/40">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Hardscape</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleAddItem('rock', 'rock', '🪨 River Stone', 'bg-slate-500')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-slate-500" /> River Rock
                      </button>
                      <button 
                        onClick={() => handleAddItem('rock', 'dragon-rock', '🪨 Dragon Rock', 'bg-stone-500')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-slate-500" /> Dragon Rock
                      </button>
                      <button 
                        onClick={() => handleAddItem('wood', 'driftwood', '🪵 Driftwood', 'bg-amber-800')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-700" /> Driftwood
                      </button>
                      <button 
                        onClick={() => handleAddItem('wood', 'root', '🪵 Spiderwood', 'bg-amber-700')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-700" /> Spiderwood
                      </button>
                    </div>
                  </div>

                  {/* Category: Fish */}
                  <div className="space-y-2 pt-2 border-t border-border/40">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Livestock</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleAddItem('fish', 'tetra', '🐟 Neon Tetra', 'bg-cyan-500')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-cyan-400" /> Neon Tetra
                      </button>
                      <button 
                        onClick={() => handleAddItem('fish', 'guppy', '🐟 Guppy', 'bg-orange-400')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-orange-400" /> Guppy
                      </button>
                      <button 
                        onClick={() => handleAddItem('fish', 'betta', '🐠 Betta Fish', 'bg-red-500')}
                        className="py-2 px-3 bg-muted border border-border hover:border-cyan-500/35 rounded-xl text-xs font-bold text-foreground cursor-pointer text-left flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-red-500" /> Betta Fish
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection details */}
              {selectedItem && (
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-3 font-sans text-xs">
                  <h4 className="font-bold text-sm text-foreground">Selected Item</h4>
                  <div className="space-y-1.5 text-muted-foreground">
                    <p>Name: <strong className="text-foreground">{selectedItem.label}</strong></p>
                    <p>Coordinates: <strong className="text-foreground">X: {selectedItem.x}%, Y: {selectedItem.y}%</strong></p>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(selectedItem.id)}
                    className="w-full py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20 rounded-xl transition-colors font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Selected
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
