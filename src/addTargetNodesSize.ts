import { Options, TreeNode } from "./index";

export const addTargetNodesSize = (
  nodes: TreeNode[],
  config: Options
): void => {
  nodes.forEach((node, index) => {
    node.width = node.width || config.defaultNodeWidth;
    node.height = node.height || config.defaultNodeHeight;
    node.marginRight = config.siblingSpacing;
    if (index === nodes.length - 1) node.marginRight = config.cousinSpacing;
    //todo, cousins
    node.marginBottom = config.verticalSpacing;
  });
};
