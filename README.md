### Why?

This library is implemented to convert a `.js` file quickly to an Express server, using the exported function names as routes. The rules to convert function names to rotes are:

1. Function names of the form `camelCase` are converted to `kebab-case`.
2. The underscore character `_` is converted to a slash `/`.

It;
- takes the file as a parameter, 
- analyze the exported keys (assuming all exports are functions or the special `exportedForTesting` object where its keys are also only functions), 
- exclude the reserved exports `constructor`, `init`, `destroyer` functions and `exportedForTesting` object
- if there are whitelists for the functions, it will only serve the whitelisted functions (both the normal and the test ones)
- and serves the remaining keys of the export as kebab-cased routes.
	- If the handler returns a `payload` response is served as `application/json` with the `payload` as the body.
	- If the handler returns a `string` response is served as `text/plain` with the `string` as the body.

**The library assumes all the keys are functions that receive a single object (the `body`) and the response of those functions are directly passed to the response towards the client.**

### Installation

```bash
yarn add tamed-express-server
```

### API

| Function | Description |
| --- | --- |
| `expressApp` | The main function that takes the file path, whitelist and testWhitelist as parameters. |

The parameters for the `expressApp` function:

| Parameter | Description |
| --- | --- |
| `handlerFile` | The full path of the file that will be served. |
| `functionsWhitelist` | An array of strings that contains the names of the functions that will be served. |
| `testFunctionsWhitelist` | An array of strings that contains the names of the functions that will be served from the `exportedForTesting` object. |

### Example 

```javascript
// sample-handler.js
...
module.exports = {
	normalRoute, // to be exposed as /normal-route route
	shouldBeExcluded, // not to be exposed because of the whitelist
	init, // not to be exposed because of default exclusion criteria
	constructor, // not to be exposed because of default exclusion criteria
	destroyer, // not to be exposed because of default exclusion criteria
	exportedForTesting: {
		testRoute, // to be exposed as /test/test-route route
		shouldBeExcludedTest // this function should not be exposed because of the whitelist
	}
}
```

```javascript
// server.js
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
```



### License

The license is MIT and full text [here](LICENSE).

#### Used Modules' Licenses

* express license [here](OtherLicenses/express.txt).
* path license [here](OtherLicenses/path.txt).
* body-parser license [here](OtherLicenses/body-parser.txt).
* cors license [here](OtherLicenses/cors.txt).
* morgan license [here](OtherLicenses/morgan.txt).
* tick-log license [here](OtherLicenses/tick-log.txt).

