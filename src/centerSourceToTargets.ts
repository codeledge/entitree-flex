import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";
import { last } from "./last";

export const centerSourceToTargets = <T>(
  source: TreeNode<T>,
  targets: TreeNode<T>[],
  settings: Settings,
  map?: Record<string, T>
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

        const siblings = map
          ? getFromMap(source[settings.siblingsAccessor], map)
          : source[settings.siblingsAccessor];
        siblings?.forEach((sibling) => (sibling.x += delta));

        const partners = map
          ? getFromMap(source[settings.partnersAccessor], map)
          : source[settings.partnersAccessor];
        partners?.forEach((partner) => (partner.x += delta));
      }
    }
  }
};
