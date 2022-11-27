import test from "ava";
import Registry from "../../src/registry.js";
import memo from "../../src/production/memo.js";

const rng = () => 0.1;

test("uses the registry to memoize expansions", (t) => {
  const production = memo(
    "num",
    false,
    new Registry({ rng }, { num: ["1", "2", "3"] })
  );

  t.deepEqual(production.evaluate({ rng }), [
    Symbol.for("num"),
    [Symbol.for("choice"), [Symbol.for("concat"), [[Symbol.for("atom"), "1"]]]],
  ]);
});
