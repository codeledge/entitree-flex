import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function getGenerationTopLineY<T>(
  subtree: TreeNode<T>,
  settings: Settings,
  map?: Record<string, T>
) {
  let topLineY = subtree.y;

  const siblings = map
    ? getFromMap(subtree[settings.siblingsAccessor], map)
    : subtree[settings.siblingsAccessor];
  siblings?.forEach((sibling) => {
    topLineY = Math.min(topLineY, sibling.y);
  });

  const partners = map
    ? getFromMap(subtree[settings.partnersAccessor], map)
    : subtree[settings.partnersAccessor];
  partners?.forEach((partner) => {
    topLineY = Math.min(topLineY, partner.y);
  });
  return topLineY;
}
