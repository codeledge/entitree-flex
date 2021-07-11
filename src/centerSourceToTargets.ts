import { TreeNode } from "./TreeNode";
import { last } from "./last";

export const centerSourceToTargets = (
  source: TreeNode,
  targets: TreeNode[]
) => {
  if (!source.isRoot) {
    //center only on actual children, not all generational nodes
    const leftMostTarget = targets[0];
    const rightMostTarget = last(targets);

    if (leftMostTarget && rightMostTarget) {
      const newSourceX =
        (leftMostTarget.x + rightMostTarget.x + rightMostTarget.width) / 2 -
        source.width / 2;

      const delta = newSourceX - source.x;
      if (newSourceX !== source.x) {
        source.x += delta;
        source.siblings?.forEach((sibling) => (sibling.x += delta));
        source.partners?.forEach((partner) => (partner.x += delta));
      }
    }
  }
};
