const layout = require("../src/index.ts").default;
const niceTree = require("./niceTree.ts").default;
const { randomTree } = require("../fixtures/randomTree");

var draw = SVG().addTo("body");

const tree = randomTree();

layout(tree, {
  rootX: window.innerWidth / 2,
  rootY: window.innerHeight / 2,
});

console.log(tree);

drawPaths(tree);
drawNodes(tree);

function drawPaths(subtree) {
  function getPathD(sourceNode, targetNode) {
    return `M${sourceNode.x + sourceNode.width / 2} ${
      sourceNode.y + sourceNode.height
    } L${targetNode.x + targetNode.width / 2} ${targetNode.y}`;
  }
  drill(subtree);
  function drill(subtree) {
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

function drawNodes(subtree) {
  drill(subtree);
  function drill(subtree) {
    draw
      .rect(
        subtree.width + (subtree.marginRight || 0),
        subtree.height + (subtree.marginBottom || 0)
      )
      .move(subtree.x, subtree.y)
      .radius(3)
      .opacity(0.1)
      .fill(stringToColour(subtree.name));

    draw
      .rect(subtree.width, subtree.height)
      .radius(3)
      .move(subtree.x, subtree.y)
      .fill(stringToColour(subtree.name));

    //draw.text(subtree.name).move(subtree.x, subtree.y);

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
