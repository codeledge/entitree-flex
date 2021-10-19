import { addGroupBottomY } from "./addGroupBottomY";
import { addGroupRightX } from "./addGroupRightX";
import { addLevelNodesSizes } from "./addLevelNodesSizes";
import { centerSourceToTargets } from "./centerSourceToTargets";
import { checkContourOverlap } from "./checkContourOverlap";
import { getFromMap } from "./getFromMap";
import { getInitialTargetsShiftLeft } from "./getInitialTargetsShiftLeft";
import { getInitialTargetsShiftTop } from "./getInitialTargetsShiftTop";
import { getNodeBottomY } from "./getNodeBottomY";
import { getNodeRightX } from "./getNodeRightX";

const descendantsContour = [];
export function drillChildren(subtree, settings, map) {
  const children = getFromMap(subtree[settings.targetsAccessor], map);
  if (!children?.length) return;

  addLevelNodesSizes(children, settings, map);

  if (settings.orientation === "vertical") {
    const initialShiftLeft = getInitialTargetsShiftLeft(
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
      getFromMap(child[settings.nextAfterAccessor], map)?.forEach((partner) => {
        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        checkContourOverlap(descendantsContour, partner, settings);
        currentX = getNodeRightX(partner);
      });

      addGroupBottomY(child, settings, map);

      drillChildren(child, settings, map);
    });
  } else {
    const initialShiftTop = getInitialTargetsShiftTop(
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

      drillChildren(child, settings, map);
    });
  }

  centerSourceToTargets(subtree, children, settings, map);
}
