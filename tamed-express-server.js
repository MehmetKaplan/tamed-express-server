const tickLog = require('tick-log');

const {app, expressApp} = require('./tamed-express-app.js');

const expressServer = async (httpsKeys, p_port, handlerFile, functionsWhitelist, testFunctionsWhitelist) => {
	let port = p_port || process.env.PORT || 3000;

	await expressApp(handlerFile, functionsWhitelist, testFunctionsWhitelist);

	if ((httpsKeys?.keyPath) && (httpsKeys?.certPath)) {
		// if there are keys and certificates, use them
		https.createServer({
			key: fs.readFileSync(httpsKeys.keyPath),
			cert: fs.readFileSync(httpsKeys.certPath)
		}, app).listen(port, () => {
			tickLog.success(`HTTPS server listening on port ${port}.`);
		});
	}
	else {
		// In localhost go only for HTTP not HTTPS
		app.listen(port, () => {
			tickLog.success(`HTTP server listening on port ${port}.`);
		});
	}
}

module.exports = {
	expressServer
}