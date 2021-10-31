import { getFromMap } from "./getFromMap";
import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";

export const getNextBefores = (
  node: TreeNode,
  map: TreeMap,
  settings: Settings
) => {
  return getFromMap(node[settings.nextBeforeAccessor], map);
};
