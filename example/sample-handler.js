/* istanbul ignore next */
const init = (props) => {
	throw new Error('Should not be called via a route');
}

/* istanbul ignore next */
const constructor = (props) => {
	throw new Error('Should not be called via a route');
}

/* istanbul ignore next */
const destroyer = (props) => {
	throw new Error('Should not be called via a route');
}

const normalRoute = (props) => {
	return { status: 'OK', payload: props };
}

const folder1_folder2_normalRoute = (props) => {
	return { status: 'OK', payload: props };
}

const testRoute = (props) => {
	return { status: 'OK', payload: props };
}

/* istanbul ignore next */
const shouldBeExcluded = (props) => {
	throw new Error('Should not be called via a route');
}

/* istanbul ignore next */
const shouldBeExcludedTest = (props) => {
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