const path = require('path');

const tes = require('tamed-express-server');

const startServer = async () => {
	// httpsKeys, p_port, handlerFile, functionsWhitelist, testFunctionsWhitelist
	let whitelist =['normalRoute'];
	let testWhitelist = ['testRoute'];
	let fileFullPath = path.join(__dirname, 'sample-handler.js');
	tes.expressServer(undefined, 3000, fileFullPath, whitelist, testWhitelist);
}

startServer();
