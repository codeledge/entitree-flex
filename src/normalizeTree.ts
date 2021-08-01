import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";
import { last } from "./last";

export const normalizeTree = <T>(
  root: TreeNode<T>,
  accessor: string,
  settings: Settings,
  map?: TreeMap<T>
) => {
  const targets: TreeNode<T>[] = map
    ? getFromMap(root[accessor], map)
    : root[accessor];
  if (!targets || !targets.length) return;
  const rootCenter = root.x + root.width / 2;

  const firstTargetSiblings = map
    ? getFromMap(targets[0][settings.nextBeforeAccessor], map)
    : targets[0][settings.nextBeforeAccessor];

  const leftMostNode = firstTargetSiblings?.[0]
    ? firstTargetSiblings?.[0]
    : targets[0];

  const lastTarget = last(targets);
  const lastTargetPartner = map
    ? last(getFromMap(lastTarget[settings.nextAfterAccessor], map))
    : last(lastTarget[settings.nextAfterAccessor]);

  const rightMostNode = lastTargetPartner ? lastTargetPartner : lastTarget;

  const centerPoint =
    (leftMostNode.x + rightMostNode.x + rightMostNode.width) / 2;
  const shift = centerPoint - rootCenter;

  targets.forEach((node) => {
    drillTargets(node);
  });

  function drillTargets(subtree) {
    subtree.x -= shift;

    const siblings = map
      ? getFromMap(subtree[settings.nextBeforeAccessor], map)
      : subtree[settings.nextBeforeAccessor];

    siblings?.forEach((sibling) => {
      sibling.x -= shift;
    });

    const partners = map
      ? getFromMap(subtree[settings.nextAfterAccessor], map)
      : subtree[settings.nextAfterAccessor];
    partners?.forEach((partner) => {
      partner.x -= shift;
    });

    const next = map ? getFromMap(subtree[accessor], map) : subtree[accessor];
    next?.forEach((node) => {
      drillTargets(node);
    });
  }
};
