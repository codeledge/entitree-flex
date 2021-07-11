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

},{"../fixtures/randomTree":4,"../src/index.ts":10,"./niceTree.ts":6}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTargetNodesSize = void 0;
var addTargetNodesSize = function (nodes, settings) {
    nodes.forEach(function (node, index) {
        var siblings = node[settings.siblingsAccessor];
        var partners = node[settings.partnersAccessor];
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            sibling.width = sibling.width || settings.defaultNodeWidth;
            sibling.height = sibling.height || settings.defaultNodeHeight;
            sibling.marginRight = settings.siblingSpacing; //todo: check
            sibling.marginBottom = settings.verticalSpacing;
        });
        partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner, partnerIndex) {
            partner.width = partner.width || settings.defaultNodeWidth;
            partner.height = partner.height || settings.defaultNodeHeight;
            if (partnerIndex === partners.length - 1)
                partner.marginRight = settings.cousinSpacing;
            else
                partner.marginRight = settings.siblingSpacing;
            partner.marginBottom = settings.verticalSpacing;
        });
        node.width = node.width || settings.defaultNodeWidth;
        node.height = node.height || settings.defaultNodeHeight;
        if (index === nodes.length - 1 && (!partners || !partners.length))
            node.marginRight = settings.cousinSpacing;
        else
            node.marginRight = settings.siblingSpacing;
        node.marginBottom = settings.verticalSpacing;
    });
};
exports.addTargetNodesSize = addTargetNodesSize;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerSourceToTargets = void 0;
var last_1 = require("./last");
var centerSourceToTargets = function (source, targets) {
    var _a, _b;
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
                (_a = source.siblings) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) { return (sibling.x += delta_1); });
                (_b = source.partners) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) { return (partner.x += delta_1); });
            }
        }
    }
};
exports.centerSourceToTargets = centerSourceToTargets;

},{"./last":11}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialTargetsShiftLeft = void 0;
var getInitialTargetsShiftLeft = function (source, targets, settings) {
    return (targets.reduce(function (totalWidth, target, index) {
        var siblings = target[settings.siblingsAccessor];
        var partners = target[settings.partnersAccessor];
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (node) {
            totalWidth += node.width + node.marginRight;
        });
        totalWidth +=
            target.width +
                (index === targets.length - 1 && (!partners || !partners.length)
                    ? 0
                    : target.marginRight);
        partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner, partnerIndex) {
            totalWidth +=
                partner.width +
                    (partnerIndex < partner.length - 1 ? partner.marginRight : 0);
        });
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
    partnersAccessor: "partners",
    rootX: 0,
    rootY: 0,
    siblingsAccessor: "siblings",
    siblingSpacing: 10,
    verticalSpacing: 10,
};
function layout(root, customSettings) {
    var _a, _b;
    if (customSettings === void 0) { customSettings = {}; }
    var settings = __assign(__assign({}, exports.defaultSettings), customSettings);
    root.x = settings.rootX;
    root.y = settings.rootY;
    root.isRoot = true;
    addTargetNodesSize_1.addTargetNodesSize([root], settings);
    root.topLineY = root.y;
    root.bottomLineY = root.y + root.height + root.marginBottom;
    (_a = root[settings.siblingsAccessor]) === null || _a === void 0 ? void 0 : _a.reverse().forEach(function (sibling, siblingIndex, rootSiblings) {
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
    (_b = root[settings.partnersAccessor]) === null || _b === void 0 ? void 0 : _b.forEach(function (partner, partnerIndex, rootPartners) {
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
        var children = subtree[settings.childrenAccessor];
        if (!children || !children.length)
            return;
        //rename to addGenerationSizes
        addTargetNodesSize_1.addTargetNodesSize(children, settings);
        var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(subtree, children, settings);
        var currentX = subtree.x - initialShiftLeft;
        var topLineY = getGenerationBottomLineY(subtree);
        children.forEach(function (child) {
            var _a, _b;
            var maxHeight = getGenerationMaxHeight(child);
            var midVerticalY = topLineY + maxHeight / 2;
            /////////////////// SIBLING
            (_a = child[settings.siblingsAccessor]) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
                sibling.isSibling = true;
                sibling.source = child;
                sibling.x = currentX;
                sibling.y = midVerticalY - sibling.height / 2;
                checkContourOverlap(descendantsContour, sibling);
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
            checkContourOverlap(descendantsContour, child);
            currentX = child.x + child.width + child.marginRight;
            /////////////////// partners
            (_b = child[settings.partnersAccessor]) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
                partner.isPartner = true;
                partner.source = child;
                partner.x = currentX;
                partner.y = midVerticalY - partner.height / 2;
                checkContourOverlap(descendantsContour, partner);
                currentX = partner.x + partner.width + partner.marginRight;
            });
            drillChildren(child);
        });
        centerSourceToTargets_1.centerSourceToTargets(subtree, children);
    }
    normalizeTree_1.normalizeTree(root, settings.childrenAccessor);
    var parentsContour = [];
    drillParents(root);
    function drillParents(subtree) {
        var parents = subtree[settings.parentsAccessor];
        if (!parents)
            return;
        addTargetNodesSize_1.addTargetNodesSize(parents, settings);
        var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(subtree, parents, settings);
        var currentX = subtree.x - initialShiftLeft;
        var bottomLineY = getGenerationTopLineY(subtree);
        console.log({ bottomLineY: bottomLineY });
        parents.forEach(function (parent) {
            var _a, _b;
            var maxHeight = getGenerationMaxHeight(parent);
            var midVerticalY = bottomLineY - settings.verticalSpacing - maxHeight / 2;
            /////////////////// SIBLING
            (_a = parent[settings.siblingsAccessor]) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
                sibling.isSibling = true;
                sibling.source = parent;
                sibling.x = currentX;
                sibling.y = midVerticalY - sibling.height / 2;
                checkContourOverlap(parentsContour, sibling);
                currentX = sibling.x + sibling.width + sibling.marginRight;
            });
            ///////////// PARENT
            parent.isAncestor = true;
            parent.source = subtree;
            //set positions
            parent.x = currentX;
            parent.y = midVerticalY - parent.height / 2;
            //check if touches one of the contours
            checkContourOverlap(parentsContour, parent);
            currentX = parent.x + parent.width + parent.marginRight;
            /////////////////// partners
            (_b = parent[settings.partnersAccessor]) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
                partner.isPartner = true;
                partner.source = parent;
                partner.x = currentX;
                partner.y = midVerticalY - partner.height / 2;
                checkContourOverlap(parentsContour, partner);
                currentX = partner.x + partner.width + partner.marginRight;
            });
            drillParents(parent);
        });
        centerSourceToTargets_1.centerSourceToTargets(subtree, parents);
    }
    normalizeTree_1.normalizeTree(root, settings.parentsAccessor);
}
exports.default = layout;
function getGenerationBottomLineY(subtree) {
    var _a, _b;
    var bottomLineY = subtree.y + subtree.height + subtree.marginBottom;
    (_a = subtree.siblings) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
        bottomLineY = Math.max(bottomLineY, sibling.y + sibling.height + sibling.marginBottom);
    });
    (_b = subtree.partners) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
        bottomLineY = Math.max(bottomLineY, partner.y + partner.height + partner.marginBottom);
    });
    return bottomLineY;
}
function getGenerationTopLineY(subtree) {
    var _a, _b;
    var topLineY = subtree.y;
    (_a = subtree.siblings) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
        topLineY = Math.min(topLineY, sibling.y);
    });
    (_b = subtree.partners) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
        topLineY = Math.min(topLineY, partner.y);
    });
    return topLineY;
}
function getGenerationMaxHeight(subtree) {
    var _a, _b;
    var maxHeight = subtree.height;
    (_a = subtree.siblings) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
        maxHeight = Math.max(maxHeight, sibling.height);
    });
    (_b = subtree.partners) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
        maxHeight = Math.max(maxHeight, partner.height);
    });
    return maxHeight;
}
function checkContourOverlap(contourSet, node) {
    contourSet.forEach(function (contourNode) {
        shiftFromCountour_1.shiftFromCountour(contourNode, node);
    });
    contourSet.push(node);
}

},{"./addTargetNodesSize":7,"./centerSourceToTargets":8,"./getInitialTargetsShiftLeft":9,"./normalizeTree":12,"./shiftFromCountour":13}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = void 0;
var last = function (array) {
    return array === null || array === void 0 ? void 0 : array[array.length - 1];
};
exports.last = last;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTree = void 0;
var last_1 = require("./last");
var normalizeTree = function (root, accessor) {
    var _a, _b;
    var targets = root[accessor];
    if (!targets || !targets.length)
        return;
    var rootCenter = root.x + root.width / 2;
    var leftMostNode = ((_a = targets[0].siblings) === null || _a === void 0 ? void 0 : _a[0])
        ? (_b = targets[0].siblings) === null || _b === void 0 ? void 0 : _b[0]
        : targets[0];
    var lastTarget = last_1.last(targets);
    var lastTargetPartner = last_1.last(lastTarget.partners);
    var rightMostNode = lastTargetPartner ? lastTargetPartner : lastTarget;
    var centerPoint = (leftMostNode.x + rightMostNode.x + rightMostNode.width) / 2;
    var shift = centerPoint - rootCenter;
    targets.forEach(function (node) {
        drillTargets(node);
    });
    function drillTargets(subtree) {
        var _a, _b, _c;
        subtree.x -= shift;
        (_a = subtree.siblings) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) { return (sibling.x -= shift); });
        (_b = subtree.partners) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) { return (partner.x -= shift); });
        (_c = subtree[accessor]) === null || _c === void 0 ? void 0 : _c.forEach(function (node) {
            drillTargets(node);
        });
    }
};
exports.normalizeTree = normalizeTree;

},{"./last":11}],13:[function(require,module,exports){
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
