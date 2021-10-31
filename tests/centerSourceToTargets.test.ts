import { TestNode } from "./TestNode";
import { centerSourceToTargets } from "../src/centerSourceToTargets";
import { defaultSettings } from "../src/defaultSettings";
import { TreeMap } from "../src/TreeMap";

test("centerSourceToTargets", () => {
  const source = { width: 3, x: 0 } as TestNode;
  const targets = [
    { x: 0, width: 5, height: 1 },
    { x: 10, width: 10 },
  ] as TestNode[];

  const map: TreeMap = {};

  centerSourceToTargets(source, targets, defaultSettings, map);

  expect(source.x).toBe(8.5);
});
