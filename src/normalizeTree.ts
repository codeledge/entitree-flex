import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";
import { last } from "./last";

export const normalizeTree = <T>(
  root: TreeNode<T>,
  accessor: string,
  settings: Settings,
  map?: Record<string, T>
) => {
  const targets: TreeNode<T>[] = map
    ? getFromMap(root[accessor], map)
    : root[accessor];
  if (!targets || !targets.length) return;
  const rootCenter = root.x + root.width / 2;

  const firstTargetSiblings = map
    ? getFromMap(targets[0][settings.siblingsAccessor], map)
    : targets[0][settings.siblingsAccessor];

  const leftMostNode = firstTargetSiblings?.[0]
    ? firstTargetSiblings?.[0]
    : targets[0];

  const lastTarget = last(targets);
  const lastTargetPartner = map
    ? last(getFromMap(lastTarget[settings.partnersAccessor], map))
    : last(lastTarget[settings.partnersAccessor]);

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
      ? getFromMap(subtree[settings.siblingsAccessor], map)
      : subtree[settings.siblingsAccessor];

    siblings?.forEach((sibling) => {
      sibling.x -= shift;
    });

    const partners = map
      ? getFromMap(subtree[settings.partnersAccessor], map)
      : subtree[settings.partnersAccessor];
    partners?.forEach((partner) => {
      partner.x -= shift;
    });

    const next = map ? getFromMap(subtree[accessor], map) : subtree[accessor];
    next?.forEach((node) => {
      drillTargets(node);
    });
  }
};
