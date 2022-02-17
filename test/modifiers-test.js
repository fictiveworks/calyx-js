import test from "ava";
import Modifiers from "../src/modifiers.js";

test.beforeEach((t) => {
  t.context = {
    modifiers: new Modifiers(),
  };
});

test("lower", (t) => {
  t.is(t.context.modifiers.lower("ONE"), "one");
});

test("upper", (t) => {
  t.is(t.context.modifiers.upper("one"), "ONE");
});
