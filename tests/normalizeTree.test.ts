import { TestNode } from "./TestNode";
import { defaultSettings } from "./../src/defaultSettings";
import { normalizeTree } from "../src/normalizeTree";
import { TreeMap } from "../src/TreeMap";

describe("normalizeTree", () => {
  test("check shift", () => {
    const root = {
      children: [1],
      groupBottomY: 0,
      groupLeftX: 0,
      groupMaxHeight: 0,
      groupMaxWidth: 0,
      groupRightX: 0,
      groupTopY: 0,
      height: 10,
      marginBottom: 10,
      marginRight: 10,
      width: 10,
      x: 0,
      y: 0,
    } as TestNode;

    const map: TreeMap = {
      0: root,
      1: {
        groupBottomY: 0,
        groupLeftX: 0,
        groupMaxHeight: 0,
        groupMaxWidth: 0,
        groupRightX: 0,
        groupTopY: 0,
        height: 10,
        marginBottom: 10,
        marginRight: 10,
        width: 10,
        x: 0,
        y: 0,
      },
    };

    normalizeTree(root, "children", defaultSettings, map);

    expect(map[1].x).toBe(0);
  });
});
