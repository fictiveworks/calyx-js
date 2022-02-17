import test from "ava";
import PrefixTree from "../src/prefix-tree.js";

test("longest common prefix of strings", (t) => {
  const trie = new PrefixTree();

  t.is(trie.commonPrefix("a", "b"), "");
  t.is(trie.commonPrefix("aaaaa", "aab"), "aa");
  t.is(trie.commonPrefix("aa", "ab"), "a");
  t.is(trie.commonPrefix("ababababahahahaha", "ababafgfgbaba"), "ababa");
  t.is(trie.commonPrefix("abab", "abab"), "abab");
});

test("delete prefix", (t) => {
  const string = "testing";
  const prefix = "te";

  t.is(string.substring(prefix.length, string.length), "sting");
});

test("insert single value", (t) => {
  const trie = new PrefixTree();
  trie.add("one", 0);

  t.is(trie.lookup("one").index, 0);
});

test("lookup with literal string value", (t) => {
  const trie = new PrefixTree();
  trie.add("test", 2);
  trie.add("team", 3);

  t.is(trie.lookup("test").index, 2);
  t.is(trie.lookup("team").index, 3);
  t.falsy(trie.lookup("teal"));
});

test("lookup with leading wildcard", (t) => {
  const trie = new PrefixTree();
  trie.add("%es", 111);

  t.is(trie.lookup("buses").index, 111);
  t.is(trie.lookup("bushes").index, 111);
  t.falsy(trie.lookup("bus"));
  t.falsy(trie.lookup("train"));
});

test("lookup with trailing wildcard", (t) => {
  const trie = new PrefixTree();
  trie.add("te%", 222);

  t.is(trie.lookup("test").index, 222);
  t.is(trie.lookup("team").index, 222);
  t.falsy(trie.lookup("rubbish"));
  t.falsy(trie.lookup("total"));
});

test("lookup with anchored wildcard", (t) => {
  const trie = new PrefixTree();
  trie.add("te%s", 333);

  t.is(trie.lookup("tests").index, 333);
  t.is(trie.lookup("teams").index, 333);
  t.falsy(trie.lookup("total"));
  t.falsy(trie.lookup("test"));
  t.falsy(trie.lookup("team"));
});

test("lookup with catch all wildcard", (t) => {
  const trie = new PrefixTree();
  trie.add("%", 444);

  t.is(trie.lookup("tests").index, 444);
  t.is(trie.lookup("teams").index, 444);
  t.is(trie.lookup("total").index, 444);
  t.is(trie.lookup("test").index, 444);
  t.is(trie.lookup("team").index, 444);
});

test("lookup with cascading wildcard", (t) => {
  const trie = new PrefixTree();
  trie.add("%y", 555);
  trie.add("%s", 666);
  trie.add("%", 777);

  t.is(trie.lookup("ferry").index, 555);
  t.is(trie.lookup("bus").index, 666);
  t.is(trie.lookup("car").index, 777);
});
