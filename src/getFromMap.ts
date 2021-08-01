import { TreeMap } from "./TreeMap";

export const getFromMap = <T>(ids: string[], map: TreeMap<T>) => {
  if (!ids) return;

  return ids.map((id) => map[id]);
};
