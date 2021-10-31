import { getNextBefores } from "./getNextBefores";
import { getNextAfters } from "./getNextAfters";
import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";

// o -> siblings
// p -> Partners
// x -> node
// if  000xpp oooxpp ooxPP
// THE Os and Ps should not be counted!
// because parent will center itself on the REAL children

export const getInitialTargetsShiftLeft = (
  source: TreeNode,
  targets: TreeNode[],
  settings: Settings,
  map: TreeMap
) => {
  return (
    targets.reduce((totalWidth, target, index) => {
      //for the first child, we don't care about the padding (siblings) left
      if (index !== 0) {
        getNextBefores(target, map, settings)?.forEach((node) => {
          totalWidth += node.width + node.marginRight;
        });
      }

      //do not add margin from last target
      totalWidth +=
        target.width + (index === targets.length - 1 ? 0 : target.marginRight);

      if (index !== targets.length - 1) {
        getNextAfters(target, map, settings)?.forEach((partner) => {
          totalWidth += partner.width + partner.marginRight;
        });
      }

      return totalWidth;
    }, 0) /
      2 -
    source.width / 2
  );
};
