import { getNodeBottomY } from "./getNodeBottomY";
import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { getNodeRightX } from "./getNodeRightX";

export function checkContourOverlap<T>(
  contourSet: TreeNode<T>[],
  node: TreeNode<T>,
  settings: Settings
) {
  contourSet.forEach((contourNode) => {
    if (settings.orientation === "vertical") {
      const nodeBottomY = getNodeBottomY(node);

      const contourRightX = getNodeRightX(contourNode);

      const contourTopY = contourNode.y;
      const contourBottomY = getNodeBottomY(contourNode);

      const coversCountour =
        node.y <= contourTopY && nodeBottomY >= contourBottomY;
      const traspassHorizontal = node.x < contourRightX;

      // if (coversCountour) {
      //   //todo: if it covers the whole box, remove box from contour array
      // }

      if (
        traspassHorizontal &&
        ((node.y > contourTopY && node.y < contourBottomY) ||
          (nodeBottomY > contourTopY && nodeBottomY < contourBottomY) ||
          coversCountour)
      ) {
        node.x += contourRightX - node.x;
      }
    } else {
      const nodeRightX = getNodeRightX(node);

      const contourBottomY = getNodeBottomY(contourNode);
      const contourLeftX = contourNode.x;
      const contourRightX = getNodeRightX(contourNode);

      const coversCountour =
        node.x <= contourLeftX && nodeRightX >= contourRightX;
      const traspassVertical = node.y < contourBottomY;

      // if (coversCountour) {
      //   //todo: if it covers the whole box, remove box from contour array
      // }

      if (
        traspassVertical &&
        ((node.x > contourLeftX && node.x < contourRightX) ||
          (nodeRightX > contourLeftX && nodeRightX < contourRightX) ||
          coversCountour)
      ) {
        node.y += contourBottomY - node.y;
      }
    }
  });
  contourSet.push(node);
}
