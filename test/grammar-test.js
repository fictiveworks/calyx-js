import test from "ava";
import grammar from "../src/grammar.js";

test("grammar with start rule", (t) => {
  const g = grammar({ start: "Hello." });
  t.is(g.generate().text, "Hello.");
});

test("grammar with separator in rule", (t) => {
  const g = grammar({
    start: "A can of {tomato_soup}",
    tomato_soup: "tomato soup",
  });
  t.is(g.generate().text, "A can of tomato soup");
});

test("grammar with weighted probabilities", (t) => {
  const g = grammar({
    start: "A can of {contents}",
    contents: {
      "tomato soup": 1,
    },
  });
  t.is(g.generate().text, "A can of tomato soup");
});

test("nested expansion in weighted probabilities", (t) => {
  const g = grammar({
    start: "A can of {contents}",
    contents: {
      "tomato {soup}": 1,
    },
    soup: "paste",
  });
  t.is(g.generate().text, "A can of tomato paste");
});
