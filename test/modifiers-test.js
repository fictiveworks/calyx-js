import test from 'ava'
import Modifiers from '../src/modifiers.js'

test('lower', t => {
  t.is(Modifiers.lower('ONE'), 'one');
});

test('upper', t => {
  t.is(Modifiers.upper('one'), 'ONE');
});

test('title', t => {
  t.is(Modifiers.title('a visit from the goon squad'), 'A Visit From The Goon Squad');
});

test('sentence', t => {
  t.is(Modifiers.sentence('a visit from the goon squad'), 'A visit from the goon squad');
});
// 
// test('trim', t => {
//   t.is(Modifiers.trim('key: value     '), 'key: value');
// });
