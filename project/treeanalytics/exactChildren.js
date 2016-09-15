// which nodes have exactly two children
var withN = function(n, nodes) {
	var nodes_of_n = [];
	for (i in nodes) {
		var node = nodes[i];
		if (typeof node.children == 'undefined') {
			var children = [];
		} else {
			var children = node.children;
		}
		var c = 0;
		while (children.length > 0) {
			var x = children.pop();
			for (j in x) {
				if (typeof x[j].children != 'undefined') {
					children.push(x[j].children);
				}
			}
			c = c+1;
		}
		if (c==n) {
			nodes_of_n.push(node);
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