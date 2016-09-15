var tree = require('../tree/tree');
var expect = require('expect.js');
var sp = "apple, sweet\nbanana, sweet\nblue, cheese\ncheese, root\ncitrus, sour\nfruit, root\ngorgonzola, blue\nlemon, citrus\nlime, citrus\norange, citrus\nparmesan, yellow\npecorino, yellow\nredcurrant, sour\nsour, fruit\nsweet, fruit\nwatermelon, sweet\nyellow, cheese".split('\n');
var sp_false = "TODO".split('\n');

describe("Tree Builder", function() {
	describe("make_tree", function() {
		it("should build a tree with one element less than line count", function() {
			
			var lineCount = sp.length;
			var nodes = tree.make_nodes(sp);
			var nodeCount = Object.keys(nodes).length -1; // -1 because "root" is not listed in csv

			expect(lineCount).to.equal(nodeCount);

		});
		it("should warn on unprocessable input", function() {
			
			// TODO

		});
	});
});

describe("TreeAnalytics", function() {
	describe("allChildren", function() {
		it("should find the right lengths", function() {
			var nodes = tree.make_nodes(sp);
			var allChildren = require('../treeanalytics/allChildren');

			expect(allChildren.forNode('yellow', nodes)).to.have.length(2);
			expect(allChildren.forNode('blue', nodes)).to.have.length(1);
			expect(allChildren.forNode('fruit', nodes)).to.have.length(10);
			expect(allChildren.forNode('root', nodes)).to.have.length(17);
		});
		it("should find the right lengths for root node", function() {
			var nodes = tree.make_nodes(sp);
			var allChildren = require('../treeanalytics/allChildren');

			expect(allChildren.forNode('root', nodes)).to.have.length(17);
		});
	});

	describe("exactChildren", function() {
		it("should find blue", function() {
			var exactChildren = require('../treeanalytics/exactChildren');
			var nodes = tree.make_nodes(sp);
			var t = exactChildren.withNAsString(1, nodes);

			expect(t).to.contain('blue');
			expect(t).to.have.length(1);
		});

		it("should find yellow", function() {
			var exactChildren = require('../treeanalytics/exactChildren');
			var nodes = tree.make_nodes(sp);
			var t = exactChildren.withNAsString(2, nodes);

			expect(t).to.contain('yellow');
			expect(t).to.have.length(1);
		});

		it("should return undefined if no nodes can be found", function() {
			var exactChildren = require('../treeanalytics/exactChildren');
			var nodes = tree.make_nodes(sp);
			var t = exactChildren.withNAsString(12, nodes);

			expect(t[0]).to.equal(undefined);
		});
		it("should warn on unprocessable nodes", function() {
			
			// TODO

		});
	});

	describe("fullPath", function() {
		it("should find /fruit/sour/citrus/lemon", function() {
			var fullPath = require('../treeanalytics/fullPath');
			var nodes = tree.make_nodes(sp);
			var t = fullPath.asString('lemon', nodes);

			expect(t).to.equal('/fruit/sour/citrus/lemon');
		});

		it("should find /cheese/yellow/pecorino", function() {
			var fullPath = require('../treeanalytics/fullPath');
			var nodes = tree.make_nodes(sp);
			var t = fullPath.asString('pecorino', nodes);

			expect(t).to.equal('/cheese/yellow/pecorino');
		});

		it("should return undefined for unknown nodes", function() {
			var fullPath = require('../treeanalytics/fullPath');
			var nodes = tree.make_nodes(sp);
			var t = fullPath.asString('le-mon', nodes);

			expect(t).to.equal(undefined);
		});
		it("should warn on unprocessable nodes", function() {
			
			// TODO

		});
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
		});

		it("should return [] for unknown nodes", function() {
			var leafs = require('../treeanalytics/leafs');
			var nodes = tree.make_nodes(sp);
			var t = leafs.belowAsString('fru-it', nodes);

			expect(t).to.be.an('array');
			expect(t).to.be.empty();
		});
		it("should warn on unprocessable nodes", function() {
			
			// TODO

		});
	});
});

