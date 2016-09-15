// calculate complete path
var get = function(item, nodes) {
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
var asString = function(item, nodes) {
	var parents = get(item, nodes).map(function(o){
		return o.value;
	});
	parents.shift()
	return "/" + parents.join('/');
}

module.exports = {
	get: get,
	asString: asString
};