import test from "ava";
import grammar from "../../src/grammar.js";

test("substitutes a chain of rules with symbols", (t) => {
  const g = grammar({
    start: "{rule_symbol}",
    rule_symbol: "{terminal_symbol}",
    terminal_symbol: "OK",
  });

  t.is(g.generate().text, "OK");
});
