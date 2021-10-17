import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export function getGenerationBottomLineY<T>(
  subtree: TreeNode<T>,
  settings: Settings,
  map: TreeMap<T>
) {
  let bottomLineY = subtree.y + subtree.height + subtree.marginBottom;

  const siblings = getFromMap(subtree[settings.nextBeforeAccessor], map);

  siblings?.forEach((sibling) => {
    bottomLineY = Math.max(
      bottomLineY,
      sibling.y + sibling.height + sibling.marginBottom
    );
  });

  const partners = getFromMap(subtree[settings.nextAfterAccessor], map);

  partners?.forEach((partner) => {
    bottomLineY = Math.max(
      bottomLineY,
      partner.y + partner.height + partner.marginBottom
    );
  });

  return bottomLineY;
}
