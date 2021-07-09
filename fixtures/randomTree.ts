import { TreeNode } from "./../src/index";
import { randomInt } from "./randomInt";
import { randomNode } from "./randomNode";

export const randomTree = (): TreeNode => {
  return {
    ...randomNode({
      childDepth: randomInt(1, 3),
      parentDepth: randomInt(1, 3),
    }),
    name: "root",
  };
};
