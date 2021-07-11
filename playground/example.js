const layout = require("../src/index.ts").default;
const niceTree = require("./niceTree.ts").default;
const { randomTree } = require("../fixtures/randomTree");

var draw = SVG().addTo("body");

//const tree = niceTree;
const tree = randomTree();

layout(tree, {
  rootX: window.innerWidth / 2,
  rootY: window.innerHeight / 2,
  verticalSpacing: 20,
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
  function getSameD(sourceNode, targetNode) {
    const left = sourceNode.x < targetNode.x ? sourceNode : targetNode;
    const right = sourceNode.x < targetNode.x ? targetNode : sourceNode;
    return `M${left.x + left.width} ${left.y + left.height / 2} L${right.x} ${
      right.y + right.height / 2
    }`;
  }
  drill(subtree);
  function drill(subtree) {
    if (subtree.siblings) {
      subtree.siblings.forEach((target, index) => {
        draw.path(getSameD(subtree, target));
      });
    }

    if (subtree.partners) {
      subtree.partners.forEach((target, index) => {
        draw.path(getSameD(subtree, target));
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

function drawNode(node) {
  draw
    .rect(
      node.width + (node.marginRight || 0),
      node.height + (node.marginBottom || 0)
    )
    .move(node.x, node.y)
    .radius(3)
    .opacity(0.1)
    .fill(stringToColour(node.name));

  draw
    .rect(node.width, node.height)
    .radius(3)
    .move(node.x, node.y)
    .fill(stringToColour(node.name));

  //draw.text(node.name).move(node.x, node.y);
}

function drawNodes(subtree) {
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
