import { Router } from 'express';
import Fish from '../models/fish';

const router = Router();

// POST run compatibility checker
router.post('/check', async (req, res) => {
  try {
    const { fishIds } = req.body;
    if (!fishIds || !Array.isArray(fishIds) || fishIds.length < 2) {
      return res.status(400).json({ error: 'Please provide at least 2 fish IDs to check compatibility' });
    }

    const fishes = await Fish.find({ _id: { $in: fishIds } });
    if (fishes.length !== fishIds.length) {
      return res.status(404).json({ error: 'One or more selected fish species were not found' });
    }

    const reasons: string[] = [];
    let status: 'Compatible' | 'Caution' | 'Incompatible' = 'Compatible';

    // 1. Water Type Check
    const waterTypes = new Set(fishes.map(f => f.waterParams.waterType));
    if (waterTypes.size > 1) {
      status = 'Incompatible';
      reasons.push(`Water type mismatch: You are mixing ${Array.from(waterTypes).join(' and ')} species.`);
    }

    // 2. Temperature Overlap Check
    const tempMin = Math.max(...fishes.map(f => f.waterParams.tempMin));
    const tempMax = Math.min(...fishes.map(f => f.waterParams.tempMax));
    if (tempMin > tempMax) {
      status = 'Incompatible';
      reasons.push('Temperature mismatch: There is no overlapping temperature range.');
    } else if (tempMax - tempMin < 2) {
      if (status !== 'Incompatible') status = 'Caution';
      reasons.push(`Narrow temperature tolerance: The overlapping temperature window is narrow (${tempMin}°C - ${tempMax}°C).`);
    }

    // 3. pH Overlap Check
    const phMin = Math.max(...fishes.map(f => f.waterParams.phMin));
    const phMax = Math.min(...fishes.map(f => f.waterParams.phMax));
    if (phMin > phMax) {
      status = 'Incompatible';
      reasons.push('pH mismatch: The species require incompatible water acidity (pH) levels.');
    }

    // 4. Temperament Clashes
    const hasAggressive = fishes.some(f => f.temperament === 'Aggressive');
    const hasSemiAggressive = fishes.some(f => f.temperament === 'Semi-aggressive');
    const hasPeaceful = fishes.some(f => f.temperament === 'Peaceful');

    if (hasAggressive) {
      if (status !== 'Incompatible') status = 'Caution';
      reasons.push('Aggressive species present: Aggressive fish may attack or stress other tank mates.');
    } else if (hasSemiAggressive && hasPeaceful) {
      if (status !== 'Incompatible') status = 'Caution';
      reasons.push('Semi-aggressive species paired with peaceful species: Requires caution and plenty of hiding spots.');
    }

    // Specific rules (e.g. Bettas)
    const bettaCount = fishes.filter(f => f.scientificName.toLowerCase().includes('betta splendens')).length;
    if (bettaCount > 1) {
      status = 'Incompatible';
      reasons.push('Multiple Bettas cannot be housed together due to extreme territorial aggression.');
    }

    // 5. Size Differences
    for (let i = 0; i < fishes.length; i++) {
      for (let j = 0; j < fishes.length; j++) {
        if (i === j) continue;
        const fishA = fishes[i];
        const fishB = fishes[j];
        if (fishA.adultSize.cm > 3 * fishB.adultSize.cm && fishA.dietType !== 'Herbivore') {
          if (status !== 'Incompatible') status = 'Caution';
          const msg = `${fishA.commonName} is significantly larger than ${fishB.commonName} and may swallow it.`;
          if (!reasons.includes(msg)) {
            reasons.push(msg);
          }
        }
      }
    }

    // Min tank size recommendation
    const maxGal = Math.max(...fishes.map(f => f.minTankSize.gallons));
    const sumOtherGal = fishes.map(f => f.minTankSize.gallons).reduce((a, b) => a + b, 0) - maxGal;
    const recommendedGallons = Math.ceil(maxGal + sumOtherGal * 0.25);
    const recommendedLiters = Math.ceil(recommendedGallons * 3.78541);

    if (reasons.length === 0) {
      reasons.push('All species are fully compatible with overlapping water parameters and peaceful temperaments.');
    }

    return res.status(200).json({
      status,
      reasons,
      recommendedMinTankSize: {
        gallons: recommendedGallons,
        liters: recommendedLiters
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
