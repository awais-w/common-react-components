// Used by our custom webpack config
const presets = [
  '@babel/preset-react',
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['last 2 Chrome versions', 'last 2 Firefox versions', 'edge 15', 'Android >= 4'],
      },
    },
  ],
];

// Used by our custom webpack config
const plugins = ['@babel/plugin-proposal-class-properties'];

// Used by jest to transpile test files
const env = {
  test: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-class-properties', 'transform-es2015-modules-commonjs'],
  },
};

module.exports = {
  presets,
  plugins,
  env,
};
