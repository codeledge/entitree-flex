import { defaultSettings } from "../src/defaultSettings";
import { makeRoot } from "../src/makeRoot";

test("makeRoot", () => {
  const node = {};
  const root = makeRoot(node, defaultSettings);

  expect(root.isRoot).toBe(true);
});
