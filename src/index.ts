import { TreeNode } from "TreeNode";
import { addTargetNodesSize } from "./addTargetNodesSize";
import { centerSourceToTargets } from "./centerSourceToTargets";
import { getInitialTargetsShiftLeft } from "./getInitialTargetsShiftLeft";
import { normalizeTree } from "./normalizeTree";
import { shiftFromCountour } from "./shiftFromCountour";

export type Settings = {
  childAccessor?: string;
  childrenAccessor?: string;
  cousinSpacing?: number;
  defaultNodeHeight?: number;
  defaultNodeWidth?: number;
  enableFlex?: boolean;
  parentAccessor?: string;
  parentsAccessor?: string;
  partnersAccessor?: string;
  rootX?: number;
  rootY?: number;
  siblingsAccessor?: string;
  siblingSpacing?: number;
  spouseSpacing?: number;
  verticalSpacing?: number;
};

export const defaultSettings: Settings = {
  childAccessor: "child",
  childrenAccessor: "children",
  cousinSpacing: 20,
  defaultNodeHeight: 40,
  defaultNodeWidth: 40,
  enableFlex: true,
  parentAccessor: "parent",
  parentsAccessor: "parents",
  partnersAccessor: "partners",
  rootX: 0,
  rootY: 0,
  siblingsAccessor: "siblings",
  siblingSpacing: 10,
  verticalSpacing: 10,
};

export default function layout(root, customSettings: Settings = {}) {
  const settings = {
    ...defaultSettings,
    ...customSettings,
  };

  root.x = settings.rootX;
  root.y = settings.rootY;
  root.isRoot = true;

  addTargetNodesSize([root], settings);
  root.topLineY = root.y;
  root.bottomLineY = root.y + root.height + root.marginBottom;

  root[settings.siblingsAccessor]
    ?.reverse()
    .forEach((sibling, siblingIndex, rootSiblings) => {
      sibling.source = root;
      const nextNode = rootSiblings[siblingIndex - 1] || root;
      sibling.x = nextNode.x - sibling.width - sibling.marginRight;
      //align vertically
      sibling.y = root.y + root.height / 2 - sibling.height / 2;
      const outerBottomY = sibling.y + sibling.height + sibling.marginBottom;

      if (sibling.y < root.topLineY) root.topLineY = sibling.y;
      if (outerBottomY > root.bottomLineY) root.bottomLineY = outerBottomY;
    });

  root[settings.partnersAccessor]?.forEach(
    (partner, partnerIndex, rootPartners) => {
      partner.source = root;
      const previousPartner = rootPartners[partnerIndex - 1] || root;
      partner.x =
        previousPartner.x + previousPartner.width + previousPartner.marginRight;
      partner.y = root.y + root.height / 2 - partner.height / 2;
      const outerBottomY = partner.y + partner.height + partner.marginBottom;
      if (partner.y < root.topLineY) root.topLineY = partner.y;
      if (outerBottomY > root.bottomLineY) root.bottomLineY = outerBottomY;
    }
  );

  const descendantsContour = [];
  drillChildren(root);
  function drillChildren(subtree) {
    const children = subtree[settings.childrenAccessor];
    if (!children || !children.length) return;

    //rename to addGenerationSizes
    addTargetNodesSize(children, settings);

    const initialShiftLeft = getInitialTargetsShiftLeft(
      subtree,
      children,
      settings
    );
    let currentX = subtree.x - initialShiftLeft;

    const topLineY = getGenerationBottomLineY(subtree);

    children.forEach((child) => {
      const maxHeight = getGenerationMaxHeight(child);
      const midVerticalY = topLineY + maxHeight / 2;
      /////////////////// SIBLING
      child[settings.siblingsAccessor]?.forEach((sibling) => {
        sibling.isSibling = true;
        sibling.source = child;

        sibling.x = currentX;
        sibling.y = midVerticalY - sibling.height / 2;

        checkContourOverlap(descendantsContour, sibling);

        currentX = sibling.x + sibling.width + sibling.marginRight;
      });

      /////////////////// CHILD
      //set props
      child.isDescendant = true;

      //set the parent pointer
      child.source = subtree;

      //Set positions
      child.x = currentX;
      child.y = midVerticalY - child.height / 2;

      checkContourOverlap(descendantsContour, child);
      currentX = child.x + child.width + child.marginRight;

      /////////////////// partners
      child[settings.partnersAccessor]?.forEach((partner) => {
        partner.isPartner = true;
        partner.source = child;

        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        checkContourOverlap(descendantsContour, partner);
        currentX = partner.x + partner.width + partner.marginRight;
      });

      drillChildren(child);
    });

    centerSourceToTargets(subtree, children);
  }
  normalizeTree(root, settings.childrenAccessor);

  const parentsContour = [];
  drillParents(root);
  function drillParents(subtree) {
    const parents = subtree[settings.parentsAccessor];
    if (!parents) return;

    addTargetNodesSize(parents, settings);

    const initialShiftLeft = getInitialTargetsShiftLeft(
      subtree,
      parents,
      settings
    );
    let currentX = subtree.x - initialShiftLeft;

    const bottomLineY = getGenerationTopLineY(subtree);
    console.log({ bottomLineY });

    parents.forEach((parent) => {
      const maxHeight = getGenerationMaxHeight(parent);
      const midVerticalY =
        bottomLineY - settings.verticalSpacing - maxHeight / 2;

      /////////////////// SIBLING
      parent[settings.siblingsAccessor]?.forEach((sibling) => {
        sibling.isSibling = true;
        sibling.source = parent;

        sibling.x = currentX;
        sibling.y = midVerticalY - sibling.height / 2;

        checkContourOverlap(parentsContour, sibling);

        currentX = sibling.x + sibling.width + sibling.marginRight;
      });

      ///////////// PARENT
      parent.isAncestor = true;

      parent.source = subtree;

      //set positions
      parent.x = currentX;
      parent.y = midVerticalY - parent.height / 2;

      //check if touches one of the contours
      checkContourOverlap(parentsContour, parent);
      currentX = parent.x + parent.width + parent.marginRight;

      /////////////////// partners
      parent[settings.partnersAccessor]?.forEach((partner) => {
        partner.isPartner = true;
        partner.source = parent;

        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        checkContourOverlap(parentsContour, partner);

        currentX = partner.x + partner.width + partner.marginRight;
      });

      drillParents(parent);
    });

    centerSourceToTargets(subtree, parents);
  }
  normalizeTree(root, settings.parentsAccessor);
}

