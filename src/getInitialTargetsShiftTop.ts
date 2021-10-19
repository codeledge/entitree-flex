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

export const getInitialTargetsShiftTop = (
  source: TreeNode,
  targets: TreeNode[],
  settings: Settings,
  map: TreeMap
) => {
  return (
    targets.reduce((totalHeight, target, index) => {
      //for the first child, we don't care about the padding (siblings) left
      if (index !== 0) {
        const siblings = getFromMap(target[settings.nextBeforeAccessor], map);
        siblings?.forEach((node) => {
          totalHeight += node.height + node.marginBottom;
        });
      }

      //do not add margin from last target
      totalHeight +=
        target.height +
        (index === targets.length - 1 ? 0 : target.marginBottom);

      if (index !== targets.length - 1) {
        const partners = getFromMap(target[settings.nextAfterAccessor], map);
        partners?.forEach((partner) => {
          totalHeight += partner.height + partner.marginBottom;
        });
      }

      return totalHeight;
    }, 0) /
      2 -
    source.height / 2
  );
};
