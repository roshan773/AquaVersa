'use client';

import { useState, useEffect } from 'react';
import { Layers, HelpCircle, AlertTriangle, CheckCircle2, DollarSign, RefreshCw, Sparkles, Scale, Info } from 'lucide-react';

interface BudgetItem {
  id: string;
  name: string;
  defaultPercent: number;
  icon: string;
  description: string;
}

const budgetItems: BudgetItem[] = [
  { id: 'tank', name: 'Glass Tank & Stand', defaultPercent: 30, icon: '🪟', description: 'The physical glass tank housing and support furniture.' },
  { id: 'filter', name: 'Filtration System', defaultPercent: 15, icon: '⚙️', description: 'Mechanical, chemical, and biological biological filter units.' },
  { id: 'heater', name: 'Heater & Thermostat', defaultPercent: 10, icon: '🌡️', description: 'Keeps water temperature stable for tropical species.' },
  { id: 'light', name: 'Aquarium LED Light', defaultPercent: 15, icon: '💡', description: 'Provides illumination for fish and photosynthetic plants.' },
  { id: 'substrate', name: 'Substrate (Soil/Sand)', defaultPercent: 10, icon: '🪵', description: 'Bottom gravel, active soil, or cosmetic sand.' },
  { id: 'plants', name: 'Plants & hardscape', defaultPercent: 10, icon: '🌱', description: 'Live plants, driftwood branches, and design rocks.' },
  { id: 'conditioner', name: 'Water Conditioner', defaultPercent: 3, icon: '🧪', description: 'Removes toxic chlorine from tap water instantly.' },
  { id: 'food', name: 'High-Quality Fish Food', defaultPercent: 3, icon: '🐟', description: 'Balanced food pellets or flakes for species diet.' },
  { id: 'testkit', name: 'Water Test Kit', defaultPercent: 4, icon: '🧪', description: 'Liquid kits to verify ammonia, nitrite, and nitrate levels.' }
];

