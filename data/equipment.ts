import { Equipment } from "../lib/types";

export const equipmentData: Equipment[] = [
  {
    "id": "e-0",
    "slug": "canister-filter",
    "name": "Canister Filter",
    "category": "Filtration",
    "description": "An external filter that sits beneath the aquarium and provides powerful mechanical, chemical, and biological filtration. Canister filters force water through custom chambers containing media, offering high volume capacity and customizable configurations.",
    "purpose": "Provides high-capacity mechanical, biological, and optional chemical filtration for medium-to-large aquariums, when appropriately sized and maintained.",
    "howItWorks": "Water is siphoned out of the tank via an intake tube, pumped through a sealed canister containing layers of filter sponges, carbon, and ceramic bio-rings, and then returned via an output spray bar or nozzle.",
    "suitableTanks": [
      "Freshwater",
      "Saltwater",
      "Planted"
    ],
    "maintenance": "Rinse mechanical media and gently clean biological media in removed aquarium water when flow decreases or the media becomes dirty. Follow the manufacturer’s maintenance schedule, and inspect seals and hoses regularly.",
    "beginnerMistakes": "Washing the biological media under chlorinated tap water, which instantly kills the beneficial nitrifying bacteria and crashes the nitrogen cycle.",
    "image": "/images/canister_filter.png"
  },
  {
    "id": "e-1",
    "slug": "sponge-filter",
    "name": "Sponge Filter",
    "category": "Filtration",
    "description": "A simple filter consisting of a porous sponge connected to an air pump. Sponge filters provide mechanical and biological filtration with gentle water flow, making them useful for community tanks, breeding setups, and aquariums with shrimp or fry.",
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
    "description": "An adjustable glass or polymer heating tube that goes entirely under the water. Heaters are commonly used for tropical aquariums to maintain a stable species-appropriate temperature and reduce temperature-related stress.",
    "purpose": "Maintains a stable, adjustable water temperature appropriate for the species being kept.",
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
    "description": "An LED fixture designed to provide a broad spectrum of light suitable for aquarium plants. Plant growth depends on appropriate light intensity and duration, not simply on a specific color spectrum.",
    "purpose": "Provides aquarium lighting suitable for plant growth when intensity, photoperiod, and spectrum are appropriate, while also illuminating the aquarium for viewing.",
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
    "description": "A filtration device commonly used in marine aquariums to remove dissolved and particulate organic compounds before they are broken down by biological processes.",
    "purpose": "Helps export dissolved organic compounds and can support nutrient management in marine aquariums, especially reef systems.",
    "howItWorks": "Injects thousands of micro-bubbles into a reaction chamber. Organic waste molecules stick to the bubbles and rise to the top, forming a dirty foam that spills into a collection cup.",
    "suitableTanks": [
      "Saltwater"
    ],
    "maintenance": "Empty and rinse the collection cup weekly. Wipe down the neck of the reaction chamber to ensure smooth bubble rise.",
    "beginnerMistakes": "Using a standard marine protein skimmer in freshwater without confirming that the model is designed for it; foam fractionation is generally much more effective in saltwater.",
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
    "beginnerMistakes": "Replacing the entire filter cartridge on a fixed schedule without preserving established biological media can remove beneficial bacteria and may contribute to ammonia or nitrite spikes.",
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
    "purpose": "Uses the gravel bed as a biological filtration surface while drawing water through the substrate.",
    "howItWorks": "Draws water down through the gravel bed, where nitrifying bacteria consume waste, and pushes the filtered water back up through the vertical tubes.",
    "suitableTanks": [
      "Freshwater"
    ],
    "maintenance": "Requires regular, thorough gravel vacuuming to prevent detritus and fish waste from clogging the gravel bed and choking biological filtration.",
    "beginnerMistakes": "Using this filter without considering the needs of a heavily planted substrate; dense roots can complicate maintenance and some planted layouts are better served by other filtration methods.",
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
    "purpose": "Can help reduce free-floating algae and some waterborne microorganisms when the UV dose, flow rate, and exposure time are appropriate. It does not sterilize an aquarium or replace normal disease prevention and treatment.",
    "howItWorks": "UV-C radiation disrupts the DNA of microscopic cells passing through the sterilizer chamber, neutralizing algae and disease-causing pathogens.",
    "suitableTanks": [
      "Freshwater",
      "Saltwater",
      "Planted"
    ],
    "maintenance": "Replace the UV lamp according to the manufacturer’s recommended service interval and clean the quartz sleeve as needed to maintain UV transmission.",
    "beginnerMistakes": "Running water through the sterilizer at too high of a flow rate, which does not allow enough exposure time to kill target parasites.",
    "image": "/images/UV Sterilizer.png"
  },
  {
    "id": "e-10",
    "slug": "titanium-heater",
    "name": "Titanium Heater",
    "category": "Heating",
    "description": "A durable aquarium heater that uses a titanium heating element and is commonly paired with an external temperature controller for precise temperature management.",
    "purpose": "Provides durable heating for aquariums where a titanium heater and external temperature controller are appropriate, including many larger or marine systems.",
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
    "category": "Cooling",
    "description": "A refrigeration unit that cools aquarium water. Chillers can be useful when ambient temperatures or equipment heat make it difficult to maintain the required temperature.",
    "purpose": "Cools aquarium water to maintain a stable temperature when ambient conditions or equipment heat cause the aquarium to run too warm.",
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
    "purpose": "Provides broad, even light coverage for planted aquariums and some marine applications, depending on the bulb and fixture.",
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
    "purpose": "Provides high-output, reef-oriented lighting with blue, violet, and other wavelengths selected to support photosynthetic corals and enhance coral coloration.",
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
    "purpose": "Provides low-intensity viewing light for observing nocturnal aquarium activity. It should be used sparingly and turned off for a regular period of darkness.",
    "howItWorks": "Emits low-intensity blue light for optional nighttime viewing; it should not be treated as a replacement for a normal day/night lighting cycle.",
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
    "description": "An external pump that pushes atmospheric air through airline tubing. It powers air-driven equipment such as sponge filters and air stones and can increase surface agitation and gas exchange.",
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
    "description": "A porous aquarium diffuser connected to an air pump that breaks incoming air into bubbles, increasing surface agitation and gas exchange.",
    "purpose": "Breaks compressed air into thousands of tiny bubbles, increasing surface area contact and water circulation.",
    "howItWorks": "Forces air through microscopic pores in the stone, creating bubbles that rise to the surface, creating upward water current.",
    "suitableTanks": [
      "Freshwater",
      "Planted"
    ],
    "maintenance": "Clean or replace the air stone when it becomes clogged. If disinfecting with bleach, use an appropriate dilute solution and thoroughly rinse and dechlorinate the stone before returning it to the aquarium.",
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
    "howItWorks": "Uses a one-way internal mechanism that allows air to travel toward the aquarium while preventing water from flowing backward through the airline.",
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