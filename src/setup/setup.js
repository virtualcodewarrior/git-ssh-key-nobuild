import path from 'path';
import fs from 'fs-extra';

import { delimeter } from '../utils.js';
import paths from '../paths.js';

export const buildConfig = (host, identityFile, port = 22) => `
${delimeter}
Host ${host}
  IdentitiesOnly yes
  UserKnownHostsFile=/dev/null
  StrictHostKeyChecking no
  IdentityFile ${identityFile}
  Port ${port}
${delimeter}
`;

export const getPrivateKeyFilePath = (host) =>
	path.resolve(paths.keysDir, `${host.replace(/\./g, '_')}_key`);

export const appendConfigFile = (host, port) =>
	fs.appendFileSync(
		paths.configFile,
		buildConfig(host, getPrivateKeyFilePath(host), port),
	);

export const createKeyFile = (host, key) => {
	fs.ensureDirSync(paths.keysDir);
	const privateKeyFilePath = getPrivateKeyFilePath(host);

	fs.writeFileSync(privateKeyFilePath, key);
	fs.chmodSync(privateKeyFilePath, '600');
};

export default(tuples) =>
	tuples.forEach(([host, key, port]) => {
		createKeyFile(host, key);
		appendConfigFile(host, port);
	});
