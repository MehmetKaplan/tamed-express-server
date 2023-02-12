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
	init,
	constructor,
	destroyer,
	normalRoute,
	shouldBeExcluded, // this function should not be exposed because of the whitelist
	exportedForTesting: {
		testRoute,
		shouldBeExcludedTest
	}
}