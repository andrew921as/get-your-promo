export const removeUnwantedCharactersFromDiscounts = (string) => {
  return string.replace(/[-\n%]/g, "");
};
