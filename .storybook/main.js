module.exports = {
  stories: ['../src/**/*.story.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /.*\.(?:sa|sc|c)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })
    return config
  },
}
