import { getNodeRightX } from "./getNodeRightX";
import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function addGroupRightX(
  subtree: TreeNode,
  settings: Settings,
  map: TreeMap
) {
  subtree.groupRightX = getNodeRightX(subtree);

  const siblings = getFromMap(subtree[settings.nextBeforeAccessor], map);
  siblings?.forEach((sibling) => {
    subtree.groupRightX = Math.max(subtree.groupRightX, getNodeRightX(sibling));
  });

  const partners = getFromMap(subtree[settings.nextAfterAccessor], map);
  partners?.forEach((partner) => {
    subtree.groupRightX = Math.max(subtree.groupRightX, getNodeRightX(partner));
  });
}
