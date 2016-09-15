var fullPath = require('./fullPath');

// all nodes below fruits w/o children
var below = function(item, nodes) {
	var items = [];
	for (i in nodes) {
		var node = nodes[i];
		if (typeof node.children == 'undefined') {
			if (fullPath.get(node.value, nodes).indexOf(nodes[item])>-1) {
				items.push(node);
			}
		}
	}
	return items;
}

var belowAsString = function(item, nodes) {
	return below(item, nodes).map(function(item) {
		return item.value;
	});
}

module.exports = {below: below, belowAsString: belowAsString};