import { RandomNode, randomNode } from "./randomNode";

import { randomInt } from "./randomInt";

type RandomTree = Record<RandomNode["id"], RandomNode>;

export const randomTree = (): RandomTree => {
  const tree = {};
  const root = randomNode();

  const childDepth = randomInt(1, 3);
  const parentDepth = randomInt(1, 3);

  tree[root.id] = root;
  spawnChildren(root, 0);
  function spawnChildren(subtree, depth) {
    if (depth === childDepth) {
      return;
    }
    for (let index = 0; index < randomInt(1, 3); index++) {
      const child = randomNode();

      for (let index = 0; index < randomInt(0, 2); index++) {
        const spouse = randomNode();
        tree[spouse.id] = spouse;
        child.spouses.push(spouse.id);
      }

      for (let index = 0; index < randomInt(0, 2); index++) {
        const sibling = randomNode();
        tree[sibling.id] = sibling;
        child.siblings.push(sibling.id);
      }

      tree[child.id] = child;
      subtree.children.push(child.id);
      spawnChildren(child, depth + 1);
    }
  }

  spawnParents(root, 0);
  function spawnParents(subtree, depth) {
    if (depth === parentDepth) {
      return;
    }
    for (let index = 0; index < randomInt(1, 3); index++) {
      const parent = randomNode();

      for (let index = 0; index < randomInt(0, 2); index++) {
        const spouse = randomNode();
        tree[spouse.id] = spouse;
        parent.spouses.push(spouse.id);
      }

      for (let index = 0; index < randomInt(0, 2); index++) {
        const sibling = randomNode();
        tree[sibling.id] = sibling;
        parent.siblings.push(sibling.id);
      }

      tree[parent.id] = parent;
      subtree.parents.push(parent.id);
      spawnParents(parent, depth + 1);
    }
  }

  return tree;
};
