var express = require('express');
var app = express();

var fs = require('fs');
var sp = fs.readFileSync('input.csv','utf8').split('\n');

var tree = require('./tree/tree');
var nodes = tree.make_nodes(sp);


var fullPath = require('./treeanalytics/fullPath');
var exactChildren = require('./treeanalytics/exactChildren');
var leafs = require('./treeanalytics/leafs');


app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/exactChildren/:n', function(req, res) {
	res.send({
		text: "Here will follow a list of nodes with exactly <n> children",
		n: req.params.n,
		nodes: exactChildren.withNAsString(req.params.n, nodes)
	})
});

app.get('/fullPath/:node', function(req, res) {
	res.send({
		text: "Here will follow the full path for the <node> node",
		node: req.params.node,
		fullPath: fullPath.asString(req.params.node, nodes)
	})
});

app.get('/leafs/:node', function(req, res) {
	res.send({
		text: "Here will follow a list of leafs (children and grandchildren w/o own children) for the <node> node",
		node: req.params.node,
		fullPath: leafs.belowAsString(req.params.node, nodes)
	})
});


app.get('/nodes', function(req, res) {
	res.send(Object.keys(nodes).map(function(node){
		return {
			value: nodes[node].value,
			children: typeof nodes[node].children == 'undefined' ? [] : nodes[node].children.map(function(node){
				return node.value
			}),
			parent: typeof nodes[node].parent == 'undefined' ? [] : nodes[node].parent.value
		}
	}))
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});