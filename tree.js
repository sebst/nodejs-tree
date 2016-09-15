if (typeof String.prototype.contains === 'undefined') { String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; }
// Array.prototype.contains = function (v) { return this.indexOf(v) > -1; }


s = "apple, sweet\nbanana, sweet\nblue, cheese\ncheese, root\ncitrus, sour\nfruit, root\ngorgonzola, blue\nlemon, citrus\nlime, citrus\norange, citrus\nparmesan, yellow\npecorino, yellow\nredcurrant, sour\nsour, fruit\nsweet, fruit\nwatermelon, sweet\nyellow, cheese"

var sp = s.split('\n');

// build a tree
function make_nodes(sp) {
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
var nodes = make_nodes(sp);


// calculate complete path
function getFullPath(item, nodes) {
	var parents = [nodes[item]];
	if (typeof nodes[item] == 'undefined') {
		return "";
	}
	if (typeof nodes[item].parent == 'undefined') {
		return '/';
	}
	var parent = nodes[item].parent;
	while (parent) {
		parents.push(parent);
		parent = parent.parent;
	}
	return parents.reverse();
}

// get full path as a string (w/o "root")
function getFullPathAsString(item, nodes) {
	var parents = getFullPath(item, nodes).map(function(o){
		return o.value;
	});
	parents.shift()
	return "/" + parents.join('/');
}
console.log("getFullPathAsString", getFullPathAsString('lemon', nodes));

// which nodes have exactly two children
function getNodesWithNChildren(n, nodes) {
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
console.log("getNodesWithNChildren", getNodesWithNChildren(2, nodes));

// all nodes below fruits w/o children
function getLeafsBelow(item, nodes) {
	var items = [];
	for (i in nodes) {
		var node = nodes[i];
		if (typeof node.children == 'undefined') {
			if (getFullPath(node.value, nodes).indexOf(nodes[item])>-1) {
				items.push(node.value);
			}
		}
	}
	return items;
}
console.log("getLeafsBelow", getLeafsBelow('fruit', nodes));

