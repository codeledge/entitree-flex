define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var nodeWidth = 40;
    var nodeHeight = 40;
    var nodePadding = 5;
    function layout(root, options) {
        var contourLeft = [root];
        drill(root);
        function drill(subtree) {
            subtree.width = subtree.width || nodeWidth;
            subtree.height = subtree.height || nodeHeight;
            if (!subtree.children)
                return;
            var currentChildY = subtree.y + subtree.height + 2 * nodePadding;
            subtree.children.forEach(function (child, index) {
                child.width = child.width || nodeWidth;
                child.height = child.height || nodeHeight;
                child.parent = subtree;
                if (index === 0) {
                    var initialShiftLeft = subtree.children.reduce(function (totalWidth, child) {
                        totalWidth += (child.width || nodeWidth) + 2 * nodePadding;
                        return totalWidth;
                    }, 0) /
                        2 -
                        (subtree.width + 2 * nodePadding) / 2;
                    child.x = subtree.x - initialShiftLeft;
                }
                else {
                    var previousSibling = subtree.children[index - 1];
                    child.x = previousSibling.x + previousSibling.width + 2 * nodePadding;
                }
                child.y = currentChildY;
                var childLeftBorder = {
                    x: child.x,
                    topY: currentChildY,
                    bottomY: currentChildY + child.height + 2 * nodePadding,
                };
                //check if touches one of the contours
                contourLeft.forEach(function (contourNode) {
                    var contourRightBorder = {
                        x: contourNode.x + contourNode.width + 2 * nodePadding,
                        topY: contourNode.y,
                        bottomY: contourNode.y + contourNode.height + 2 * nodePadding,
                    };
                    var childLeftBorderCovers = childLeftBorder.topY <= contourRightBorder.topY &&
                        childLeftBorder.bottomY >= contourRightBorder.bottomY;
                    if (child.name === "ronz" && contourNode.name === "sok") {
                        console.log(childLeftBorder, child, contourRightBorder);
                    }
                    if (contourRightBorder.x >= childLeftBorder.x &&
                        ((childLeftBorder.topY > contourRightBorder.topY &&
                            childLeftBorder.topY < contourRightBorder.bottomY) ||
                            (childLeftBorder.bottomY > contourRightBorder.topY &&
                                childLeftBorder.bottomY < contourRightBorder.bottomY) ||
                            childLeftBorderCovers)) {
                        if (childLeftBorderCovers) {
                            //todo: if it covers the whole box, remove box from contour
                        }
                        var delta = contourRightBorder.x - childLeftBorder.x;
                        child.x += delta;
                        childLeftBorder.x += delta;
                    }
                });
                contourLeft.push(child);
                drill(child);
            });
            //put the parent in the middle of the children, when done
            var lasChild = subtree.children[subtree.children.length - 1];
            subtree.x =
                (subtree.children[0].x + lasChild.x + lasChild.width + 2 * nodePadding) /
                    2 -
                    (subtree.width + 2 * nodePadding) / 2;
        }
    }
    exports.default = layout;
});
