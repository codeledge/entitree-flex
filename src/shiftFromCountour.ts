import { TreeNode } from "./index";

export const shiftFromCountour = (contourNode: TreeNode, node: TreeNode) => {
  const nodeBottomY = node.y + node.height + node.marginBottom;

  const contourNodeEdgeX =
    contourNode.x + contourNode.width + contourNode.marginRight;
  const contourTopY = contourNode.y;
  const contourBottomY =
    contourNode.y + contourNode.height + contourNode.marginBottom;

  const coversCountour = node.y <= contourTopY && nodeBottomY >= contourBottomY;
  const traspassHorizontal = node.x < contourNodeEdgeX;

  // if (coversCountour) {
  //   //todo: if it covers the whole box, remove box from contour array
  // }

  if (
    traspassHorizontal &&
    ((node.y > contourTopY && node.y < contourBottomY) ||
      (nodeBottomY > contourTopY && nodeBottomY < contourBottomY) ||
      coversCountour)
  ) {
    const delta = contourNodeEdgeX - node.x;
    node.x += delta;
  }
};
