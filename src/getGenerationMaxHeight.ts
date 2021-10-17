import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function getGenerationMaxHeight<T>(
  subtree: TreeNode<T>,
  settings: Settings,
  map: TreeMap<T>
) {
  let maxHeight = subtree.height;

  const siblings = getFromMap(subtree[settings.nextBeforeAccessor], map);

  siblings?.forEach((sibling) => {
    maxHeight = Math.max(maxHeight, sibling.height);
  });

  const partners = getFromMap(subtree[settings.nextAfterAccessor], map);

  partners?.forEach((partner) => {
    maxHeight = Math.max(maxHeight, partner.height);
  });
  return maxHeight;
}
