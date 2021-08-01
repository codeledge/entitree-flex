import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { addGenerationSizes } from "./addGenerationSizes";
import { centerSourceToTargets } from "./centerSourceToTargets";
import { checkContourOverlap } from "./checkContourOverlap";
import { defaultSettings } from "./defaultSettings";
import { getElements } from "./getElements";
import { getFromMap } from "./getFromMap";
import { getGenerationBottomLineY } from "./getGenerationBottomLineY";
import { getGenerationMaxHeight } from "./getGenerationMaxHeight";
import { getGenerationTopLineY } from "./getGenerationTopLineY";
import { getInitialTargetsShiftLeft } from "./getInitialTargetsShiftLeft";
import { makeRoot } from "./makeRoot";
import { normalizeTree } from "./normalizeTree";

export function layoutFromMap<T>(
  rootId: string,
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

  const root = makeRoot<T>(map[rootId], settings);

  addGenerationSizes<T>([root], settings, map);
  root.topLineY = root.y;
  root.bottomLineY = root.y + root.height + root.marginBottom;

  if (root[settings.nextBeforeAccessor])
    getFromMap(root[settings.nextBeforeAccessor], map)
      .reverse()
      .forEach((sibling, siblingIndex, rootSiblings) => {
        const nextNode = rootSiblings[siblingIndex - 1] || root;
        sibling.x = nextNode.x - sibling.width - sibling.marginRight;
        //align vertically
        sibling.y = root.y + root.height / 2 - sibling.height / 2;
        const outerBottomY = sibling.y + sibling.height + sibling.marginBottom;

        if (sibling.y < root.topLineY) root.topLineY = sibling.y;
        if (outerBottomY > root.bottomLineY) root.bottomLineY = outerBottomY;
      });

  if (root[settings.nextAfterAccessor])
    getFromMap(root[settings.nextAfterAccessor], map).forEach(
      (partner, partnerIndex, rootPartners) => {
        const previousPartner = rootPartners[partnerIndex - 1] || root;
        partner.x =
          previousPartner.x +
          previousPartner.width +
          previousPartner.marginRight;
        partner.y = root.y + root.height / 2 - partner.height / 2;
        const outerBottomY = partner.y + partner.height + partner.marginBottom;
        if (partner.y < root.topLineY) root.topLineY = partner.y;
        if (outerBottomY > root.bottomLineY) root.bottomLineY = outerBottomY;
      }
    );

  const descendantsContour = [];
  drillChildren(root);
  function drillChildren(subtree: TreeNode<T>) {
    const children = getFromMap(subtree[settings.targetsAccessor], map);
    if (!children || !children.length) return;

    //rename to addGenerationSizes
    addGenerationSizes<T>(children, settings, map);

    const initialShiftLeft = getInitialTargetsShiftLeft<T>(
      subtree,
      children,
      settings,
      map
    );
    let currentX = subtree.x - initialShiftLeft;

    const topLineY = getGenerationBottomLineY<T>(subtree, settings, map);

    children.forEach((child) => {
      const maxHeight = getGenerationMaxHeight<T>(child, settings, map);
      const midVerticalY = topLineY + maxHeight / 2;
      /////////////////// SIBLING
      const siblings = getFromMap(child[settings.nextBeforeAccessor], map);
      siblings?.forEach((sibling) => {
        sibling.x = currentX;
        sibling.y = midVerticalY - sibling.height / 2;

        checkContourOverlap<T>(descendantsContour, sibling);

        currentX = sibling.x + sibling.width + sibling.marginRight;
      });

      /////////////////// CHILD

      //Set positions
      child.x = currentX;
      child.y = midVerticalY - child.height / 2;

      checkContourOverlap<T>(descendantsContour, child);
      currentX = child.x + child.width + child.marginRight;

      /////////////////// partners
      const partners = getFromMap(child[settings.nextAfterAccessor], map);
      partners?.forEach((partner) => {
        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        checkContourOverlap<T>(descendantsContour, partner);
        currentX = partner.x + partner.width + partner.marginRight;
      });

      drillChildren(child);
    });

    centerSourceToTargets<T>(subtree, children, settings, map);
  }
  normalizeTree<T>(root, settings.targetsAccessor, settings, map);

  const parentsContour = [];
  drillParents(root);
  function drillParents(subtree: TreeNode<T>) {
    const parents = getFromMap(subtree[settings.sourcesAccessor], map);

    if (!parents?.length) return;

    addGenerationSizes<T>(parents, settings, map);

    const initialShiftLeft = getInitialTargetsShiftLeft<T>(
      subtree,
      parents,
      settings,
      map
    );
    let currentX = subtree.x - initialShiftLeft;

    const bottomLineY = getGenerationTopLineY<T>(subtree, settings, map);

    parents.forEach((parent) => {
      const maxHeight = getGenerationMaxHeight<T>(parent, settings, map);
      const midVerticalY =
        bottomLineY - settings.sourceTargetSpacing - maxHeight / 2;

      /////////////////// SIBLING
      const siblings = getFromMap(parent[settings.nextBeforeAccessor], map);

      siblings?.forEach((sibling) => {
        sibling.x = currentX;
        sibling.y = midVerticalY - sibling.height / 2;

        checkContourOverlap<T>(parentsContour, sibling);

        currentX = sibling.x + sibling.width + sibling.marginRight;
      });

      ///////////// PARENT
      //set positions
      parent.x = currentX;
      parent.y = midVerticalY - parent.height / 2;

      //check if touches one of the contours
      checkContourOverlap<T>(parentsContour, parent);
      currentX = parent.x + parent.width + parent.marginRight;

      /////////////////// partners
      parent[settings.nextAfterAccessor]?.forEach((partner) => {
        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        checkContourOverlap<T>(parentsContour, partner);

        currentX = partner.x + partner.width + partner.marginRight;
      });

      drillParents(parent);
    });

    centerSourceToTargets<T>(subtree, parents, settings, map);
  }
  normalizeTree<T>(root, settings.sourcesAccessor, settings, map);

  return getElements(root, settings, map);
}
