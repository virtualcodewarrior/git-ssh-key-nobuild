import { cleanup } from './utils.js';

export default(env) => {
	cleanup();

	delete env.GIT_SSH_KEY_GITHUB;
	delete env.GIT_SSH_KEY_GITLAB;
	delete env.GIT_SSH_KEY_BITBUCKET;
};

/* eslint no-param-reassign: off */
