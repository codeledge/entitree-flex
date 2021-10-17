import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export const addGenerationSizes = <T>(
  nodes: TreeNode<T>[],
  settings: Settings,
  map: TreeMap<T>
): void => {
  nodes.forEach((node, index) => {
    const siblings = getFromMap(node[settings.nextBeforeAccessor], map);

    siblings?.forEach((sibling) => {
      sibling.width = sibling.width || settings.nodeWidth;
      sibling.height = sibling.height || settings.nodeHeight;
      sibling.marginRight = settings.nextBeforeSpacing;
      sibling.marginBottom = settings.sourceTargetSpacing;
    });

    const partners = getFromMap(node[settings.nextAfterAccessor], map);
    partners?.forEach((partner, partnerIndex) => {
      partner.width = partner.width || settings.nodeWidth;
      partner.height = partner.height || settings.nodeHeight;
      if (partnerIndex === partners.length - 1) {
        //secondDegreeSpacing because you want more space between the last spouse and the next child, so the don't get confused as both children
        partner.marginRight = settings.secondDegreeSpacing;
      } else partner.marginRight = settings.nextAfterSpacing;
      partner.marginBottom = settings.sourceTargetSpacing;
    });

    node.width = node.width || settings.nodeWidth;
    node.height = node.height || settings.nodeHeight;

    if (partners && partners.length) {
      node.marginRight = settings.nextAfterSpacing; //for sure there is an after node
    } else {
      if (index === nodes.length - 1) {
        node.marginRight = settings.secondDegreeSpacing; // there is a cousin next
      } else {
        node.marginRight = settings.firstDegreeSpacing; //there is sibling next
      }
    }

    node.marginBottom = settings.sourceTargetSpacing;
  });
};
