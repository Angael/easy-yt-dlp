import { DownloadVideoOutput, DownloadVideoTypes } from "./downloadVideo.types";
import child from "child_process";
import {
  checkFileExists,
  cleanUpTempDir,
  createTempDir,
  isFile,
  moveFile,
} from "./utils";
import { join, parse } from "node:path";

export const downloadVideo = async (
  params: DownloadVideoTypes
): Promise<DownloadVideoOutput> => {
  const { ytDlpPath, link, filename, outputDir, format, maxFileSize } = params;

  const tempDir = await createTempDir(outputDir);

  const args: string[] = [
    link,
    format && ["-f", format],
    maxFileSize && ["--max-filesize", maxFileSize],
    "-o",
    `${filename}.%(ext)s`,
    "-P",
    tempDir,
    "--no-warnings",
    "--no-progress",
    "--no-simulate",
    // Prevent playlists from being downloaded
    "--break-on-reject",
    "--match-filter",
    "!playlist",
    "-q",
    "--print",
    "filename",
  ]
    .flat()
    .filter((x): x is string => typeof x === "string");

  const ytDlpProcess = child.spawn(ytDlpPath, args);

  let createdFilePath = "";
  ytDlpProcess.stdout.on("data", (buffer: Buffer) => {
    const text = buffer.toString().trim();
    if (!text) return;
    createdFilePath = text;
  });

  return new Promise<DownloadVideoOutput>((res, rej) => {
    ytDlpProcess.on("close", async (code: any) => {
      if (code === 1) {
        // Clean up temp dir
        rej();
      }

      const filename = parse(createdFilePath).base;
      const fullTempFilePath = join(tempDir, filename);
      const fullDestFilePath = join(outputDir, filename);

      if (
        (await checkFileExists(fullTempFilePath)) &&
        (await isFile(fullTempFilePath))
      ) {
        await moveFile(fullTempFilePath, fullDestFilePath);
        res({ createdFilePath: fullDestFilePath });
      } else {
        rej(new Error(`File not created: ${fullTempFilePath}`));
      }
    });

    ytDlpProcess.on("error", async (err) => {
      rej(err);
    });
  })
    .then((result) => {
      cleanUpTempDir(tempDir);
      return result;
    })
    .catch((e) => {
      cleanUpTempDir(tempDir);
      throw e;
    });
};
