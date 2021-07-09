import { TreeNode, defaultSettings } from "../src";

import { centerSourceToTargets } from "../src/centerSourceToTargets";

test("adds sizes", () => {
  const source = { width: 3 } as TreeNode;
  const targets = [
    { x: 0, width: 5, height: 1 },
    { x: 10, width: 10 },
  ] as TreeNode[];

  centerSourceToTargets(source, targets);

  expect(source.x).toBe(8.5);
});
