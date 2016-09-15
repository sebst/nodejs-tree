s = "apple, sweet\nbanana, sweet\nblue, cheese\ncheese, root\ncitrus, sour\nfruit, root\ngorgonzola, blue\nlemon, citrus\nlime, citrus\norange, citrus\nparmesan, yellow\npecorino, yellow\nredcurrant, sour\nsour, fruit\nsweet, fruit\nwatermelon, sweet\nyellow, cheese"
var sp = s.split('\n');


var tree = require('./tree/tree');
var nodes = tree.make_nodes(sp);
// console.log(tree.make_nodes(sp));

var fullPath = require('./treeanalytics/fullPath');
// console.log(fullPath.get('lemon', nodes));
console.log(fullPath.asString('lemon', nodes));

var exactChildren = require('./treeanalytics/exactChildren');
// console.log(exactChildren.withN(2, nodes));
console.log(exactChildren.withNAsString(2, nodes));

var leafs = require('./treeanalytics/leafs');
console.log(leafs.below('fruit', nodes));