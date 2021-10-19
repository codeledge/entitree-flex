export default {
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
