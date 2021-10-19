import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

// o -> siblings
// p -> Partners
// x -> node
// if  000xpp oooxpp ooxPP
// THE Os and Ps should not be counted!
//because parent will center itself on the REAL children

export const getInitialTargetsShiftLeft = (
  source: TreeNode,
  targets: TreeNode[],
  settings: Settings,
  map: TreeMap
) => {
  return (
    targets.reduce((totalWidth, target, index) => {
      const siblings = getFromMap(target[settings.nextBeforeAccessor], map);

      const partners = getFromMap(target[settings.nextAfterAccessor], map);

      //for the first child, we don't care about the padding (siblings) left
      if (index !== 0) {
        siblings?.forEach((node) => {
          totalWidth += node.width + node.marginRight;
        });
      }

      //do not add margin from last target
      totalWidth +=
        target.width + (index === targets.length - 1 ? 0 : target.marginRight);

      if (index !== targets.length - 1) {
        partners?.forEach((partner) => {
          totalWidth += partner.width + partner.marginRight;
        });
      }

      return totalWidth;
    }, 0) /
      2 -
    source.width / 2
  );
};
