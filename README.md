# export-svg-loader

### A webpack loader to convert SVGs to images built with [svg-to-img](https://github.com/NodePit/svg-to-img).

## Getting Started

### Installation

To use export-svg-loader in your project, run:

```bash
npm install export-svg-loader -D
```

**Note** This project uses _await/async_ then **node v7.6.0 or greater** it's required to work.

### Usage

The loader may be configured to export a single or multiple extensions with varying dimensions.

- type - (Optional). Extension that svg file is going to be exported. Default to `png`.
- fileName - (Optional). A template string for the output file name. Defaults to [svg-file-name].`[extension]`. Also you can send as array to export multiple images.
- sizes - (Optional). Used to export multiple images for a single input SVG. Holds an array of sizes. Size entries may be formatted like [height]x[width] (e.g. 57x32). Also can send as string for one unique export or just [number] (e.g. 57) for square dimensions.
- publicPath: (Optional). Places where the image is going to be exported. It's necessary to set as **relative path to output**.

**Example** - converting a `svg` to `png`:

```javascript
module.exports = {
  //...
  module: {
    rules: [
      { test: /\.svg$/, use: ['export-svg-loader'] }
    ];
  }
}
```

**Example** - converting a `svg` to `ico` and saving the image as _example.jpeg_:

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
          loader: 'export-svg-loader',
          options: {
            type: 'ico'
          }
        }
      }
    ];
  }
}
```

**Example** - converting a `svg` to `jpeg` and saving the image as _example.jpeg_:

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
          loader: 'export-svg-loader',
          options: {
            type: 'jpeg',
            fileName: 'example'
          }
        }
      }
    ];
  }
}
```

**Example** - resizing a `svg` proportionally and converting it to `webp` in `dist/images` folder :

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
          loader: 'export-svg-loader',
          options: {
            type: 'webp',
            publicPath: 'dist/images'
          }
        }
      }
    ];
  }
}
```

**Example** - converting a `svg` to `png` with width `40` and height `30`:

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
          loader: 'export-svg-loader',
          options: {
            sizes: ['40x30']
          }
        }
      }
    ];
  }
}
```

**Example** - converting a `svg` to `png` with width `40` and height `40` as `number`:

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
          loader: 'export-svg-loader',
          options: {
            sizes: 40
          }
        }
      }
    ];
  }
}
```

**Example** - converting a `svg` to `png` with the follow sizes: `30x30`, `40x40`, `70x90`:

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
          loader: 'export-svg-loader',
          options: {
            sizes: ['30x30', '40x40', '70x90']
          }
        }
      }
    ];
  }
}

```

**Note** - If we don't specify an array of custom name it will generate images with the width dimension. Example: `icon30.png`, `icon40.png` and `icon70.png`

**Example** - converting a `svg` to `png` with the follow sizes: `30x30`, `40x40`, `70x90` and an array of custom names:

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
          loader: 'export-svg-loader',
          options: {
            sizes: ['30x30', '40x40', '70x90'],
            fileName: ['image30x30', 'image40x40', 'image70x90']
          }
        }
      }
    ];
  }
}

```

## Built with

- [node.js](https://nodejs.org/en/) - Cross-platform JavaScript run-time environment for executing JavaScript code server-side.
- [Jest](https://facebook.github.io/jest/) - Delightful JavaScript Testing.

## Contributing

When contributing to this project, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Update the [README.md](https://github.com/gersanco/export-svg-loader/blob/master/README.md) with details of changes to the library.

Execute `npm run test` and update the [tests](https://github.com/gersanco/export-svg-loader/tree/master/tests) if needed.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/gersanco/export-svg-loader/blob/master/LICENSE) file for details.
