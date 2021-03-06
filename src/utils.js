import fs from 'fs-extra';
import paths from './paths.js';

export const delimeter = '### git-ssh-key-config ###';

export const base64Decode = (encoded) =>
	Buffer.from(encoded, 'base64').toString('utf8');

export const cleanupConfig = (config) => {
	const start = config.indexOf(delimeter);
	const end = config.indexOf(delimeter, start + 1) + delimeter.length;

	if (start < 0) { return config.trim(); }

	const newConfig = (config.substring(0, start) + config.substring(end)).trim();
	return cleanupConfig(newConfig);
};

export const cleanup = () => {
	// cleanup keys
	fs.removeSync(paths.keysDir);

	if (!fs.existsSync(paths.configFile)) { return; }

	// cleanup config
	const config = fs.readFileSync(paths.configFile).toString();
	const cleanedConfig = cleanupConfig(config);
	if (cleanedConfig.length === 0) {
		fs.removeSync(paths.configFile);
	} else {
		fs.writeFileSync(paths.configFile, cleanedConfig);
	}
};
