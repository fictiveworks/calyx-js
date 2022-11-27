import test from "ava";
import grammar from "../../src/grammar.js";

const _ = 0.5;
const rng = () => 0.4;
const fakeRandom = rngResults => () => rngResults.shift();

test("global scoped memoized expansions", (t) => {
  const g = grammar({
    "start": "{report};{report}",
    "report": "{@name}:{@name}",
    "name": ["fluorite", "pyrite", "sodalite"]
  }, { rng });

  t.is(g.generate().text, "pyrite:pyrite;pyrite:pyrite");
});

test("branch scoped memoized expansions", (t) => {
  const g = grammar({
    "start": "{report};{report}",
    "report": "{@@name}:{@@name}",
    "name": ["fluorite", "pyrite", "sodalite"]
  }, { rng: fakeRandom([_, _, 0.1, _, 0.7]) });

  t.is(g.generate().text, "fluorite:fluorite;sodalite:sodalite");
});

test("branch scoped memoized expansions with nesting", (t) => {
  const g = grammar({
    "start": "{report};{report}",
    "report": "{@@name}:{description}",
    "description": "{@@name}",
    "name": ["fluorite", "pyrite", "sodalite"]
  }, { rng: fakeRandom([_, _, 0.7, _, _, 0.1, _]) });

  t.is(g.generate().text, "sodalite:sodalite;fluorite:fluorite");
});
