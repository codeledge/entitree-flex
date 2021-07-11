import { Settings } from "./index";
import { TreeNode } from "./TreeNode";

export const addTargetNodesSize = (
  nodes: TreeNode[],
  settings: Settings
): void => {
  nodes.forEach((node, index) => {
    const siblings = node[settings.siblingsAccessor];
    const partners = node[settings.partnersAccessor];

    siblings?.forEach((sibling) => {
      sibling.width = sibling.width || settings.defaultNodeWidth;
      sibling.height = sibling.height || settings.defaultNodeHeight;
      sibling.marginRight = settings.siblingSpacing; //todo: check
      sibling.marginBottom = settings.verticalSpacing;
    });

    partners?.forEach((partner, partnerIndex) => {
      partner.width = partner.width || settings.defaultNodeWidth;
      partner.height = partner.height || settings.defaultNodeHeight;
      if (partnerIndex === partners.length - 1)
        partner.marginRight = settings.cousinSpacing;
      else partner.marginRight = settings.siblingSpacing;
      partner.marginBottom = settings.verticalSpacing;
    });

    node.width = node.width || settings.defaultNodeWidth;
    node.height = node.height || settings.defaultNodeHeight;

    if (index === nodes.length - 1 && (!partners || !partners.length))
      node.marginRight = settings.cousinSpacing;
    else node.marginRight = settings.siblingSpacing;

    node.marginBottom = settings.verticalSpacing;
  });
};
