# entitree-flex

In a paper from 2013, A.J. van der Ploeg enhanced the algorithm to allow
for variable-sized nodes, while keeping its linear runtime nature. He
described the algorithm in his paper, [Drawing Non-layered Tidy Trees in
Linear Time](https://core.ac.uk/download/pdf/301654972.pdf). The author also provided a working Java application
on GitHub at https://github.com/cwi-swat/non-layered-tidy-trees

## Install

```
npm i entitree-flex
```

```
yarn add entitree-flex
```

It does come with TS definitions

## Usage

```
const layout = require("entitree-flex").default
```

or

```
import layout from "entitree-flex"
```

```
const tree = {
  name: "root",
  siblings: [
    { name: "rootSibling1" },
    { name: "rootSibling2"},
  ],
  partners: [{ name: "rootPartner1" }, { name: "rootPartner2" }],
  children: [
    {
      name: "child1",
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

layout(tree)
```

and the object will be populated with all the coordinates for a flexible, bidirectional, side-nodes supporting tree

## Similar examples in javascript

- https://github.com/d3/d3-hierarchy no bidirectional, no flexible, no side nodes
- https://github.com/Klortho/d3-flextree no bidirectional, no side nodes
