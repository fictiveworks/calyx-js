import test from "ava"
import Registry from "../../src/registry"
import concat from "../../src/production/concat"

test("treats input with no delimiters as a concatenated production with a single atom", t => {
	const production = concat("one two three", new Registry())

  t.deepEqual(production.evaluate(), [Symbol.for("concat"), [[Symbol.for("atom"), "one two three"]]])
})

test("treats input with delimiters as a concatenated production with an expansion", t => {
  const production = concat("{one} two three", new Registry({one: "ONE"}))

  t.deepEqual(production.evaluate(), [Symbol.for("concat"), [[Symbol.for("atom"), ""], [Symbol.for("one"), [Symbol.for("choice"), [Symbol.for("concat"), [[Symbol.for("atom"), "ONE"]]]]], [Symbol.for("atom"), " two three"]]])
})

test("treats input with memo sigil as a concatenated production with a nonterminal choice", t => {
	const production = concat("{@one}", new Registry({one: "ONE"}))

	t.deepEqual(production.evaluate(), [Symbol.for("concat"), [[Symbol.for("atom"), ""], [Symbol.for("one"), [Symbol.for("choice"), [Symbol.for("concat"), [[Symbol.for("atom"), "ONE"]]]]], [Symbol.for("atom"), ""]]]);
})

test("treats input with unique sigil as a concatenated production with a nonterminal choice", t => {
	const production = concat("{$one}", new Registry({one: "ONE"}))

	t.deepEqual(production.evaluate(), [Symbol.for("concat"), [[Symbol.for("atom"), ""], [Symbol.for("one"), [Symbol.for("choice"), [Symbol.for("concat"), [[Symbol.for("atom"), "ONE"]]]]], [Symbol.for("atom"), ""]]]);
})

test("treats input with modifier refs as a nested expression", t => {
  const production = concat("{one.toUpperCase} two three", new Registry({one: "one"}))

  t.deepEqual(production.evaluate(), [Symbol.for("concat"), [[Symbol.for("atom"), ""], [Symbol.for("expression"), "ONE"], [Symbol.for("atom"), " two three"]]])
})
