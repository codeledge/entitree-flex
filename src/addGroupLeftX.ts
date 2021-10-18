import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function addGroupLeftX(
  subtree: TreeNode,
  settings: Settings,
  map: TreeMap
) {
  subtree.groupLeftX = subtree.x;

  getFromMap(subtree[settings.nextBeforeAccessor], map)?.forEach((sibling) => {
    subtree.groupLeftX = Math.min(subtree.groupLeftX, sibling.x);
  });

  getFromMap(subtree[settings.nextAfterAccessor], map)?.forEach((partner) => {
    subtree.groupLeftX = Math.max(subtree.groupLeftX, partner.x);
  });
}
