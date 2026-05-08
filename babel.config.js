module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated plugin must be last. Do not add react-native-worklets/plugin —
    // it duplicates Reanimated's Babel plugin and breaks Metro bundling.
    plugins: ['react-native-reanimated/plugin'],
  };
};
