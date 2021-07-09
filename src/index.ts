import { addTargetNodesSize } from "./addTargetNodesSize";
import { centerSourceToTargets } from "./centerSourceToTargets";
import { getInitialTargetsShiftLeft } from "./getInitialTargetsShiftLeft";
import { normalizeTree } from "./normalizeTree";
import { shiftFromCountour } from "./shiftFromCountour";

export type Options = {
  childAccessor?: string;
  childrenAccessor?: string;
  cousinSpacing?: number;
  defaultNodeHeight?: number;
  defaultNodeWidth?: number;
  enableFlex?: boolean;
  parentAccessor?: string;
  parentsAccessor?: string;
  rootX?: number;
  rootY?: number;
  siblingSpacing?: number;
  spouseSpacing?: number;
  verticalSpacing?: number;
};

export interface TreeNode extends Record<string, any> {
  height: number;
  isAncestor?: boolean;
  isDescendant?: boolean;
  isRoot?: boolean;
  marginBottom?: number;
  marginRight?: number;
  width: number;
}

export const defaultSettings: Options = {
  childAccessor: "child",
  childrenAccessor: "children",
  cousinSpacing: 20,
  defaultNodeHeight: 40,
  defaultNodeWidth: 40,
  enableFlex: true,
  parentAccessor: "parent",
  parentsAccessor: "parents",
  rootX: 0,
  rootY: 0,
  siblingSpacing: 10,
  verticalSpacing: 10,
};

export default function layout(root, options: Options = {}) {
  const config = {
    ...defaultSettings,
    ...options,
  };

  root.x = config.rootX;
  root.y = config.rootY;
  root.width = root.width || config.defaultNodeWidth;
  root.height = root.height || config.defaultNodeHeight;
  root.marginBottom = config.verticalSpacing;
  root.isRoot = true;

  const childrenContour = [];
  drillChildren(root);
  function drillChildren(subtree) {
    const targets = subtree[config.childrenAccessor];
    if (!targets || !targets.length) return;

    const childrenBaseLineY =
      subtree.y + subtree.height + config.verticalSpacing;

    addTargetNodesSize(targets, config);

    const source = subtree;
    targets.forEach((target, index) => {
      target.isDescendant = true;

      target[config.parentAccessor] = subtree;

      if (index === 0) {
        const initialShiftLeft = getInitialTargetsShiftLeft(source, targets);
        target.x = source.x - initialShiftLeft;
      } else {
        const previousSibling = targets[index - 1];
        target.x =
          previousSibling.x +
          previousSibling.width +
          previousSibling.marginRight;
      }
      target.y = childrenBaseLineY;

      //check if touches one of the contours
      childrenContour.forEach((contourNode) => {
        shiftFromCountour(contourNode, target);
      });

      childrenContour.push(target);

      drillChildren(target);
    });

    centerSourceToTargets(source, targets);
  }
  normalizeTree(root, config.childrenAccessor);

  const parentsContour = [];
  drillParents(root);
  function drillParents(subtree) {
    const targets = subtree[config.parentsAccessor];
    if (!targets) return;

    const baselineY = subtree.y;

    addTargetNodesSize(targets, config);

    const source = subtree;

    targets.forEach((target, index) => {
      target.isAncestor = true;

      target[config.childAccessor] = subtree;

      if (index === 0) {
        const initialShiftLeft = getInitialTargetsShiftLeft(source, targets);
        target.x = source.x - initialShiftLeft;
      } else {
        const previousSibling = targets[index - 1];
        target.x =
          previousSibling.x +
          previousSibling.width +
          previousSibling.marginRight;
      }
      target.y = baselineY - target.height - target.marginBottom;

      const parentLeftBorder = {
        x: target.x,
        topY: target.y,
        bottomY: baselineY,
      };
      //check if touches one of the contours
      parentsContour.forEach((contourNode) => {
        shiftFromCountour(contourNode, target);
      });

      parentsContour.push(target);

      drillParents(target);
    });

    centerSourceToTargets(source, targets);
  }
  normalizeTree(root, config.parentsAccessor);
}
