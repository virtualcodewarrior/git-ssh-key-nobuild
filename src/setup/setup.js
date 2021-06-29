import path from 'path'
import fs from 'fs-extra'

import { delimeter } from '../utils'
import paths from '../paths'

type PrivateKey = string
type Host = string
type Port = number

export const buildConfig = (host: Host, identityFile: string, port: Port = 22) => `
${delimeter}
Host ${host}
  IdentitiesOnly yes
  UserKnownHostsFile=/dev/null
  StrictHostKeyChecking no
  IdentityFile ${identityFile}
  Port ${port}
${delimeter}
`

export const getPrivateKeyFilePath = (host: Host) =>
  path.resolve(paths.keysDir, `${host.replace(/\./g, '_')}_key`)

export const appendConfigFile = (host: Host, port: Port) =>
  fs.appendFileSync(
    paths.configFile,
    buildConfig(host, getPrivateKeyFilePath(host), port)
  )

export const createKeyFile = (host: string, key: string) => {
  fs.ensureDirSync(paths.keysDir)
  const privateKeyFilePath = getPrivateKeyFilePath(host)

  fs.writeFileSync(privateKeyFilePath, key)
  fs.chmodSync(privateKeyFilePath, '600')
}

export default (tuples: [Host, PrivateKey, port][]) =>
    tuples.forEach(([host, key, port]) => {
    createKeyFile(host, key)
    appendConfigFile(host, port)
  })
