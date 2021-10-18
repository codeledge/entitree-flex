export type TreeNode<T extends {} = {}> = T & {
  isAncestor?: boolean;
  isDescendant?: boolean;
  isRoot?: boolean;
  marginBottom: number;
  marginRight: number;
  groupTopY: number;
  groupBottomY: number;
  groupLeftX: number;
  groupRightX: number;
  groupMaxHeight: number;
  groupMaxWidth: number;
  height: number;
  width: number;
  x: number;
  y: number;
};
