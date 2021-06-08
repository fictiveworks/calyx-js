class PrefixNode {
  constructor(children, index) {
    this.children = children;
    this.index = index;
  }
}

class PrefixEdge {
  constructor(node, label, isWildcard) {
    this.node = node;
    this.label = label;
    this.isWildcard = isWildcard;
  }
}

class MatchResult {
  constructor(label, index, captured) {
    this.label = label;
    this.index = index;
    this.captured = captured;
  }
}

class Trie {
  constructor() {
    this.root = new PrefixNode([], null);
  }

  add(label, index) {
    const parts = label.split(/(%)/).filter(p => p.length !== 0);
    const partsCount = parts.length;

    if (partsCount > 3) {
      throw new Error(`Too many capture patterns: ${label}`);
    }

    let currentNode = this.root;

    for (const [i, part] of parts.entries()) {
      const indexSlot = (i == partsCount - 1) ? index : null;
      const isWildcard = part == "%";
      let matchedPrefix = false;
      let nextNode = null;

      for (const [j, edge] of currentNode.children.entries()) {
        const prefix = this.commonPrefix(edge.label, part);

        if (prefix.length > 0) {
          matchedPrefix = true;
          const suffix = label.substring(prefix.length, label.length);

          if (prefix == edge.label) {
            // Current prefix matches the edge label exactly so we can continue
            // down the tree without mutating the current branch.
            nextNode = new PrefixNode([], indexSlot);
            currentNode.children.push(new PrefixEdge(nextNode, suffix, isWildcard))
          } else {
            // We have a partial match on current edge so replace it with the
            // new prefix then rejoin the remaining suffix to the existing branch.
            edge.label = edge.label.substring(prefix.length, edge.label.length);
            nextNode = new PrefixNode([], indexSlot);
            const prefixNode = new PrefixNode([edge], null);
            prefixNode.children.push(new PrefixEdge(nextNode, suffix, isWildcard))
            currentNode.children[j] = new PrefixEdge(prefixNode, prefix, isWildcard);
          }

          currentNode = nextNode;
          break;
        }
      }

      if (!matchedPrefix) {
        // No existing edges have a common prefix so push a new branch onto the
        // tree at the current level.
        const nextEdge = new PrefixEdge(new PrefixNode([], indexSlot), part, isWildcard);
        currentNode.children.push(nextEdge);
        currentNode = nextEdge.node;
      }
    }
  }

  lookup(label) {
    const labelLength = label.length;
    let currentNode = this.root;
    let charsConsumed = 0;
    let charsCaptured = null;

    while (currentNode != null && !currentNode.children.length == 0 && charsConsumed < labelLength) {
      let candidateEdge = null;

      for (const edge of currentNode.children) {
        const subLabel = label.substring(charsConsumed, labelLength);

        if (edge.isWildcard) {
          if (edge.node.children.length == 0) {
            charsCaptured = label.substring(charsConsumed, subLabel.length);
            charsConsumed += subLabel.length;
            candidateEdge = edge;
            break;
          }

          for (const lookaheadEdge of edge.node.children) {
            const prefix = subLabel.lastIndexOf(lookaheadEdge.label);
            if (prefix != -1) {
              charsCaptured = label.substring(charsConsumed, prefix);
              charsConsumed += prefix + lookaheadEdge.label.length;
              candidateEdge = lookaheadEdge;
              break;
            }
          }

          if (candidateEdge) break;

        } else {
          if (edge.label == this.commonPrefix(edge.label, subLabel)) {
            charsConsumed += edge.label.length;
            candidateEdge = edge;
            break;
          }
        }
      }

      if (candidateEdge) {
        currentNode = candidateEdge.node;
      } else {
        currentNode = null;
      }
    }

    if (currentNode != null && currentNode.index != null && charsConsumed == labelLength) {
      return new MatchResult(label, currentNode.index, charsCaptured);
    } else {
      return null;
    }
  }

  commonPrefix(a, b) {
    let selectedPrefix = "";
    let index = 0;
    const minIndexLength = a < b ? a.length : b.length;

    while (index < minIndexLength) {
      if (a[index] != b[index]) return selectedPrefix;

      selectedPrefix += a[index];
      index++;
    }

    return selectedPrefix;
  }
}

export default Trie;
