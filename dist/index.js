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
var addTargetNodesSize_1 = require("./addTargetNodesSize");
var centerSourceToTargets_1 = require("./centerSourceToTargets");
var checkContourOverlap_1 = require("./checkContourOverlap");
var defaultSettings_1 = require("./defaultSettings");
var getGenerationBottomLineY_1 = require("./getGenerationBottomLineY");
var getGenerationMaxHeight_1 = require("./getGenerationMaxHeight");
var getGenerationTopLineY_1 = require("./getGenerationTopLineY");
var getInitialTargetsShiftLeft_1 = require("./getInitialTargetsShiftLeft");
var normalizeTree_1 = require("./normalizeTree");
__exportStar(require("./getElements"), exports);
__exportStar(require("./getSizes"), exports);
__exportStar(require("./TreeNode"), exports);
__exportStar(require("./fromMap"), exports);
function layout(originalRoot, customSettings) {
    var _a, _b;
    if (customSettings === void 0) { customSettings = {}; }
    var settings = __assign(__assign({}, defaultSettings_1.defaultSettings), customSettings);
    var root = (settings.clone ? JSON.parse(JSON.stringify(originalRoot)) : originalRoot);
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
        var topLineY = getGenerationBottomLineY_1.getGenerationBottomLineY(subtree, settings);
        children.forEach(function (child) {
            var _a, _b;
            var maxHeight = getGenerationMaxHeight_1.getGenerationMaxHeight(child, settings);
            var midVerticalY = topLineY + maxHeight / 2;
            /////////////////// SIBLING
            (_a = child[settings.siblingsAccessor]) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
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
            (_b = child[settings.partnersAccessor]) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
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
    normalizeTree_1.normalizeTree(root, settings.childrenAccessor, settings);
    var parentsContour = [];
    drillParents(root);
    function drillParents(subtree) {
        var parents = subtree[settings.parentsAccessor];
        if (!parents)
            return;
        addTargetNodesSize_1.addTargetNodesSize(parents, settings);
        var initialShiftLeft = getInitialTargetsShiftLeft_1.getInitialTargetsShiftLeft(subtree, parents, settings);
        var currentX = subtree.x - initialShiftLeft;
        var bottomLineY = getGenerationTopLineY_1.getGenerationTopLineY(subtree, settings);
        console.log({ bottomLineY: bottomLineY });
        parents.forEach(function (parent) {
            var _a, _b;
            var maxHeight = getGenerationMaxHeight_1.getGenerationMaxHeight(parent, settings);
            var midVerticalY = bottomLineY - settings.verticalSpacing - maxHeight / 2;
            /////////////////// SIBLING
            (_a = parent[settings.siblingsAccessor]) === null || _a === void 0 ? void 0 : _a.forEach(function (sibling) {
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
            (_b = parent[settings.partnersAccessor]) === null || _b === void 0 ? void 0 : _b.forEach(function (partner) {
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
    normalizeTree_1.normalizeTree(root, settings.parentsAccessor, settings);
    return root;
}
exports.default = layout;
//# sourceMappingURL=index.js.map