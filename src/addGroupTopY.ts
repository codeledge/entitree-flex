import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function addGroupTopY(
  subtree: TreeNode,
  settings: Settings,
  map: TreeMap
) {
  subtree.groupTopY = subtree.y;

  getFromMap(subtree[settings.nextBeforeAccessor], map)?.forEach((sibling) => {
    subtree.groupTopY = Math.min(subtree.groupTopY, sibling.y);
  });

  getFromMap(subtree[settings.nextAfterAccessor], map)?.forEach((partner) => {
    subtree.groupTopY = Math.max(subtree.groupTopY, partner.y);
  });
}
