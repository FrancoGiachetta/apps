import { getBuildHookIds, fireBuildHook } from './lib/build-hook';

/**
 * Fires the Netlify build hook of a single site (replaces the lambda's POST /build).
 *
 * @param {Object} event - Contains the parameters passed to the App Action (`siteName`)
 * @param {Object} context - Provides the app installation parameters
 * @returns {Object} The response from the App Action
 */
export const handler = async (event, context) => {
  // actions are for building only one site
  const [buildHookId] = getBuildHookIds(
    { siteName: event.body?.siteName },
    context.appInstallationParameters
  );

  if (!buildHookId) {
    throw new Error('Cannot find build hook');
  }

  await fireBuildHook(buildHookId);
  return { success: true };
};
