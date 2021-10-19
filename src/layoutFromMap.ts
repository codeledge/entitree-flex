import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { addGroupBottomY } from "./addGroupBottomY";
import { addGroupLeftX } from "./addGroupLeftX";
import { addGroupRightX } from "./addGroupRightX";
import { addGroupTopY } from "./addGroupTopY";
import { addLevelNodesSizes } from "./addLevelNodesSizes";
import { addRootSiblingsPositions } from "./addRootSiblingsPositions";
import { addRootSpousesPositions } from "./addRootSpousesPositions";
import { defaultSettings } from "./defaultSettings";
import { drillChildren } from "./drillChildren";
import { drillParents } from "./drillParents";
import { getElements } from "./getElements";
import { makeRoot } from "./makeRoot";
import { normalizeTree } from "./normalizeTree";

export function layoutFromMap<T>(
  rootId: string | number,
  originalMap: Record<string | number, T>,
  customSettings: Partial<Settings> = {}
) {
  const settings: Settings = {
    ...defaultSettings,
    ...customSettings,
  };

  const map: TreeMap<T> = settings.clone
    ? JSON.parse(JSON.stringify(originalMap))
    : originalMap;

  const root = makeRoot(map[rootId], settings);

  addLevelNodesSizes([root], settings, map);

  addRootSiblingsPositions(root, settings, map);
  addRootSpousesPositions(root, settings, map);

  addGroupBottomY(root, settings, map);
  addGroupRightX(root, settings, map);
  addGroupLeftX(root, settings, map);
  addGroupTopY(root, settings, map);

  drillChildren(root, settings, map);
  normalizeTree(root, settings.targetsAccessor, settings, map);

  drillParents(root, settings, map);
  normalizeTree(root, settings.sourcesAccessor, settings, map);

  return getElements<T>(root, settings, map);
}
