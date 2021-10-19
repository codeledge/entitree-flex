import { getNodeBottomY } from "./getNodeBottomY";
import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";
import { getNodeRightX } from "./getNodeRightX";

export const addLevelNodesSizes = <T>(
  levelNodes: TreeNode<T>[],
  settings: Settings,
  map: TreeMap<T>
): void => {
  levelNodes.forEach((node, index) => {
    node.width = node.width || settings.nodeWidth;
    node.height = node.height || settings.nodeHeight;
    if (settings.orientation === "vertical") {
      node.marginBottom = settings.sourceTargetSpacing;
    } else {
      node.marginRight = settings.sourceTargetSpacing;
    }

    //initial values
    node.groupMaxHeight = node.height;
    node.groupMaxWidth = node.width;

    const siblings = getFromMap(node[settings.nextBeforeAccessor], map);
    siblings?.forEach((sibling) => {
      sibling.width = sibling.width || settings.nodeWidth;
      sibling.height = sibling.height || settings.nodeHeight;
      if (settings.orientation === "vertical") {
        sibling.marginRight = settings.nextBeforeSpacing;
        sibling.marginBottom = settings.sourceTargetSpacing;
      } else {
        sibling.marginBottom = settings.nextBeforeSpacing;
        sibling.marginRight = settings.sourceTargetSpacing;
      }

      //check maxes
      node.groupMaxHeight = Math.max(node.groupMaxHeight, sibling.height);
      node.groupMaxWidth = Math.max(node.groupMaxWidth, sibling.width);
    });

    const spouses = getFromMap(node[settings.nextAfterAccessor], map);
    spouses?.forEach((spouse, spouseIndex) => {
      spouse.width = spouse.width || settings.nodeWidth;
      spouse.height = spouse.height || settings.nodeHeight;
      if (spouseIndex === spouses.length - 1) {
        // secondDegreeSpacing because you want more space between the last spouse and the next child
        // so they don't get confused as being both children
        if (settings.orientation === "vertical") {
          spouse.marginRight = settings.secondDegreeSpacing;
        } else {
          spouse.marginBottom = settings.secondDegreeSpacing;
        }
      } else {
        if (settings.orientation === "vertical") {
          spouse.marginRight = settings.nextAfterSpacing;
        } else {
          spouse.marginBottom = settings.nextAfterSpacing;
        }
      }
      if (settings.orientation === "vertical") {
        spouse.marginBottom = settings.sourceTargetSpacing;
      } else {
        spouse.marginRight = settings.sourceTargetSpacing;
      }

      node.groupMaxHeight = Math.max(node.groupMaxHeight, spouse.height);
      node.groupMaxWidth = Math.max(node.groupMaxWidth, spouse.width);
    });

    if (spouses && spouses.length) {
      //for sure there is an after node
      if (settings.orientation === "vertical") {
        node.marginRight = settings.nextAfterSpacing;
      } else {
        node.marginBottom = settings.nextAfterSpacing;
      }
    } else {
      if (index === levelNodes.length - 1) {
        // there is a cousin next
        if (settings.orientation === "vertical") {
          node.marginRight = settings.secondDegreeSpacing;
        } else {
          node.marginBottom = settings.secondDegreeSpacing;
        }
      } else {
        //there is sibling next
        if (settings.orientation === "vertical") {
          node.marginRight = settings.firstDegreeSpacing;
        } else {
          node.marginBottom = settings.firstDegreeSpacing;
        }
      }
    }
  });
};
