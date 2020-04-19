import { interpolateName } from 'loader-utils';
import { sep } from 'path';

export function generateSizeOptions(size, loaderOptions) {
  const [width, height] = ('' + size).toLocaleLowerCase().split('x');
  return Object.assign({}, loaderOptions, {
    width: width,
    height: height || width,
  });
}

export function generateOption(loaderOptions) {
  const extension = loaderOptions.type || 'png';
  const quality = loaderOptions.quality || 1;

  loaderOptions.fileName = `${loaderOptions.publicPath || ''}${sep}${
    loaderOptions.fileName
  }.${extension}`;
  return {
    type: extension === 'jpg' ? 'jpeg' : extension,
    quality: quality,
    width: loaderOptions.width,
    height: loaderOptions.height,
  };
}

export function generateFileName(context, source, loaderOptions) {
  let name = '';
  if (loaderOptions.fileName) {
    name = loaderOptions.fileName;
  } else {
    name = interpolateName(context, `[name]`, source);
  }
  return name;
}
