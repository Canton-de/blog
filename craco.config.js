const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { "@primary-color": "rgba(82, 196, 26, 1)" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
