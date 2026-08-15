const fs = require('fs');
const content = fs.readFileSync('data/fish.ts', 'utf8');

const targets = ['loach', 'cichlid', 'platy', 'swordtail', 'tetra', 'gourami', 'tang', 'danio', 'clownfish', 'mandarin'];
targets.forEach(t => {
  const matches = content.toLowerCase().includes(t);
  console.log(`Contains "${t}": ${matches}`);
});
