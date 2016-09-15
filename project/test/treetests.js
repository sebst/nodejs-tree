var tree = require('../tree/tree');
var expect = require('expect.js');
var sp = "apple, sweet\nbanana, sweet\nblue, cheese\ncheese, root\ncitrus, sour\nfruit, root\ngorgonzola, blue\nlemon, citrus\nlime, citrus\norange, citrus\nparmesan, yellow\npecorino, yellow\nredcurrant, sour\nsour, fruit\nsweet, fruit\nwatermelon, sweet\nyellow, cheese".split('\n');

describe("Tree Builder", function() {
	describe("make_tree", function() {
		it("should build a tree with one element less than line count", function() {
			
			var lineCount = sp.length;
			var nodes = tree.make_nodes(sp);
			var nodeCount = Object.keys(nodes).length -1; // -1 because "root" is not listed in csv

			expect(lineCount).to.equal(nodeCount);

		})
	})
});

describe("TreeAnalytics", function() {
	describe("exactChildren", function() {
		it("should find blue", function() {
			var exactChildren = require('../treeanalytics/exactChildren');
			var nodes = tree.make_nodes(sp);
			var t = exactChildren.withNAsString(2, nodes);

			expect(t[0]).to.equal('blue');
		})
	});

	describe("fullPath", function() {
		it("should find /fruit/sour/citrus/lemon", function() {
			var fullPath = require('../treeanalytics/fullPath');
			var nodes = tree.make_nodes(sp);
			var t = fullPath.asString('lemon', nodes);

			expect(t).to.equal('/fruit/sour/citrus/lemon');
		})
	});

	describe("leafs", function() {
		it("find all leafs for a branch", function() {
			var leafs = require('../treeanalytics/leafs');
			var nodes = tree.make_nodes(sp);
			var t = leafs.belowAsString('fruit', nodes);

			expect(t).to.contain('apple');
			expect(t).to.contain('banana');
			expect(t).to.contain('lemon');
			expect(t).to.contain('lime');
			expect(t).to.contain('orange');
			expect(t).to.contain('redcurrant');
			expect(t).to.contain('watermelon');

			expect(t).to.have.length(7);
		})
	});
});

