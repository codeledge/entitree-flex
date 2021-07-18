import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export const addTargetNodesSize = <T>(
  nodes: TreeNode<T>[],
  settings: Settings,
  map?: Record<string, T>
): void => {
  nodes.forEach((node, index) => {
    const siblings = map
      ? getFromMap(node[settings.siblingsAccessor], map)
      : node[settings.siblingsAccessor];

    siblings?.forEach((sibling) => {
      sibling.width = sibling.width || settings.nodeWidth;
      sibling.height = sibling.height || settings.nodeHeight;
      sibling.marginRight = settings.siblingSpacing; //todo: check
      sibling.marginBottom = settings.verticalSpacing;
    });

    const partners = map
      ? getFromMap(node[settings.partnersAccessor], map)
      : node[settings.partnersAccessor];
    partners?.forEach((partner, partnerIndex) => {
      partner.width = partner.width || settings.nodeWidth;
      partner.height = partner.height || settings.nodeHeight;
      if (partnerIndex === partners.length - 1)
        partner.marginRight = settings.cousinSpacing;
      else partner.marginRight = settings.siblingSpacing;
      partner.marginBottom = settings.verticalSpacing;
    });

    node.width = node.width || settings.nodeWidth;
    node.height = node.height || settings.nodeHeight;

    if (index === nodes.length - 1 && (!partners || !partners.length))
      node.marginRight = settings.cousinSpacing;
    else node.marginRight = settings.siblingSpacing;

    node.marginBottom = settings.verticalSpacing;
  });
};
