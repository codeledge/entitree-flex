import { TreeNode } from "./TreeNode";

export const getNodeCenterX = (node: TreeNode) => {
  return node.x + node.width / 2;
};
