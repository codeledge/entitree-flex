import { getNodeRightX } from "./getNodeRightX";
import { getFromMap } from "./getFromMap";
import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";

export const addRootSiblingsPositions = <T>(
  root: TreeNode<T>,
  settings: Settings,
  map: TreeMap<T>
) => {
  if (root[settings.nextBeforeAccessor])
    getFromMap(root[settings.nextBeforeAccessor], map)
      .reverse()
      .forEach((currentNode, nextBeforeIndex, nextBefores) => {
        const previousNode = nextBefores[nextBeforeIndex - 1] || root;

        if (settings.orientation === "vertical") {
          currentNode.x =
            previousNode.x - currentNode.width - currentNode.marginRight;
          //align vertically
          currentNode.y = root.y + root.height / 2 - currentNode.height / 2;

          const currentBottomY =
            currentNode.y + currentNode.height + currentNode.marginBottom;
          if (currentNode.y < root.groupTopY) root.groupTopY = currentNode.y;
          if (currentBottomY > root.groupBottomY)
            root.groupBottomY = currentBottomY;
        } else {
          currentNode.y =
            previousNode.y - currentNode.height - currentNode.marginBottom;
          //align horizontally
          currentNode.x = root.x + root.width / 2 - currentNode.width / 2;

          const currentRightEdgeX = getNodeRightX(currentNode);
          if (currentNode.x < root.groupLeftX) root.groupLeftX = currentNode.x;
          if (currentRightEdgeX > root.groupRightX)
            root.groupRightX = currentRightEdgeX;
        }
      });
};
