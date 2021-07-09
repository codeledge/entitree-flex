(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomInt = void 0;
var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randomInt = randomInt;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomName = void 0;
var randomName = function () { return Math.random().toString(36).substring(4); };
exports.randomName = randomName;

},{}],3:[function(require,module,exports){
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
exports.randomTargets = exports.randomNode = void 0;
var randomInt_1 = require("./randomInt");
var randomName_1 = require("./randomName");
var randomNode = function (_a) {
    var childDepth = _a.childDepth, parentDepth = _a.parentDepth;
    return (__assign(__assign({ width: randomInt_1.randomInt(20, 80), height: randomInt_1.randomInt(20, 80), name: randomName_1.randomName() }, (childDepth && {
        children: exports.randomTargets({ childDepth: childDepth - 1, parentDepth: 0 }),
    })), (parentDepth && {
        parents: exports.randomTargets({ parentDepth: parentDepth - 1, childDepth: 0 }),
    })));
};
exports.randomNode = randomNode;
var randomTargets = function (_a) {
    var childDepth = _a.childDepth, parentDepth = _a.parentDepth;
    return new Array(randomInt_1.randomInt(1, 4)).fill(0).map(function () {
        return exports.randomNode({ childDepth: childDepth, parentDepth: parentDepth });
    });
};
exports.randomTargets = randomTargets;

},{"./randomInt":1,"./randomName":2}],4:[function(require,module,exports){
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
exports.randomTree = void 0;
var randomInt_1 = require("./randomInt");
var randomNode_1 = require("./randomNode");
var randomTree = function () {
    return __assign(__assign({}, randomNode_1.randomNode({
        childDepth: randomInt_1.randomInt(1, 3),
        parentDepth: randomInt_1.randomInt(1, 3),
    })), { name: "root" });
};
exports.randomTree = randomTree;

},{"./randomInt":1,"./randomNode":3}],5:[function(require,module,exports){
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

},{"../fixtures/randomTree":4,"../src/index.ts":10,"./niceTree.ts":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "roots",
    children: [
        {
            name: "pino",
            width: 112,
            height: 40,
            children: [
                {
                    name: "stronz",
                    children: [
                        {
                            name: "sAt2",
                            width: 22,
                        },
                        {
                            name: "stron3",
                            width: 22,
                            children: [
                                {
                                    name: "sok",
                                    width: 62,
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "ronz",
                    height: 180,
                    children: [
                        {
                            name: "akn1",
                            children: [
                                {
                                    name: "ston2",
                                },
                                {
                                    name: "ston3",
                                    width: 72,
                                },
                            ],
                        },
                        {
                            name: "akn2",
                        },
                        {
                            name: "akn3",
                            children: [
                                {
                                    name: "stron2",
                                },
                                {
                                    name: "stron3",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "gino",
            width: 52,
            children: [
                {
                    name: "shubb",
                    width: 82,
                    children: [
                        {
                            name: "cane",
                        },
                    ],
                },
                {
                    name: "babba",
                },
                {
                    name: "gaba",
                },
            ],
        },
    ],
    parents: [
        {
            name: "caio",
            parents: [
                {
                    name: "rasta",
                },
                {
                    name: "man",
                },
            ],
        },
        {
            name: "basu",
            parents: [
                {
                    name: "pasta",
                },
                {
                    name: "farro",
                },
            ],
        },
        {
            name: "ringo",
        },
    ],
};

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTargetNodesSize = void 0;
var addTargetNodesSize = function (nodes, config) {
    nodes.forEach(function (node, index) {
        node.width = node.width || config.defaultNodeWidth;
        node.height = node.height || config.defaultNodeHeight;
        node.marginRight = config.siblingSpacing;
        if (index === nodes.length - 1)
            node.marginRight = config.cousinSpacing;
        //todo, cousins
        node.marginBottom = config.verticalSpacing;
    });
};
exports.addTargetNodesSize = addTargetNodesSize;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerSourceToTargets = void 0;
var centerSourceToTargets = function (source, targets) {
    if (!source.isRoot) {
        var lastTarget = targets[targets.length - 1];
        if (targets[0] && lastTarget)
            source.x =
                (targets[0].x + lastTarget.x + lastTarget.width) / 2 - source.width / 2;
    }
};
exports.centerSourceToTargets = centerSourceToTargets;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialTargetsShiftLeft = void 0;
var getInitialTargetsShiftLeft = function (source, targets) {
    return (targets.reduce(function (totalWidth, target, index) {
        totalWidth +=
            target.width + (index < targets.length - 1 ? target.marginRight : 0);
        return totalWidth;
    }, 0) /
        2 -
        source.width / 2);
};
exports.getInitialTargetsShiftLeft = getInitialTargetsShiftLeft;

},{}],10:[function(require,module,exports){
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
exports.defaultSettings = void 0;
var addTargetNodesSize_1 = require("./addTargetNodesSize");
var centerSourceToTargets_1 = require("./centerSourceToTargets");
var getInitialTargetsShiftLeft_1 = require("./getInitialTargetsShiftLeft");
var normalizeTree_1 = require("./normalizeTree");
var shiftFromCountour_1 = require("./shiftFromCountour");
exports.defaultSettings = {
    childAccessor: "child",
    childrenAccessor: "children",
    cousinSpacing: 20,
    defaultNodeHeight: 40,
    defaultNodeWidth: 40,
    enableFlex: true,
    parentAccessor: "parent",
    parentsAccessor: "parents",
    rootX: 0,
    rootY: 0,
    siblingSpacing: 10,
    verticalSpacing: 10,
};
function layout(root, options) {
    if (options === void 0) { options = {}; }
    var config = __assign(__assign({}, exports.defaultSettings), options);
    root.x = config.rootX;
    root.y = config.rootY;
    root.width = root.width || config.defaultNodeWidth;
    root.height = root.height || config.defaultNodeHeight;
    root.marginBottom = config.verticalSpacing;
    root.isRoot = true;
    var childrenContour = [];
    drillChildren(root);
    function drillChildren(subtree) {
        var targets = subtree[config.childrenAccessor];
        if (!targets || !targets.length)
            return;
        var childrenBaseLineY = subtree.y + subtree.height + config.verticalSpacing;
        addTargetNodesSize_1.addTargetNodesSize(targets, config);
        var source = subtree;
        targets.forEach(function (target, index) {
            target.isDescendant = true;
            target[config.parentAccessor] = subtree;
            if (index === 0) {
                var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(source, targets);
                target.x = source.x - initialShiftLeft;
            }
            else {
                var previousSibling = targets[index - 1];
                target.x =
                    previousSibling.x +
                        previousSibling.width +
                        previousSibling.marginRight;
            }
            target.y = childrenBaseLineY;
            //check if touches one of the contours
            childrenContour.forEach(function (contourNode) {
                shiftFromCountour_1.shiftFromCountour(contourNode, target);
            });
            childrenContour.push(target);
            drillChildren(target);
        });
        centerSourceToTargets_1.centerSourceToTargets(source, targets);
    }
    normalizeTree_1.normalizeTree(root, config.childrenAccessor);
    var parentsContour = [];
    drillParents(root);
    function drillParents(subtree) {
        var targets = subtree[config.parentsAccessor];
        if (!targets)
            return;
        var baselineY = subtree.y;
        addTargetNodesSize_1.addTargetNodesSize(targets, config);
        var source = subtree;
        targets.forEach(function (target, index) {
            target.isAncestor = true;
            target[config.childAccessor] = subtree;
            if (index === 0) {
                var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(source, targets);
                target.x = source.x - initialShiftLeft;
            }
            else {
                var previousSibling = targets[index - 1];
                target.x =
                    previousSibling.x +
                        previousSibling.width +
                        previousSibling.marginRight;
            }
            target.y = baselineY - target.height - target.marginBottom;
            var parentLeftBorder = {
                x: target.x,
                topY: target.y,
                bottomY: baselineY,
            };
            //check if touches one of the contours
            parentsContour.forEach(function (contourNode) {
                shiftFromCountour_1.shiftFromCountour(contourNode, target);
            });
            parentsContour.push(target);
            drillParents(target);
        });
        centerSourceToTargets_1.centerSourceToTargets(source, targets);
    }
    normalizeTree_1.normalizeTree(root, config.parentsAccessor);
}
exports.default = layout;

},{"./addTargetNodesSize":7,"./centerSourceToTargets":8,"./getInitialTargetsShiftLeft":9,"./normalizeTree":11,"./shiftFromCountour":12}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTree = void 0;
var normalizeTree = function (root, accessor) {
    var targets = root[accessor];
    if (!targets || !targets.length)
        return;
    var rootCenter = root.x + root.width / 2;
    var lastTarget = targets[targets.length - 1];
    var centerPoint = (targets[0].x + lastTarget.x + lastTarget.width) / 2;
    var shift = centerPoint - rootCenter;
    targets.forEach(function (node) {
        drillTargets(node);
    });
    function drillTargets(subtree) {
        var _a;
        subtree.x -= shift;
        (_a = subtree[accessor]) === null || _a === void 0 ? void 0 : _a.forEach(function (node) {
            drillTargets(node);
        });
    }
};
exports.normalizeTree = normalizeTree;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftFromCountour = void 0;
var shiftFromCountour = function (contourNode, node) {
    var nodeBottomY = node.y + node.height + node.marginBottom;
    var contourNodeEdgeX = contourNode.x + contourNode.width + contourNode.marginRight;
    var contourTopY = contourNode.y;
    var contourBottomY = contourNode.y + contourNode.height + contourNode.marginBottom;
    var coversCountour = node.y <= contourTopY && nodeBottomY >= contourBottomY;
    var traspassHorizontal = node.x < contourNodeEdgeX;
    // if (coversCountour) {
    //   //todo: if it covers the whole box, remove box from contour array
    // }
    if (traspassHorizontal &&
        ((node.y > contourTopY && node.y < contourBottomY) ||
            (nodeBottomY > contourTopY && nodeBottomY < contourBottomY) ||
            coversCountour)) {
        var delta = contourNodeEdgeX - node.x;
        node.x += delta;
    }
};
exports.shiftFromCountour = shiftFromCountour;

},{}]},{},[5]);
