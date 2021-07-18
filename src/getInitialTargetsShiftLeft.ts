import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export const getInitialTargetsShiftLeft = <T>(
  source: TreeNode<T>,
  targets: TreeNode<T>[],
  settings: Settings,
  map?: Record<string, T>
) => {
  return (
    targets.reduce((totalWidth, target, index) => {
      const siblings = map
        ? getFromMap(target[settings.siblingsAccessor], map)
        : target[settings.siblingsAccessor];
      const partners = map
        ? getFromMap(target[settings.partnersAccessor], map)
        : target[settings.partnersAccessor];

      siblings?.forEach((node) => {
        totalWidth += node.width + node.marginRight;
      });

      totalWidth +=
        target.width +
        (index === targets.length - 1 && (!partners || !partners.length)
          ? 0
          : target.marginRight);

      partners?.forEach((partner, partnerIndex) => {
        totalWidth +=
          partner.width +
          (partnerIndex < partner.length - 1 ? partner.marginRight : 0);
      });

      return totalWidth;
    }, 0) /
      2 -
    source.width / 2
  );
};
