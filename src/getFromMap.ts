export const getFromMap = (ids: string[], map: Record<string, any>) => {
  if (!ids) return undefined;

  return ids.map((id) => map[id]);
};
