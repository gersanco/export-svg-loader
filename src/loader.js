import { from } from '@nodepit/svg-to-img';
import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

import { generateFileName, generateOption, generateSizeOptions } from './utils';

// schema for options object
import schema from './schema';

export default async function (source) {
  const callback = this.async();
  const loaderOptions = getOptions(this);

  validateOptions(schema, loaderOptions, {
    name: 'Export svg',
  });

  let promises = [];
  let fileNames = [];

  loaderOptions.fileName = generateFileName(this, source, loaderOptions);

  let options = Object.assign({}, loaderOptions);
  if (loaderOptions.sizes) {
    if (Array.isArray(loaderOptions.sizes)) {
      [promises, fileNames] = multipleExportSvg(loaderOptions, source);
    } else {
      options = generateSizeOptions(loaderOptions.sizes, loaderOptions);
    }
  }

  if (promises.length === 0) {
    const [name, bufferPromise] = exportSvg(options, source);
    fileNames.push(name);
    promises.push(bufferPromise);
  }

  try {
    const responses = await Promise.all(promises);
    responses.forEach((val, i) => {
      const name = fileNames[i];
      this.emitFile(name, val);
    });
    callback(null, '');
  } catch (error) {
    this.emitError(error);
    callback(error, source);
  }
}

function exportSvg(options, source) {
  const fileOptions = generateOption(options);
  return [options.fileName, from(source).to(fileOptions)];
}

function multipleExportSvg(loaderOptions, source) {
  const promises = [];
  const fileNames = [];
  loaderOptions.sizes.forEach((size, index) => {
    const options = generateSizeOptions(size, loaderOptions);
    if (Array.isArray(loaderOptions.fileName)) {
      options.fileName = loaderOptions.fileName[index];
    } else {
      options.fileName = `${loaderOptions.fileName}${options.width}x${options.height}`;
    }
    const [name, bufferPromise] = exportSvg(options, source);
    fileNames.push(name);
    promises.push(bufferPromise);
  });
  return [promises, fileNames];
}
