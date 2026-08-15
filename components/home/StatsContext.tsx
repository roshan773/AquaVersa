'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fishData } from '@/data/fish';
import { plantData } from '@/data/plants';
import { equipmentData } from '@/data/equipment';

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
  const [fish, setFish] = useState<number>(fishData.length);
  const [plants, setPlants] = useState<number>(plantData.length);
  const [equipment, setEquipment] = useState<number>(equipmentData.length);
  const [careTopics, setCareTopics] = useState<number>(fishData.length + plantData.length + equipmentData.length);

  const incrementFish = (delta = 1) => setFish((prev) => prev + delta);
  const decrementFish = (delta = 1) => setFish((prev) => Math.max(0, prev - delta));
  const setFishCount = (value: number) => setFish(value);
  
  const incrementPlants = (delta = 1) => setPlants((prev) => prev + delta);
  const decrementPlants = (delta = 1) => setPlants((prev) => Math.max(0, prev - delta));
  const setPlantsCount = (value: number) => setPlants(value);
  
  const incrementEquipment = (delta = 1) => setEquipment((prev) => prev + delta);
  const decrementEquipment = (delta = 1) => setEquipment((prev) => Math.max(0, prev - delta));
  const setEquipmentCount = (value: number) => setEquipment(value);

  // Derive careTopics when stats change
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
    setFishCount,
    setPlantsCount,
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
