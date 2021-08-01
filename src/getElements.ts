import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";
import { TreeRel } from "./TreeRel";
import { getFromMap } from "./getFromMap";

export const getElements = <T>(
  root: TreeNode<T>,
  settings: Settings,
  map?: TreeMap<T>
): {
  map: TreeMap<T>;
  nodes: TreeNode<T>[];
  rels: TreeRel<T>[];
  maxRight: number;
  maxLeft: number;
  maxBottom: number;
  maxTop: number;
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

  drill(root);
  function drill(subtree) {
    const siblings = map
      ? getFromMap(subtree[settings.nextBeforeAccessor], map)
      : subtree[settings.nextBeforeAccessor];
    siblings?.forEach((sibling) => {
      compare(sibling);
      nodes.push(sibling);
      rels.push({ source: subtree, target: sibling });
    });

    const partners = map
      ? getFromMap(subtree[settings.nextAfterAccessor], map)
      : subtree[settings.nextAfterAccessor];
    partners?.forEach((spouse) => {
      compare(spouse);
      nodes.push(spouse);
      rels.push({ source: subtree, target: spouse });
    });

    const children = map
      ? getFromMap(subtree[settings.targetsAccessor], map)
      : subtree[settings.targetsAccessor];
    children?.forEach((child) => {
      compare(child);
      nodes.push(child);
      rels.push({ source: subtree, target: child });
      drill(child);
    });

    const parents = map
      ? getFromMap(subtree[settings.sourcesAccessor], map)
      : subtree[settings.sourcesAccessor];
    parents?.forEach((parent) => {
      compare(parent);
      nodes.push(parent);
      rels.push({ source: subtree, target: parent });
      drill(parent);
    });
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
