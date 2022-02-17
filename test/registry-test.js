import test from "ava";
import Registry from "../src/registry.js";
import Options from "../src/options.js";

test("registry evaluates the start rule", (t) => {
  const registry = new Registry({}, { start: "atom" });

  t.deepEqual(registry.evaluate(), [
    Symbol.for("start"),
    [
      Symbol.for("choice"),
      [Symbol.for("concat"), [[Symbol.for("atom"), "atom"]]],
    ],
  ]);
});
