import { RandomNode, randomNode } from "./randomNode";

import { randomInt } from "./randomInt";

export const randomTree = (): RandomNode => {
  return {
    ...randomNode({
      childDepth: randomInt(1, 3),
      parentDepth: randomInt(1, 3),
    }),
    name: "root",
  };
};
