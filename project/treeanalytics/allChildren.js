var forNode = function(item, nodes) {

	var node = nodes[item];

	if (typeof node.children != 'undefined') {
		// Copy by reference, so the latter code would alter the nodes object
		// if it was "var children = node.children;"

		var children = Object.create(node.children); // node.children;
	} else {
		var children = [];
	}

	var allChildren = [];

	while (children.length > 0) {
		var child = children.pop();
		allChildren.push(child);

		if (typeof child.children != 'undefined') {
			var grandChildren = child.children;
		} else {
			var grandChildren = [];
		}

		for (var grandChild in grandChildren) {
			children.push(grandChildren[grandChild]);
		}

	}
	return allChildren;

}

module.exports = {forNode: forNode};