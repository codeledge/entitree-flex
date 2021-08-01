export type TreeNode<T extends {}> = T & {
  bottomLineY: number;
  children?: TreeNode<T>[];
  height: number;
  isAncestor?: boolean;
  isDescendant?: boolean;
  isRoot?: boolean;
  marginBottom: number;
  marginRight: number;
  parents?: TreeNode<T>[];
  partners?: TreeNode<T>[];
  siblings?: TreeNode<T>[];
  topLineY: number;
  width: number;
  x: number;
  y: number;
};
