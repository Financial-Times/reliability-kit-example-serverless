/**
 * IMPORTANT: This app isn't an example of how to correctly
 * set up a Financial Times Serverless application – it's
 * used to illustrate how to integrate Reliability Kit into
 * a serverless app with as little boilerplate code as
 * possible.
 */

const logger = require('@dotcom-reliability-kit/logger');
const { logHandledError, logRecoverableError } = require('@dotcom-reliability-kit/log-error');
const { OperationalError } = require('@dotcom-reliability-kit/errors');
const registerCrashHandler = require('@dotcom-reliability-kit/crash-handler');

/**
 * Reliability Kit method to ensure that fatal exceptions are logged.
 * The earlier this is called in your app, the more likely it is to
 * catch errors.
 *
 * @see https://github.com/Financial-Times/dotcom-reliability-kit/tree/main/packages/crash-handler#readme
 */
registerCrashHandler();

/**
 * Define and export a Lambda handler. This is just a demo
 * function to show how you can improve error throwing and
 * logging with Reliability Kit.
 */
module.exports.example = async (event) => {
	// We wrap everything in an outer try/catch so that we
	// don't trigger unhandled rejections
	try {

		// If the event status property is bad, we throw
		// an error which will get caught and logged with
		// Reliability Kit
		if (event?.status === 'bad') {
			/**
			 * @see https://github.com/Financial-Times/dotcom-reliability-kit/tree/main/packages/errors#readme
			 */
			throw new OperationalError({
				code: 'MALFORMED_EVENT',
				message: 'Malformed event data'
			});
		}

		// If an event stats property is questionable,
		// we log a recoverable error (a warning-level log)
		// and then continue on with our day
		if (event.status === 'questionable') {
			/**
			 * @see https://github.com/Financial-Times/dotcom-reliability-kit/tree/main/packages/log-error#readme
			 */
			logRecoverableError({
				error: new OperationalError({
					code: 'UNEXPECTED_EVENT',
					message: 'Unexpected event data',
					event
				}),
				// Note that you need to pass in a logger here, because
				// otherwise log-error will use n-logger, which in a Lambda
				// context does not support JSON-formatted logs.
				logger
			});
	
		}
		
		/**
		 * @see https://github.com/Financial-Times/dotcom-reliability-kit/tree/main/packages/logger#readme
		 */
		logger.debug('Everything is looking good');

		// ...Continue processing here...
		return {
			message: 'Function executed successfully',
			event
		};
	} catch (error) {
		/**
		 * Log any errors here as "handled" - as in we've caught
		 * them and logged them so there's nothing further for
		 * the app to do.
		 * 
		 * @see https://github.com/Financial-Times/dotcom-reliability-kit/tree/main/packages/log-error#readme
		 */
		logHandledError({
			error,
			logger
		});
		return {
			message: 'Function failed to execute',
			event
		};
	}
};
