import { addGroupLeftX } from "./addGroupLeftX";
import { addGroupTopY } from "./addGroupTopY";
import { addLevelNodesSizes } from "./addLevelNodesSizes";
import { centerSourceToTargets } from "./centerSourceToTargets";
import { checkContourOverlap } from "./checkContourOverlap";
import { getFromMap } from "./getFromMap";
import { getInitialTargetsShiftLeft } from "./getInitialTargetsShiftLeft";
import { getInitialTargetsShiftTop } from "./getInitialTargetsShiftTop";
import { getNodeBottomY } from "./getNodeBottomY";
import { getNodeRightX } from "./getNodeRightX";

const parentsContour = [];
export function drillParents(subtree, settings, map) {
  const parents = getFromMap(subtree[settings.sourcesAccessor], map);
  if (!parents?.length) return;

  addLevelNodesSizes(parents, settings, map);

  if (settings.orientation === "vertical") {
    const initialShiftLeft = getInitialTargetsShiftLeft(
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
      getFromMap(parent[settings.nextBeforeAccessor], map)?.forEach(
        (sibling) => {
          sibling.x = currentX;
          sibling.y = midVerticalY - sibling.height / 2;

          checkContourOverlap(parentsContour, sibling, settings);

          currentX = getNodeRightX(sibling);
        }
      );

      /////////////////// GROUP MAIN NODE ///////////////
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

      drillParents(parent, settings, map);
    });
  } else {
    const initialShiftTop = getInitialTargetsShiftTop(
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

          //update currentY position
          currentY = getNodeBottomY(sibling);
        }
      );

      /////////////////// GROUP MAIN NODE ///////////////
      //Set positions
      parent.y = currentY;
      parent.x = midPointX - parent.width / 2;

      checkContourOverlap(parentsContour, parent, settings);
      //update currentY position
      currentY = getNodeBottomY(parent);

      /////////////////// SPOUSES
      getFromMap(parent[settings.nextAfterAccessor], map)?.forEach(
        (partner) => {
          partner.y = currentY;
          partner.x = midPointX - partner.width / 2;

          checkContourOverlap(parentsContour, partner, settings);
          //update currentY position
          currentY = getNodeBottomY(partner);
        }
      );

      addGroupLeftX(parent, settings, map);

      drillParents(parent, settings, map);
    });
  }

  centerSourceToTargets(subtree, parents, settings, map);
}
