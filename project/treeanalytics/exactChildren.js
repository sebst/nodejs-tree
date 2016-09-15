var allChildren = require('./allChildren');

// which nodes have exactly two children
var withN = function(n, nodes) {
	var nodes_of_n = [];
	for (i in nodes) {
		if(allChildren.forNode(i, nodes).length == n) {
			nodes_of_n.push(nodes[i]);
		}

	}
	return nodes_of_n;
}

var withNAsString = function(n, nodes) {
	var items = withN(n, nodes);
	return items.map(function(item) {
		return item.value;
	});
}

module.exports = {withN: withN, withNAsString: withNAsString};