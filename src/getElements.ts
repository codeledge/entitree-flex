import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { TreeRel } from "./TreeRel";
import { getFromMap } from "./getFromMap";

export const getElements = <T>(
  root: TreeNode<T>,
  settings: Settings,
  map: TreeMap<T>
): {
  map: TreeMap<T>;
  maxBottom: number;
  maxLeft: number;
  maxRight: number;
  maxTop: number;
  nodes: TreeNode<T>[];
  rels: TreeRel<T>[];
} => {
  const nodes = [root];
  const rels = [];

  let maxRight = root.x + root.width;
  let maxLeft = root.x;
  let maxBottom = root.y + root.height;
  let maxTop = root.y;

  function compare(node) {
    maxRight = Math.max(maxRight, node.x + node.width);
    maxLeft = Math.min(maxLeft, node.x);
    maxBottom = Math.max(maxBottom, node.y + node.height);
    maxTop = Math.min(maxTop, node.y);
  }

  function processNextBefores(subtree) {
    const nextBefores = getFromMap(subtree[settings.nextBeforeAccessor], map);

    nextBefores?.forEach((sibling) => {
      compare(sibling);
      nodes.push(sibling);
      rels.push({ source: subtree, target: sibling });
    });
  }

  function processNextAfters(subtree) {
    const nextAfters = getFromMap(subtree[settings.nextAfterAccessor], map);

    nextAfters?.forEach((spouse) => {
      compare(spouse);
      nodes.push(spouse);
      rels.push({ source: subtree, target: spouse });
    });
  }

  drill(root);
  function drill(subtree, direction?: "parents" | "children") {
    processNextBefores(subtree);
    processNextAfters(subtree);

    if (!direction || direction === "parents") {
      const parents = getFromMap(subtree[settings.sourcesAccessor], map);

      parents?.forEach((parent) => {
        compare(parent);
        nodes.push(parent);
        rels.push({ source: subtree, target: parent });
        drill(parent, "parents");
      });
    }

    if (!direction || direction === "children") {
      const children = getFromMap(subtree[settings.targetsAccessor], map);
      children?.forEach((child) => {
        compare(child);
        nodes.push(child);
        rels.push({ source: subtree, target: child });
        drill(child, "children");
      });
    }
  }

  return {
    map,
    nodes,
    rels,
    maxRight,
    maxLeft,
    maxBottom,
    maxTop,
  };
};