function getGenerationBottomLineY(subtree: TreeNode) {
  let bottomLineY = subtree.y + subtree.height + subtree.marginBottom;
  subtree.siblings?.forEach((sibling) => {
    bottomLineY = Math.max(
      bottomLineY,
      sibling.y + sibling.height + sibling.marginBottom
    );
  });
  subtree.partners?.forEach((partner) => {
    bottomLineY = Math.max(
      bottomLineY,
      partner.y + partner.height + partner.marginBottom
    );
  });
  return bottomLineY;
}

function getGenerationTopLineY(subtree: TreeNode) {
  let topLineY = subtree.y;
  subtree.siblings?.forEach((sibling) => {
    topLineY = Math.min(topLineY, sibling.y);
  });
  subtree.partners?.forEach((partner) => {
    topLineY = Math.min(topLineY, partner.y);
  });
  return topLineY;
}

function getGenerationMaxHeight(subtree: TreeNode) {
  let maxHeight = subtree.height;
  subtree.siblings?.forEach((sibling) => {
    maxHeight = Math.max(maxHeight, sibling.height);
  });
  subtree.partners?.forEach((partner) => {
    maxHeight = Math.max(maxHeight, partner.height);
  });
  return maxHeight;
}

function checkContourOverlap(contourSet: TreeNode[], node: TreeNode) {
  contourSet.forEach((contourNode) => {
    shiftFromCountour(contourNode, node);
  });
  contourSet.push(node);
}
