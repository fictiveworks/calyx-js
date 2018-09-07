export const flattenTree = tree => flattenTreeTail(tree).filter(discardSymbols)

export const flattenTreeTail = tree => tree.reduce(
  (list, node) => list.concat(Array.isArray(node) ? flattenTree(node) : node),
  []
);

export const discardSymbols = entry => typeof entry != "symbol"
