export const escapeRegExp = (str: string) => {
  if (str) return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  else return str;
};
