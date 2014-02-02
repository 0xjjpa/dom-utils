'use strict';

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