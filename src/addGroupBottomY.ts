import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";
import { getNodeBottomY } from "./getNodeBottomY";

export function addGroupBottomY(
  subtree: TreeNode,
  settings: Settings,
  map: TreeMap
) {
  subtree.groupBottomY = getNodeBottomY(subtree);

  const siblings = getFromMap(subtree[settings.nextBeforeAccessor], map);
  siblings?.forEach((sibling) => {
    subtree.groupBottomY = Math.max(
      subtree.groupBottomY,
      getNodeBottomY(sibling)
    );
  });

  const partners = getFromMap(subtree[settings.nextAfterAccessor], map);
  partners?.forEach((partner) => {
    subtree.groupBottomY = Math.max(
      subtree.groupBottomY,
      getNodeBottomY(partner)
    );
  });
}
