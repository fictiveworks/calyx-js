import test from "ava";
import Options from "../../src/options.js";
import Registry from "../../src/registry.js";
import weightedChoices from "../../src/production/weighted-choices.js";

const rng = () => 0.1;

test("selects rules with a weighted choice", (t) => {
  const production = weightedChoices({ "20%": 0.2, "80%": 0.8 }, new Registry({}, {}));

  t.deepEqual(production.evaluate({ rng }), [
    Symbol.for("weighted_choice"),
    [Symbol.for("concat"), [[Symbol.for("atom"), "80%"]]],
  ]);
});

test("raises error if weighted choices do not sum to 1", (t) => {
  const production = () => weightedChoices({ "10%": 0.1, "70%": 0.7 }, new Registry({}, {}));

  t.throws(production, { instanceOf: Error }, "Weights must sum to 1");
});

test("selects rules with integer weights", (t) => {
  const production = weightedChoices({ "20%": 20, "80%": 80 }, new Registry({}, {}));

  t.deepEqual(production.evaluate({ rng }), [
    Symbol.for("weighted_choice"),
    [Symbol.for("concat"), [[Symbol.for("atom"), "80%"]]],
  ]);
});
