/* eslint-disable @typescript-eslint/naming-convention */
import {
  parseObjectPropertiesToCamelCase,
  parseObjectPropertiesToSnakeCase,
  prepareFontFamilyNames,
} from '@/common/utils/helpers';

describe('helpers', () => {
  describe('parseObjectPropertiesToSnakeCase', () => {
    it('should parse single property to snake_case', () => {
      const objectUnderTest = {
        someProperty: 'someValue',
      };
      const expectedResult = { some_property: 'someValue' };

      const result = parseObjectPropertiesToSnakeCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse single property that is single word to snake_case', () => {
      const objectUnderTest = {
        property: 'someValue',
      };
      const expectedResult = { property: 'someValue' };

      const result = parseObjectPropertiesToSnakeCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse single property has value of number', () => {
      const objectUnderTest = {
        someProperty: 1234,
      };
      const expectedResult = { some_property: 1234 };

      const result = parseObjectPropertiesToSnakeCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse single property has value of boolean', () => {
      const objectUnderTest = {
        someProperty: true,
      };
      const expectedResult = { some_property: true };

      const result = parseObjectPropertiesToSnakeCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse nested properties to snake_case', () => {
      const objectUnderTest = {
        someNestedProperty: {
          someProperty: 'someValue',
        },
      };
      const expectedResult = { some_nested_property: { some_property: 'someValue' } };

      const result = parseObjectPropertiesToSnakeCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse complex object to snake_case', () => {
      const objectUnderTest = {
        someProperty: 'someValue',
        someOtherProperty: 'someOtherValue',
        someThirdProperty: 'someThirdValue',
        somePropertyWithComplexObject: {
          someNestedProperty: 'someNestedValue',
        },
        somePropertyWithMoreComplexObject: {
          somePropertyWithComplexObject: {
            someNestedProperty: 'someNestedValue',
          },
        },
      };
      const expectedResult = {
        some_property: 'someValue',
        some_other_property: 'someOtherValue',
        some_third_property: 'someThirdValue',
        some_property_with_complex_object: {
          some_nested_property: 'someNestedValue',
        },
        some_property_with_more_complex_object: {
          some_property_with_complex_object: {
            some_nested_property: 'someNestedValue',
          },
        },
      };

      const result = parseObjectPropertiesToSnakeCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('parseObjectPropertiesToCamelCase', () => {
    it('should parse single property to camelCase', () => {
      const expectedResult = {
        someProperty: 'someValue',
      };
      const objectUnderTest = { some_property: 'someValue' };

      const result = parseObjectPropertiesToCamelCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse single property that is single word to camelCase', () => {
      const expectedResult = {
        property: 'someValue',
      };
      const objectUnderTest = { property: 'someValue' };

      const result = parseObjectPropertiesToCamelCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse single property has value of number', () => {
      const expectedResult = {
        someProperty: 1234,
      };
      const objectUnderTest = { some_property: 1234 };

      const result = parseObjectPropertiesToCamelCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse single property has value true of boolean', () => {
      const expectedResult = {
        someProperty: true,
      };
      const objectUnderTest = { some_property: true };

      const result = parseObjectPropertiesToCamelCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse single property has value false of boolean', () => {
      const expectedResult = {
        someProperty: false,
      };
      const objectUnderTest = { some_property: false };

      const result = parseObjectPropertiesToCamelCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse nested properties to camelCase', () => {
      const expectedResult = {
        someNestedProperty: {
          someProperty: 'someValue',
        },
      };
      const objectUnderTest = { some_nested_property: { some_property: 'someValue' } };

      const result = parseObjectPropertiesToCamelCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });

    it('should parse complex object to camelCase', () => {
      const expectedResult = {
        someProperty: 'someValue',
        someOtherProperty: 'someOtherValue',
        someThirdProperty: 'someThirdValue',
        somePropertyWithComplexObject: {
          someNestedProperty: 'someNestedValue',
        },
        somePropertyWithMoreComplexObject: {
          somePropertyWithComplexObject: {
            someNestedProperty: 'someNestedValue',
          },
        },
      };
      const objectUnderTest = {
        some_property: 'someValue',
        some_other_property: 'someOtherValue',
        some_third_property: 'someThirdValue',
        some_property_with_complex_object: {
          some_nested_property: 'someNestedValue',
        },
        some_property_with_more_complex_object: {
          some_property_with_complex_object: {
            some_nested_property: 'someNestedValue',
          },
        },
      };

      const result = parseObjectPropertiesToCamelCase(objectUnderTest);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('prepareFontFamilyNames', () => {
    it('should prepare array of font family names', () => {
      const inputObj = {
        primary: {
          value: 'Red Hat Text',
          var: 'var(--font-primaryFont)',
        },
        secondary: {
          value: 'Red Hat Display',
          var: 'var(--font-secondaryFont)',
        },
        side: {
          value: 'Fruktur',
          var: 'var(--font-sideFont)',
        },
      }
      const expectedResult = ['Red_Hat_Text', 'Red_Hat_Display', 'Fruktur'];
      const result = prepareFontFamilyNames(inputObj);

      expect(result).toEqual(expectedResult);
    });
  });
});
