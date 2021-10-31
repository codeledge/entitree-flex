import { getFromMap } from "./getFromMap";
import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";

export const getNextAfters = (
  node: TreeNode,
  map: TreeMap,
  settings: Settings
) => {
  return getFromMap(node[settings.nextAfterAccessor], map);
};
