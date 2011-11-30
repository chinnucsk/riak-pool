/**
 * Pool
 *
 * Extremely simple utility that goes through an array
 * of `riak-js` clients, swapping when an connection error occurs.
 *
 * @param {Object} options - including a `nodes` {Array} property with `riak-js` instances
 * @api public
 */
var Pool = function Pool(options) {
  options = options || {};
  this.nodes = options.nodes;
  this.current = 0;
  
  if (!this.nodes || this.nodes.length === 0) {
    throw new Error('Pool needs at least one node to function');
  }
  
  var self = this;
  this.nodes.forEach(function(node) {
    node.on('error', function(err) { self._handleError(err) });
  });
  
}

/**
 * `db` getter
 *
 * @return {Client}
 * @api public
 */
Pool.prototype.__defineGetter__('db', function() {
  return this.nodes[this.current % this.nodes.length];
});

Pool.prototype._handleError = function(err) {
  if (['ECONNREFUSED', 'ETIMEDOUT'].indexOf(err.code) > -1) this.current++;
}

module.exports = Pool;