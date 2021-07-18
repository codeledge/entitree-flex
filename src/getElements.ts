import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { getFromMap } from "./getFromMap";

export const getElements = <T>(
  root: TreeNode<T>,
  settings: Settings,
  map?: Record<string, TreeNode<T>>
): {
  map: Record<string, TreeNode<T>>;
  nodes: TreeNode<T>[];
  rels: { source: TreeNode<T>; target: TreeNode<T> }[];
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
      ? getFromMap(subtree[settings.siblingsAccessor], map)
      : subtree[settings.siblingsAccessor];
    siblings?.forEach((sibling) => {
      compare(sibling);
      nodes.push(sibling);
      rels.push({ source: subtree, target: sibling });
    });

    const partners = map
      ? getFromMap(subtree[settings.partnersAccessor], map)
      : subtree[settings.partnersAccessor];
    partners?.forEach((spouse) => {
      compare(spouse);
      nodes.push(spouse);
      rels.push({ source: subtree, target: spouse });
    });

    const children = map
      ? getFromMap(subtree[settings.childrenAccessor], map)
      : subtree[settings.childrenAccessor];
    children?.forEach((child) => {
      compare(child);
      nodes.push(child);
      rels.push({ source: subtree, target: child });
      drill(child);
    });

    const parents = map
      ? getFromMap(subtree[settings.parentsAccessor], map)
      : subtree[settings.parentsAccessor];
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
