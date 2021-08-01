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
exports.randomTargets = exports.randomSides = exports.randomNode = void 0;
var randomInt_1 = require("./randomInt");
var randomName_1 = require("./randomName");
var randomNode = function (_a) {
    var childDepth = _a.childDepth, parentDepth = _a.parentDepth, noSiblings = _a.noSiblings, noPartners = _a.noPartners;
    return (__assign(__assign(__assign(__assign({ width: randomInt_1.randomInt(20, 80), height: randomInt_1.randomInt(20, 80), name: randomName_1.randomName() }, (childDepth && {
        children: exports.randomTargets({ childDepth: childDepth - 1, parentDepth: 0 }),
    })), (parentDepth && {
        parents: exports.randomTargets({ parentDepth: parentDepth - 1, childDepth: 0 }),
    })), (!noSiblings && {
        siblings: exports.randomSides(),
    })), (!noPartners && {
        partners: exports.randomSides(),
    })));
};
exports.randomNode = randomNode;
var randomSides = function () {
    return new Array(randomInt_1.randomInt(0, 2)).fill(0).map(function () {
        return exports.randomNode({ noPartners: true, noSiblings: true });
    });
};
exports.randomSides = randomSides;
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
var randomNode_1 = require("./randomNode");
var randomInt_1 = require("./randomInt");
var randomTree = function () {
    return __assign(__assign({}, randomNode_1.randomNode({
        childDepth: randomInt_1.randomInt(1, 3),
        parentDepth: randomInt_1.randomInt(1, 3),
    })), { name: "root" });
};
exports.randomTree = randomTree;

},{"./randomInt":1,"./randomNode":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "roots",
    siblings: [
        { name: "pane", height: 10 },
        { name: "carru", height: 80 },
    ],
    partners: [{ name: "please" }, { name: "marry" }],
    children: [
        {
            name: "pino",
            width: 112,
            height: 40,
            partners: [
                {
                    name: "sbs",
                },
            ],
            children: [
                {
                    name: "stronz",
                    children: [
                        {
                            name: "sAt2",
                            width: 32,
                            children: [
                                {
                                    name: "sok",
                                    width: 62,
                                },
                            ],
                        },
                        {
                            name: "ST5",
                            width: 22,
                            height: 30,
                            partners: [{ name: "Zu1" }, { name: "Zu2" }],
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
                    // height: 180,
                    siblings: [{ name: "sca" }, { name: "ka" }],
                    partners: [{ name: "zu" }, { name: "lu" }],
                    children: [
                        {
                            name: "akn1",
                            children: [
                                {
                                    name: "ston2",
                                },
                                {
                                    name: "ston3",
                                    // width: 72,
                                    partners: [
                                        { name: "zuluu" },
                                        { name: "lu" },
                                        { name: "Partner3" },
                                    ],
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
                                    children: [
                                        {
                                            name: "sok",
                                            partners: [
                                                { name: "zuluu" },
                                                { name: "lu" },
                                                { name: "Partner3" },
                                            ],
                                        },
                                    ],
                                    partners: [{ name: "partner" }, { name: "lu" }],
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
                            children: [
                                {
                                    name: "cane kid1",
                                    partners: [
                                        { name: "zuluu" },
                                        { name: "lu" },
                                        { name: "Partner3" },
                                    ],
                                },
                                {
                                    name: "cane kid2s",
                                    partners: [
                                        { name: "zuluu" },
                                        { name: "lu" },
                                        { name: "Partner3" },
                                    ],
                                },
                            ],
                            partners: [
                                {
                                    name: "vvv",
                                    width: 82,
                                    height: 82,
                                },
                            ],
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
                    height: 33,
                    partners: [
                        {
                            name: "wow",
                        },
                    ],
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

},{}],6:[function(require,module,exports){
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

},{"../fixtures/randomTree":4,"../src/index.ts":21,"./debugTree.ts":5,"./flatTree.ts":7,"./niceTree.ts":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    1: {
        name: "root",
        childrenIds: [2, 3],
    },
    2: { name: "2asda" },
    3: { name: "3asd", childrenIds: [4, 5], spousesIds: [6] },
    4: { name: "4asd" },
    5: { name: "5asd" },
    6: { name: "6asd" },
};

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "roots",
    siblings: [
        { name: "pane", height: 10 },
        { name: "carru", height: 80 },
    ],
    partners: [{ name: "please" }, { name: "marry" }],
    children: [
        {
            name: "pino",
            width: 112,
            height: 40,
            partners: [
                {
                    name: "sbs",
                },
            ],
            children: [
                {
                    name: "stronz",
                    children: [
                        {
                            name: "sAt2",
                            width: 32,
                        },
                        {
                            name: "stron3",
                            width: 22,
                            height: 30,
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
                    siblings: [{ name: "sca" }, { name: "ka" }],
                    partners: [{ name: "zu" }, { name: "lu" }],
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
                            partners: [
                                {
                                    name: "vvv",
                                    width: 82,
                                    height: 82,
                                },
                            ],
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
                    height: 33,
                    partners: [
                        {
                            name: "wow",
                        },
                    ],
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

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGenerationSizes = void 0;
var getFromMap_1 = require("./getFromMap");
var addGenerationSizes = function (nodes, settings, map) {
    nodes.forEach(function (node, index) {
        var siblings = map
            ? getFromMap_1.getFromMap(node[settings.nextBeforeAccessor], map)
            : node[settings.nextBeforeAccessor];
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            sibling.width = sibling.width || settings.nodeWidth;
            sibling.height = sibling.height || settings.nodeHeight;
            sibling.marginRight = settings.nextBeforeSpacing; //todo: check
            sibling.marginBottom = settings.sourceTargetSpacing;
        });
        var partners = map
            ? getFromMap_1.getFromMap(node[settings.nextAfterAccessor], map)
            : node[settings.nextAfterAccessor];
        partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner, partnerIndex) {
            partner.width = partner.width || settings.nodeWidth;
            partner.height = partner.height || settings.nodeHeight;
            if (partnerIndex === partners.length - 1)
                partner.marginRight = settings.differentGroupSpacing;
            else
                partner.marginRight = settings.nextBeforeSpacing;
            partner.marginBottom = settings.sourceTargetSpacing;
        });
        node.width = node.width || settings.nodeWidth;
        node.height = node.height || settings.nodeHeight;
        if (index === nodes.length - 1 && (!partners || !partners.length))
            node.marginRight = settings.differentGroupSpacing;
        else
            node.marginRight = settings.nextBeforeSpacing;
        node.marginBottom = settings.sourceTargetSpacing;
    });
};
exports.addGenerationSizes = addGenerationSizes;

},{"./getFromMap":15}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerSourceToTargets = void 0;
var getFromMap_1 = require("./getFromMap");
var last_1 = require("./last");
var centerSourceToTargets = function (source, targets, settings, map) {
    if (!source.isRoot) {
        //center only on actual children, not all generational nodes
        var leftMostTarget = targets[0];
        var rightMostTarget = last_1.last(targets);
        if (leftMostTarget && rightMostTarget) {
            var newSourceX = (leftMostTarget.x + rightMostTarget.x + rightMostTarget.width) / 2 -
                source.width / 2;
            var delta_1 = newSourceX - source.x;
            if (newSourceX !== source.x) {
                source.x += delta_1;
                var siblings = map
                    ? getFromMap_1.getFromMap(source[settings.nextBeforeAccessor], map)
                    : source[settings.nextBeforeAccessor];
                siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) { return (sibling.x += delta_1); });
                var partners = map
                    ? getFromMap_1.getFromMap(source[settings.nextAfterAccessor], map)
                    : source[settings.nextAfterAccessor];
                partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) { return (partner.x += delta_1); });
            }
        }
    }
};
exports.centerSourceToTargets = centerSourceToTargets;

},{"./getFromMap":15,"./last":22}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkContourOverlap = void 0;
var shiftFromCountour_1 = require("./shiftFromCountour");
function checkContourOverlap(contourSet, node) {
    contourSet.forEach(function (contourNode) {
        shiftFromCountour_1.shiftFromCountour(contourNode, node);
    });
    contourSet.push(node);
}
exports.checkContourOverlap = checkContourOverlap;

},{"./shiftFromCountour":27}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSettings = void 0;
exports.defaultSettings = {
    targetsAccessor: "children",
    differentGroupSpacing: 20,
    nodeHeight: 40,
    nodeWidth: 40,
    enableFlex: true,
    sourcesAccessor: "parents",
    nextAfterAccessor: "partners",
    rootX: 0,
    rootY: 0,
    nextBeforeAccessor: "siblings",
    nextBeforeSpacing: 10,
    nextAfterSpacing: 10,
    sourceTargetSpacing: 10,
    clone: false,
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
    drill(root);
    function drill(subtree) {
        var siblings = map
            ? getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map)
            : subtree[settings.nextBeforeAccessor];
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            compare(sibling);
            nodes.push(sibling);
            rels.push({ source: subtree, target: sibling });
        });
        var partners = map
            ? getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map)
            : subtree[settings.nextAfterAccessor];
        partners === null || partners === void 0 ? void 0 : partners.forEach(function (spouse) {
            compare(spouse);
            nodes.push(spouse);
            rels.push({ source: subtree, target: spouse });
        });
        var children = map
            ? getFromMap_1.getFromMap(subtree[settings.targetsAccessor], map)
            : subtree[settings.targetsAccessor];
        children === null || children === void 0 ? void 0 : children.forEach(function (child) {
            compare(child);
            nodes.push(child);
            rels.push({ source: subtree, target: child });
            drill(child);
        });
        var parents = map
            ? getFromMap_1.getFromMap(subtree[settings.sourcesAccessor], map)
            : subtree[settings.sourcesAccessor];
        parents === null || parents === void 0 ? void 0 : parents.forEach(function (parent) {
            compare(parent);
            nodes.push(parent);
            rels.push({ source: subtree, target: parent });
            drill(parent);
        });
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
exports.getGenerationBottomLineY = void 0;
var getFromMap_1 = require("./getFromMap");
function getGenerationBottomLineY(subtree, settings, map) {
    var bottomLineY = subtree.y + subtree.height + subtree.marginBottom;
    var siblings = map
        ? getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map)
        : subtree[settings.nextBeforeAccessor];
    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
        bottomLineY = Math.max(bottomLineY, sibling.y + sibling.height + sibling.marginBottom);
    });
    var partners = map
        ? getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map)
        : subtree[settings.nextAfterAccessor];
    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
        bottomLineY = Math.max(bottomLineY, partner.y + partner.height + partner.marginBottom);
    });
    return bottomLineY;
}
exports.getGenerationBottomLineY = getGenerationBottomLineY;

},{"./getFromMap":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerationMaxHeight = void 0;
var getFromMap_1 = require("./getFromMap");
function getGenerationMaxHeight(subtree, settings, map) {
    var maxHeight = subtree.height;
    var siblings = map
        ? getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map)
        : subtree[settings.nextBeforeAccessor];
    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
        maxHeight = Math.max(maxHeight, sibling.height);
    });
    var partners = map
        ? getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map)
        : subtree[settings.nextAfterAccessor];
    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
        maxHeight = Math.max(maxHeight, partner.height);
    });
    return maxHeight;
}
exports.getGenerationMaxHeight = getGenerationMaxHeight;

},{"./getFromMap":15}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerationTopLineY = void 0;
var getFromMap_1 = require("./getFromMap");
function getGenerationTopLineY(subtree, settings, map) {
    var topLineY = subtree.y;
    var siblings = map
        ? getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map)
        : subtree[settings.nextBeforeAccessor];
    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
        topLineY = Math.min(topLineY, sibling.y);
    });
    var partners = map
        ? getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map)
        : subtree[settings.nextAfterAccessor];
    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
        topLineY = Math.min(topLineY, partner.y);
    });
    return topLineY;
}
exports.getGenerationTopLineY = getGenerationTopLineY;

},{"./getFromMap":15}],19:[function(require,module,exports){
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
        var siblings = map
            ? getFromMap_1.getFromMap(target[settings.nextBeforeAccessor], map)
            : target[settings.nextBeforeAccessor];
        var partners = map
            ? getFromMap_1.getFromMap(target[settings.nextAfterAccessor], map)
            : target[settings.nextAfterAccessor];
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

},{"./getFromMap":15}],20:[function(require,module,exports){
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
exports.getSizes = void 0;
var defaultSettings_1 = require("./defaultSettings");
var getFromMap_1 = require("./getFromMap");
var getSizes = function (rootId, map, customSettings) {
    if (customSettings === void 0) { customSettings = {}; }
    var settings = __assign(__assign({}, defaultSettings_1.defaultSettings), customSettings);
    var root = map[rootId];
    var maxRight = root.x + root.width;
    var maxLeft = root.x;
    var maxBottom = root.y + root.height;
    var maxTop = root.y;
    function compare(node) {
        maxRight = Math.max(maxRight, node.x + node.width);
        maxLeft = Math.max(maxLeft, node.x);
        maxBottom = Math.max(maxBottom, node.y + node.height);
        maxTop = Math.max(maxTop, node.y);
    }
    drill(root);
    function drill(subtree) {
        var siblings = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map);
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            compare(sibling);
        });
        var partners = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map);
        partners === null || partners === void 0 ? void 0 : partners.forEach(function (spouse) {
            compare(spouse);
        });
        var children = getFromMap_1.getFromMap(subtree[settings.targetsAccessor], map);
        children === null || children === void 0 ? void 0 : children.forEach(function (child) {
            compare(child);
            drill(child);
        });
        var parents = getFromMap_1.getFromMap(subtree[settings.sourcesAccessor], map);
        parents === null || parents === void 0 ? void 0 : parents.forEach(function (parent) {
            compare(parent);
            drill(parent);
        });
    }
    return {
        maxRight: maxRight,
        maxLeft: maxLeft,
        maxBottom: maxBottom,
        maxTop: maxTop,
    };
};
exports.getSizes = getSizes;

},{"./defaultSettings":13,"./getFromMap":15}],21:[function(require,module,exports){
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
__exportStar(require("./defaultSettings"), exports);
__exportStar(require("./getElements"), exports);
__exportStar(require("./getSizes"), exports);
__exportStar(require("./layoutFromMap"), exports);
__exportStar(require("./layoutFromNested"), exports);
__exportStar(require("./TreeNode"), exports);

},{"./TreeNode":9,"./defaultSettings":13,"./getElements":14,"./getSizes":20,"./layoutFromMap":23,"./layoutFromNested":24}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = void 0;
var last = function (array) {
    return array === null || array === void 0 ? void 0 : array[array.length - 1];
};
exports.last = last;

},{}],23:[function(require,module,exports){
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
var addGenerationSizes_1 = require("./addGenerationSizes");
var centerSourceToTargets_1 = require("./centerSourceToTargets");
var checkContourOverlap_1 = require("./checkContourOverlap");
var defaultSettings_1 = require("./defaultSettings");
var getElements_1 = require("./getElements");
var getFromMap_1 = require("./getFromMap");
var getGenerationBottomLineY_1 = require("./getGenerationBottomLineY");
var getGenerationMaxHeight_1 = require("./getGenerationMaxHeight");
var getGenerationTopLineY_1 = require("./getGenerationTopLineY");
var getInitialTargetsShiftLeft_1 = require("./getInitialTargetsShiftLeft");
var makeRoot_1 = require("./makeRoot");
var normalizeTree_1 = require("./normalizeTree");
function layoutFromMap(rootId, originalMap, customSettings) {
    if (customSettings === void 0) { customSettings = {}; }
    var settings = __assign(__assign({}, defaultSettings_1.defaultSettings), customSettings);
    var map = settings.clone
        ? JSON.parse(JSON.stringify(originalMap))
        : originalMap;
    var root = makeRoot_1.makeRoot(map[rootId], settings);
    addGenerationSizes_1.addGenerationSizes([root], settings, map);
    root.topLineY = root.y;
    root.bottomLineY = root.y + root.height + root.marginBottom;
    if (root[settings.nextBeforeAccessor])
        getFromMap_1.getFromMap(root[settings.nextBeforeAccessor], map)
            .reverse()
            .forEach(function (sibling, siblingIndex, rootSiblings) {
            var nextNode = rootSiblings[siblingIndex - 1] || root;
            sibling.x = nextNode.x - sibling.width - sibling.marginRight;
            //align vertically
            sibling.y = root.y + root.height / 2 - sibling.height / 2;
            var outerBottomY = sibling.y + sibling.height + sibling.marginBottom;
            if (sibling.y < root.topLineY)
                root.topLineY = sibling.y;
            if (outerBottomY > root.bottomLineY)
                root.bottomLineY = outerBottomY;
        });
    if (root[settings.nextAfterAccessor])
        getFromMap_1.getFromMap(root[settings.nextAfterAccessor], map).forEach(function (partner, partnerIndex, rootPartners) {
            var previousPartner = rootPartners[partnerIndex - 1] || root;
            partner.x =
                previousPartner.x +
                    previousPartner.width +
                    previousPartner.marginRight;
            partner.y = root.y + root.height / 2 - partner.height / 2;
            var outerBottomY = partner.y + partner.height + partner.marginBottom;
            if (partner.y < root.topLineY)
                root.topLineY = partner.y;
            if (outerBottomY > root.bottomLineY)
                root.bottomLineY = outerBottomY;
        });
    var descendantsContour = [];
    drillChildren(root);
    function drillChildren(subtree) {
        var children = getFromMap_1.getFromMap(subtree[settings.targetsAccessor], map);
        if (!children || !children.length)
            return;
        //rename to addGenerationSizes
        addGenerationSizes_1.addGenerationSizes(children, settings, map);
        var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(subtree, children, settings, map);
        var currentX = subtree.x - initialShiftLeft;
        var topLineY = getGenerationBottomLineY_1.getGenerationBottomLineY(subtree, settings, map);
        children.forEach(function (child) {
            var maxHeight = getGenerationMaxHeight_1.getGenerationMaxHeight(child, settings, map);
            var midVerticalY = topLineY + maxHeight / 2;
            /////////////////// SIBLING
            var siblings = getFromMap_1.getFromMap(child[settings.nextBeforeAccessor], map);
            siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
                sibling.x = currentX;
                sibling.y = midVerticalY - sibling.height / 2;
                checkContourOverlap_1.checkContourOverlap(descendantsContour, sibling);
                currentX = sibling.x + sibling.width + sibling.marginRight;
            });
            /////////////////// CHILD
            //Set positions
            child.x = currentX;
            child.y = midVerticalY - child.height / 2;
            checkContourOverlap_1.checkContourOverlap(descendantsContour, child);
            currentX = child.x + child.width + child.marginRight;
            /////////////////// partners
            var partners = getFromMap_1.getFromMap(child[settings.nextAfterAccessor], map);
            partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
                partner.x = currentX;
                partner.y = midVerticalY - partner.height / 2;
                checkContourOverlap_1.checkContourOverlap(descendantsContour, partner);
                currentX = partner.x + partner.width + partner.marginRight;
            });
            drillChildren(child);
        });
        centerSourceToTargets_1.centerSourceToTargets(subtree, children, settings, map);
    }
    normalizeTree_1.normalizeTree(root, settings.targetsAccessor, settings, map);
    var parentsContour = [];
    drillParents(root);
    function drillParents(subtree) {
        var parents = getFromMap_1.getFromMap(subtree[settings.sourcesAccessor], map);
        if (!(parents === null || parents === void 0 ? void 0 : parents.length))
            return;
        addGenerationSizes_1.addGenerationSizes(parents, settings, map);
        var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(subtree, parents, settings, map);
        var currentX = subtree.x - initialShiftLeft;
        var bottomLineY = getGenerationTopLineY_1.getGenerationTopLineY(subtree, settings, map);
        parents.forEach(function (parent) {
            var _a;
            var maxHeight = getGenerationMaxHeight_1.getGenerationMaxHeight(parent, settings, map);
            var midVerticalY = bottomLineY - settings.sourceTargetSpacing - maxHeight / 2;
            /////////////////// SIBLING
            var siblings = getFromMap_1.getFromMap(parent[settings.nextBeforeAccessor], map);
            siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
                sibling.x = currentX;
                sibling.y = midVerticalY - sibling.height / 2;
                checkContourOverlap_1.checkContourOverlap(parentsContour, sibling);
                currentX = sibling.x + sibling.width + sibling.marginRight;
            });
            ///////////// PARENT
            //set positions
            parent.x = currentX;
            parent.y = midVerticalY - parent.height / 2;
            //check if touches one of the contours
            checkContourOverlap_1.checkContourOverlap(parentsContour, parent);
            currentX = parent.x + parent.width + parent.marginRight;
            /////////////////// partners
            (_a = parent[settings.nextAfterAccessor]) === null || _a === void 0 ? void 0 : _a.forEach(function (partner) {
                partner.x = currentX;
                partner.y = midVerticalY - partner.height / 2;
                checkContourOverlap_1.checkContourOverlap(parentsContour, partner);
                currentX = partner.x + partner.width + partner.marginRight;
            });
            drillParents(parent);
        });
        centerSourceToTargets_1.centerSourceToTargets(subtree, parents, settings, map);
    }
    normalizeTree_1.normalizeTree(root, settings.sourcesAccessor, settings, map);
    return getElements_1.getElements(root, settings, map);
}
exports.layoutFromMap = layoutFromMap;

},{"./addGenerationSizes":10,"./centerSourceToTargets":11,"./checkContourOverlap":12,"./defaultSettings":13,"./getElements":14,"./getFromMap":15,"./getGenerationBottomLineY":16,"./getGenerationMaxHeight":17,"./getGenerationTopLineY":18,"./getInitialTargetsShiftLeft":19,"./makeRoot":25,"./normalizeTree":26}],24:[function(require,module,exports){
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
exports.layoutFromNested = void 0;
var addGenerationSizes_1 = require("./addGenerationSizes");
var centerSourceToTargets_1 = require("./centerSourceToTargets");
var checkContourOverlap_1 = require("./checkContourOverlap");
var defaultSettings_1 = require("./defaultSettings");
var getGenerationBottomLineY_1 = require("./getGenerationBottomLineY");
var getGenerationMaxHeight_1 = require("./getGenerationMaxHeight");
var getGenerationTopLineY_1 = require("./getGenerationTopLineY");
var getInitialTargetsShiftLeft_1 = require("./getInitialTargetsShiftLeft");
var makeRoot_1 = require("./makeRoot");
var normalizeTree_1 = require("./normalizeTree");
function layoutFromNested(originalRoot, customSettings) {
    var _a, _b;
    if (customSettings === void 0) { customSettings = {}; }
    var settings = __assign(__assign({}, defaultSettings_1.defaultSettings), customSettings);
    var root = makeRoot_1.makeRoot(settings.clone ? JSON.parse(JSON.stringify(originalRoot)) : originalRoot, settings);
    addGenerationSizes_1.addGenerationSizes([root], settings);
    root.topLineY = root.y;
    root.bottomLineY = root.y + root.height + root.marginBottom;
    (_a = root[settings.nextBeforeAccessor]) === null || _a === void 0 ? void 0 : _a.reverse().forEach(function (sibling, siblingIndex, rootSiblings) {
        sibling.source = root;
        var nextNode = rootSiblings[siblingIndex - 1] || root;
        sibling.x = nextNode.x - sibling.width - sibling.marginRight;
        //align vertically
        sibling.y = root.y + root.height / 2 - sibling.height / 2;
        var outerBottomY = sibling.y + sibling.height + sibling.marginBottom;
        if (sibling.y < root.topLineY)
            root.topLineY = sibling.y;
        if (outerBottomY > root.bottomLineY)
            root.bottomLineY = outerBottomY;
    });
    (_b = root[settings.nextAfterAccessor]) === null || _b === void 0 ? void 0 : _b.forEach(function (partner, partnerIndex, rootPartners) {
        partner.source = root;
        var previousPartner = rootPartners[partnerIndex - 1] || root;
        partner.x =
            previousPartner.x + previousPartner.width + previousPartner.marginRight;
        partner.y = root.y + root.height / 2 - partner.height / 2;
        var outerBottomY = partner.y + partner.height + partner.marginBottom;
        if (partner.y < root.topLineY)
            root.topLineY = partner.y;
        if (outerBottomY > root.bottomLineY)
            root.bottomLineY = outerBottomY;
    });
    var descendantsContour = [];
    drillChildren(root);
    function drillChildren(subtree) {
        var children = subtree[settings.targetsAccessor];
        if (!children || !children.length)
            return;
        //rename to addGenerationSizes
        addGenerationSizes_1.addGenerationSizes(children, settings);
        var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(subtree, children, settings);
        var currentX = subtree.x - initialShiftLeft;
        var topLineY = getGenerationBottomLineY_1.getGenerationBottomLineY(subtree, settings);
        children.forEach(function (child) {
            var _a, _b;
            var maxHeight = getGenerationMaxHeight_1.getGenerationMaxHeight(child, settings);
            var midVerticalY = topLineY + maxHeight / 2;
            /////////////////// SIBLING
            (_a = child[settings.nextBeforeAccessor]) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
                sibling.isSibling = true;
                sibling.source = child;
                sibling.x = currentX;
                sibling.y = midVerticalY - sibling.height / 2;
                checkContourOverlap_1.checkContourOverlap(descendantsContour, sibling);
                currentX = sibling.x + sibling.width + sibling.marginRight;
            });
            /////////////////// CHILD
            //set props
            child.isDescendant = true;
            //set the parent pointer
            child.source = subtree;
            //Set positions
            child.x = currentX;
            child.y = midVerticalY - child.height / 2;
            checkContourOverlap_1.checkContourOverlap(descendantsContour, child);
            currentX = child.x + child.width + child.marginRight;
            /////////////////// partners
            (_b = child[settings.nextAfterAccessor]) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
                partner.isPartner = true;
                partner.source = child;
                partner.x = currentX;
                partner.y = midVerticalY - partner.height / 2;
                checkContourOverlap_1.checkContourOverlap(descendantsContour, partner);
                currentX = partner.x + partner.width + partner.marginRight;
            });
            drillChildren(child);
        });
        centerSourceToTargets_1.centerSourceToTargets(subtree, children, settings);
    }
    normalizeTree_1.normalizeTree(root, settings.targetsAccessor, settings);
    var parentsContour = [];
    drillParents(root);
    function drillParents(subtree) {
        var parents = subtree[settings.sourcesAccessor];
        if (!parents)
            return;
        addGenerationSizes_1.addGenerationSizes(parents, settings);
        var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(subtree, parents, settings);
        var currentX = subtree.x - initialShiftLeft;
        var bottomLineY = getGenerationTopLineY_1.getGenerationTopLineY(subtree, settings);
        console.log({ bottomLineY: bottomLineY });
        parents.forEach(function (parent) {
            var _a, _b;
            var maxHeight = getGenerationMaxHeight_1.getGenerationMaxHeight(parent, settings);
            var midVerticalY = bottomLineY - settings.sourceTargetSpacing - maxHeight / 2;
            /////////////////// SIBLING
            (_a = parent[settings.nextBeforeAccessor]) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
                sibling.isSibling = true;
                sibling.source = parent;
                sibling.x = currentX;
                sibling.y = midVerticalY - sibling.height / 2;
                checkContourOverlap_1.checkContourOverlap(parentsContour, sibling);
                currentX = sibling.x + sibling.width + sibling.marginRight;
            });
            ///////////// PARENT
            parent.isAncestor = true;
            parent.source = subtree;
            //set positions
            parent.x = currentX;
            parent.y = midVerticalY - parent.height / 2;
            //check if touches one of the contours
            checkContourOverlap_1.checkContourOverlap(parentsContour, parent);
            currentX = parent.x + parent.width + parent.marginRight;
            /////////////////// partners
            (_b = parent[settings.nextAfterAccessor]) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
                partner.isPartner = true;
                partner.source = parent;
                partner.x = currentX;
                partner.y = midVerticalY - partner.height / 2;
                checkContourOverlap_1.checkContourOverlap(parentsContour, partner);
                currentX = partner.x + partner.width + partner.marginRight;
            });
            drillParents(parent);
        });
        centerSourceToTargets_1.centerSourceToTargets(subtree, parents, settings);
    }
    normalizeTree_1.normalizeTree(root, settings.sourcesAccessor, settings);
    return root;
}
exports.layoutFromNested = layoutFromNested;

},{"./addGenerationSizes":10,"./centerSourceToTargets":11,"./checkContourOverlap":12,"./defaultSettings":13,"./getGenerationBottomLineY":16,"./getGenerationMaxHeight":17,"./getGenerationTopLineY":18,"./getInitialTargetsShiftLeft":19,"./makeRoot":25,"./normalizeTree":26}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRoot = void 0;
var makeRoot = function (node, settings) {
    var root = node;
    root.x = settings.rootX;
    root.y = settings.rootY;
    root.isRoot = true;
    return root;
};
exports.makeRoot = makeRoot;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTree = void 0;
var getFromMap_1 = require("./getFromMap");
var last_1 = require("./last");
var normalizeTree = function (root, accessor, settings, map) {
    var targets = map
        ? getFromMap_1.getFromMap(root[accessor], map)
        : root[accessor];
    if (!targets || !targets.length)
        return;
    var rootCenter = root.x + root.width / 2;
    var firstTargetSiblings = map
        ? getFromMap_1.getFromMap(targets[0][settings.nextBeforeAccessor], map)
        : targets[0][settings.nextBeforeAccessor];
    var leftMostNode = (firstTargetSiblings === null || firstTargetSiblings === void 0 ? void 0 : firstTargetSiblings[0])
        ? firstTargetSiblings === null || firstTargetSiblings === void 0 ? void 0 : firstTargetSiblings[0]
        : targets[0];
    var lastTarget = last_1.last(targets);
    var lastTargetPartner = map
        ? last_1.last(getFromMap_1.getFromMap(lastTarget[settings.nextAfterAccessor], map))
        : last_1.last(lastTarget[settings.nextAfterAccessor]);
    var rightMostNode = lastTargetPartner ? lastTargetPartner : lastTarget;
    var centerPoint = (leftMostNode.x + rightMostNode.x + rightMostNode.width) / 2;
    var shift = centerPoint - rootCenter;
    targets.forEach(function (node) {
        drillTargets(node);
    });
    function drillTargets(subtree) {
        subtree.x -= shift;
        var siblings = map
            ? getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map)
            : subtree[settings.nextBeforeAccessor];
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            sibling.x -= shift;
        });
        var partners = map
            ? getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map)
            : subtree[settings.nextAfterAccessor];
        partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
            partner.x -= shift;
        });
        var next = map ? getFromMap_1.getFromMap(subtree[accessor], map) : subtree[accessor];
        next === null || next === void 0 ? void 0 : next.forEach(function (node) {
            drillTargets(node);
        });
    }
};
exports.normalizeTree = normalizeTree;

},{"./getFromMap":15,"./last":22}],27:[function(require,module,exports){
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

},{}]},{},[6]);
