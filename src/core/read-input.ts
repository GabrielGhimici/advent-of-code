import { createReadStream } from 'fs';
import { Interface, createInterface } from 'readline';

function createReadInterface(path: string) {
  const basePath = `static/input`;
  const internalPath = path.startsWith('/') ? path : `/${path}`;

  return createInterface({
    input: createReadStream(`${basePath}${internalPath}`),
  });
}

function linesToList(readInterface: Interface): Promise<Array<string>> {
  return new Promise((resolve) => {
    const lineList: Array<string> = [];
    readInterface.on('line', (value) => {
      lineList.push(value);
    });
    readInterface.on('close', () => {
      resolve(lineList);
    });
  });
}

export { createReadInterface, linesToList };
