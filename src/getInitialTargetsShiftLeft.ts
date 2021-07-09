import { TreeNode } from "./index";

export const getInitialTargetsShiftLeft = (
  source: TreeNode,
  targets: TreeNode[]
) => {
  return (
    targets.reduce((totalWidth, target, index) => {
      totalWidth +=
        target.width + (index < targets.length - 1 ? target.marginRight : 0);
      return totalWidth;
    }, 0) /
      2 -
    source.width / 2
  );
};
