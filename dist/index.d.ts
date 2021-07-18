import { Settings } from "./Settings";
import { TreeNode } from "TreeNode";
export * from "./getElements";
export * from "./getSizes";
export * from "./TreeNode";
export * from "./fromMap";
export default function layout<T>(originalRoot: T, customSettings?: Partial<Settings>): TreeNode<T>;
