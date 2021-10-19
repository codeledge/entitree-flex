const { layoutFromMap } = require("../src/index.ts");
const flatTree = require("./flatTree.ts").default;
const { randomTree } = require("../fixtures/randomTree");

var draw = SVG().addTo("body");

const { nodes, rels } = layoutFromMap(1, randomTree(), {
  rootX: window.innerWidth / 2,
  rootY: window.innerHeight / 2,
  sourceTargetSpacing: 20,
  orientation: "horizontal",
});

//console.log(nodes);

rels.forEach((rel) => {
  draw.path(getPathD(rel.source, rel.target));
});
nodes.forEach((node) => {
  drawNode(node);
});

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

  //draw.text(node.name).move(node.x, node.y);
}

function stringToColour(str) {
  str += "fixed-padding";
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
