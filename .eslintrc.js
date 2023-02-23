module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-strauss`
  extends: ['strauss'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
