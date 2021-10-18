(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { layoutFromMap } = require("../src/index.ts");
const flatTree = require("./flatTree.ts").default;
// const { randomTree } = require("../fixtures/randomTree");

var draw = SVG().addTo("body");

const { nodes, rels } = layoutFromMap("1", flatTree, {
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

  draw.text(node.name).move(node.x, node.y);
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

},{"../src/index.ts":20,"./flatTree.ts":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "-5": {
        name: "-5",
    },
    "-4": {
        name: "-4",
    },
    "-3": {
        name: "-3",
    },
    "-2": {
        name: "-2",
        parents: [-4, -5],
    },
    1: {
        name: "root",
        children: [2, 3],
        parents: [-2, -3],
    },
    2: { name: "2", siblings: [8], spouses: [7] },
    3: { name: "3", children: [4, 5], spouses: [6] },
    4: { name: "4" },
    5: { name: "5", height: 20, width: 20 },
    6: { name: "6", spouses: [] },
    7: { name: "7", height: 60, width: 60 },
    8: { name: "8" },
    9: { name: "9" },
    10: { name: "10" },
    11: { name: "11" },
    12: { name: "12" },
    13: { name: "13" },
    14: { name: "14" },
};

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGroupBottomY = void 0;
var getFromMap_1 = require("./getFromMap");
var getNodeBottomY_1 = require("./getNodeBottomY");
function addGroupBottomY(subtree, settings, map) {
    subtree.groupBottomY = getNodeBottomY_1.getNodeBottomY(subtree);
    var siblings = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map);
    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
        subtree.groupBottomY = Math.max(subtree.groupBottomY, getNodeBottomY_1.getNodeBottomY(sibling));
    });
    var partners = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map);
    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
        subtree.groupBottomY = Math.max(subtree.groupBottomY, getNodeBottomY_1.getNodeBottomY(partner));
    });
}
exports.addGroupBottomY = addGroupBottomY;

},{"./getFromMap":15,"./getNodeBottomY":18}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGroupLeftX = void 0;
var getFromMap_1 = require("./getFromMap");
function addGroupLeftX(subtree, settings, map) {
    var _a, _b;
    subtree.groupLeftX = subtree.x;
    (_a = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map)) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
        subtree.groupLeftX = Math.min(subtree.groupLeftX, sibling.x);
    });
    (_b = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map)) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
        subtree.groupLeftX = Math.max(subtree.groupLeftX, partner.x);
    });
}
exports.addGroupLeftX = addGroupLeftX;

},{"./getFromMap":15}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGroupRightX = void 0;
var getNodeRightX_1 = require("./getNodeRightX");
var getFromMap_1 = require("./getFromMap");
function addGroupRightX(subtree, settings, map) {
    subtree.groupRightX = getNodeRightX_1.getNodeRightX(subtree);
    var siblings = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map);
    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
        subtree.groupRightX = Math.max(subtree.groupRightX, getNodeRightX_1.getNodeRightX(sibling));
    });
    var partners = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map);
    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
        subtree.groupRightX = Math.max(subtree.groupRightX, getNodeRightX_1.getNodeRightX(partner));
    });
}
exports.addGroupRightX = addGroupRightX;

},{"./getFromMap":15,"./getNodeRightX":19}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGroupTopY = void 0;
var getFromMap_1 = require("./getFromMap");
function addGroupTopY(subtree, settings, map) {
    var _a, _b;
    subtree.groupTopY = subtree.y;
    (_a = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map)) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
        subtree.groupTopY = Math.min(subtree.groupTopY, sibling.y);
    });
    (_b = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map)) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
        subtree.groupTopY = Math.max(subtree.groupTopY, partner.y);
    });
}
exports.addGroupTopY = addGroupTopY;

},{"./getFromMap":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLevelNodesSizes = void 0;
var getFromMap_1 = require("./getFromMap");
var addLevelNodesSizes = function (levelNodes, settings, map) {
    levelNodes.forEach(function (node, index) {
        node.width = node.width || settings.nodeWidth;
        node.height = node.height || settings.nodeHeight;
        if (settings.orientation === "vertical") {
            node.marginBottom = settings.sourceTargetSpacing;
        }
        else {
            node.marginRight = settings.sourceTargetSpacing;
        }
        //initial values
        node.groupMaxHeight = node.height;
        node.groupMaxWidth = node.width;
        var siblings = getFromMap_1.getFromMap(node[settings.nextBeforeAccessor], map);
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            sibling.width = sibling.width || settings.nodeWidth;
            sibling.height = sibling.height || settings.nodeHeight;
            if (settings.orientation === "vertical") {
                sibling.marginRight = settings.nextBeforeSpacing;
                sibling.marginBottom = settings.sourceTargetSpacing;
            }
            else {
                sibling.marginBottom = settings.nextBeforeSpacing;
                sibling.marginRight = settings.sourceTargetSpacing;
            }
            //check maxes
            node.groupMaxHeight = Math.max(node.groupMaxHeight, sibling.height);
            node.groupMaxWidth = Math.max(node.groupMaxWidth, sibling.width);
        });
        var spouses = getFromMap_1.getFromMap(node[settings.nextAfterAccessor], map);
        spouses === null || spouses === void 0 ? void 0 : spouses.forEach(function (spouse, spouseIndex) {
            spouse.width = spouse.width || settings.nodeWidth;
            spouse.height = spouse.height || settings.nodeHeight;
            if (spouseIndex === spouses.length - 1) {
                // secondDegreeSpacing because you want more space between the last spouse and the next child
                // so they don't get confused as being both children
                if (settings.orientation === "vertical") {
                    spouse.marginRight = settings.secondDegreeSpacing;
                }
                else {
                    spouse.marginBottom = settings.secondDegreeSpacing;
                }
            }
            else {
                if (settings.orientation === "vertical") {
                    spouse.marginRight = settings.nextAfterSpacing;
                }
                else {
                    spouse.marginBottom = settings.nextAfterSpacing;
                }
            }
            if (settings.orientation === "vertical") {
                spouse.marginBottom = settings.sourceTargetSpacing;
            }
            else {
                spouse.marginRight = settings.sourceTargetSpacing;
            }
            node.groupMaxHeight = Math.max(node.groupMaxHeight, spouse.height);
            node.groupMaxWidth = Math.max(node.groupMaxWidth, spouse.width);
        });
        if (spouses && spouses.length) {
            //for sure there is an after node
            if (settings.orientation === "vertical") {
                node.marginRight = settings.nextAfterSpacing;
            }
            else {
                node.marginBottom = settings.nextAfterSpacing;
            }
        }
        else {
            if (index === levelNodes.length - 1) {
                // there is a cousin next
                if (settings.orientation === "vertical") {
                    node.marginRight = settings.secondDegreeSpacing;
                }
                else {
                    node.marginBottom = settings.secondDegreeSpacing;
                }
            }
            else {
                //there is sibling next
                if (settings.orientation === "vertical") {
                    node.marginRight = settings.firstDegreeSpacing;
                }
                else {
                    node.marginBottom = settings.firstDegreeSpacing;
                }
            }
        }
    });
};
exports.addLevelNodesSizes = addLevelNodesSizes;

},{"./getFromMap":15}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRootSiblingsPositions = void 0;
var getNodeRightX_1 = require("./getNodeRightX");
var getFromMap_1 = require("./getFromMap");
var addRootSiblingsPositions = function (root, settings, map) {
    if (root[settings.nextBeforeAccessor])
        getFromMap_1.getFromMap(root[settings.nextBeforeAccessor], map)
            .reverse()
            .forEach(function (currentNode, nextBeforeIndex, nextBefores) {
            var previousNode = nextBefores[nextBeforeIndex - 1] || root;
            if (settings.orientation === "vertical") {
                currentNode.x =
                    previousNode.x - currentNode.width - currentNode.marginRight;
                //align vertically
                currentNode.y = root.y + root.height / 2 - currentNode.height / 2;
                var currentBottomY = currentNode.y + currentNode.height + currentNode.marginBottom;
                if (currentNode.y < root.groupTopY)
                    root.groupTopY = currentNode.y;
                if (currentBottomY > root.groupBottomY)
                    root.groupBottomY = currentBottomY;
            }
            else {
                currentNode.y =
                    previousNode.y - currentNode.height - currentNode.marginBottom;
                //align horizontally
                currentNode.x = root.x + root.width / 2 - currentNode.width / 2;
                var currentRightEdgeX = getNodeRightX_1.getNodeRightX(currentNode);
                if (currentNode.x < root.groupLeftX)
                    root.groupLeftX = currentNode.x;
                if (currentRightEdgeX > root.groupRightX)
                    root.groupRightX = currentRightEdgeX;
            }
        });
};
exports.addRootSiblingsPositions = addRootSiblingsPositions;

},{"./getFromMap":15,"./getNodeRightX":19}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRootSpousesPositions = void 0;
var getFromMap_1 = require("./getFromMap");
var addRootSpousesPositions = function (root, settings, map) {
    if (root[settings.nextAfterAccessor])
        getFromMap_1.getFromMap(root[settings.nextAfterAccessor], map).forEach(function (currentNode, nextAfterIndex, nextAfters) {
            var previousNode = nextAfters[nextAfterIndex - 1] || root;
            if (settings.orientation === "vertical") {
                currentNode.x =
                    previousNode.x + previousNode.width + previousNode.marginRight;
                // align vertically
                currentNode.y = root.y + root.height / 2 - currentNode.height / 2;
                var bottomEdgeY = currentNode.y + currentNode.height + currentNode.marginBottom;
                if (currentNode.y < root.groupTopY)
                    root.groupTopY = currentNode.y;
                if (bottomEdgeY > root.groupBottomY)
                    root.groupBottomY = bottomEdgeY;
            }
            else {
                currentNode.y =
                    previousNode.y + previousNode.height + previousNode.marginBottom;
                // align horizontally
                currentNode.x = root.x + root.width / 2 - currentNode.width / 2;
                //TODO: this function is the same in addRootSiblingsPositions (and above)
                var currentRightEdgeX = currentNode.x + currentNode.width + currentNode.marginRight;
                if (currentNode.x < root.groupLeftX)
                    root.groupLeftX = currentNode.x;
                if (currentRightEdgeX > root.groupRightX)
                    root.groupRightX = currentRightEdgeX;
            }
        });
};
exports.addRootSpousesPositions = addRootSpousesPositions;

},{"./getFromMap":15}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerSourceToTargets = void 0;
var getFromMap_1 = require("./getFromMap");
var last_1 = require("./last");
var centerSourceToTargets = function (source, targets, settings, map) {
    if (!source.isRoot) {
        //center only on actual children, not all generational nodes
        var firstTarget = targets[0];
        var lastTarget = last_1.last(targets);
        if (firstTarget && lastTarget) {
            if (settings.orientation === "vertical") {
                var newSourceX = (firstTarget.x + lastTarget.x + lastTarget.width) / 2 -
                    source.width / 2;
                var delta_1 = newSourceX - source.x;
                if (newSourceX !== source.x) {
                    source.x += delta_1;
                    var siblings = getFromMap_1.getFromMap(source[settings.nextBeforeAccessor], map);
                    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) { return (sibling.x += delta_1); });
                    var partners = getFromMap_1.getFromMap(source[settings.nextAfterAccessor], map);
                    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) { return (partner.x += delta_1); });
                }
            }
            else {
                var newSourceY = (firstTarget.y + lastTarget.y + lastTarget.height) / 2 -
                    source.height / 2;
                var delta_2 = newSourceY - source.y;
                if (newSourceY !== source.y) {
                    source.y += delta_2;
                    var siblings = getFromMap_1.getFromMap(source[settings.nextBeforeAccessor], map);
                    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) { return (sibling.y += delta_2); });
                    var partners = getFromMap_1.getFromMap(source[settings.nextAfterAccessor], map);
                    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) { return (partner.y += delta_2); });
                }
            }
        }
    }
};
exports.centerSourceToTargets = centerSourceToTargets;

},{"./getFromMap":15,"./last":21}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkContourOverlap = void 0;
var getNodeBottomY_1 = require("./getNodeBottomY");
var getNodeRightX_1 = require("./getNodeRightX");
function checkContourOverlap(contourSet, node, settings) {
    contourSet.forEach(function (contourNode) {
        if (settings.orientation === "vertical") {
            var nodeBottomY = getNodeBottomY_1.getNodeBottomY(node);
            var contourRightX = getNodeRightX_1.getNodeRightX(contourNode);
            var contourTopY = contourNode.y;
            var contourBottomY = getNodeBottomY_1.getNodeBottomY(contourNode);
            var coversCountour = node.y <= contourTopY && nodeBottomY >= contourBottomY;
            var traspassHorizontal = node.x < contourRightX;
            // if (coversCountour) {
            //   //todo: if it covers the whole box, remove box from contour array
            // }
            if (traspassHorizontal &&
                ((node.y > contourTopY && node.y < contourBottomY) ||
                    (nodeBottomY > contourTopY && nodeBottomY < contourBottomY) ||
                    coversCountour)) {
                node.x += contourRightX - node.x;
            }
        }
        else {
            var nodeRightX = getNodeRightX_1.getNodeRightX(node);
            var contourBottomY = getNodeBottomY_1.getNodeBottomY(contourNode);
            var contourLeftX = contourNode.x;
            var contourRightX = getNodeRightX_1.getNodeRightX(contourNode);
            var coversCountour = node.x <= contourLeftX && nodeRightX >= contourRightX;
            var traspassVertical = node.y < contourBottomY;
            // if (coversCountour) {
            //   //todo: if it covers the whole box, remove box from contour array
            // }
            if (traspassVertical &&
                ((node.x > contourLeftX && node.x < contourRightX) ||
                    (nodeRightX > contourLeftX && nodeRightX < contourRightX) ||
                    coversCountour)) {
                node.y += contourBottomY - node.y;
            }
        }
    });
    contourSet.push(node);
}
exports.checkContourOverlap = checkContourOverlap;

},{"./getNodeBottomY":18,"./getNodeRightX":19}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSettings = void 0;
exports.defaultSettings = {
    clone: false,
    enableFlex: true,
    firstDegreeSpacing: 15,
    nextAfterAccessor: "spouses",
    nextAfterSpacing: 10,
    nextBeforeAccessor: "siblings",
    nextBeforeSpacing: 10,
    nodeHeight: 40,
    nodeWidth: 40,
    rootX: 0,
    rootY: 0,
    secondDegreeSpacing: 20,
    sourcesAccessor: "parents",
    sourceTargetSpacing: 10,
    targetsAccessor: "children",
    orientation: "vertical",
};

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElements = void 0;
var getFromMap_1 = require("./getFromMap");
var getElements = function (root, settings, map) {
    var nodes = [root];
    var rels = [];
    var maxRight = root.x + root.width;
    var maxLeft = root.x;
    var maxBottom = root.y + root.height;
    var maxTop = root.y;
    function compare(node) {
        maxRight = Math.max(maxRight, node.x + node.width);
        maxLeft = Math.min(maxLeft, node.x);
        maxBottom = Math.max(maxBottom, node.y + node.height);
        maxTop = Math.min(maxTop, node.y);
    }
    function processNextBefores(subtree) {
        var nextBefores = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map);
        nextBefores === null || nextBefores === void 0 ? void 0 : nextBefores.forEach(function (sibling) {
            compare(sibling);
            nodes.push(sibling);
            rels.push({ source: subtree, target: sibling });
        });
    }
    function processNextAfters(subtree) {
        var nextAfters = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map);
        nextAfters === null || nextAfters === void 0 ? void 0 : nextAfters.forEach(function (spouse) {
            compare(spouse);
            nodes.push(spouse);
            rels.push({ source: subtree, target: spouse });
        });
    }
    drill(root);
    function drill(subtree, direction) {
        processNextBefores(subtree);
        processNextAfters(subtree);
        if (!direction || direction === "parents") {
            var parents = getFromMap_1.getFromMap(subtree[settings.sourcesAccessor], map);
            parents === null || parents === void 0 ? void 0 : parents.forEach(function (parent) {
                compare(parent);
                nodes.push(parent);
                rels.push({ source: subtree, target: parent });
                drill(parent, "parents");
            });
        }
        if (!direction || direction === "children") {
            var children = getFromMap_1.getFromMap(subtree[settings.targetsAccessor], map);
            children === null || children === void 0 ? void 0 : children.forEach(function (child) {
                compare(child);
                nodes.push(child);
                rels.push({ source: subtree, target: child });
                drill(child, "children");
            });
        }
    }
    return {
        map: map,
        nodes: nodes,
        rels: rels,
        maxRight: maxRight,
        maxLeft: maxLeft,
        maxBottom: maxBottom,
        maxTop: maxTop,
    };
};
exports.getElements = getElements;

},{"./getFromMap":15}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromMap = void 0;
var getFromMap = function (ids, map) {
    if (!ids)
        return;
    return ids.map(function (id) { return map[id]; });
};
exports.getFromMap = getFromMap;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialTargetsShiftLeft = void 0;
var getFromMap_1 = require("./getFromMap");
// o -> siblings
// p -> Partners
// x -> node
// if  000xpp oooxpp ooxPP
// THE Os and Ps should not be counted!
//because parent will center itself on the REAL children
var getInitialTargetsShiftLeft = function (source, targets, settings, map) {
    return (targets.reduce(function (totalWidth, target, index) {
        var siblings = getFromMap_1.getFromMap(target[settings.nextBeforeAccessor], map);
        var partners = getFromMap_1.getFromMap(target[settings.nextAfterAccessor], map);
        //for the first child, we don't care about the padding (siblings) left
        if (index !== 0) {
            siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (node) {
                totalWidth += node.width + node.marginRight;
            });
        }
        //do not add margin from last target
        totalWidth +=
            target.width + (index === targets.length - 1 ? 0 : target.marginRight);
        if (index !== targets.length - 1) {
            partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
                totalWidth += partner.width + partner.marginRight;
            });
        }
        return totalWidth;
    }, 0) /
        2 -
        source.width / 2);
};
exports.getInitialTargetsShiftLeft = getInitialTargetsShiftLeft;

},{"./getFromMap":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialTargetsShiftTop = void 0;
var getFromMap_1 = require("./getFromMap");
// o -> siblings
// p -> Partners
// x -> node
// if  000xpp oooxpp ooxPP
// THE Os and Ps should not be counted!
//because parent will center itself on the REAL children
var getInitialTargetsShiftTop = function (source, targets, settings, map) {
    return (targets.reduce(function (totalHeight, target, index) {
        //for the first child, we don't care about the padding (siblings) left
        if (index !== 0) {
            var siblings = getFromMap_1.getFromMap(target[settings.nextBeforeAccessor], map);
            siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (node) {
                totalHeight += node.height + node.marginBottom;
            });
        }
        //do not add margin from last target
        totalHeight +=
            target.height +
                (index === targets.length - 1 ? 0 : target.marginBottom);
        if (index !== targets.length - 1) {
            var partners = getFromMap_1.getFromMap(target[settings.nextAfterAccessor], map);
            partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
                totalHeight += partner.height + partner.marginBottom;
            });
        }
        return totalHeight;
    }, 0) /
        2 -
        source.height / 2);
};
exports.getInitialTargetsShiftTop = getInitialTargetsShiftTop;

},{"./getFromMap":15}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeBottomY = void 0;
var getNodeBottomY = function (node) {
    return node.y + node.height + node.marginBottom;
};
exports.getNodeBottomY = getNodeBottomY;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeRightX = void 0;
var getNodeRightX = function (node) {
    return node.x + node.width + node.marginRight;
};
exports.getNodeRightX = getNodeRightX;

},{}],20:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./layoutFromMap"), exports);
__exportStar(require("./TreeNode"), exports);

},{"./TreeNode":3,"./layoutFromMap":22}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = void 0;
var last = function (array) {
    return array === null || array === void 0 ? void 0 : array[array.length - 1];
};
exports.last = last;

},{}],22:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layoutFromMap = void 0;
var getNodeBottomY_1 = require("./getNodeBottomY");
var getNodeRightX_1 = require("./getNodeRightX");
var getInitialTargetsShiftTop_1 = require("./getInitialTargetsShiftTop");
var addLevelNodesSizes_1 = require("./addLevelNodesSizes");
var centerSourceToTargets_1 = require("./centerSourceToTargets");
var checkContourOverlap_1 = require("./checkContourOverlap");
var defaultSettings_1 = require("./defaultSettings");
var getElements_1 = require("./getElements");
var getFromMap_1 = require("./getFromMap");
var getInitialTargetsShiftLeft_1 = require("./getInitialTargetsShiftLeft");
var makeRoot_1 = require("./makeRoot");
var normalizeTree_1 = require("./normalizeTree");
var addRootSiblingsPositions_1 = require("./addRootSiblingsPositions");
var addRootSpousesPositions_1 = require("./addRootSpousesPositions");
var addGroupBottomY_1 = require("./addGroupBottomY");
var addGroupRightX_1 = require("./addGroupRightX");
var addGroupTopY_1 = require("./addGroupTopY");
var addGroupLeftX_1 = require("./addGroupLeftX");
function layoutFromMap(rootId, originalMap, customSettings) {
    if (customSettings === void 0) { customSettings = {}; }
    var settings = __assign(__assign({}, defaultSettings_1.defaultSettings), customSettings);
    var map = settings.clone
        ? JSON.parse(JSON.stringify(originalMap))
        : originalMap;
    var root = makeRoot_1.makeRoot(map[rootId], settings);
    addLevelNodesSizes_1.addLevelNodesSizes([root], settings, map);
    addRootSiblingsPositions_1.addRootSiblingsPositions(root, settings, map);
    addRootSpousesPositions_1.addRootSpousesPositions(root, settings, map);
    addGroupBottomY_1.addGroupBottomY(root, settings, map);
    addGroupRightX_1.addGroupRightX(root, settings, map);
    addGroupLeftX_1.addGroupLeftX(root, settings, map);
    addGroupTopY_1.addGroupTopY(root, settings, map);
    var descendantsContour = [];
    drillChildren(root);
    function drillChildren(subtree) {
        var children = getFromMap_1.getFromMap(subtree[settings.targetsAccessor], map);
        if (!(children === null || children === void 0 ? void 0 : children.length))
            return;
        addLevelNodesSizes_1.addLevelNodesSizes(children, settings, map);
        if (settings.orientation === "vertical") {
            var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(subtree, children, settings, map);
            var currentX_1 = subtree.x - initialShiftLeft;
            children.forEach(function (child) {
                var _a;
                var midVerticalY = subtree.groupBottomY + child.groupMaxHeight / 2;
                /////////////////// BEFORES ///////////////////
                var siblings = getFromMap_1.getFromMap(child[settings.nextBeforeAccessor], map);
                siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
                    sibling.x = currentX_1;
                    sibling.y = midVerticalY - sibling.height / 2;
                    checkContourOverlap_1.checkContourOverlap(descendantsContour, sibling, settings);
                    currentX_1 = getNodeRightX_1.getNodeRightX(sibling);
                });
                /////////////////// GROUP MAIN NODE
                //Set positions
                child.x = currentX_1;
                child.y = midVerticalY - child.height / 2;
                checkContourOverlap_1.checkContourOverlap(descendantsContour, child, settings);
                currentX_1 = getNodeRightX_1.getNodeRightX(child);
                /////////////////// AFTERS ///////////////////
                (_a = getFromMap_1.getFromMap(child[settings.nextAfterAccessor], map)) === null || _a === void 0 ? void 0 : _a.forEach(function (partner) {
                    partner.x = currentX_1;
                    partner.y = midVerticalY - partner.height / 2;
                    checkContourOverlap_1.checkContourOverlap(descendantsContour, partner, settings);
                    currentX_1 = getNodeRightX_1.getNodeRightX(partner);
                });
                addGroupBottomY_1.addGroupBottomY(child, settings, map);
                drillChildren(child);
            });
        }
        else {
            var initialShiftTop = getInitialTargetsShiftTop_1.getInitialTargetsShiftTop(subtree, children, settings, map);
            var currentY_1 = subtree.y - initialShiftTop;
            children.forEach(function (child) {
                var midPointX = subtree.groupRightX + child.groupMaxWidth / 2;
                /////////////////// SIBLING
                var siblings = getFromMap_1.getFromMap(child[settings.nextBeforeAccessor], map);
                siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
                    sibling.y = currentY_1;
                    sibling.x = midPointX - sibling.width / 2;
                    checkContourOverlap_1.checkContourOverlap(descendantsContour, sibling, settings);
                    currentY_1 = getNodeBottomY_1.getNodeBottomY(sibling);
                });
                /////////////////// CHILD
                //Set positions
                child.y = currentY_1;
                child.x = midPointX - child.width / 2;
                checkContourOverlap_1.checkContourOverlap(descendantsContour, child, settings);
                currentY_1 = getNodeBottomY_1.getNodeBottomY(child);
                /////////////////// partners
                var partners = getFromMap_1.getFromMap(child[settings.nextAfterAccessor], map);
                partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
                    partner.y = currentY_1;
                    partner.x = midPointX - partner.width / 2;
                    checkContourOverlap_1.checkContourOverlap(descendantsContour, partner, settings);
                    currentY_1 = getNodeBottomY_1.getNodeBottomY(partner);
                });
                addGroupRightX_1.addGroupRightX(child, settings, map);
                drillChildren(child);
            });
        }
        centerSourceToTargets_1.centerSourceToTargets(subtree, children, settings, map);
    }
    normalizeTree_1.normalizeTree(root, settings.targetsAccessor, settings, map);
    var parentsContour = [];
    drillParents(root);
    function drillParents(subtree) {
        var parents = getFromMap_1.getFromMap(subtree[settings.sourcesAccessor], map);
        if (!(parents === null || parents === void 0 ? void 0 : parents.length))
            return;
        addLevelNodesSizes_1.addLevelNodesSizes(parents, settings, map);
        if (settings.orientation === "vertical") {
            var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(subtree, parents, settings, map);
            var currentX_2 = subtree.x - initialShiftLeft;
            parents.forEach(function (parent) {
                var _a;
                var midVerticalY = subtree.groupTopY -
                    settings.sourceTargetSpacing -
                    parent.groupMaxHeight / 2;
                /////////////////// BEFORES ///////////////////
                var siblings = getFromMap_1.getFromMap(parent[settings.nextBeforeAccessor], map);
                siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
                    sibling.x = currentX_2;
                    sibling.y = midVerticalY - sibling.height / 2;
                    checkContourOverlap_1.checkContourOverlap(parentsContour, sibling, settings);
                    currentX_2 = getNodeRightX_1.getNodeRightX(sibling);
                });
                /////////////////// GROUP MAIN NODE
                //set positions
                parent.x = currentX_2;
                parent.y = midVerticalY - parent.height / 2;
                //check if touches one of the contours
                checkContourOverlap_1.checkContourOverlap(parentsContour, parent, settings);
                currentX_2 = getNodeRightX_1.getNodeRightX(parent);
                /////////////////// AFTERS ///////////////////
                (_a = getFromMap_1.getFromMap(parent[settings.nextAfterAccessor], map)) === null || _a === void 0 ? void 0 : _a.forEach(function (partner) {
                    partner.x = currentX_2;
                    partner.y = midVerticalY - partner.height / 2;
                    checkContourOverlap_1.checkContourOverlap(parentsContour, partner, settings);
                    currentX_2 = getNodeRightX_1.getNodeRightX(partner);
                });
                addGroupTopY_1.addGroupTopY(parent, settings, map);
                drillParents(parent);
            });
        }
        else {
            var initialShiftTop = getInitialTargetsShiftTop_1.getInitialTargetsShiftTop(subtree, parents, settings, map);
            var currentY_2 = subtree.y - initialShiftTop;
            parents.forEach(function (parent) {
                var _a, _b;
                var midPointX = subtree.groupLeftX -
                    settings.sourceTargetSpacing -
                    parent.groupMaxWidth / 2;
                /////////////////// SIBLING
                (_a = getFromMap_1.getFromMap(parent[settings.nextBeforeAccessor], map)) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
                    sibling.y = currentY_2;
                    sibling.x = midPointX - sibling.width / 2;
                    checkContourOverlap_1.checkContourOverlap(parentsContour, sibling, settings);
                    currentY_2 = getNodeBottomY_1.getNodeBottomY(sibling);
                });
                /////////////////// CHILD
                //Set positions
                parent.y = currentY_2;
                parent.x = midPointX - parent.width / 2;
                checkContourOverlap_1.checkContourOverlap(parentsContour, parent, settings);
                currentY_2 = getNodeBottomY_1.getNodeBottomY(parent);
                /////////////////// partners
                (_b = getFromMap_1.getFromMap(parent[settings.nextAfterAccessor], map)) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
                    partner.y = currentY_2;
                    partner.x = midPointX - partner.width / 2;
                    checkContourOverlap_1.checkContourOverlap(descendantsContour, partner, settings);
                    currentY_2 = getNodeBottomY_1.getNodeBottomY(partner);
                });
                addGroupLeftX_1.addGroupLeftX(parent, settings, map);
                drillParents(parent);
            });
        }
        centerSourceToTargets_1.centerSourceToTargets(subtree, parents, settings, map);
    }
    normalizeTree_1.normalizeTree(root, settings.sourcesAccessor, settings, map);
    return getElements_1.getElements(root, settings, map);
}
exports.layoutFromMap = layoutFromMap;

},{"./addGroupBottomY":4,"./addGroupLeftX":5,"./addGroupRightX":6,"./addGroupTopY":7,"./addLevelNodesSizes":8,"./addRootSiblingsPositions":9,"./addRootSpousesPositions":10,"./centerSourceToTargets":11,"./checkContourOverlap":12,"./defaultSettings":13,"./getElements":14,"./getFromMap":15,"./getInitialTargetsShiftLeft":16,"./getInitialTargetsShiftTop":17,"./getNodeBottomY":18,"./getNodeRightX":19,"./makeRoot":23,"./normalizeTree":24}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRoot = void 0;
var makeRoot = function (node, settings) {
    var root = node;
    root.x = settings.rootX;
    root.y = settings.rootY;
    root.groupTopY = root.y;
    root.groupLeftX = root.x;
    root.isRoot = true;
    return root;
};
exports.makeRoot = makeRoot;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTree = void 0;
var getFromMap_1 = require("./getFromMap");
var last_1 = require("./last");
var normalizeTree = function (root, accessor, settings, map) {
    var targets = getFromMap_1.getFromMap(root[accessor], map);
    if (!targets || !targets.length)
        return;
    var firstTargetSiblings = getFromMap_1.getFromMap(targets[0][settings.nextBeforeAccessor], map);
    var firstMostNode = (firstTargetSiblings === null || firstTargetSiblings === void 0 ? void 0 : firstTargetSiblings[0]) || targets[0];
    var lastTarget = last_1.last(targets);
    var lastTargetPartner = last_1.last(getFromMap_1.getFromMap(lastTarget[settings.nextAfterAccessor], map));
    var lastMostNode = lastTargetPartner || lastTarget;
    var shift;
    if (settings.orientation === "vertical") {
        var centerPointX = (firstMostNode.x + lastMostNode.x + lastMostNode.width) / 2;
        var rootCenterX = root.x + root.width / 2;
        shift = centerPointX - rootCenterX;
        targets.forEach(function (node) {
            normalizeTargetsX(node);
        });
    }
    else {
        var centerPointY = (firstMostNode.y + lastMostNode.y + lastMostNode.height) / 2;
        var rootCenterY = root.y + root.height / 2;
        shift = centerPointY - rootCenterY;
        targets.forEach(function (node) {
            normalizeTargetsY(node);
        });
    }
    function normalizeTargetsX(subtree) {
        var _a, _b, _c;
        subtree.x -= shift;
        (_a = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map)) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
            sibling.x -= shift;
        });
        (_b = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map)) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
            partner.x -= shift;
        });
        (_c = getFromMap_1.getFromMap(subtree[accessor], map)) === null || _c === void 0 ? void 0 : _c.forEach(function (node) {
            normalizeTargetsX(node);
        });
    }
    function normalizeTargetsY(subtree) {
        var _a, _b, _c;
        subtree.y -= shift;
        (_a = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map)) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
            sibling.y -= shift;
        });
        (_b = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map)) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
            partner.y -= shift;
        });
        (_c = getFromMap_1.getFromMap(subtree[accessor], map)) === null || _c === void 0 ? void 0 : _c.forEach(function (node) {
            normalizeTargetsY(node);
        });
    }
};
exports.normalizeTree = normalizeTree;

},{"./getFromMap":15,"./last":21}]},{},[1]);
