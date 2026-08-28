import { fishData } from "@/data/fish";
import { plantData } from "@/data/plants";
import { equipmentData } from "@/data/equipment";

/**
 * Resolves a fish species name or slug to its correct path.
 * If not found, falls back to the fish directory.
 */
export function getFishLink(nameOrSlug: string): string {
  const clean = nameOrSlug.trim().toLowerCase();
  
  // Find by slug first
  let fish = fishData.find(f => f.slug?.toLowerCase() === clean);
  
  // Find by name if slug didn't match
  if (!fish) {
    fish = fishData.find(f => f.name.toLowerCase() === clean || f.scientificName?.toLowerCase() === clean);
  }
  
  // Fallback search by partial name match
  if (!fish) {
    fish = fishData.find(f => f.name.toLowerCase().includes(clean) || clean.includes(f.name.toLowerCase()));
  }

  if (fish && fish.category && fish.slug) {
    return `/fish/${fish.category.toLowerCase()}/${fish.slug}`;
  }
  
  return "/fish";
}

/**
 * Resolves an aquatic plant name or slug to its correct path.
 * If not found, falls back to the plants catalog.
 */
export function getPlantLink(nameOrSlug: string): string {
  const clean = nameOrSlug.trim().toLowerCase();
  
  let plant = plantData.find(p => p.slug?.toLowerCase() === clean);
  
  if (!plant) {
    plant = plantData.find(p => p.name.toLowerCase() === clean || p.scientificName?.toLowerCase() === clean);
  }
  
  if (!plant) {
    plant = plantData.find(p => p.name.toLowerCase().includes(clean) || clean.includes(p.name.toLowerCase()));
  }

  if (plant && plant.slug) {
    return `/plants/${plant.slug}`;
  }
  
  return "/plants";
}

/**
 * Resolves an equipment gear name or slug to its correct path.
 * If not found, falls back to the equipment catalog.
 */
export function getEquipmentLink(nameOrSlug: string): string {
  const clean = nameOrSlug.trim().toLowerCase();
  
  let eq = equipmentData.find(e => e.slug?.toLowerCase() === clean);
  
  if (!eq) {
    eq = equipmentData.find(e => e.name.toLowerCase() === clean);
  }
  
  if (!eq) {
    eq = equipmentData.find(e => e.name.toLowerCase().includes(clean) || clean.includes(e.name.toLowerCase()));
  }

  if (eq && eq.slug) {
    return `/equipment/${eq.slug}`;
  }
  
  return "/equipment";
}
