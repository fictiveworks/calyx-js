import test from "ava";
import result from "../src/result.js";

test("wraps expression tree", (t) => {
  const tree = result([Symbol.for("root"), [Symbol.for("leaf"), "atom"]]).tree;

  t.deepEqual(tree, [Symbol.for("root"), [Symbol.for("leaf"), "atom"]]);
});

test("expression tree is immutable", (t) => {
  const tree = result([Symbol.for("root"), [Symbol.for("leaf"), "atom"]]).tree;

  const mutateTree = () => tree.push([Symbol.for("leaf"), "atom"]);

  t.throws(mutateTree);
});

test("flattens expression tree to string", (t) => {
  const expr = [
    Symbol.for("root"),
    [
      Symbol.for("branch"),
      [Symbol.for("leaf"), "one"],
      [Symbol.for("leaf"), " "],
      [Symbol.for("leaf"), "two"],
    ],
  ];
  const text = result(expr).text;

  t.is(text, "one two");
});

test("coerces to string automatically", (t) => {
  const expr = [
    Symbol.for("root"),
    [
      Symbol.for("branch"),
      [Symbol.for("leaf"), "one"],
      [Symbol.for("leaf"), " "],
      [Symbol.for("leaf"), "two"],
    ],
  ];
  const output = result(expr);

  t.is(`${output}`, output.text);
});
