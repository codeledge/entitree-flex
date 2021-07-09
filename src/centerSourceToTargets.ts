import { TreeNode } from "index";

export const centerSourceToTargets = (
  source: TreeNode,
  targets: TreeNode[]
) => {
  if (!source.isRoot) {
    const lastTarget = targets[targets.length - 1];

    if (targets[0] && lastTarget)
      source.x =
        (targets[0].x + lastTarget.x + lastTarget.width) / 2 - source.width / 2;
  }
};
