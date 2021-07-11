import { Settings } from "./index";
import { TreeNode } from "./TreeNode";

export const getInitialTargetsShiftLeft = (
  source: TreeNode,
  targets: TreeNode[],
  settings: Settings
) => {
  return (
    targets.reduce((totalWidth, target, index) => {
      const siblings = target[settings.siblingsAccessor];
      const partners = target[settings.partnersAccessor];

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
