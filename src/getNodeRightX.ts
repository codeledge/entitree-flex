import { TreeNode } from "./TreeNode";

export const getNodeRightX = (node: TreeNode) => {
  return node.x + node.width + node.marginRight;
};
