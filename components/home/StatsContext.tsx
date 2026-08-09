'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Stats {
  fish: number;
  plants: number;
  equipment: number;
  careTopics: number;
}

interface StatsContextProps extends Stats {
  incrementFish: (delta?: number) => void;
  decrementFish: (delta?: number) => void;
  incrementPlants: (delta?: number) => void;
  decrementPlants: (delta?: number) => void;
  incrementEquipment: (delta?: number) => void;
  decrementEquipment: (delta?: number) => void;
  // optional setters for external components
  setFishCount?: (value: number) => void;
  setPlantsCount?: (value: number) => void;
  setEquipmentCount?: (value: number) => void;
}

const StatsContext = createContext<StatsContextProps | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [fish, setFish] = useState<number>(0);
  const [plants, setPlants] = useState<number>(0);
  const [equipment, setEquipment] = useState<number>(0);
  const [careTopics, setCareTopics] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const f = localStorage.getItem('fish');
    const p = localStorage.getItem('plants');
    const e = localStorage.getItem('equipment');
    const c = localStorage.getItem('careTopics');
    
    if (f) setFish(parseInt(f, 10));
    if (p) setPlants(parseInt(p, 10));
    if (e) setEquipment(parseInt(e, 10));
    if (c) setCareTopics(parseInt(c, 10));
    
    setIsInitialized(true);
  }, []);

  // Persist changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('fish', fish.toString());
    }
  }, [fish, isInitialized]);
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('plants', plants.toString());
    }
  }, [plants, isInitialized]);
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('equipment', equipment.toString());
    }
  }, [equipment, isInitialized]);
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('careTopics', careTopics.toString());
    }
  }, [careTopics, isInitialized]);

  const incrementFish = (delta = 1) => setFish((prev) => prev + delta);
  const decrementFish = (delta = 1) => setFish((prev) => Math.max(0, prev - delta));
  const setFishCount = (value: number) => setFish(value);
  const incrementPlants = (delta = 1) => setPlants((prev) => prev + delta);
  const decrementPlants = (delta = 1) => setPlants((prev) => Math.max(0, prev - delta));
  const setPlantsCount = (value: number) => setPlants(value);
  const incrementEquipment = (delta = 1) => setEquipment((prev) => prev + delta);
  const decrementEquipment = (delta = 1) => setEquipment((prev) => Math.max(0, prev - delta));
  const setEquipmentCount = (value: number) => setEquipment(value);

  // careTopics derived as sum of other counts
  useEffect(() => {
    setCareTopics(fish + plants + equipment);
  }, [fish, plants, equipment]);

  const value: StatsContextProps = {
    fish,
    plants,
    equipment,
    careTopics,
    incrementFish,
    decrementFish,
    incrementPlants,
    decrementPlants,
    incrementEquipment,
    decrementEquipment,
    // expose set functions
    // @ts-ignore adding optional properties
    setFishCount,
    // @ts-ignore
    setPlantsCount,
    // @ts-ignore
    setEquipmentCount,
  };

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

export const useStats = (): StatsContextProps => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};
