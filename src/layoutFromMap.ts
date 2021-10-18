import { getNodeBottomY } from "./getNodeBottomY";
import { getNodeRightX } from "./getNodeRightX";
import { getInitialTargetsShiftTop } from "./getInitialTargetsShiftTop";
import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { addLevelNodesSizes } from "./addLevelNodesSizes";
import { centerSourceToTargets } from "./centerSourceToTargets";
import { checkContourOverlap } from "./checkContourOverlap";
import { defaultSettings } from "./defaultSettings";
import { getElements } from "./getElements";
import { getFromMap } from "./getFromMap";
import { getInitialTargetsShiftLeft } from "./getInitialTargetsShiftLeft";
import { makeRoot } from "./makeRoot";
import { normalizeTree } from "./normalizeTree";
import { addRootSiblingsPositions } from "./addRootSiblingsPositions";
import { addRootSpousesPositions } from "./addRootSpousesPositions";
import { addGroupBottomY } from "./addGroupBottomY";
import { addGroupRightX } from "./addGroupRightX";
import { addGroupTopY } from "./addGroupTopY";
import { addGroupLeftX } from "./addGroupLeftX";

export function layoutFromMap<T>(
  rootId: string | number,
  originalMap: Record<string, T>,
  customSettings: Partial<Settings> = {}
) {
  const settings: Settings = {
    ...defaultSettings,
    ...customSettings,
  };

  const map: TreeMap<T> = settings.clone
    ? JSON.parse(JSON.stringify(originalMap))
    : originalMap;

  const root = makeRoot(map[rootId], settings);

  addLevelNodesSizes([root], settings, map);

  addRootSiblingsPositions(root, settings, map);
  addRootSpousesPositions(root, settings, map);

  addGroupBottomY(root, settings, map);
  addGroupRightX(root, settings, map);
  addGroupLeftX(root, settings, map);
  addGroupTopY(root, settings, map);

  const descendantsContour = [];
  drillChildren(root);
  function drillChildren(subtree: TreeNode<T>) {
    const children = getFromMap(subtree[settings.targetsAccessor], map);
    if (!children?.length) return;

    addLevelNodesSizes(children, settings, map);

    if (settings.orientation === "vertical") {
      const initialShiftLeft = getInitialTargetsShiftLeft<T>(
        subtree,
        children,
        settings,
        map
      );
      let currentX = subtree.x - initialShiftLeft;

      children.forEach((child) => {
        const midVerticalY = subtree.groupBottomY + child.groupMaxHeight / 2;

        /////////////////// BEFORES ///////////////////
        const siblings = getFromMap(child[settings.nextBeforeAccessor], map);
        siblings?.forEach((sibling) => {
          sibling.x = currentX;
          sibling.y = midVerticalY - sibling.height / 2;

          checkContourOverlap(descendantsContour, sibling, settings);

          currentX = getNodeRightX(sibling);
        });

        /////////////////// GROUP MAIN NODE

        //Set positions
        child.x = currentX;
        child.y = midVerticalY - child.height / 2;

        checkContourOverlap(descendantsContour, child, settings);
        currentX = getNodeRightX(child);

        /////////////////// AFTERS ///////////////////
        getFromMap(child[settings.nextAfterAccessor], map)?.forEach(
          (partner) => {
            partner.x = currentX;
            partner.y = midVerticalY - partner.height / 2;

            checkContourOverlap(descendantsContour, partner, settings);
            currentX = getNodeRightX(partner);
          }
        );

        addGroupBottomY(child, settings, map);

        drillChildren(child);
      });
    } else {
      const initialShiftTop = getInitialTargetsShiftTop<T>(
        subtree,
        children,
        settings,
        map
      );
      let currentY = subtree.y - initialShiftTop;

      children.forEach((child) => {
        const midPointX = subtree.groupRightX + child.groupMaxWidth / 2;

        /////////////////// SIBLING
        const siblings = getFromMap(child[settings.nextBeforeAccessor], map);
        siblings?.forEach((sibling) => {
          sibling.y = currentY;
          sibling.x = midPointX - sibling.width / 2;

          checkContourOverlap(descendantsContour, sibling, settings);

          currentY = getNodeBottomY(sibling);
        });

        /////////////////// CHILD

        //Set positions
        child.y = currentY;
        child.x = midPointX - child.width / 2;

        checkContourOverlap(descendantsContour, child, settings);
        currentY = getNodeBottomY(child);

        /////////////////// partners
        const partners = getFromMap(child[settings.nextAfterAccessor], map);
        partners?.forEach((partner) => {
          partner.y = currentY;
          partner.x = midPointX - partner.width / 2;

          checkContourOverlap(descendantsContour, partner, settings);
          currentY = getNodeBottomY(partner);
        });

        addGroupRightX(child, settings, map);

        drillChildren(child);
      });
    }

    centerSourceToTargets(subtree, children, settings, map);
  }
  normalizeTree(root, settings.targetsAccessor, settings, map);

  const parentsContour = [];
  drillParents(root);
  function drillParents(subtree: TreeNode<T>) {
    const parents = getFromMap(subtree[settings.sourcesAccessor], map);
    if (!parents?.length) return;

    addLevelNodesSizes(parents, settings, map);

    if (settings.orientation === "vertical") {
      const initialShiftLeft = getInitialTargetsShiftLeft<T>(
        subtree,
        parents,
        settings,
        map
      );
      let currentX = subtree.x - initialShiftLeft;

      parents.forEach((parent) => {
        const midVerticalY =
          subtree.groupTopY -
          settings.sourceTargetSpacing -
          parent.groupMaxHeight / 2;

        /////////////////// BEFORES ///////////////////
        const siblings = getFromMap(parent[settings.nextBeforeAccessor], map);

        siblings?.forEach((sibling) => {
          sibling.x = currentX;
          sibling.y = midVerticalY - sibling.height / 2;

          checkContourOverlap(parentsContour, sibling, settings);

          currentX = getNodeRightX(sibling);
        });

        /////////////////// GROUP MAIN NODE
        //set positions
        parent.x = currentX;
        parent.y = midVerticalY - parent.height / 2;

        //check if touches one of the contours
        checkContourOverlap(parentsContour, parent, settings);
        currentX = getNodeRightX(parent);

        /////////////////// AFTERS ///////////////////
        getFromMap(parent[settings.nextAfterAccessor], map)?.forEach(
          (partner) => {
            partner.x = currentX;
            partner.y = midVerticalY - partner.height / 2;

            checkContourOverlap(parentsContour, partner, settings);

            currentX = getNodeRightX(partner);
          }
        );

        addGroupTopY(parent, settings, map);

        drillParents(parent);
      });
    } else {
      const initialShiftTop = getInitialTargetsShiftTop<T>(
        subtree,
        parents,
        settings,
        map
      );
      let currentY = subtree.y - initialShiftTop;

      parents.forEach((parent) => {
        const midPointX =
          subtree.groupLeftX -
          settings.sourceTargetSpacing -
          parent.groupMaxWidth / 2;

        /////////////////// SIBLING
        getFromMap(parent[settings.nextBeforeAccessor], map)?.forEach(
          (sibling) => {
            sibling.y = currentY;
            sibling.x = midPointX - sibling.width / 2;

            checkContourOverlap(parentsContour, sibling, settings);

            currentY = getNodeBottomY(sibling);
          }
        );

        /////////////////// CHILD

        //Set positions
        parent.y = currentY;
        parent.x = midPointX - parent.width / 2;

        checkContourOverlap(parentsContour, parent, settings);
        currentY = getNodeBottomY(parent);

        /////////////////// partners
        getFromMap(parent[settings.nextAfterAccessor], map)?.forEach(
          (partner) => {
            partner.y = currentY;
            partner.x = midPointX - partner.width / 2;

            checkContourOverlap(descendantsContour, partner, settings);
            currentY = getNodeBottomY(partner);
          }
        );

        addGroupLeftX(parent, settings, map);

        drillParents(parent);
      });
    }

    centerSourceToTargets(subtree, parents, settings, map);
  }
  normalizeTree(root, settings.sourcesAccessor, settings, map);

  return getElements(root, settings, map);
}
