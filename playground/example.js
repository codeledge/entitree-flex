const { layoutFromNested, layoutFromMap } = require("../src/index.ts");
const niceTree = require("./niceTree.ts").default;
const debugTree = require("./debugTree.ts").default;
const flatTree = require("./flatTree.ts").default;
const { randomTree } = require("../fixtures/randomTree");

var draw = SVG().addTo("body");

let tree = layoutFromNested(debugTree, {
  rootX: window.innerWidth / 2,
  rootY: window.innerHeight / 2,
  sourceTargetSpacing: 20,
});

// const { nodes, rels } = layoutFromMap("1", flatTree, {
//   rootX: window.innerWidth / 2,
//   rootY: window.innerHeight / 2,
//   sourceTargetSpacing: 20,
//   targetsAccessor: "childrenIds",
//   nextAfterAccessor: "spousesIds",
// });
// rels.forEach((rel) => {
//   draw.path(getPathD(rel.source, rel.target));
// });
// nodes.forEach((node) => {
//   drawNode(node);
// });

drawPathsRecursive(tree);
function drawPathsRecursive(subtree) {
  drill(subtree);
  function drill(subtree) {
    if (subtree.siblings) {
      subtree.siblings.forEach((target, index) => {
        draw.path(getPathD(subtree, target));
      });
    }

    if (subtree.partners) {
      subtree.partners.forEach((target, index) => {
        draw.path(getPathD(subtree, target));
      });
    }

    if (subtree.children) {
      subtree.children.forEach((child, index) => {
        draw.path(getPathD(subtree, child));
        drill(child);
      });
    }

    if (subtree.parents) {
      subtree.parents.forEach((node, index) => {
        draw.path(getPathD(node, subtree));
        drill(node);
      });
    }
  }
}

drawNodesRecursive(tree);
function drawNodesRecursive(subtree) {
  drill(subtree);
  function drill(subtree) {
    drawNode(subtree);

    if (subtree.siblings) {
      subtree.siblings.forEach((target, index) => {
        drawNode(target);
      });
    }

    if (subtree.partners) {
      subtree.partners.forEach((target, index) => {
        drawNode(target);
      });
    }

    if (subtree.children) {
      subtree.children.forEach((node, index) => {
        drill(node);
      });
    }

    if (subtree.parents) {
      subtree.parents.forEach((node, index) => {
        drill(node);
      });
    }
  }
}

function drawNode(node) {
  draw
    .rect(
      node.width + (node.marginRight || 0),
      node.height + (node.marginBottom || 0)
    )
    .move(node.x, node.y)
    .radius(3)
    .opacity(0.1)
    .fill(stringToColour(node.name || ""));

  draw
    .rect(node.width, node.height)
    .radius(3)
    .move(node.x, node.y)
    .fill(stringToColour(node.name));

  draw.text(node.name).move(node.x, node.y);
}

function stringToColour(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}

function getPathD(sourceNode, targetNode) {
  return `M${sourceNode.x + sourceNode.width / 2} ${
    sourceNode.y + sourceNode.height / 2
  } L${targetNode.x + targetNode.width / 2} ${
    targetNode.y + targetNode.height / 2
  }`;
}
