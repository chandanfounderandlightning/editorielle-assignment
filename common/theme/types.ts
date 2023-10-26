export type KeyStringPair = { [key: string]: string };

export type NestedToken = {
  [key: string]: KeyStringPair;
}
export type FigmaTokens = {
  [key: string]: NestedToken | KeyStringPair;
}

export type Theme = {
  typography: NestedToken,
  colors: KeyStringPair,
  fontFamilies: FigmaTokens,
  fontSize: KeyStringPair,
  borderRadius: KeyStringPair,
  boxShadow: KeyStringPair,
}
