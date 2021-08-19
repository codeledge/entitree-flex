# entitree-flex

This is the core package that fuels the iconic https://www.entitree.com website!

In a paper from 2013, A.J. van der Ploeg enhanced the Tidy Tree (Reingold-Tilford) algorithm to allow
for variable-sized nodes, while keeping its linear runtime nature. He
described the algorithm in his paper, [Drawing Non-layered Tidy Trees in
Linear Time](https://core.ac.uk/download/pdf/301654972.pdf). The author also provided a working Java application
on GitHub at https://github.com/cwi-swat/non-layered-tidy-trees

This package take it to the next level by allowing also side nodes, very useful if you are drawing family trees and pedigrees.

## Examples

<img width="951" alt="Screenshot 2021-07-11 at 16 41 14" src="https://user-images.githubusercontent.com/4820803/125201718-33e42d00-e268-11eb-95f0-d2b365b9f129.png">
<img width="921" alt="Screenshot 2021-07-11 at 16 40 53" src="https://user-images.githubusercontent.com/4820803/125201720-35155a00-e268-11eb-87c3-f71e38dcf7a5.png">
<img width="1070" alt="Screenshot 2021-07-11 at 16 40 40" src="https://user-images.githubusercontent.com/4820803/125201722-35adf080-e268-11eb-81fb-55372027958e.png">
<img width="503" alt="Screenshot 2021-07-11 at 16 40 17" src="https://user-images.githubusercontent.com/4820803/125201724-36468700-e268-11eb-87ee-f8a3b58c7323.png">

## Install

```
npm i entitree-flex
```

OR

```
yarn add entitree-flex
```

It does come with TS definitions

## Usage from nested object

```
const { layoutFromNested } = require("entitree-flex")
//or
import { layoutFromNested } from "entitree-flex"

const tree = {
  name: "root",
  width: 60,
  height: 20,
  siblings: [
    { name: "rootSibling1" },
    { name: "rootSibling2"},
  ],
  partners: [{ name: "rootPartner1" }, { name: "rootPartner2" }],
  children: [
    {
      name: "child1",
      width: 20,
      height: 50,
      partners: [
        {
          name: "child1partner1",
        },
      ],
      children: [
        {
          name: "grandchild1",
          children: [
            {
              name: "grandGrandchild1",
            },
          ],
        },
        {
          name: "grandchild2",
        },
      ],
    },
  ],
  parents: [
    {
      name: "parent1",
      parents: [
        {
          name: "grandParent1",
        },
        {
          name: "grandParent2",
        },
      ],
    },
    {
      name: "parent1",
      parents: [
        {
          name: "grandparent1",
        },
      ],
    },
  ],
};

layoutFromNested(tree [, settings])
```

and the object will be populated with all the coordinates for a flexible, bidirectional, side-nodes supporting tree

## Usage from flat object

```
const { layoutFromMap } = require("entitree-flex")
//or
import { layoutFromMap } from "entitree-flex"

const flatTree = {
  1: {
    name: "root",
    width: 14,
    childrenIds: [2, 3],
  },
  2: { name: "child2" },
  3: { name: "child3", childrenIds: [4, 5], spousesIds: [6] },
  4: { name: "grandChild4" },
  5: { name: "grandChild5" },
  6: { name: "spouse of child 3" },
};

layoutFromMap(1, flatTree [, settings])
```

## Settings

```
defaultSettings = {
  clone: false, // returns a copy of the input, if your application does not allow editing the original object
  firstDegreeSpacing: 15, // spacing in px between nodes belonging to the same source, eg children with same parent
  secondDegreeSpacing: 20, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
  enableFlex: true, // has slightly better perfomance if turned off (node.width, node.height will not be read)
  nextAfterAccessor: "partners", // the side node prop used to go sideways, AFTER the current node
  nextAfterSpacing: 10, // the spacing of the "side" nodes AFTER the current node
  nextBeforeAccessor: "siblings", // the side node prop used to go sideways, BEFORE the current node
  nextBeforeSpacing: 10, // the spacing of the "side" nodes BEFORE the current node
  nodeHeight: 40, // default node height in px
  nodeWidth: 40, // default node width in px
  rootX: 0, // set root position if other than 0
  rootY: 0, // set root position if other than 0
  sourcesAccessor: "parents", // the prop used to go up the ancestors
  sourceTargetSpacing: 10, // the "vertical" spacing in vertical layout
  targetsAccessor: "children", // what prop to use to pick up children
};
```

## Similar examples in javascript

- https://github.com/d3/d3-hierarchy no bidirectional, no flexible, no side nodes
- https://github.com/Klortho/d3-flextree no bidirectional, no side nodes
