// the values of `VERSION`, `TITLE`, `DESCRIPTION`, `ENV` are replaced on the fly by babel
// babel plugin: see https://babeljs.io/docs/en/babel-plugin-transform-inline-environment-variables
// package.json variables: see https://docs.npmjs.com/misc/scripts#packagejson-vars
export default {
  VERSION: process.env.npm_package_version,
  TITLE: process.env.npm_package_title,
  DESCRIPTION: process.env.npm_package_description,
  ENV: process.env.NODE_ENV
};
