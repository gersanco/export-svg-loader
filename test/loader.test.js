import compiler from './compiler.js';

import { existsSync, rmdirSync } from 'fs';
import { sep } from 'path';

const outputPath = `${__dirname}${sep}dist${sep}`;
const publicPath = `assets`;

const finalPath = outputPath.concat(publicPath).concat(sep);

function removeImages() {
  rmdirSync(`${outputPath}`, { recursive: true });
}

describe('Export svg as image', () => {
  beforeAll(() => {
    removeImages();
  });

  afterEach(() => {
    removeImages();
  });

  test('Export a svg file as ico', async () => {
    const options = {
      type: 'ico',
      publicPath: publicPath,
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}test_icon.ico`)).toBe(true);
  });

  test('Export a svg file as png', async () => {
    const options = {
      type: 'png',
      publicPath: publicPath,
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}test_icon.png`)).toBe(true);
  });

  test('Export a svg file as webp', async () => {
    const options = {
      type: 'webp',
      publicPath: publicPath,
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}test_icon.webp`)).toBe(true);
  });

  test('Export a svg file as jpeg', async () => {
    const options = {
      type: 'jpeg',
      publicPath: publicPath,
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}test_icon.jpeg`)).toBe(true);
  });

  test('Export a svg file with custom name', async () => {
    const options = {
      type: 'png',
      publicPath: publicPath,
      fileName: 'customName',
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}customName.png`)).toBe(true);
  });

  test('Should export svg as png when extension is not specify', async () => {
    const options = {
      publicPath: publicPath,
    };
    const stats = await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}test_icon.png`)).toBe(true);
  });

  test('Should export svg in dist folder when public path is not specify', async () => {
    await compiler('test_icon.svg');
    expect(existsSync(`${outputPath}test_icon.png`)).toBe(true);
  });

  test('Should export svg in png sending size', async () => {
    const options = {
      publicPath: publicPath,
      sizes: '16x16',
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}test_icon.png`)).toBe(true);
  });

  test('Should export svg in different files', async () => {
    const options = {
      publicPath: publicPath,
      sizes: ['16x16', '32x32', '48x48', '64x64'],
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}test_icon16x16.png`)).toBe(true);
    expect(existsSync(`${finalPath}test_icon32x32.png`)).toBe(true);
    expect(existsSync(`${finalPath}test_icon48x48.png`)).toBe(true);
    expect(existsSync(`${finalPath}test_icon64x64.png`)).toBe(true);
  });

  test('Should export svg in different files sending a name', async () => {
    const options = {
      publicPath: publicPath,
      sizes: ['16x16', '32x32', '48x48', '64x64'],
      fileName: 'customName',
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}customName16x16.png`)).toBe(true);
    expect(existsSync(`${finalPath}customName32x32.png`)).toBe(true);
    expect(existsSync(`${finalPath}customName48x48.png`)).toBe(true);
    expect(existsSync(`${finalPath}customName64x64.png`)).toBe(true);
  });

  test('Should export svg in different files sending an array of names', async () => {
    const options = {
      publicPath: publicPath,
      sizes: ['16x16', '32x32', '48x48', '64x64'],
      fileName: [
        'customName16x16',
        'customName32x32',
        'customName48x48',
        'customName64x64',
      ],
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}customName16x16.png`)).toBe(true);
    expect(existsSync(`${finalPath}customName32x32.png`)).toBe(true);
    expect(existsSync(`${finalPath}customName48x48.png`)).toBe(true);
    expect(existsSync(`${finalPath}customName64x64.png`)).toBe(true);
  });

  test('Should return a square dimension', async () => {
    const options = {
      publicPath: publicPath,
      sizes: ['16', '32', '48', '64'],
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}test_icon16x16.png`)).toBe(true);
    expect(existsSync(`${finalPath}test_icon32x32.png`)).toBe(true);
    expect(existsSync(`${finalPath}test_icon48x48.png`)).toBe(true);
    expect(existsSync(`${finalPath}test_icon64x64.png`)).toBe(true);
  });

  test('Should return a square dimension sending a number', async () => {
    const options = {
      publicPath: publicPath,
      sizes: [128],
    };
    await compiler('test_icon.svg', options);
    expect(existsSync(`${finalPath}test_icon128x128.png`)).toBe(true);
  });
});
