import { TreeNode } from "index";

export const normalizeTree = (root: TreeNode, accessor: string) => {
  const targets = root[accessor];
  if (!targets || !targets.length) return;
  const rootCenter = root.x + root.width / 2;
  const lastTarget = targets[targets.length - 1];
  const centerPoint = (targets[0].x + lastTarget.x + lastTarget.width) / 2;
  const shift = centerPoint - rootCenter;

  targets.forEach((node) => {
    drillTargets(node);
  });

  function drillTargets(subtree) {
    subtree.x -= shift;
    subtree[accessor]?.forEach((node) => {
      drillTargets(node);
    });
  }
};
