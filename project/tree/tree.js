// build a tree
var make_nodes = function(sp) {
	var nodes = {};

	for (var i in sp) { 
		var line = sp[i];
		var columns = line.split(', ');

		var child = columns[0];
		var parent = columns[1];

		if (typeof nodes[parent] == 'undefined') {
			nodes[parent] = {'value': parent}
		}

		if (typeof nodes[parent]['children'] == 'undefined') {
			nodes[parent]['children'] = [];
		}
	    if (typeof nodes[child] == 'undefined') {
	    	nodes[child] = {'value': child};
	    }
	    nodes[child]['parent'] = nodes[parent];
	    nodes[parent]['children'].push(nodes[child]);
	}
	return nodes;
}

module.exports = { make_nodes: make_nodes };