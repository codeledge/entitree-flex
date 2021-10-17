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

},{"../src/index.ts":14,"./flatTree.ts":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    1: {
        name: "root",
        children: [2, 3],
    },
    2: { name: "2", spouses: [7] },
    3: { name: "3", children: [4, 5], spouses: [6] },
    4: { name: "4" },
    5: { name: "5" },
    6: { name: "6", spouses: [] },
    7: { name: "7" },
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
exports.addGenerationSizes = void 0;
var getFromMap_1 = require("./getFromMap");
var addGenerationSizes = function (nodes, settings, map) {
    nodes.forEach(function (node, index) {
        var siblings = getFromMap_1.getFromMap(node[settings.nextBeforeAccessor], map);
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            sibling.width = sibling.width || settings.nodeWidth;
            sibling.height = sibling.height || settings.nodeHeight;
            sibling.marginRight = settings.nextBeforeSpacing;
            sibling.marginBottom = settings.sourceTargetSpacing;
        });
        var partners = getFromMap_1.getFromMap(node[settings.nextAfterAccessor], map);
        partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner, partnerIndex) {
            partner.width = partner.width || settings.nodeWidth;
            partner.height = partner.height || settings.nodeHeight;
            if (partnerIndex === partners.length - 1) {
                //secondDegreeSpacing because you want more space between the last spouse and the next child, so the don't get confused as both children
                partner.marginRight = settings.secondDegreeSpacing;
            }
            else
                partner.marginRight = settings.nextAfterSpacing;
            partner.marginBottom = settings.sourceTargetSpacing;
        });
        node.width = node.width || settings.nodeWidth;
        node.height = node.height || settings.nodeHeight;
        if (partners && partners.length) {
            node.marginRight = settings.nextAfterSpacing; //for sure there is an after node
        }
        else {
            if (index === nodes.length - 1) {
                node.marginRight = settings.secondDegreeSpacing; // there is a cousin next
            }
            else {
                node.marginRight = settings.firstDegreeSpacing; //there is sibling next
            }
        }
        node.marginBottom = settings.sourceTargetSpacing;
    });
};
exports.addGenerationSizes = addGenerationSizes;

},{"./getFromMap":9}],5:[function(require,module,exports){
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
                var siblings = getFromMap_1.getFromMap(source[settings.nextBeforeAccessor], map);
                siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) { return (sibling.x += delta_1); });
                var partners = getFromMap_1.getFromMap(source[settings.nextAfterAccessor], map);
                partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) { return (partner.x += delta_1); });
            }
        }
    }
};
exports.centerSourceToTargets = centerSourceToTargets;

},{"./getFromMap":9,"./last":15}],6:[function(require,module,exports){
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

},{"./shiftFromCountour":19}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./getFromMap":9}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromMap = void 0;
var getFromMap = function (ids, map) {
    if (!ids)
        return;
    return ids.map(function (id) { return map[id]; });
};
exports.getFromMap = getFromMap;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerationBottomLineY = void 0;
var getFromMap_1 = require("./getFromMap");
function getGenerationBottomLineY(subtree, settings, map) {
    var bottomLineY = subtree.y + subtree.height + subtree.marginBottom;
    var siblings = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map);
    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
        bottomLineY = Math.max(bottomLineY, sibling.y + sibling.height + sibling.marginBottom);
    });
    var partners = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map);
    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
        bottomLineY = Math.max(bottomLineY, partner.y + partner.height + partner.marginBottom);
    });
    return bottomLineY;
}
exports.getGenerationBottomLineY = getGenerationBottomLineY;

},{"./getFromMap":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerationMaxHeight = void 0;
var getFromMap_1 = require("./getFromMap");
function getGenerationMaxHeight(subtree, settings, map) {
    var maxHeight = subtree.height;
    var siblings = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map);
    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
        maxHeight = Math.max(maxHeight, sibling.height);
    });
    var partners = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map);
    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
        maxHeight = Math.max(maxHeight, partner.height);
    });
    return maxHeight;
}
exports.getGenerationMaxHeight = getGenerationMaxHeight;

},{"./getFromMap":9}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerationTopLineY = void 0;
var getFromMap_1 = require("./getFromMap");
function getGenerationTopLineY(subtree, settings, map) {
    var topLineY = subtree.y;
    var siblings = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map);
    siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
        topLineY = Math.min(topLineY, sibling.y);
    });
    var partners = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map);
    partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
        topLineY = Math.min(topLineY, partner.y);
    });
    return topLineY;
}
exports.getGenerationTopLineY = getGenerationTopLineY;

},{"./getFromMap":9}],13:[function(require,module,exports){
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

},{"./getFromMap":9}],14:[function(require,module,exports){
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

},{"./TreeNode":3,"./layoutFromMap":16}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = void 0;
var last = function (array) {
    return array === null || array === void 0 ? void 0 : array[array.length - 1];
};
exports.last = last;

},{}],16:[function(require,module,exports){
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
    if (settings.orientation === "horizontal")
        Object.values(map).forEach(function (node) {
            var y = node.y;
            var x = node.x;
            node.y = x;
            node.x = y;
        });
    return getElements_1.getElements(root, settings, map);
}
exports.layoutFromMap = layoutFromMap;

},{"./addGenerationSizes":4,"./centerSourceToTargets":5,"./checkContourOverlap":6,"./defaultSettings":7,"./getElements":8,"./getFromMap":9,"./getGenerationBottomLineY":10,"./getGenerationMaxHeight":11,"./getGenerationTopLineY":12,"./getInitialTargetsShiftLeft":13,"./makeRoot":17,"./normalizeTree":18}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTree = void 0;
var getFromMap_1 = require("./getFromMap");
var last_1 = require("./last");
var normalizeTree = function (root, accessor, settings, map) {
    var targets = getFromMap_1.getFromMap(root[accessor], map);
    if (!targets || !targets.length)
        return;
    var rootCenter = root.x + root.width / 2;
    var firstTargetSiblings = getFromMap_1.getFromMap(targets[0][settings.nextBeforeAccessor], map);
    var leftMostNode = (firstTargetSiblings === null || firstTargetSiblings === void 0 ? void 0 : firstTargetSiblings[0]) || targets[0];
    var lastTarget = last_1.last(targets);
    var lastTargetPartner = last_1.last(getFromMap_1.getFromMap(lastTarget[settings.nextAfterAccessor], map));
    var rightMostNode = lastTargetPartner || lastTarget;
    var centerPoint = (leftMostNode.x + rightMostNode.x + rightMostNode.width) / 2;
    var shift = centerPoint - rootCenter;
    targets.forEach(function (node) {
        drillTargets(node);
    });
    function drillTargets(subtree) {
        subtree.x -= shift;
        var siblings = getFromMap_1.getFromMap(subtree[settings.nextBeforeAccessor], map);
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach(function (sibling) {
            sibling.x -= shift;
        });
        var partners = getFromMap_1.getFromMap(subtree[settings.nextAfterAccessor], map);
        partners === null || partners === void 0 ? void 0 : partners.forEach(function (partner) {
            partner.x -= shift;
        });
        var next = getFromMap_1.getFromMap(subtree[accessor], map);
        next === null || next === void 0 ? void 0 : next.forEach(function (node) {
            drillTargets(node);
        });
    }
};
exports.normalizeTree = normalizeTree;

},{"./getFromMap":9,"./last":15}],19:[function(require,module,exports){
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

},{}]},{},[1]);
