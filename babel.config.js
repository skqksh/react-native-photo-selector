module.exports = function (api) {
  const presets = ['module:metro-react-native-babel-preset'];

  const moduleResolver = [
    'module-resolver',
    {
      root: './',
      alias: {},
    },
  ];

  const plugins = [moduleResolver];

  const envDevelopment = {
    presets,
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/transform-react-jsx-source',
      moduleResolver,
    ],
  };

  if (api.env(['development', 'test'])) {
    return envDevelopment;
  }

  return {
    presets,
    plugins,
  };
};
