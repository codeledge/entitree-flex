import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function getGenerationBottomLineY<T>(
  subtree: TreeNode<T>,
  settings: Settings,
  map?: TreeMap<T>
) {
  let bottomLineY = subtree.y + subtree.height + subtree.marginBottom;

  const siblings = map
    ? getFromMap(subtree[settings.nextBeforeAccessor], map)
    : subtree[settings.nextBeforeAccessor];

  siblings?.forEach((sibling) => {
    bottomLineY = Math.max(
      bottomLineY,
      sibling.y + sibling.height + sibling.marginBottom
    );
  });

  const partners = map
    ? getFromMap(subtree[settings.nextAfterAccessor], map)
    : subtree[settings.nextAfterAccessor];

  partners?.forEach((partner) => {
    bottomLineY = Math.max(
      bottomLineY,
      partner.y + partner.height + partner.marginBottom
    );
  });

  return bottomLineY;
}
