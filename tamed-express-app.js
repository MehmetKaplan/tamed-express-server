const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const tickLog = require('tick-log');

/* istanbul ignore next */
const fromCamelToKebabCase = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

const getParams = (body, query) => {
	/* istanbul ignore next */
	if ((body) && (Object.keys(body).length > 0)) return body;
	/* istanbul ignore next */
	return query;
}

const callHandler = async (req, res, handler, paramsArr) => {

	const params = getParams(req.body, req.query);
	try {
		let paramsToSend = [];
		for (let i = 0; i < paramsArr.length; i++) {
			paramsToSend.push(params[paramsArr[i]]);
		}
		let l_result = await handler(...paramsToSend); // never use the return value, they are to be used for testing only
		let l_responseJSON = {
			status: 200,
			result: 'OK',
		}
		/* istanbul ignore next */
		if (l_result?.payload) l_responseJSON.payload = l_result.payload;
		res.json(l_responseJSON);
	} catch (error) {
		/* istanbul ignore next */
		res.json({
			status: 500,
			result: 'FAIL',
			error: error
		});
	}
}

/*
	httpsKeys: {
		keyPath: undefined, // modify this if https is to be used
		certPath: undefined, // modify this if https is to be used
	},
	port: process.env.PORT
*/
const expressApp = (handlerFile, functionsWhitelist, testFunctionsWhitelist) => new Promise(async (resolve, reject) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(morgan('combined'));
	app.use(cors());
	app.options('*', cors());

	tickLog.info(`Handler file to be used is: ${handlerFile}`, true);
	const handler = require(handlerFile);

	// get the list of functions in the handler file
	let handlerFunctions = Object.getOwnPropertyNames(handler);

	let handlerTestFunctions;
	/* istanbul ignore next */
	if (handler?.exportedForTesting) {
		handlerTestFunctions = Object.getOwnPropertyNames(handler.exportedForTesting);
	}
	// remove the functions that are not to be exposed
	handlerFunctions = handlerFunctions.filter((item) => {
		return (item !== 'constructor') && (item !== 'init') && (item !== 'destroyer') && (item !== 'exportedForTesting');
	});

	// if there is a whitelist, remove the functions that are not in the whitelist
	/* istanbul ignore else */
	if (functionsWhitelist) {
		handlerFunctions = handlerFunctions.filter((item) => {
			return functionsWhitelist.includes(item);
		});
	}
	// if there is a test whitelist, remove the functions that are not in the test whitelist
	/* istanbul ignore else */
	if (testFunctionsWhitelist) {
		handlerTestFunctions = handlerTestFunctions.filter((item) => {
			return testFunctionsWhitelist.includes(item);
		});
	}
	// add the functions to the server
	handlerFunctions.forEach((item) => {
		let route = fromCamelToKebabCase(item);
		app.all(`/${route}`, async (req, res) => { callHandler(req, res, handler[item], ['props']); });
	});
	// add the test functions to the server
	/* istanbul ignore else */
	if (handlerTestFunctions) {
		handlerTestFunctions.forEach((item) => {
			let route = fromCamelToKebabCase(item);
			app.all(`/test/${route}`, async (req, res) => { callHandler(req, res, handler.exportedForTesting[item], ['props']) });
		});
	}
	return resolve();
});


module.exports = {
	app,
	expressApp
}
