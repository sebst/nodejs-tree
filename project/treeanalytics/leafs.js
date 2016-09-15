var fullPath = require('./fullPath');

// all nodes below fruits w/o children
var below = function(item, nodes) {
	var items = [];
	for (i in nodes) {
		var node = nodes[i];
		if (typeof node.children == 'undefined') {
			if (fullPath.get(node.value, nodes).indexOf(nodes[item])>-1) {
				items.push(node.value);
			}
		}
	}
	return items;
}

module.exports = {below: below};