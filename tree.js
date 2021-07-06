var draw = SVG().addTo("#drawing").size(400, 400);

const nodeWidth = 40;
const nodeHeight = 40;
const nodePadding = 5;

const tree = {
  name: "root",
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
    },
  ],
};

layout(tree);

//console.log(tree);

drawPaths(tree);
drawLayout(tree);

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

function drawPaths(subtree) {
  drill(subtree);
  function drill(subtree) {
    if (subtree.children) {
      subtree.children.forEach((child, index) => {
        draw.path(
          `M${subtree.x + subtree.width / 2 + nodePadding} ${
            subtree.y + subtree.height + nodePadding
          } L${child.x + child.width / 2 + nodePadding} ${
            child.y + nodePadding
          }`
        );
        drill(child);
      });
    }
  }
}

function drawLayout(subtree) {
  drill(subtree);
  function drill(subtree) {
    draw
      .rect(subtree.width, subtree.height)
      // .move(
      //   subtree.x - subtree.width / 2 + nodePadding,
      //   subtree.y - subtree.height / 2 + nodePadding
      // )
      .move(subtree.x + nodePadding, subtree.y + nodePadding)
      .fill(stringToColour(subtree.name));

    draw
      .text(subtree.name)
      .move(subtree.x + nodePadding, subtree.y + nodePadding);

    if (subtree.children) {
      subtree.children.forEach((child, index) => {
        drill(child);
      });
    }
  }
}

function layout(root) {
  const contourLeft = [root];

  root.x = 120;
  root.y = 0;

  drill(root);
  function drill(subtree) {
    subtree.width = subtree.width || nodeWidth;
    subtree.height = subtree.height || nodeHeight;
    if (!subtree.children) return;

    let currentChildY = subtree.y + subtree.height + 2 * nodePadding;
    subtree.children.forEach((child, index) => {
      child.width = child.width || nodeWidth;
      child.height = child.height || nodeHeight;

      child.parent = subtree;
      if (index === 0) {
        const initialShiftLeft =
          subtree.children.reduce((totalWidth, child) => {
            totalWidth += (child.width || nodeWidth) + 2 * nodePadding;
            return totalWidth;
          }, 0) /
            2 -
          (subtree.width + 2 * nodePadding) / 2;
        child.x = subtree.x - initialShiftLeft;
      } else {
        const previousSibling = subtree.children[index - 1];
        child.x = previousSibling.x + previousSibling.width + 2 * nodePadding;
      }
      child.y = currentChildY;

      const childLeftBorder = {
        x: child.x,
        topY: currentChildY,
        bottomY: currentChildY + child.height + 2 * nodePadding,
      };
      //check if touches one of the contours
      contourLeft.forEach((contourNode) => {
        const contourRightBorder = {
          x: contourNode.x + contourNode.width + 2 * nodePadding,
          topY: contourNode.y,
          bottomY: contourNode.y + contourNode.height + 2 * nodePadding,
        };

        const childLeftBorderCovers =
          childLeftBorder.topY <= contourRightBorder.topY &&
          childLeftBorder.bottomY >= contourRightBorder.bottomY;

        if (child.name === "ronz" && contourNode.name === "sok") {
          console.log(childLeftBorder, child, contourRightBorder);
        }

        if (
          contourRightBorder.x >= childLeftBorder.x &&
          ((childLeftBorder.topY > contourRightBorder.topY &&
            childLeftBorder.topY < contourRightBorder.bottomY) ||
            (childLeftBorder.bottomY > contourRightBorder.topY &&
              childLeftBorder.bottomY < contourRightBorder.bottomY) ||
            childLeftBorderCovers)
        ) {
          if (childLeftBorderCovers) {
            //todo: if it covers the whole box, remove box from contour
          }

          const delta = contourRightBorder.x - childLeftBorder.x;
          child.x += delta;
          childLeftBorder.x += delta;
        }
      });

      contourLeft.push(child);

      drill(child);
    });

    //put the parent in the middle of the children, when done
    const lasChild = subtree.children[subtree.children.length - 1];
    subtree.x =
      (subtree.children[0].x + lasChild.x + lasChild.width + 2 * nodePadding) /
        2 -
      (subtree.width + 2 * nodePadding) / 2;
  }
}
