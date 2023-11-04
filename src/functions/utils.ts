import { join } from "node:path";
import fs from "node:fs";

const generateid = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const createTempDir = async (dir: string): Promise<string> => {
  const randomString = generateid();
  const tempDirPath = join(dir, randomString);

  return new Promise((res, rej) => {
    fs.mkdir(tempDirPath, (err) => {
      if (err) {
        rej(err);
      }
      res(tempDirPath);
    });
  });
};

export const cleanUpTempDir = async (dir: string): Promise<void> => {
  return new Promise((res, rej) => {
    fs.rm(dir, { recursive: true }, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  });
};

export const moveFile = async (
  source: string,
  destination: string
): Promise<void> =>
  new Promise((res, rej) => {
    fs.rename(source, destination, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  });

export function checkFileExists(filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(filepath, fs.constants.F_OK, (error) => {
      resolve(!error);
    });
  });
}

export function isFile(filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.stat(filepath, (err, stats) => {
      if (err) {
        resolve(false);
      }
      resolve(stats.isFile());
    });
  });
}
