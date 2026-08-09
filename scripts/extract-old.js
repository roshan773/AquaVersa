const fs = require('fs');
const readline = require('readline');

async function extractOldData() {
    const fileStream = fs.createReadStream('C:\\Users\\pakhr\\.gemini\\antigravity-ide\\brain\\e3b66ca0-acfc-45fe-bbd3-4c13f7ab55d9\\.system_generated\\logs\\transcript_full.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let fishDataFound = false;
    let equipDataFound = false;
    let oldFishStr = '';
    let oldEquipStr = '';

    for await (const line of rl) {
        if (line.includes('write_to_file')) {
            if (!fishDataFound && line.includes('data/fish.ts') && line.includes('export const fishData: Fish[] = [')) {
                try {
                    const parsed = JSON.parse(line);
                    const args = parsed.tool_calls[0].args;
                    if (args.TargetFile && args.TargetFile.includes('fish.ts')) {
                        const content = args.CodeContent;
                        // Extract array
                        const match = content.match(/export const fishData: Fish\[\] = (\[[\s\S]*?\]);/);
                        if (match) {
                            oldFishStr = match[1];
                            fishDataFound = true;
                        }
                    }
                } catch (e) {}
            }
            if (!equipDataFound && line.includes('data/equipment.ts') && line.includes('export const equipmentData: Equipment[] = [')) {
                try {
                    const parsed = JSON.parse(line);
                    const args = parsed.tool_calls[0].args;
                    if (args.TargetFile && args.TargetFile.includes('equipment.ts')) {
                        const content = args.CodeContent;
                        // Extract array
                        const match = content.match(/export const equipmentData: Equipment\[\] = (\[[\s\S]*?\]);/);
                        if (match) {
                            oldEquipStr = match[1];
                            equipDataFound = true;
                        }
                    }
                } catch (e) {}
            }
        }
    }

    if (fishDataFound && equipDataFound) {
        console.log("Found both old data sets!");
        fs.writeFileSync('C:\\Users\\pakhr\\OneDrive\\Desktop\\AquaVersa\\scripts\\old_data.js', 
            `module.exports = {\nfish: ${oldFishStr},\nequipment: ${oldEquipStr}\n};\n`
        );
    } else {
        console.log("Could not find them. fish:", fishDataFound, "equip:", equipDataFound);
    }
}

extractOldData();
