import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function getGenerationTopLineY<T>(
  subtree: TreeNode<T>,
  settings: Settings,
  map: TreeMap<T>
) {
  let topLineY = subtree.y;

  const siblings = getFromMap(subtree[settings.nextBeforeAccessor], map);
  siblings?.forEach((sibling) => {
    topLineY = Math.min(topLineY, sibling.y);
  });

  const partners = getFromMap(subtree[settings.nextAfterAccessor], map);
  partners?.forEach((partner) => {
    topLineY = Math.min(topLineY, partner.y);
  });

  return topLineY;
}
