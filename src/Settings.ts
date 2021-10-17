export type Settings = {
  clone: boolean;
  firstDegreeSpacing: number;
  secondDegreeSpacing: number;
  enableFlex: boolean;
  nextAfterAccessor: string;
  nextAfterSpacing: number;
  nextBeforeAccessor: string;
  nextBeforeSpacing: number;
  nodeHeight: number;
  nodeWidth: number;
  rootX: number;
  rootY: number;
  sourcesAccessor: string;
  sourceTargetSpacing: number;
  targetsAccessor: string;
  orientation: "vertical" | "horizontal";
};
