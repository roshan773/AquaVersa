import { Router } from 'express';
import Equipment from '../models/equipment';
import Fish from '../models/fish';
import Plant from '../models/plant';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// GET all equipment with filters
router.get('/', async (req, res) => {
  try {
    const { search, category, brand } = req.query;
    const query: any = {};

    if (search) {
      query.$text = { $search: search as string };
    }
    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }

    const items = await Equipment.find(query);
    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST equipment recommendations calculations (Setup Assistant Sizing)
router.post('/recommend', async (req, res) => {
  try {
    const { volume, unit, fishIds = [], plantIds = [] } = req.body;

    if (!volume || isNaN(volume) || volume <= 0) {
      return res.status(400).json({ error: 'Please provide a valid tank volume' });
    }

    const volumeInGallons = unit === 'liters' ? volume / 3.78541 : volume;

    const fishes = fishIds.length > 0 ? await Fish.find({ _id: { $in: fishIds } }) : [];
    const plants = plantIds.length > 0 ? await Plant.find({ _id: { $in: plantIds } }) : [];

    const hasHeavyBioload = fishes.some(f => 
      f.commonName.toLowerCase().includes('goldfish') || 
      f.commonName.toLowerCase().includes('oscar') || 
      f.commonName.toLowerCase().includes('discus')
    );

    const multiplier = hasHeavyBioload ? 8 : 5;
    const minFlowRateGPH = Math.ceil(volumeInGallons * multiplier);
    const minFlowRateLPH = Math.ceil(minFlowRateGPH * 3.78541);

    let filterType = 'Hang-On-Back (HOB) Filter';
    let filterNotes = 'A Hang-On-Back filter is ideal for this size. Easy to maintain and provides good mechanical and chemical filtration.';

    if (volumeInGallons < 10) {
      filterType = 'Sponge Filter or Small HOB';
      filterNotes = 'Sponge filters are excellent for small tanks and gentle swimmers (like Bettas or shrimp) as they prevent fry from getting sucked in.';
    } else if (volumeInGallons > 45) {
      filterType = 'Canister Filter';
      filterNotes = 'For larger tanks, a canister filter provides superior biological filtration, customizable media slots, and cleaner tank aesthetics.';
    }

    if (hasHeavyBioload) {
      filterNotes += ' Note: Heavy bioload species are present. We recommend a filter with higher flow rates and frequent mechanical cleaning.';
    }

    const isColdwaterOnly = fishes.length > 0 && fishes.every(f => f.waterParams.tempMax < 22);
    const recommendedWattage = isColdwaterOnly ? 0 : Math.ceil(volumeInGallons * 4);
    
    let heaterNotes = `Recommended heater wattage is ${recommendedWattage}W (based on 4W per gallon) to maintain a tropical climate.`;
    if (isColdwaterOnly) {
      heaterNotes = 'Coldwater species present (e.g. Goldfish). A heater is generally not required unless your room temperature drops below 10°C (50°F).';
    } else if (recommendedWattage > 200) {
      heaterNotes += ' For tanks requiring >200W, we recommend splitting the wattage into two smaller heaters (e.g. two 150W heaters instead of one 300W) placed at opposite ends of the tank.';
    }

    const gravelWeightLbs = Math.ceil(volumeInGallons * 1.5);
    const gravelWeightKg = Math.ceil(gravelWeightLbs * 0.453592);
    const substrateNotes = `Approximately ${gravelWeightLbs} lbs (${gravelWeightKg} kg) of substrate will provide a 1.5-inch planting bed.`;

    let lightingLevel: 'Low' | 'Medium' | 'High' = 'Low';
    let co2Recommended = false;

    if (plants.length > 0) {
      const hasHighLight = plants.some(p => p.lightingNeeds === 'High');
      const hasMedLight = plants.some(p => p.lightingNeeds === 'Medium');
      if (hasHighLight) lightingLevel = 'High';
      else if (hasMedLight) lightingLevel = 'Medium';

      co2Recommended = plants.some(p => p.co2Needs === true);
    }

    const lightingNotes = lightingLevel === 'High' 
      ? 'High-intensity full-spectrum LED light is recommended. You will need a timer (8 hours/day) and nutrients to prevent algae.'
      : lightingLevel === 'Medium'
      ? 'Medium-intensity LED lighting suitable for most aquatic plants. Keep illuminated 8-10 hours daily.'
      : 'Low-intensity lighting is sufficient. Standard hood LEDs or ambient light will work fine.';

    const co2Notes = co2Recommended 
      ? 'CO2 injection system is strongly recommended. Some of your selected plants require supplemental CO2.'
      : 'Supplemental CO2 is not required. The plants selected are hardy.';

    // Fetch matched equipment items from the DB categories
    const recommendedFilters = await Equipment.find({ category: 'Filter', brand: { $exists: true } }).limit(2);
    const recommendedHeaters = await Equipment.find({ category: 'Heater' }).limit(2);
    const recommendedLights = await Equipment.find({ category: 'Lighting' }).limit(2);

    return res.json({
      sizing: {
        filter: { minFlowRateGPH, minFlowRateLPH, recommendedType: filterType, notes: filterNotes },
        heater: { recommendedWattage, isOptional: isColdwaterOnly, notes: heaterNotes },
        substrate: { gravelWeightLbs, gravelWeightKg, notes: substrateNotes },
        lighting: { level: lightingLevel, notes: lightingNotes },
        co2: { recommended: co2Recommended, notes: co2Notes }
      },
      recommendedProducts: {
        filters: recommendedFilters,
        heaters: recommendedHeaters,
        lighting: recommendedLights
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// GET single equipment by slug
router.get('/:slug', async (req, res) => {
  try {
    const item = await Equipment.findOne({ slug: req.params.slug })
      .populate('recommendedFish', 'commonName scientificName slug images difficulty');

    if (!item) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    return res.json(item);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create equipment (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const item = new Equipment(req.body);
    await item.save();
    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT update equipment (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Equipment not found' });
    return res.json(updated);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE equipment (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Equipment not found' });
    return res.json({ message: 'Equipment deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
