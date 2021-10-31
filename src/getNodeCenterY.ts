import { TreeNode } from "./TreeNode";

export const getNodeCenterY = (node: TreeNode) => {
  return node.y + node.height / 2;
};
