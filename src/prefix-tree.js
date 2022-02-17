/**
 * A node in the prefix tree. Leaf nodes point to the index that label lookups
 * will match on.
 */
class IndexNode {
  constructor(children, index) {
    this.children = children;
    this.index = index;
  }
}

/**
 * An directed edge pointing to a node. The label is the prefix fragment that
 * must satisfy the constraint of being a common prefix for all branches that
 * descend from this branch of the tree.
 *
 * Wildcard edges are specially marked so that the lookup algorithm knows to
 * capture the consumed prefix characters and execute the forward match.
 */
class LabeledEdge {
  constructor(node, label, isWildcard) {
    this.node = node;
    this.label = label;
    this.isWildcard = isWildcard;
  }
}

/**
 * Result struct for successful label lookups.
 */
class MatchResult {
  constructor(label, index, captured) {
    this.label = label;
    this.index = index;
    this.captured = captured;
  }
}

/**
 * Returned from unsuccessful lookups.
 * @type {null}
 */
const EmptyResult = null;

/**
 * A prefix tree (radix trie) that supports wildcard pattern matching with
 * substring captures.
 *
 * Use `add` to insert new label and index mappings into the tree and `lookup`
 * or `hasLabel` to search the tree for a given label.
 */
class PrefixTree {
  constructor() {
    this.root = new IndexNode([], null);
  }

  add(label, index) {
    const parts = label.split(/(%)/).filter((p) => p.length !== 0);
    const partsCount = parts.length;

    if (partsCount > 3) {
      throw new Error(`Too many capture patterns: ${label}`);
    }

    let currentNode = this.root;

    for (const [i, part] of parts.entries()) {
      const indexSlot = i == partsCount - 1 ? index : null;
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
            nextNode = new IndexNode([], indexSlot);
            currentNode.children.push(
              new LabeledEdge(nextNode, suffix, isWildcard)
            );
          } else {
            // We have a partial match on current edge so replace it with the
            // new prefix then rejoin the remaining suffix to the existing branch.
            edge.label = edge.label.substring(prefix.length, edge.label.length);
            nextNode = new IndexNode([], indexSlot);
            const adjoiningNode = new IndexNode([edge], null);
            adjoiningNode.children.push(
              new LabeledEdge(nextNode, suffix, isWildcard)
            );
            currentNode.children[j] = new LabeledEdge(
              adjoiningNode,
              prefix,
              isWildcard
            );
          }

          currentNode = nextNode;
          break;
        }
      }

      if (!matchedPrefix) {
        // No existing edges have a common prefix so push a new branch onto the
        // tree at the current level.
        const nextEdge = new LabeledEdge(
          new IndexNode([], indexSlot),
          part,
          isWildcard
        );
        currentNode.children.push(nextEdge);
        currentNode = nextEdge.node;
      }
    }
  }

  /**
   * Checks if the given label maps to an index in the tree.
   *
   * @param  {String}  label [string to check for]
   * @return {Boolean}       [True if the given label exists in the tree]
   */
  hasLabel(label) {
    return this.lookup(label) !== EmptyResult;
  }

  /**
   * Searches the tree for an index match on a particular label.
   *
   * This is either an exact string lookup or wildcard match, depending on
   * whether wildcard matching patterns have been added.
   *
   * @param  {String} label String to search for
   * @return {(MatchResult|EmptyResult)}
   */
  lookup(label) {
    const labelLength = label.length;
    let currentNode = this.root;
    let charsConsumed = 0;
    let charsCaptured = null;

    while (
      currentNode != null &&
      !currentNode.children.length == 0 &&
      charsConsumed < labelLength
    ) {
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

    if (
      currentNode != null &&
      currentNode.index != null &&
      charsConsumed == labelLength
    ) {
      return new MatchResult(label, currentNode.index, charsCaptured);
    } else {
      return EmptyResult;
    }
  }

  /**
   * Returns any string which occurs as the prefix of both a and b.
   *
   * If a and b have a different initial character, returns the empty string.
   *
   * @param  {String} a
   * @param  {String} b
   * @return {String} The common prefix of a and b
   */
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

export default PrefixTree;
