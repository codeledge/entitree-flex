export interface TreeNode extends Record<string, any> {
  bottomLineY: number;
  height: number;
  isAncestor?: boolean;
  isDescendant?: boolean;
  isRoot?: boolean;
  marginBottom: number;
  marginRight: number;
  topLineY: number;
  width: number;
  x: number;
  y: number;
}
