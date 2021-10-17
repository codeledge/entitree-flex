import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";
import { last } from "./last";

export const normalizeTree = <T>(
  root: TreeNode<T>,
  accessor: string,
  settings: Settings,
  map: TreeMap<T>
) => {
  const targets: TreeNode<T>[] = getFromMap(root[accessor], map);
  if (!targets || !targets.length) return;
  const rootCenter = root.x + root.width / 2;

  const firstTargetSiblings = getFromMap(
    targets[0][settings.nextBeforeAccessor],
    map
  );

  const leftMostNode = firstTargetSiblings?.[0] || targets[0];

  const lastTarget = last(targets);
  const lastTargetPartner = last(
    getFromMap(lastTarget[settings.nextAfterAccessor], map)
  );

  const rightMostNode = lastTargetPartner || lastTarget;

  const centerPoint =
    (leftMostNode.x + rightMostNode.x + rightMostNode.width) / 2;
  const shift = centerPoint - rootCenter;

  targets.forEach((node) => {
    drillTargets(node);
  });

  function drillTargets(subtree) {
    subtree.x -= shift;

    const siblings = getFromMap(subtree[settings.nextBeforeAccessor], map);

    siblings?.forEach((sibling) => {
      sibling.x -= shift;
    });

    const partners = getFromMap(subtree[settings.nextAfterAccessor], map);

    partners?.forEach((partner) => {
      partner.x -= shift;
    });

    const next = getFromMap(subtree[accessor], map);
    next?.forEach((node) => {
      drillTargets(node);
    });
  }
};
