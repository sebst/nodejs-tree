var allChildren = require('./allChildren');

// which nodes have exactly two children
var withN = function(n, nodes) {
	var nodesOfN = [];
	var x;
	for (var i in nodes) {
		x = 1;
		if(allChildren.forNode(i, nodes).length == n) {
			nodesOfN.push(nodes[i]);
		}
	}
	return nodesOfN;
}

var withNAsString = function(n, nodes) {
	var items = withN(n, nodes);
	return items.map(function(item) {
		return item.value;
	});
}

module.exports = {withN: withN, withNAsString: withNAsString};