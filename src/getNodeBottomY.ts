import { TreeNode } from "./TreeNode";

export const getNodeBottomY = (node: TreeNode<any>) => {
  return node.y + node.height + node.marginBottom;
};
