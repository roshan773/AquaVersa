import { Equipment } from "../lib/types";

export const equipmentData: Equipment[] = [
  {
    "id": "e-0",
    "slug": "canister-filter",
    "name": "Canister Filter",
    "category": "Filtration",
    "description": "An external filter that sits beneath the aquarium and provides powerful mechanical, chemical, and biological filtration. Canister filters force water through custom chambers containing media, offering high volume capacity and customizable configurations.",
    "purpose": "Provides high-capacity, heavy-duty filtration for medium-to-large setups, maintaining pristine water clarity and high biological stability.",
    "howItWorks": "Water is siphoned out of the tank via an intake tube, pumped through a sealed canister containing layers of filter sponges, carbon, and ceramic bio-rings, and then returned via an output spray bar or nozzle.",
    "suitableTanks": [
      "Freshwater",
      "Saltwater",
      "Planted"
    ],
    "maintenance": "Rinse the mechanical sponges and biological media in bucketed tank water (never tap water!) every 2-3 months. Check seals and apply silicone lubricant if needed to prevent leaks.",
    "beginnerMistakes": "Washing the biological media under chlorinated tap water, which instantly kills the beneficial nitrifying bacteria and crashes the nitrogen cycle.",
    "image": "/images/canister_filter.png"
  },
  {
    "id": "e-1",
    "slug": "sponge-filter",
    "name": "Sponge Filter",
    "category": "Filtration",
    "description": "A simple, highly effective filter consisting of a foam block connected to an air pump. Sponge filters provide excellent biological filtration and gentle water flow, making them a favorite for breeders and shrimp keepers.",
    "purpose": "Offers gentle biological filtration and safety for delicate aquatic life like shrimp, fry (baby fish), and long-finned Bettas.",
    "howItWorks": "An air pump pushes air down into the filter column, and as bubbles rise up, they draw water through the porous sponge block. Nitrifying bacteria colonize the sponge surface and clean the water.",
    "suitableTanks": [
      "Freshwater",
      "Planted"
    ],
    "maintenance": "Squeeze out the sponge inside a bucket of siphoned tank water during your bi-weekly or monthly water change. Do not use tap water.",
    "beginnerMistakes": "Buying a sponge filter without realizing it requires an external air pump and airline tubing to function, or washing it in tap water.",
    "image": "/images/sponge_filter.png"
  },
  {
    "id": "e-2",
    "slug": "submersible-aquarium-heater",
    "name": "Submersible Aquarium Heater",
    "category": "Heating",
    "description": "An adjustable glass or polymer heating tube that goes entirely under the water. Heaters are essential for tropical aquariums, keeping water temperatures stable to prevent stress and disease like Ich.",
    "purpose": "Maintains a constant, warm water temperature (typically 75-80°F) tailored to tropical fish requirements.",
    "howItWorks": "Uses an internal thermostat to monitor water temperature, cycling a resistive metal heating element on and off to maintain the dial setting.",
    "suitableTanks": [
      "Freshwater",
      "Saltwater",
      "Planted"
    ],
    "maintenance": "Periodically unplug and wipe down to remove mineral deposits. Ensure it is unplugged for at least 15-20 minutes before water changes so it does not crack when exposed to air.",
    "beginnerMistakes": "Leaving the heater plugged in during water changes when the water level drops, causing the glass to overheat and shatter or burn out.",
    "image": "/images/submersible_aquarium_heater.png"
  },
  {
    "id": "e-3",
    "slug": "full-spectrum-led-plant-light",
    "name": "Full Spectrum LED Plant Light",
    "category": "Lighting",
    "description": "A slim, modern LED fixture emitting light in the blue, red, and green spectrums. Full spectrum LEDs simulate natural sunlight, which is essential for photosynthesis in live aquatic plants.",
    "purpose": "Promotes healthy, dense growth in live aquatic plants while bringing out the natural, vibrant coloration of fish.",
    "howItWorks": "Utilizes rows of specialized diodes that emit light at targeted wavelengths (PAR) needed by plants, controllable via built-in timers or smartphone apps.",
    "suitableTanks": [
      "Freshwater",
      "Planted"
    ],
    "maintenance": "Wipe the light splash guard clean weekly to remove salt creep or dust. Ensure ventilation vents are clear of dust.",
    "beginnerMistakes": "Running the light for 12+ hours a day to 'grow plants faster,' which instead triggers massive, uncontrollable algae blooms.",
    "image": "/images/full_spectrum_led_plant_light.png"
  },
  {
    "id": "e-4",
    "slug": "protein-skimmer",
    "name": "Protein Skimmer",
    "category": "Filtration",
    "description": "A core filtration piece for marine systems. Protein skimmers remove dissolved organic waste products from the water column before they break down into toxic ammonia and nitrates.",
    "purpose": "Maintains ultra-clean, low-nutrient water required by delicate saltwater corals and fish.",
    "howItWorks": "Injects thousands of micro-bubbles into a reaction chamber. Organic waste molecules stick to the bubbles and rise to the top, forming a dirty foam that spills into a collection cup.",
    "suitableTanks": [
      "Saltwater"
    ],
    "maintenance": "Empty and rinse the collection cup weekly. Wipe down the neck of the reaction chamber to ensure smooth bubble rise.",
    "beginnerMistakes": "Attempting to use a protein skimmer in a freshwater tank, where water chemistry prevents micro-bubbles from forming and the device fails to produce foam.",
    "image": "/images/protein_skimmer.png"
  },
  {
    "id": "e-5",
    "slug": "hang-on-back-filter",
    "name": "Hang-On-Back Filter (HOB)",
    "category": "Filtration",
    "description": "A classic, beginner-friendly filter that hangs on the back glass of the tank. It draws water up a tube, filters it through vertical cartridges, and returns it over a waterfall lip, oxygenating the surface.",
    "purpose": "Provides highly convenient mechanical, chemical, and biological filtration for small-to-medium aquariums.",
    "howItWorks": "An internal impeller pump pulls water up, forces it through a cartridge containing floss and carbon, and flows it back over a spillway.",
    "suitableTanks": [
      "Freshwater",
      "Planted"
    ],
    "maintenance": "Rinse the cartridge in tank water monthly, or replace the mechanical floss block. Keep bio-sponges in the chamber untouched to preserve bacteria.",
    "beginnerMistakes": "Replacing the entire cartridge with a brand new one every month, which throws away the main colony of beneficial bacteria, triggering ammonia spikes.",
    "image": "/images/hang_on_back_filter.png"
  },
  {
    "id": "e-6",
    "slug": "internal-power-filter",
    "name": "Internal Power Filter",
    "category": "Filtration",
    "description": "A compact filtration unit that sits entirely inside the aquarium, submerged under the water. It is ideal for small setups, breeding tanks, or to supplement water circulation.",
    "purpose": "Provides quick mechanical filtration and customizable water current direction in small-to-medium aquariums.",
    "howItWorks": "A built-in motor pulls water through the bottom intake vents, pushes it through carbon and sponges inside the body, and expels it via an output nozzle.",
    "suitableTanks": [
      "Freshwater",
      "Planted"
    ],
    "maintenance": "Remove the unit and clean the impeller and sponge block monthly inside bucketed tank water to maintain proper water flow.",
    "beginnerMistakes": "Placing the nozzle too close to delicate plants or small fish, creating strong currents that blow them around and cause stress.",
    "image": "/images/internal_power_filter.png"
  },
  {
    "id": "e-7",
    "slug": "undergravel-filter",
    "name": "Undergravel Filter",
    "category": "Filtration",
    "description": "An older filtration style consisting of a slotted plastic plate beneath the gravel substrate, connected to vertical uplift tubes powered by air bubbles or powerheads.",
    "purpose": "Uses the entire gravel bed as a massive biological filter, keeping the water clear and biological activity high.",
    "howItWorks": "Draws water down through the gravel bed, where nitrifying bacteria consume waste, and pushes the filtered water back up through the vertical tubes.",
    "suitableTanks": [
      "Freshwater"
    ],
    "maintenance": "Requires regular, thorough gravel vacuuming to prevent detritus and fish waste from clogging the gravel bed and choking biological filtration.",
    "beginnerMistakes": "Using this filter in heavily planted tanks. Root structures will clog the plates, and the downward water draw deprives plant roots of nutrients.",
    "image": "/images/undergravel_filter.png"
  },
  {
    "id": "e-8",
    "slug": "fluidized-bed-filter",
    "name": "Fluidized Bed Filter",
    "category": "Filtration",
    "description": "An advanced filter chamber filled with sand or micro-beads suspended in a vertical column of moving water. This constant movement creates a massive surface area for biological bacteria.",
    "purpose": "Provides extreme biological filtration capacity, ideal for aquariums with very high bioloads or large predatory fish.",
    "howItWorks": "Water is pumped upward through the media column at a rate that suspends and rotates the sand grains, preventing packing and ensuring high oxygen contact.",
    "suitableTanks": [
      "Freshwater",
      "Saltwater"
    ],
    "maintenance": "Ensure water flow rates are consistent so the media stays suspended without escaping the outflow. Check for flow drops monthly.",
    "beginnerMistakes": "Failing to clean pre-filters, which causes the water flow to slow down, packing the media bed and causing biological bacteria to suffocate.",
    "image": "/images/fluidized_bed_filter.png"
  },
  {
    "id": "e-9",
    "slug": "uv-sterilizer",
    "name": "UV Sterilizer",
    "category": "Filtration",
    "description": "A sealed tube containing a ultraviolet-C emitting bulb. Water is pumped slowly through the tube, exposing suspended pathogens and algae spores to UV light.",
    "purpose": "Eliminates green water blooms (unicellular algae) and controls waterborne parasites, bacteria, and pathogens without chemicals.",
    "howItWorks": "UV-C radiation disrupts the DNA of microscopic cells passing through the sterilizer chamber, neutralizing algae and disease-causing pathogens.",
    "suitableTanks": [
      "Freshwater",
      "Saltwater",
      "Planted"
    ],
    "maintenance": "Replace the UV bulb every 9-12 months, as the UV output drops over time. Clean the quartz sleeve to remove mineral buildups.",
    "beginnerMistakes": "Running water through the sterilizer at too high of a flow rate, which does not allow enough exposure time to kill target parasites.",
    "image": "/images/UV Sterilizer.png"
  },
  {
    "id": "e-10",
    "slug": "titanium-heater",
    "name": "Titanium Heater",
    "category": "Heating",
    "description": "A highly durable heater made of corrosion-resistant titanium, connected to an external temperature controller. It is shatterproof and highly reliable.",
    "purpose": "Provides highly accurate and safe water heating for large saltwater reef systems or aggressive fish tanks.",
    "howItWorks": "The titanium probe heats the water, while an external digital controller monitors temperature via a separate sensor probe, cutting power if safety thresholds are crossed.",
    "suitableTanks": [
      "Saltwater",
      "Freshwater"
    ],
    "maintenance": "Clean the temperature sensor probe monthly to prevent calcium scaling, which can cause inaccurate readings.",
    "beginnerMistakes": "Forgetting to mount the separate temperature sensor probe in a high-flow area of the tank, causing the heater to run continuously and overheat the aquarium.",
    "image": "/images/Titanium Heater.png"
  },
  {
    "id": "e-11",
    "slug": "inline-heater",
    "name": "Inline Heater",
    "category": "Heating",
    "description": "A heater that splice-connects directly into the outflow tubing of an external canister filter, heating the water as it returns to the aquarium.",
    "purpose": "Eliminates unsightly hardware inside the display tank while providing uniform, consistent heating.",
    "howItWorks": "As water flows through the internal heating tube, a thermal sensor adjusts the output to match the desired temperature.",
    "suitableTanks": [
      "Freshwater",
      "Planted"
    ],
    "maintenance": "Clean the internal tube with a brush annually during canister filter cleanouts to remove algae or organic film scaling.",
    "beginnerMistakes": "Installing the unit on the intake line instead of the outflow line, causing dirty water to deposit debris inside the heater chamber.",
    "image": "/images/Inline Heater.png"
  },
  {
    "id": "e-12",
    "slug": "aquarium-chiller",
    "name": "Aquarium Chiller",
    "category": "Heating",
    "description": "A refrigeration unit that cools water. Chillers are critical in warm climates or for setups with high-heat lighting, preventing lethal heat spikes.",
    "purpose": "Cools down tank water to maintain stable temperatures for coldwater species or delicate reef corals.",
    "howItWorks": "Pumps aquarium water through a titanium cooling loop inside the unit, cooling the water before returning it to the tank.",
    "suitableTanks": [
      "Saltwater",
      "Freshwater"
    ],
    "maintenance": "Clean the air intake dust filters monthly and ensure the cooling unit has adequate ventilation to expel heat.",
    "beginnerMistakes": "Placing the chiller inside a closed cabinet without ventilation, causing it to overheat and fail to cool the tank.",
    "image": "/images/Aquarium Chiller.png"
  },
  {
    "id": "e-13",
    "slug": "t5-fluorescent-fixture",
    "name": "T5 Fluorescent Fixture",
    "category": "Lighting",
    "description": "A high-output fluorescent lighting system that provides excellent, diffuse light spread. Traditionally used for planted tanks and marine reef systems.",
    "purpose": "Delivers uniform, shadowless light coverage that stimulates deep photosynthesis in corals and plants.",
    "howItWorks": "Electricity excites gas inside T5 fluorescent tubes, causing them to emit light, modified by polished reflectors to focus light downward.",
    "suitableTanks": [
      "Planted",
      "Saltwater"
    ],
    "maintenance": "Replace the T5 bulbs every 8-12 months, as their spectrum and output shift, encouraging nuisance algae growth.",
    "beginnerMistakes": "Not replacing the bulbs until they burn out completely, resulting in poor plant or coral growth due to spectral decay.",
    "image": "/images/T5 Fluorescent Fixture.png"
  },
  {
    "id": "e-14",
    "slug": "metal-halide-light",
    "name": "Metal Halide Light",
    "category": "Lighting",
    "description": "An intense, high-output lighting fixture that generates bright, shimmering light resembling natural sunlight. It is traditional for deep reef tanks.",
    "purpose": "Provides intense light penetration for very deep aquariums and creates natural light shimmer (glimmer lines) in marine setups.",
    "howItWorks": "Passes an electrical arc through a gas mixture, producing extremely bright point-source light.",
    "suitableTanks": [
      "Saltwater"
    ],
    "maintenance": "Must replace bulbs annually. Keep safety glass shields clean. Wipe away dust from large cooling fans.",
    "beginnerMistakes": "Mounting the light too close to the water surface, transferring massive heat and risking water splashing onto the hot bulb, causing it to explode.",
    "image": "/images/Metal Halide Light.png"
  },
  {
    "id": "e-15",
    "slug": "led-reef-light",
    "name": "LED Reef Light",
    "category": "Lighting",
    "description": "A specialized LED fixture emitting intense blue and UV light wavelengths. It is designed specifically to stimulate photosynthesis and fluorescence in marine corals.",
    "purpose": "Provides corals with the exact light spectrum required for growth (zooxanthellae photosynthesis) while highlighting coral colors.",
    "howItWorks": "Combines deep blue, royal blue, violet, and UV LED diodes to create an optimized 'actinic' spectrum.",
    "suitableTanks": [
      "Saltwater"
    ],
    "maintenance": "Wipe off salt creep from the lens plate monthly. Check that cooling fans are spinning freely.",
    "beginnerMistakes": "Blasting the new light at 100% intensity immediately, which causes severe coral bleaching and tissue damage. Use a slow 'acclimation mode'.",
    "image": "/images/LED Reef Light.png"
  },
  {
    "id": "e-16",
    "slug": "moonlight-leds",
    "name": "Moonlight LEDs",
    "category": "Lighting",
    "description": "Low-intensity blue LED lights that simulate the gentle glow of the moon, allowing for night-time observation of nocturnal aquatic species.",
    "purpose": "Permits viewing of nocturnal behaviors (like catfish feeding or coral spawning) without disturbing species' natural sleep cycles.",
    "howItWorks": "Emits low-lumen, deep blue light (typically 450-460nm) to simulate moon phases.",
    "suitableTanks": [
      "Freshwater",
      "Saltwater"
    ],
    "maintenance": "Wipe away dust and salt creep. Set on a timer to turn off after a few hours of night viewing.",
    "beginnerMistakes": "Leaving moonlights on all night long, which deprives fish of complete darkness, disrupting their circadian rhythms and causing chronic stress.",
    "image": "/images/Moonlight LEDs.png"
  },
  {
    "id": "e-17",
    "slug": "air-pump",
    "name": "Air Pump",
    "category": "Aeration",
    "description": "An external electronic pump that pushes atmospheric air through airline tubing into the aquarium. It is essential for sponge filters and air stones.",
    "purpose": "Powers sponge filters, undergravel filters, and air stones, increasing surface agitation to facilitate oxygen exchange.",
    "howItWorks": "Uses a vibrating electromagnetic diaphragm to compress air and push it out through nozzle ports.",
    "suitableTanks": [
      "Freshwater",
      "Planted",
      "Saltwater"
    ],
    "maintenance": "Replace air filters yearly. Inspect diaphragms for cracks if air output drops.",
    "beginnerMistakes": "Placing the air pump below the aquarium water level without a check valve. If power fails, water will siphon back into the pump, causing short circuits or flooding.",
    "image": "/images/Air Pump.png"
  },
  {
    "id": "e-18",
    "slug": "air-stone",
    "name": "Air Stone",
    "category": "Aeration",
    "description": "A porous limestones or sand compound block connected to an air pump, producing a steady stream of fine, bubbling air.",
    "purpose": "Breaks compressed air into thousands of tiny bubbles, increasing surface area contact and water circulation.",
    "howItWorks": "Forces air through microscopic pores in the stone, creating bubbles that rise to the surface, creating upward water current.",
    "suitableTanks": [
      "Freshwater",
      "Planted"
    ],
    "maintenance": "Soak in a dilute bleach solution or vinegar every few months to remove organic films or calcium clogging, restoring bubble output.",
    "beginnerMistakes": "Allowing the air stone to get buried deep in substrate without cleaning, causing flow back-pressure that tears the air pump diaphragm.",
    "image": "/images/Air Stone.png"
  },
  {
    "id": "e-19",
    "slug": "check-valve",
    "name": "Check Valve",
    "category": "Aeration",
    "description": "A tiny, one-way plastic valve spliced into the air pump airline tubing, allowing air to flow forward but preventing water from flowing backward.",
    "purpose": "Protects air pumps from water damage and prevents tank water from siphoning onto the floor during power outages.",
    "howItWorks": "Utilizes a spring or rubber flapper that opens under air pressure, but immediately seals shut if water pressure flows backward.",
    "suitableTanks": [
      "Freshwater",
      "Planted",
      "Saltwater"
    ],
    "maintenance": "Inspect annually for cracks or mineral blockages. Verify that air flows only in the direction of the arrow.",
    "beginnerMistakes": "Installing the check valve backward, which blocks all air flow from reaching the aquarium.",
    "image": "/images/Check Valve.png"
  }
];
