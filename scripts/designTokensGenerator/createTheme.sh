#!/bin/bash

# generate theme object in json and colours.scss
node ./scripts/designTokensGenerator/generateTheme.js

# generate theme.scss

npm run generate-scss-theme

sed 's/"var(\(--[a-zA-Z0-9-]*\))"/var(\1)/g' ../../common/theme/theme.scss > ../../common/theme/theme2.scss
mv -f ../../common/theme/theme2.scss ../../common/theme/theme.scss
