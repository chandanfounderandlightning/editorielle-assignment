const camelToSnakeCase = (propertyName: string) => propertyName
  .replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`,
  );

const snakeToCamelCase = (propertyName: string) => propertyName
  .toLowerCase()
  .replace(/([-_][a-z])/g, (group) => group
    .toUpperCase()
    .replace('-', '')
    .replace('_', ''));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseObjectPropertiesToSnakeCase = (object: any): any => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return [camelToSnakeCase(key), value];
      }
      const parsedNestedObject = parseObjectPropertiesToSnakeCase(value);
      return [camelToSnakeCase(key), parsedNestedObject];
    }),
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseObjectPropertiesToCamelCase = (object: any): any => {
  if (!object) {
    return;
  }
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return [snakeToCamelCase(key), value];
      }
      const parsedNestedObject = parseObjectPropertiesToCamelCase(value);
      return [snakeToCamelCase(key), parsedNestedObject];
    }),
  );
};

export const prepareFontFamilyNames = (fontDetails: object) => {
  const fonts = Object.values(fontDetails);
  return fonts.map((font) => font.value.replace(/ /g, '_'));
}
