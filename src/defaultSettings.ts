import { Settings } from "./Settings";

export const defaultSettings: Settings = {
  targetsAccessor: "children",
  differentGroupSpacing: 20,
  nodeHeight: 40,
  nodeWidth: 40,
  enableFlex: true,
  sourcesAccessor: "parents",
  nextAfterAccessor: "partners",
  rootX: 0,
  rootY: 0,
  nextBeforeAccessor: "siblings",
  nextBeforeSpacing: 10,
  nextAfterSpacing: 10,
  sourceTargetSpacing: 10,
  clone: false,
};
