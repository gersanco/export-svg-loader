import path from 'path';
import webpack from 'webpack';

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname + '/dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: {
            loader: path.resolve(__dirname, '../src/loader.js'),
            options: options,
          },
        },
      ],
    },
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));
      resolve(stats);
    });
  });
};
