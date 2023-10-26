const tokens = require('./tokens.json');
const matchNestedKeyValueRegex = /\{([^)]+)}/g

const typographyPropertyKeyReplacement = {
  fontFamilies: 'fontFamily',
  fontWeights: 'fontWeight',
  lineHeights: 'lineHeight',
  paragraphIndent: 'marginLeft',
  textCase: 'textTransform',
}
const pixelValueFields = ['lineHeight', 'fontSize', 'letterSpacing']
const fontVars = ['primaryFont', 'secondaryFont', 'sideFont']
const figmaTokensToStyleDictionary = (tokenJSON = tokens) => {
  const figmaTokens = Object.values(tokenJSON) && Object.values(tokenJSON).length && Object.values(tokenJSON)[0]
  const typographyTokens = {}
  const colorTokens = {}
  const fontFamilyTokens = {}
  const fontSizeTokens = {}
  const lineHeightTokens = {}
  const borderRadiusTokens = {}
  const boxShadowTokens = {}
  const typographyKeys = ['Heading', 'Body', 'Utility']
  const paletteKeys = ['bg', 'Brand', 'text', 'Field', 'Support', 'Icon', 'UI Base', 'Link', 'Button', 'ring'];

  Object.keys(figmaTokens).forEach(key => {
    const figmaToken = figmaTokens[key]
    if (typographyKeys.includes(key)) {
      Object.keys(figmaToken).forEach(nestedKey => {
        typographyTokens[nestedKey] = mapTypographyKeyValueTokenPairs(
          figmaTokens,
          figmaToken[nestedKey],
        )
      })
      return;
    }
    if (paletteKeys.includes(key)) {
      Object.keys(figmaToken).forEach(nestedKey => {
        const keyName = nestedKey.toLowerCase().replace(' ','-');
        Object.keys(figmaToken[keyName]).forEach(nestedKeySecondary => {
          const secondaryKeyName = `${keyName.toLowerCase()}-${nestedKeySecondary}`;
          if (!colorTokens[secondaryKeyName] ) {
            colorTokens[secondaryKeyName]  = {};
          }
          colorTokens[secondaryKeyName] = figmaToken[nestedKey][nestedKeySecondary].value;
        })
      })
    }
    if (key === 'fontFamilies') {
      Object.keys(figmaToken).forEach((nestedKey, idx) => {
        const keyName = nestedKey.toLowerCase().replace(' ','-');
        fontFamilyTokens[keyName] = {
          var: `var(--font-${fontVars[idx]})`,
          value: figmaToken[nestedKey].value,
        };
      })
    }
    if (key === 'fontSize') {
      Object.keys(figmaToken).forEach(nestedKey => {
        const keyName = nestedKey.toLowerCase().replace(' ','-');
        fontSizeTokens[keyName] = `${figmaToken[nestedKey].value}px`;
      })
    }
    if (figmaToken.type === 'borderRadius') {
      if (figmaToken.value.includes('%')) {
        borderRadiusTokens[key] = figmaToken.value;
      } else {
        borderRadiusTokens[key] = `${figmaToken.value}px`;
      }
    }
    if (key === 'Shadow') {
      Object.keys(figmaToken).forEach(nestedKey => {
        const keyName = nestedKey.toLowerCase().replace(' ','-');
        const {
          x, y, blur, spread, color,
        } = figmaToken[nestedKey].value;
        boxShadowTokens[keyName] = `${x}px ${y}px ${blur}px ${spread}px ${color}`;
      })
    }
    if (key === 'lineHeights') {
      Object.keys(figmaToken).forEach(nestedKey => {
        lineHeightTokens[nestedKey] = `${figmaToken[nestedKey].value}px`;
      })
    }
  })
  return {
    typography: typographyTokens,
    colors: colorTokens,
    fontFamilies: fontFamilyTokens,
    fontSize: fontSizeTokens,
    borderRadius: borderRadiusTokens,
    boxShadow: boxShadowTokens,
    lineHeight: lineHeightTokens,
  }
}

const mapTypographyKeyValueTokenPairs = (figmaTokens, figmaToken) => {
  const typographyToken = {}
  Object.values([figmaToken.value]).forEach(value => {
    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
      const matches = nestedValue.match(matchNestedKeyValueRegex)
      if (matches) {
        matches.forEach(match => {
          const {
            typographyKey,
            typographyNestedKey,
            replacedKey,
          } = getTypographyKeySetFromMatch(match);

          switch (replacedKey) {
          case 'fontFamily':
            const varValue = getScssVarValueFromTokenValue(figmaTokens[typographyKey][typographyNestedKey].value)
            typographyToken[replacedKey] = varValue;
            break;
          case 'paragraphSpacing':
            typographyToken['marginTop'] = `${figmaTokens[typographyKey][typographyNestedKey].value}px`;
            typographyToken['marginBottom'] = `${figmaTokens[typographyKey][typographyNestedKey].value}px`;
            break;
          case 'lineHeight':
          case 'fontSize':
          case 'letterSpacing':
            typographyToken[replacedKey] = `${figmaTokens[typographyKey][typographyNestedKey].value}px`;
            break;
          default:
            typographyToken[replacedKey] = figmaTokens[typographyKey][typographyNestedKey].value;
            break;
          }
        })
      } else {
        typographyToken[nestedKey] = nestedValue
      }
    })
  })
  return typographyToken
}


function getScssVarValueFromTokenValue (valueToConvertToVar) {
  const valueToConvertToVarSplit = valueToConvertToVar.split(' ')
  const camelCaseValue = valueToConvertToVarSplit.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase()
    }
    return word.charAt(0).toUpperCase() + word.slice(1)
  })
  const camelCaseValueString = camelCaseValue.join('')
  return `var(--font-${camelCaseValueString})`
}

function getTypographyKeySetFromMatch (match) {
  const slicedMatch = match.slice(1, -1)
  const splitMatch = slicedMatch.split(".")
  const typographyKey = splitMatch[0]
  const typographyNestedKey = splitMatch[1]
  const replacedKey = typographyPropertyKeyReplacement[typographyKey] || typographyKey;
  return {
    typographyKey,
    typographyNestedKey,
    replacedKey,
  }
}



module.exports = {
  figmaTokensToStyleDictionary,
}
