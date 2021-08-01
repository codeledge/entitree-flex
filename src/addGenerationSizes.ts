import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export const addGenerationSizes = <T>(
  nodes: TreeNode<T>[],
  settings: Settings,
  map?: TreeMap<T>
): void => {
  nodes.forEach((node, index) => {
    const siblings = map
      ? getFromMap(node[settings.nextBeforeAccessor], map)
      : node[settings.nextBeforeAccessor];

    siblings?.forEach((sibling) => {
      sibling.width = sibling.width || settings.nodeWidth;
      sibling.height = sibling.height || settings.nodeHeight;
      sibling.marginRight = settings.nextBeforeSpacing; //todo: check
      sibling.marginBottom = settings.sourceTargetSpacing;
    });

    const partners = map
      ? getFromMap(node[settings.nextAfterAccessor], map)
      : node[settings.nextAfterAccessor];
    partners?.forEach((partner, partnerIndex) => {
      partner.width = partner.width || settings.nodeWidth;
      partner.height = partner.height || settings.nodeHeight;
      if (partnerIndex === partners.length - 1)
        partner.marginRight = settings.differentGroupSpacing;
      else partner.marginRight = settings.nextBeforeSpacing;
      partner.marginBottom = settings.sourceTargetSpacing;
    });

    node.width = node.width || settings.nodeWidth;
    node.height = node.height || settings.nodeHeight;

    if (index === nodes.length - 1 && (!partners || !partners.length))
      node.marginRight = settings.differentGroupSpacing;
    else node.marginRight = settings.nextBeforeSpacing;

    node.marginBottom = settings.sourceTargetSpacing;
  });
};
