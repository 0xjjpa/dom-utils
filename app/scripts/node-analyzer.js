'use strict';

var EXAMPLE_TEXT_MAXCHARS = 40,
    NODETYPE_TEXT  = 3,
    RE_SKIP        = /^(?:(no)?script|style)$/;

/**
 * Is the given node considered interesting?
 * @param {HTMLElement} node
 * @return {Number}
 */
function nodeFilter(node) {
  var firstChild = node.firstChild,
      tagName    = node.tagName.toLowerCase();

  if (!tagName.match(RE_SKIP) &&
    node.textContent &&
    firstChild &&
    firstChild.nodeType === NODETYPE_TEXT &&
    firstChild.nodeValue &&
    firstChild.nodeValue.trim() !== '') {

    return NodeFilter.FILTER_ACCEPT;
  }

  // Skip nodes that don't immediately contain text to avoid picking up
  // the parent node and the child node as separate headings.
  return NodeFilter.FILTER_SKIP;
}

/**
 * Truncate string to the given number of characters, append an ellipsis, and
 * trim trailing and leading whitespace.
 * @param {String} s
 * @param {Integer} n
 * @return {String}
 */
function truncateString(s, n) {
  if (s.length > n) {
    s = s.substr(0, n) + '...';
  }

  return s.replace(/^\s+|\s+$/g, '');
}

/**
 * Collect a single node.
 * @param {HTMLElement} node
 * @return {Object}
 */
function collectNode(node) {
  return {
    tag  : node.tagName,
    text : truncateString(node.textContent, EXAMPLE_TEXT_MAXCHARS)
    // TODO: Restore code
    //style: getComputedStyle(node)
  };
}

/**
 * Collect interesting nodes within a document.
 * @param {Document} doc
 * @param {Array} nodes
 * @return {Array}
 */
function collectNodes(doc, nodes) {
  var treeWalker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT,
    {acceptNode: nodeFilter}, false),
  node;

  while (!!node) {
    /* //TODO: Update this case without Firefox libraries
    if (node.tagName.toLowerCase() === 'a') {
        nodes = nodes.concat(collectLink(node));
    } else {
        nodes.push(collectNode(node));
    }
    */
    nodes.push(collectNode(node));
    node = treeWalker.nextNode();
  }

  return nodes;
}

/**
 * Collect unique nodes within a document.
 * @param {Document} doc
 * @param {Array} nodes
 * @return {Array}
 */
function uniqueNodes(doc, nodes) {
  var unique = {};

  collectNodes(doc, nodes).forEach(function (node) {
        /* 
        //TODO: Restore code
        var key = styleToCanonicalString(node.style);

        if (!unique[key]) {
            node.count     = node.count || 1;
            node.styleText = key;

            unique[key] = node;
        } else {
            unique[key].count++;
          }*/
  });
  return [];
    // TODO: Retrieve values without 
    // return FBL.values(unique);
}

