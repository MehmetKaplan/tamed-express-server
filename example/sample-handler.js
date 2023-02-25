/* istanbul ignore next */
const init = (data) => {
	throw new Error('Should not be called via a route');
}

/* istanbul ignore next */
const constructor = (data) => {
	throw new Error('Should not be called via a route');
}

/* istanbul ignore next */
const destroyer = (data) => {
	throw new Error('Should not be called via a route');
}

const normalRoute = (data) => {
	return { status: 'OK', payload: data };
}

const folder1_folder2_normalRoute = (data) => {
	return { status: 'OK', payload: data };
}

const testRoute = (data) => {
	return { status: 'OK', payload: data };
}

/* istanbul ignore next */
const shouldBeExcluded = (data) => {
	throw new Error('Should not be called via a route');
}

/* istanbul ignore next */
const shouldBeExcludedTest = (data) => {
	throw new Error('Should not be called via a route');
}

module.exports = {
	normalRoute, // to be exposed as /normal-route route
	folder1_folder2_normalRoute, // to be exposed as /folder1/folder2/normal-route route
	shouldBeExcluded, // not to be exposed because of the whitelist
	init, // not to be exposed because of default exclusion criteria
	constructor, // not to be exposed because of default exclusion criteria
	destroyer, // not to be exposed because of default exclusion criteria
	exportedForTesting: {
		testRoute, // to be exposed as /test/test-route route
		shouldBeExcludedTest // this function should not be exposed because of the whitelist
	}
}