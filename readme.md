# git-ssh-key

[![Build Status](https://travis-ci.org/sidoshi/git-ssh-key.svg?branch=master)](https://travis-ci.org/sidoshi/git-ssh-key) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/sidoshi/git-ssh-key/issues) [![HitCount](http://hits.dwyl.io/sidoshi/git-ssh-key.svg)](http://hits.dwyl.io/sidoshi/git-ssh-key) [![npm](https://img.shields.io/npm/v/git-ssh-key.svg)](https://www.npmjs.com/package/git-ssh-key) [![npm](https://img.shields.io/npm/l/git-ssh-key.svg)](https://www.npmjs.com/package/git-ssh-key)

> Setup ssh private keys for git from environment variables

`git-ssh-key` makes it easy to setup ssh keys for git hosting services. It is ideally meant to be used on CI to setup ssh key to access private repos. One of the use case is to install npm packages from private git repos.

It has two prerequisites:-

* You have a ssh key-pair and have added the public key to your git service.
* you have your private key encoded in base64 format and set in appropriate environment variable.

`git-ssh-key` needs two things to function properly. The private key and the
url of the git host. You can provide any number of private key and host url
pairs by setting the proper environment variables. `git-ssh-key` looks for a
pattern in env variables to get pairs of private keys and hosts.

The pattern for private keys is:
`GIT_SSH_KEY_XXXXX`

Example:-
`GIT_SSH_KEY_GITHUB`
`GIT_SSH_KEY_GITLAB`
`GIT_SSH_KEY_BUTBUCKET`
`GIT_SSH_KEY_COMPANY_GITLAB`

This variables need to be set with appropriate private keys encoded in base64.

The pattern for host urls is:-
`GIT_SSH_HOST_XXX`

Example:-
`GIT_SSH_HOST_GITHUB='github.com'`
`GIT_SSH_HOST_GITLAB='gitlab.com'`
`GIT_SSH_HOST_BUTBUCKET='bitbucket.org'`
`GIT_SSH_HOST_SELF_GITLAB=gitlab.self.com`

For every host, there must be a corresponding private key and vice versa with
an exception to few popular hosts.

You don't need to provide host urls for Github, Gitlab or Bitbucket. They are
set by default to `github.com`, 'gitlab.com' and 'bitbucket.org' respectively.
Though if you do provide host urls for these services, provided urls will
override the default urls.

```bash
git-ssh-env setup
```

And it will setup ssh keys for all the services for which environment variables are set.

To cleanup when you no longer need the access, run

```bash
git-ssh-env teardown
```

It will remove all the added keys and config.

## Example

See the [example](https://github.com/doshisid/git-ssh-key/tree/master/example) folder to get an idea about how `git-ssh-env` should be used.

In that folder if you open the `package.json` file, you can see that it is dependent on a private package hosted on gitlab. That package is also dependent on a private package hosted on bitbucket. Both those platforms have diffrent keys.
I have added `GIT_SSH_KEY_GITLAB` and `GIT_SSH_KEY_BUTBUCKET` environement variables to Travis CI with respective private
keys in `base64` encoded format.

`index.js` file checks that both the packages were added properly by checking the output.

This test is run on every CI build. You can see the log of the last build [here](https://travis-ci.org/doshisid/git-ssh-key).

## Install

```bash
npm install -g git-ssh-key
```

## Usage

```bash
git-ssh-key [setup|teardown]
```

## Credits

I got a lot of help from this [gist](https://gist.github.com/fiznool/88442338db96a898f1dc).

## License

MIT ?? [Siddharth Doshi](https://sid.sh)
