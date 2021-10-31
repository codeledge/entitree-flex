import { getNodeBottomY } from "./getNodeBottomY";
import { getNodeRightX } from "./getNodeRightX";
import { getFromMap } from "./getFromMap";
import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";

export const addRootSpousesPositions = <T>(
  root: TreeNode<T>,
  settings: Settings,
  map: TreeMap<T>
) => {
  if (root[settings.nextAfterAccessor])
    getFromMap(root[settings.nextAfterAccessor], map).forEach(
      (currentNode, nextAfterIndex, nextAfters) => {
        const previousNode = nextAfters[nextAfterIndex - 1] || root;

        if (settings.orientation === "vertical") {
          currentNode.x = getNodeRightX(previousNode);
          // align vertically
          currentNode.y = root.y + root.height / 2 - currentNode.height / 2;

          const bottomEdgeY =
            currentNode.y + currentNode.height + currentNode.marginBottom;
          if (currentNode.y < root.groupTopY) root.groupTopY = currentNode.y;
          if (bottomEdgeY > root.groupBottomY) root.groupBottomY = bottomEdgeY;
        } else {
          currentNode.y = getNodeBottomY(previousNode);
          // align horizontally
          currentNode.x = root.x + root.width / 2 - currentNode.width / 2;

          //TODO: this function is the same in addRootSiblingsPositions (and above)
          const currentRightEdgeX =
            currentNode.x + currentNode.width + currentNode.marginRight;
          if (currentNode.x < root.groupLeftX) root.groupLeftX = currentNode.x;
          if (currentRightEdgeX > root.groupRightX)
            root.groupRightX = currentRightEdgeX;
        }
      }
    );
};
