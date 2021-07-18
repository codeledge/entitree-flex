import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function getGenerationBottomLineY<T>(
  subtree: TreeNode<T>,
  settings: Settings,
  map?: Record<string, T>
) {
  let bottomLineY = subtree.y + subtree.height + subtree.marginBottom;

  const siblings = map
    ? getFromMap(subtree[settings.siblingsAccessor], map)
    : subtree[settings.siblingsAccessor];

  siblings?.forEach((sibling) => {
    bottomLineY = Math.max(
      bottomLineY,
      sibling.y + sibling.height + sibling.marginBottom
    );
  });

  const partners = map
    ? getFromMap(subtree[settings.partnersAccessor], map)
    : subtree[settings.partnersAccessor];

  partners?.forEach((partner) => {
    bottomLineY = Math.max(
      bottomLineY,
      partner.y + partner.height + partner.marginBottom
    );
  });

  return bottomLineY;
}
