import * as Sentry from "@sentry/react";

/**
 * See https://docs.sentry.io/platforms/javascript/guides/react/usage/#capturing-errors for more info
 * @param {*} error The error object to send to Sentry
 * @param {} additionalContext Optional object to provide additional context. See https://docs.sentry.io/platforms/javascript/guides/react/enriching-events/context/#passing-context-directly for requirements on providing a context object.
 * @returns The generated Sentry eventId
 */
 const sentryCaptureError = (error, additionalContext) => {
    return Sentry.captureException(error, additionalContext);
};

/**
 * See https://docs.sentry.io/platforms/javascript/guides/react/usage/#capturing-messages for more info
 * @param {*} message The string message to send to Sentry
 * @param {} additionalContext Optional object to add to provide additional context. See https://docs.sentry.io/platforms/javascript/guides/react/enriching-events/context/#passing-context-directly for requirements on providing a context object.
 * @param {} logLevel Optional log level to set for the provided message, defaults to "info". If additionalContext provided, logLevel will be ignored. See https://docs.sentry.io/platforms/javascript/guides/react/usage/set-level/ for valid values that can be provided
 * @returns The generated Sentry eventId
 */
const sentryCaptureMessage = (message, additionalContext, logLevel="info") => {
    return Sentry.captureMessage(message, additionalContext || logLevel);
};

/**
 * See https://docs.sentry.io/platforms/javascript/guides/react/enriching-events/identify-user/ for more info
 * @param {} userId The userId to set as the identifier of the current user (preferrably hubspot contact id)
 * @param {} email The email to set as the identifier of the current user (can be provided if userId is not available (e.g. during login))
 */
const sentrySetUser = (userId, email) => {
    Sentry.setUser(userId || email);
}



export {
    sentryCaptureError,
    sentryCaptureMessage,
    sentrySetUser
};