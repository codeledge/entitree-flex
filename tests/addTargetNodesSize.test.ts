import { TreeNode, defaultSettings } from "../src";

import { addTargetNodesSize } from "../src/addTargetNodesSize";

test("adds sizes", () => {
  const targets = [{ width: 1 }, { height: 1 }, {}] as TreeNode[];

  addTargetNodesSize(targets, defaultSettings);

  expect(targets[0].width).toBe(1);
  expect(targets[0].height).toBe(defaultSettings.nodeHeight);
  expect(targets[0].marginBottom).toBe(defaultSettings.verticalSpacing);
  expect(targets[1].width).toBe(defaultSettings.nodeWidth);
  expect(targets[1].height).toBe(1);
  expect(targets[1].marginBottom).toBe(defaultSettings.verticalSpacing);
  expect(targets[2].width).toBe(defaultSettings.nodeWidth);
  expect(targets[2].height).toBe(defaultSettings.nodeHeight);
  expect(targets[2].marginBottom).toBe(defaultSettings.verticalSpacing);
});
