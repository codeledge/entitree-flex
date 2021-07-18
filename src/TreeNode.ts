export type TreeNode<T extends {}> = T & {
  siblings?: TreeNode<T>[];
  parents?: TreeNode<T>[];
  children?: TreeNode<T>[];
  partners?: TreeNode<T>[];
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
};
