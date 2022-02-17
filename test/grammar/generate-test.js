import test from "ava";
import grammar from "../../src/grammar.js";

test("generate with default start symbol", (t) => {
  const g = grammar({
    start: "start",
  });

  t.is(g.generate().text, "start");
});

test("generate with specified start symbol", (t) => {
  const g = grammar({
    alt_start: "alt_start",
  });

  t.is(g.generate("alt_start").text, "alt_start");
});

test("generate with context", (t) => {
  const g = grammar({
    start: "{hello}",
  });

  t.is(g.generate({ hello: "Hello!" }).text, "Hello!");
});

test("generate with symbol and context", (t) => {
  const g = grammar({
    alt_start: "{hello}",
  });

  t.is(g.generate("alt_start", { hello: "Hello!" }).text, "Hello!");
});

test("generate with symbol and context args flipped", (t) => {
  const g = grammar({
    alt_start: "{hello}",
  });

  t.is(g.generate({ hello: "Hello!" }, "alt_start").text, "Hello!");
});
