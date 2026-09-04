// Client-side local storage helper utility for Roshan Aquva World

export const isClient = typeof window !== 'undefined';

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    if (!isClient) return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    if (!isClient) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  },

  remove(key: string): void {
    if (!isClient) return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clearAll(): void {
    if (!isClient) return;
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
};

// Key Definitions
export const KEYS = {
  CHECKLIST: 'roshanaquva_checklist',
  MAINTENANCE: 'roshanaquva_maintenance',
  ACHIEVEMENTS: 'roshanaquva_achievements',
  AQUASCAPE: 'roshanaquva_aquascape',
  SAVED_STOCK: 'roshanaquva_saved_stock'
};

// Achievement Unlocking Utility
export const unlockAchievement = (achievementId: string): boolean => {
  if (!isClient) return false;
  try {
    const achievements = storage.get<string[]>(KEYS.ACHIEVEMENTS, []);
    if (!achievements.includes(achievementId)) {
      const updated = [...achievements, achievementId];
      storage.set(KEYS.ACHIEVEMENTS, updated);
      
      // Dispatch a custom event to notify components immediately
      const event = new CustomEvent('achievementUnlocked', { detail: achievementId });
      window.dispatchEvent(event);
      return true;
    }
  } catch (err) {
    console.error("Error unlocking achievement:", err);
  }
  return false;
};
