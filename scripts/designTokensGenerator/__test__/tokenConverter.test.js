import {
  expected, inputData,
} from './test_data_theme.js';
import { figmaTokensToStyleDictionary } from "../tokenConverter";

describe('Token Converter', () => {
  it('should match theme snapshot', () => {
    const expectedResult = expected;
    const result = figmaTokensToStyleDictionary(inputData);

    expect(result).toEqual(expectedResult);
  })
})
