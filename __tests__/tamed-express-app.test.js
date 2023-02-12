const request = require('supertest');
const path = require('path');
const tickLog = require('tick-log');

const { app, expressApp } = require('../tamed-express-app.js');

describe('Test the methods in the sample-handler file', () => {
	beforeAll(() => {
		let whitelist = ['normalRoute'];
		let testWhitelist = ['testRoute'];
		let fileFullPath = path.join(__dirname, '../example/sample-handler.js');
		expressApp(fileFullPath, whitelist, testWhitelist);
	});

	test('/normal-route should succeed', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/normal-route";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text:\n${JSON.stringify(JSON.parse(response.text), null, 2)}`, true);
		let result = JSON.parse(response.text);
		expect(response.statusCode).toBe(200);
		expect(result.payload).toEqual(propsToSendAndReceiveBack);
	});

	test('/test/test-route should succeed', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/test/test-route";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text:\n${JSON.stringify(JSON.parse(response.text), null, 2)}`, true);
		let result = JSON.parse(response.text);
		expect(response.statusCode).toBe(200);
		expect(result.payload).toEqual(propsToSendAndReceiveBack);
	});

	test('/init should fail', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/init";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text: ${response.text}`, true);
		expect(response.statusCode).toBe(404);
	});

	test('/constructor should fail', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/constructor";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text: ${response.text}`, true);
		expect(response.statusCode).toBe(404);
	});

	test('/destroyer should fail', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/destroyer";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text: ${response.text}`, true);
		expect(response.statusCode).toBe(404);
	});

	test('/normalRoute should fail', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/normalRoute";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text: ${response.text}`, true);
		expect(response.statusCode).toBe(404);
	});

	test('/shouldBeExcluded should fail', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/shouldBeExcluded";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text: ${response.text}`, true);
		expect(response.statusCode).toBe(404);
	});

	test('/should-be-excluded should fail', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/should-be-excluded";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text: ${response.text}`, true);
		expect(response.statusCode).toBe(404);
	});

	test('/test/testRoute should fail', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/test/testRoute";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text: ${response.text}`, true);
		expect(response.statusCode).toBe(404);
	});

	test('/test/shouldBeExcludedTest should fail', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/test/shouldBeExcludedTest";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text: ${response.text}`, true);
		expect(response.statusCode).toBe(404);
	});

	test('/test/should-be-excluded-test should fail', async () => {
		let propsToSendAndReceiveBack = { a: 1, b: 2 };
		let route = "/test/should-be-excluded-test";
		const response = await request(app).post(route).send({ props: propsToSendAndReceiveBack });
		tickLog.info(`\x1b[1;33m${route}\x1b[0m response.text: ${response.text}`, true);
		expect(response.statusCode).toBe(404);
	});


	afterAll((done) => {
		done();
	});
});
