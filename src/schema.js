export default {
  type: 'object',
  properties: {
    type: {
      description: 'Type of image to be formatted.',
      type: 'string',
    },
    fileName: {
      description: 'Formatted image name.',
      type: ['array', 'string'],
    },
    sizes: {
      description: 'Width and height to format',
      type: ['array', 'string', 'number'],
    },
    publicPath: {
      description: 'Relative path to the output directory',
      type: 'string',
    },
  },
  additionalProperties: false,
};
