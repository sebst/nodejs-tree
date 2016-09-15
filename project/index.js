
var fs = require('fs');
var sp = fs.readFileSync('input.csv','utf8').split('\n');

var tree = require('./tree/tree');
var nodes = tree.make_nodes(sp);
// console.log(nodes);

var fullPath = require('./treeanalytics/fullPath');
// console.log(fullPath.get('lemon', nodes));
console.log(fullPath.asString('lemon', nodes));

var exactChildren = require('./treeanalytics/exactChildren');
// console.log(exactChildren.withN(2, nodes));
console.log(exactChildren.withNAsString(2, nodes));

var leafs = require('./treeanalytics/leafs');
// console.log(leafs.below('fruit', nodes));
console.log(leafs.belowAsString('fruit', nodes));

