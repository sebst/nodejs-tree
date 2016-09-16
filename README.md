# NodeJS Tree Assignment

## Run
To answer some basic questions about the tree, just run 
`node index.js`
from within the `project` directory.

## Test
Tests are done with `mocha` and `expect.js`. These requirements are included in the `package.json` file,
so, just run `npm install` and `npm test` from within the `project` folder to run the tests.

### Remarks
There are some unimplemented test cases for currupt data. At lest, the modules won't break with faulty csv files,
so that should be enough for demo.

## Web Access
A little `express.js` webservice is available with this endpoints:
 - `/leafs/:node` - will return a list of leafs below :node
 - `/fullPath/:node` - will return the fullPath for one node
 - `/exactChildren/:n` - will return a list of nodes with exactly :n children
 - `/nodes` - will return a list of all nodes with their parents and children
Start the webserver with `node web.js` and it will server on port `3000`.

## Remarks
For an easy in-memory processing, all nodes built by `make_nodes` are accessible by their name directly on
the nodes object. It uses a circular model to reference their children and parents.

However, if you would do this in production and would have the node in a SQL database, you could answer most of
basic tree question by accessing the nodes by their respective `left` and `right` values, which would then best
be indexed in your nodes table.