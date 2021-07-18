import { TreeNode } from "./TreeNode";
import { shiftFromCountour } from "./shiftFromCountour";

export function checkContourOverlap<T>(
  contourSet: TreeNode<T>[],
  node: TreeNode<T>
) {
  contourSet.forEach((contourNode) => {
    shiftFromCountour(contourNode, node);
  });
  contourSet.push(node);
}
