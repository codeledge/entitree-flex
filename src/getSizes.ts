import { Settings } from "./Settings";
import { TreeNode } from "./TreeNode";
import { defaultSettings } from "./defaultSettings";
import { getFromMap } from "./getFromMap";

export const getSizes = <T>(
  rootId: string,
  map: Record<string, TreeNode<T>>,
  customSettings: Partial<Settings> = {}
): {
  maxRight: number;
  maxLeft: number;
  maxBottom: number;
  maxTop: number;
} => {
  const settings: Settings = {
    ...defaultSettings,
    ...customSettings,
  };
  const root = map[rootId];

  let maxRight = root.x + root.width;
  let maxLeft = root.x;
  let maxBottom = root.y + root.height;
  let maxTop = root.y;

  function compare(node) {
    maxRight = Math.max(maxRight, node.x + node.width);
    maxLeft = Math.max(maxLeft, node.x);
    maxBottom = Math.max(maxBottom, node.y + node.height);
    maxTop = Math.max(maxTop, node.y);
  }

  drill(root);
  function drill(subtree) {
    const siblings = getFromMap(subtree[settings.siblingsAccessor], map);
    siblings?.forEach((sibling) => {
      compare(sibling);
    });
    const partners = getFromMap(subtree[settings.partnersAccessor], map);
    partners?.forEach((spouse) => {
      compare(spouse);
    });
    const children = getFromMap(subtree[settings.childrenAccessor], map);
    children?.forEach((child) => {
      compare(child);

      drill(child);
    });
    const parents = getFromMap(subtree[settings.parentsAccessor], map);
    parents?.forEach((parent) => {
      compare(parent);

      drill(parent);
    });
  }

  return {
    maxRight,
    maxLeft,
    maxBottom,
    maxTop,
  };
};
