
var fs = require('fs');
var sp = fs.readFileSync('input.csv','utf8').split('\n');

var tree = require('./tree/tree');
var nodes = tree.make_nodes(sp);
// console.log(nodes);

var fullPath = require('./treeanalytics/fullPath');
// console.log(fullPath.get('lemon', nodes));
console.log("The full path for the 'lemon' node is:", fullPath.asString('lemon', nodes));

var exactChildren = require('./treeanalytics/exactChildren');
// console.log(exactChildren.withN(2, nodes));
console.log("Those nodes have exactly two children:", exactChildren.withNAsString(2, nodes));

var leafs = require('./treeanalytics/leafs');
// console.log(leafs.below('fruit', nodes));
console.log("Those leafs (nodes w/o children) are below the 'fruit' node", leafs.belowAsString('fruit', nodes));

