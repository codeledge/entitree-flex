import { TreeNode } from "./../src/TreeNode";
import { randomInt } from "./randomInt";
import { randomName } from "./randomName";

export const randomNode = ({
  childDepth,
  parentDepth,
  noSiblings,
  noPartners,
}: {
  childDepth?: number;
  parentDepth?: number;
  noSiblings?: boolean;
  noPartners?: boolean;
}): TreeNode => ({
  width: randomInt(20, 80),
  height: randomInt(20, 80),
  name: randomName(),
  ...(childDepth && {
    children: randomTargets({ childDepth: childDepth - 1, parentDepth: 0 }),
  }),
  ...(parentDepth && {
    parents: randomTargets({ parentDepth: parentDepth - 1, childDepth: 0 }),
  }),
  ...(!noSiblings && {
    siblings: randomSides(),
  }),
  ...(!noPartners && {
    partners: randomSides(),
  }),
});

export const randomSides = (): TreeNode[] => {
  return new Array(randomInt(0, 2)).fill(0).map(() => {
    return randomNode({ noPartners: true, noSiblings: true });
  });
};

export const randomTargets = ({ childDepth, parentDepth }): TreeNode[] => {
  return new Array(randomInt(1, 4)).fill(0).map(() => {
    return randomNode({ childDepth, parentDepth });
  });
};