export default function BudgetCalculatorPage() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [budgetLimit, setBudgetLimit] = useState<number>(5000);
  const [itemCosts, setItemCosts] = useState<Record<string, number>>({});
  
  // Calculate defaults on load or limit changes
  useEffect(() => {
    const defaults: Record<string, number> = {};
    budgetItems.forEach(item => {
      defaults[item.id] = Math.round((budgetLimit * item.defaultPercent) / 100);
    });
    setItemCosts(defaults);
  }, [budgetLimit]);

  const handleCostChange = (id: string, value: number) => {
    setItemCosts(prev => ({
      ...prev,
      [id]: Math.max(0, value)
    }));
  };

  const handleCurrencyToggle = (curr: 'INR' | 'USD') => {
    setCurrency(curr);
    if (curr === 'USD') {
      // Scale standard budget down from INR to USD (approx divide by 80)
      setBudgetLimit(150);
    } else {
      // Scale standard budget up from USD to INR (approx multiply by 80)
      setBudgetLimit(10000);
    }
  };

  const handleReset = () => {
    const defaultLimit = currency === 'INR' ? 5000 : 150;
    setBudgetLimit(defaultLimit);
    const defaults: Record<string, number> = {};
    budgetItems.forEach(item => {
      defaults[item.id] = Math.round((defaultLimit * item.defaultPercent) / 100);
    });
    setItemCosts(defaults);
  };

  const symbol = currency === 'INR' ? '₹' : '$';
  const estimatedTotal = Object.values(itemCosts).reduce((a, b) => a + b, 0);
  const remainingBudget = budgetLimit - estimatedTotal;
  const isOverBudget = remainingBudget < 0;

  const percentSpent = budgetLimit > 0 ? Math.round((estimatedTotal / budgetLimit) * 100) : 0;

  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
              <DollarSign className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Aquarium Budget Calculator</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-sans">
              Plan your setup costs. Enter your target budget, view standard recommended allocations, and tweak individual items to stay on track.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background font-sans text-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Limit Settings Column */}
            <div className="lg:col-span-4 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-lg space-y-6 text-left">
              <h2 className="font-bold text-xl text-foreground border-b border-border pb-3 font-poppins">Budget Settings</h2>
              
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Currency Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCurrencyToggle('INR')}
                    className={`py-2.5 px-4 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      currency === 'INR' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/35' : 'bg-background border-border text-muted-foreground'
                    }`}
                  >
                    INR (₹)
                  </button>
                  <button
                    onClick={() => handleCurrencyToggle('USD')}
                    className={`py-2.5 px-4 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      currency === 'USD' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/35' : 'bg-background border-border text-muted-foreground'
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Target Budget Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-base text-muted-foreground font-bold font-mono">{symbol}</span>
                  <input
                    type="number"
                    value={budgetLimit || ''}
                    onChange={e => setBudgetLimit(Number(e.target.value))}
                    placeholder="Enter limit"
                    className="w-full bg-background border border-border rounded-xl pl-8 pr-4 py-3 text-foreground focus:outline-none focus:border-cyan-500 font-mono font-bold text-base"
                  />
                </div>
              </div>

              {/* Reset Allocations */}
              <button
                onClick={handleReset}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mt-6"
              >
                <RefreshCw className="w-4 h-4" /> Reset Allocations
              </button>
            </div>

            {/* Adjusted slider rows column */}
            <div className="lg:col-span-8 space-y-6 text-left">
              
              {/* Progress Summary Card */}
              <div className={`p-6 rounded-3xl border flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm ${
                isOverBudget 
                  ? 'bg-rose-500/5 border-rose-500/20' 
                  : 'bg-emerald-500/5 border-emerald-500/20'
              }`}>
                
                <div className="space-y-1.5 w-full md:w-1/2">
                  <div className="flex justify-between items-center text-xs font-bold text-muted-foreground">
                    <span>Budget Spent ({percentSpent}%)</span>
                    <span className={isOverBudget ? 'text-rose-500' : 'text-emerald-500'}>
                      {estimatedTotal} / {budgetLimit} {symbol}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full transition-all duration-500 ease-out ${
                        isOverBudget ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(percentSpent, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <span className="text-xs font-bold text-muted-foreground block mb-0.5">Remaining Budget</span>
                  <span className={`text-2xl font-poppins font-black ${
                    isOverBudget ? 'text-rose-500' : 'text-emerald-500'
                  }`}>
                    {isOverBudget ? '-' : ''}{symbol}{Math.abs(remainingBudget)}
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-1">
                    {isOverBudget ? "⚠️ Adjust sliders to balance your spending limit." : "✓ Allocation is within your spending limit."}
                  </span>
                </div>

              </div>

              {/* Slider list */}
              <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-md space-y-6">
                <h3 className="font-bold text-lg text-foreground border-b border-border/40 pb-3 font-poppins">Tweak Category Costs</h3>
                
                <div className="space-y-6">
                  {budgetItems.map((item) => {
                    const currentCost = itemCosts[item.id] || 0;
                    // Max slider limit: 1.5x of the default percentage cost, capped at budget Limit
                    const defaultAllocatedCost = Math.round((budgetLimit * item.defaultPercent) / 100);
                    const sliderMax = Math.max(defaultAllocatedCost * 2, budgetLimit);
                    
                    return (
                      <div key={item.id} className="space-y-2">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg shrink-0">{item.icon}</span>
                            <div>
                              <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                              <p className="text-[10px] text-muted-foreground leading-none">{item.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Cost Input */}
                            <div className="relative w-28">
                              <span className="absolute left-2.5 top-1.5 text-xs text-muted-foreground font-bold font-mono">{symbol}</span>
                              <input
                                type="number"
                                value={currentCost || ''}
                                onChange={e => handleCostChange(item.id, Number(e.target.value))}
                                className="w-full bg-background border border-border rounded-lg pl-6 pr-2 py-1 text-xs font-mono font-bold text-foreground text-right focus:outline-none focus:border-cyan-500"
                              />
                            </div>
                            <span className="text-[10px] text-muted-foreground w-12 text-right">({item.defaultPercent}%)</span>
                          </div>
                        </div>

                        {/* Slider */}
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max={sliderMax}
                            step={currency === 'INR' ? 50 : 1}
                            value={currentCost}
                            onChange={e => handleCostChange(item.id, Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budget Tip */}
              <div className="flex gap-3 text-xs bg-muted/40 p-4 border border-border rounded-2xl text-left text-muted-foreground">
                <Info className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground block font-bold mb-0.5">Budgeting Pro-Tip:</strong>
                  Do not skimp on filtration and water testing. High-quality biological filtration and liquid test kits are critical to prevent fish losses. You can save money initially by choosing hardscapes (rocks/wood) from local landscaping suppliers rather than buying premium branded decor, or by choosing easy-to-grow low-tech plants that do not require expensive carbon dosing systems.
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
