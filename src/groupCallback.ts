import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { TreeNode } from "./TreeNode";

export const groupCallback = (
  mainNode: TreeNode,
  mainNodeCb: (m: TreeNode) => {},
  beforesCb: (b: TreeNode) => {},
  aftersCb: (a: TreeNode) => {},
  settings: Settings,
  map: TreeMap
) => {};
