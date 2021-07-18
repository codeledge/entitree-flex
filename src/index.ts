import { Settings } from "./Settings";
import { TreeNode } from "TreeNode";
import { addTargetNodesSize } from "./addTargetNodesSize";
import { centerSourceToTargets } from "./centerSourceToTargets";
import { checkContourOverlap } from "./checkContourOverlap";
import { defaultSettings } from "./defaultSettings";
import { getGenerationBottomLineY } from "./getGenerationBottomLineY";
import { getGenerationMaxHeight } from "./getGenerationMaxHeight";
import { getGenerationTopLineY } from "./getGenerationTopLineY";
import { getInitialTargetsShiftLeft } from "./getInitialTargetsShiftLeft";
import { normalizeTree } from "./normalizeTree";

export * from "./getElements";
export * from "./getSizes";
export * from "./TreeNode";
export * from "./fromMap";

export default function layout<T>(
  originalRoot: T,
  customSettings: Partial<Settings> = {}
) {
  const settings: Settings = {
    ...defaultSettings,
    ...customSettings,
  };

  const root = (
    settings.clone ? JSON.parse(JSON.stringify(originalRoot)) : originalRoot
  ) as TreeNode<T>;

  root.x = settings.rootX;
  root.y = settings.rootY;
  root.isRoot = true;

  addTargetNodesSize<T>([root], settings);
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
  function drillChildren(subtree: TreeNode<T>) {
    const children = subtree[settings.childrenAccessor];
    if (!children || !children.length) return;

    //rename to addGenerationSizes
    addTargetNodesSize<T>(children, settings);

    const initialShiftLeft = getInitialTargetsShiftLeft<T>(
      subtree,
      children,
      settings
    );
    let currentX = subtree.x - initialShiftLeft;

    const topLineY = getGenerationBottomLineY<T>(subtree, settings);

    children.forEach((child) => {
      const maxHeight = getGenerationMaxHeight<T>(child, settings);
      const midVerticalY = topLineY + maxHeight / 2;
      /////////////////// SIBLING
      child[settings.siblingsAccessor]?.forEach((sibling) => {
        sibling.isSibling = true;
        sibling.source = child;

        sibling.x = currentX;
        sibling.y = midVerticalY - sibling.height / 2;

        checkContourOverlap<T>(descendantsContour, sibling);

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

      checkContourOverlap<T>(descendantsContour, child);
      currentX = child.x + child.width + child.marginRight;

      /////////////////// partners
      child[settings.partnersAccessor]?.forEach((partner) => {
        partner.isPartner = true;
        partner.source = child;

        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        checkContourOverlap<T>(descendantsContour, partner);
        currentX = partner.x + partner.width + partner.marginRight;
      });

      drillChildren(child);
    });

    centerSourceToTargets<T>(subtree, children, settings);
  }
  normalizeTree<T>(root, settings.childrenAccessor, settings);

  const parentsContour = [];
  drillParents(root);
  function drillParents(subtree: TreeNode<T>) {
    const parents = subtree[settings.parentsAccessor];
    if (!parents) return;

    addTargetNodesSize<T>(parents, settings);

    const initialShiftLeft = getInitialTargetsShiftLeft<T>(
      subtree,
      parents,
      settings
    );
    let currentX = subtree.x - initialShiftLeft;

    const bottomLineY = getGenerationTopLineY<T>(subtree, settings);
    console.log({ bottomLineY });

    parents.forEach((parent) => {
      const maxHeight = getGenerationMaxHeight<T>(parent, settings);
      const midVerticalY =
        bottomLineY - settings.verticalSpacing - maxHeight / 2;

      /////////////////// SIBLING
      parent[settings.siblingsAccessor]?.forEach((sibling) => {
        sibling.isSibling = true;
        sibling.source = parent;

        sibling.x = currentX;
        sibling.y = midVerticalY - sibling.height / 2;

        checkContourOverlap<T>(parentsContour, sibling);

        currentX = sibling.x + sibling.width + sibling.marginRight;
      });

      ///////////// PARENT
      parent.isAncestor = true;

      parent.source = subtree;

      //set positions
      parent.x = currentX;
      parent.y = midVerticalY - parent.height / 2;

      //check if touches one of the contours
      checkContourOverlap<T>(parentsContour, parent);
      currentX = parent.x + parent.width + parent.marginRight;

      /////////////////// partners
      parent[settings.partnersAccessor]?.forEach((partner) => {
        partner.isPartner = true;
        partner.source = parent;

        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        checkContourOverlap<T>(parentsContour, partner);

        currentX = partner.x + partner.width + partner.marginRight;
      });

      drillParents(parent);
    });

    centerSourceToTargets<T>(subtree, parents, settings);
  }
  normalizeTree<T>(root, settings.parentsAccessor, settings);

  return root;
}
