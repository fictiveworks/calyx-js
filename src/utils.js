export const flattenTree = tree => tree.reduce(
  (list, node) => list.concat(Array.isArray(node) ? flattenTree(node) : node),
  []
);

export const discardSymbols = entry => typeof entry != "symbol"
