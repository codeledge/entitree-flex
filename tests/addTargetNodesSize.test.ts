import { TestNode } from "./TestNode";
import { addGenerationSizes } from "../src/addGenerationSizes";
import { defaultSettings } from "../src";

test("adds sizes", () => {
  const targets = [{ width: 1 }, { height: 1 }, {}] as TestNode[];

  addGenerationSizes(targets, defaultSettings);

  expect(targets[0].width).toBe(1);
  expect(targets[0].height).toBe(defaultSettings.nodeHeight);
  expect(targets[0].marginBottom).toBe(defaultSettings.sourceTargetSpacing);
  expect(targets[1].width).toBe(defaultSettings.nodeWidth);
  expect(targets[1].height).toBe(1);
  expect(targets[1].marginBottom).toBe(defaultSettings.sourceTargetSpacing);
  expect(targets[2].width).toBe(defaultSettings.nodeWidth);
  expect(targets[2].height).toBe(defaultSettings.nodeHeight);
  expect(targets[2].marginBottom).toBe(defaultSettings.sourceTargetSpacing);
});
