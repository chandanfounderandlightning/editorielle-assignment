const fs = require('fs');
const path = require('path');
const tokenConverter = require('./tokenConverter.js');
const tokenJSON = require('./tokens.json');

const theme = tokenConverter.figmaTokensToStyleDictionary();

const themePath = path.join(__dirname, '..', '..', 'common', 'theme', 'theme.json')
const coloursPath = path.join(__dirname, '..', '..', 'common', 'theme', 'colours.scss')
try {
  fs.writeFileSync(themePath, JSON.stringify(theme, null, 2));
} catch (err) {
  console.error(err);
  fs.writeFileSync(themePath, JSON.stringify({}, null, 2));
}

try {
  let content = '';
  const allowedProperties = ['bg', 'Field', 'text', 'ring', 'Support', 'Icon', 'UI Base', 'Link', 'Button'];
  const tokens = Object.values(tokenJSON) && Object.values(tokenJSON).length && Object.values(tokenJSON)[0];
  Object.entries(tokens).forEach(([key, key1Value]) => {
    if (allowedProperties.includes(key)) {
      Object.entries(key1Value).forEach(([nestedKey, nestedValue]) => {
        Object.keys(nestedValue).forEach(key2Value => {
          content += `$${nestedKey.replace(' ', '').toLowerCase()}-${key2Value}: ${nestedValue[key2Value].value};\n`;
        });
      });
    }
  });
  fs.writeFileSync(coloursPath, content);
} catch (err) {
  console.error(err);
  fs.writeFileSync(coloursPath, '');
}
