import { TreeNode } from "./TreeNode";
import { last } from "./last";

export const normalizeTree = (root: TreeNode, accessor: string) => {
  const targets = root[accessor];
  if (!targets || !targets.length) return;
  const rootCenter = root.x + root.width / 2;

  const leftMostNode = targets[0].siblings?.[0]
    ? targets[0].siblings?.[0]
    : targets[0];
  const lastTarget = last(targets);
  const lastTargetPartner = last(lastTarget.partners);
  const rightMostNode = lastTargetPartner ? lastTargetPartner : lastTarget;

  const centerPoint =
    (leftMostNode.x + rightMostNode.x + rightMostNode.width) / 2;
  const shift = centerPoint - rootCenter;

  targets.forEach((node) => {
    drillTargets(node);
  });

  function drillTargets(subtree) {
    subtree.x -= shift;
    subtree.siblings?.forEach((sibling) => (sibling.x -= shift));
    subtree.partners?.forEach((partner) => (partner.x -= shift));
    subtree[accessor]?.forEach((node) => {
      drillTargets(node);
    });
  }
};
