# tidytree

In a paper from 2013, A.J. van der Ploeg enhanced the algorithm to allow
for variable-sized nodes, while keeping its linear runtime nature. He
described the algorithm in his paper, [Drawing Non-layered Tidy Trees in
Linear Time](https://core.ac.uk/download/pdf/301654972.pdf). The author also provided a working Java application
on GitHub at https://github.com/cwi-swat/non-layered-tidy-trees

## examples in javascript

https://github.com/d3/d3-hierarchy/blob/main/src/tree.js
https://github.com/Klortho/d3-flextree

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
