import { TestNode } from "./TestNode";
import { defaultSettings } from "./../src/defaultSettings";
import { normalizeTree } from "../src/normalizeTree";

test("1 target same size", () => {
  const root = {
    x: 0,
    width: 10,
    height: 10,
    marginRight: 10,
    children: [
      {
        x: 100,
        width: 10,
        marginRight: 10,
      },
      { x: 110, width: 10, marginRight: 10 },
    ],
  } as TestNode;
  const shift = normalizeTree(root, "children", defaultSettings);

  expect(root.children[0].x).toBe(-5);
});
