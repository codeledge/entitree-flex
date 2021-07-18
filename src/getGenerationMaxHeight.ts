import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function getGenerationMaxHeight<T>(
  subtree: TreeNode<T>,
  settings: Settings,
  map?: Record<string, T>
) {
  let maxHeight = subtree.height;

  const siblings = map
    ? getFromMap(subtree[settings.siblingsAccessor], map)
    : subtree[settings.siblingsAccessor];

  siblings?.forEach((sibling) => {
    maxHeight = Math.max(maxHeight, sibling.height);
  });

  const partners = map
    ? getFromMap(subtree[settings.partnersAccessor], map)
    : subtree[settings.partnersAccessor];
  partners?.forEach((partner) => {
    maxHeight = Math.max(maxHeight, partner.height);
  });
  return maxHeight;
}
