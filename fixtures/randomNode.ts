import { randomId } from "./randomId";
import { randomInt } from "./randomInt";
import { randomName } from "./randomName";

export type RandomNode = {
  id: number;
  depth?: number;
  width?: number;
  height?: number;
  name?: string;
  children?: number[];
  parents?: number[];
  siblings?: number[];
  spouses?: number[];
};

export const randomNode = (): RandomNode => ({
  id: randomId(),
  width: randomInt(20, 80),
  height: randomInt(20, 80),
  name: randomName(),
  children: [],
  parents: [],
  siblings: [],
  spouses: [],
});

// export const randomSides = (): RandomNode[] => {
//   return new Array(randomInt(0, 2)).fill(0).map(() => {
//     return randomNode({ noPartners: true, noSiblings: true });
//   });
// };

// export const randomTargets = ({ childDepth, parentDepth }): RandomNode[] => {
//   return new Array(randomInt(1, 4)).fill(0).map(() => {
//     return randomNode({ childDepth, parentDepth });
//   });
// };
