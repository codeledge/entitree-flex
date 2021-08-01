import { TestNode } from "./TestNode";
import { defaultSettings } from "../src";
import { getInitialTargetsShiftLeft } from "../src/getInitialTargetsShiftLeft";

test("1 target same size", () => {
  const source = { width: 10, marginRight: 10 } as TestNode;
  const targets = [{ width: 10, marginRight: 10 }] as TestNode[];
  const shift = getInitialTargetsShiftLeft(source, targets, defaultSettings);

  expect(shift).toBe(0);
});

test("1 target smaller", () => {
  const source = { width: 10, marginRight: 10 } as TestNode;
  const targets = [{ width: 8, marginRight: 10 }] as TestNode[];
  const shift = getInitialTargetsShiftLeft(source, targets, defaultSettings);

  expect(shift).toBe(-1);
});

test("1 target bigger", () => {
  const source = { width: 10, marginRight: 10 } as TestNode;
  const targets = [{ width: 12, marginRight: 10 }] as TestNode[];
  const shift = getInitialTargetsShiftLeft(source, targets, defaultSettings);

  expect(shift).toBe(1);
});

test("2 targets", () => {
  const source = { width: 100 } as TestNode;
  const targets = [
    { width: 100, marginRight: 10 },
    { width: 100, marginRight: 10 },
  ] as TestNode[];
  const shift = getInitialTargetsShiftLeft(source, targets, defaultSettings);

  expect(shift).toBe(55);
});
