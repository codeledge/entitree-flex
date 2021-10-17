import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";
import { last } from "./last";

export const centerSourceToTargets = <T = void>(
  source: TreeNode<T>,
  targets: TreeNode<T>[],
  settings: Settings,
  map: TreeMap<T>
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

        const siblings = getFromMap(source[settings.nextBeforeAccessor], map);
        siblings?.forEach((sibling) => (sibling.x += delta));

        const partners = getFromMap(source[settings.nextAfterAccessor], map);

        partners?.forEach((partner) => (partner.x += delta));
      }
    }
  }
};
