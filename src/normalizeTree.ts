import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";
import { last } from "./last";

export const normalizeTree = (
  root: TreeNode,
  accessor: string,
  settings: Settings,
  map: TreeMap
) => {
  const targets = getFromMap(root[accessor], map);
  if (!targets || !targets.length) return;

  const firstTargetSiblings = getFromMap(
    targets[0][settings.nextBeforeAccessor],
    map
  );

  const firstMostNode = firstTargetSiblings?.[0] || targets[0];

  const lastTarget = last(targets);
  const lastTargetPartner = last(
    getFromMap(lastTarget[settings.nextAfterAccessor], map)
  );

  const lastMostNode = lastTargetPartner || lastTarget;

  let shift;
  if (settings.orientation === "vertical") {
    const centerPointX =
      (firstMostNode.x + lastMostNode.x + lastMostNode.width) / 2;

    const rootCenterX = root.x + root.width / 2;
    shift = centerPointX - rootCenterX;

    targets.forEach((node) => {
      normalizeTargetsX(node);
    });
  } else {
    const centerPointY =
      (firstMostNode.y + lastMostNode.y + lastMostNode.height) / 2;

    const rootCenterY = root.y + root.height / 2;
    shift = centerPointY - rootCenterY;

    targets.forEach((node) => {
      normalizeTargetsY(node);
    });
  }

  function normalizeTargetsX(subtree) {
    subtree.x -= shift;

    getFromMap(subtree[settings.nextBeforeAccessor], map)?.forEach(
      (sibling) => {
        sibling.x -= shift;
      }
    );

    getFromMap(subtree[settings.nextAfterAccessor], map)?.forEach((partner) => {
      partner.x -= shift;
    });

    getFromMap(subtree[accessor], map)?.forEach((node) => {
      normalizeTargetsX(node);
    });
  }

  function normalizeTargetsY(subtree) {
    subtree.y -= shift;

    getFromMap(subtree[settings.nextBeforeAccessor], map)?.forEach(
      (sibling) => {
        sibling.y -= shift;
      }
    );

    getFromMap(subtree[settings.nextAfterAccessor], map)?.forEach((partner) => {
      partner.y -= shift;
    });

    getFromMap(subtree[accessor], map)?.forEach((node) => {
      normalizeTargetsY(node);
    });
  }
};
