# tidytree

Implementation of the tree dieagram layout, using the Reingold–Tilford “tidy” algorithm, improved to run in linear time by Buchheim et al.

Link to paper => http://dirk.jivas.de/papers/buchheim02improving.pdf

## example in javascript

https://github.com/d3/d3-hierarchy/blob/main/src/tree.js

### Examples

`x` root

`p` parent

`c` child

`s` spouse/sibling

Single child/parent

```
   p
   |
   x
   |
   c
```

Root spouse/sibling

```
  p
  |
s-x-s
  |
  c
```

two children/parents

```
 p   p
  \ /
   x
  / \
 c   c
```

Spouse of child

```
   x
  / \
 c-s c
```

Sibling of child

```
    x
   / \
s-c   c
```

Three children

```
   x
  /|\
 c c c
```
