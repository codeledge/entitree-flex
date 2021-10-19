import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";
import { last } from "./last";

export const centerSourceToTargets = (
  source: TreeNode,
  targets: TreeNode[],
  settings: Settings,
  map: TreeMap
) => {
  if (!source.isRoot) {
    //center only on actual children, not all generational nodes
    const firstTarget = targets[0];
    const lastTarget = last(targets);

    if (firstTarget && lastTarget) {
      if (settings.orientation === "vertical") {
        const newSourceX =
          (firstTarget.x + lastTarget.x + lastTarget.width) / 2 -
          source.width / 2;

        const delta = newSourceX - source.x;
        if (newSourceX !== source.x) {
          source.x += delta;

          const siblings = getFromMap(source[settings.nextBeforeAccessor], map);
          siblings?.forEach((sibling) => (sibling.x += delta));

          const partners = getFromMap(source[settings.nextAfterAccessor], map);
          partners?.forEach((partner) => (partner.x += delta));
        }
      } else {
        const newSourceY =
          (firstTarget.y + lastTarget.y + lastTarget.height) / 2 -
          source.height / 2;

        const delta = newSourceY - source.y;
        if (newSourceY !== source.y) {
          source.y += delta;

          const siblings = getFromMap(source[settings.nextBeforeAccessor], map);
          siblings?.forEach((sibling) => (sibling.y += delta));

          const partners = getFromMap(source[settings.nextAfterAccessor], map);
          partners?.forEach((partner) => (partner.y += delta));
        }
      }
    }
  }
};
