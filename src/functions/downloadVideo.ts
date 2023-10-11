import path from "node:path";

import { DownloadVideoOutput, DownloadVideoTypes } from "./downloadVideo.types";
import { getVideoStats } from "./getVideoStats";
import child from "child_process";

export const downloadVideo = async (
  params: DownloadVideoTypes
): Promise<DownloadVideoOutput> => {
  const { ytDlpPath, link, filename, outputDir } = params;

  const stats = await getVideoStats(ytDlpPath, link);
  const outputFilename = `${filename}.${stats.ext}`;
  const createdFilePath = path.join(outputDir, outputFilename);

  const args = [
    link,
    "-o",
    outputFilename,
    "-P",
    outputDir,
    "--no-warnings",
    "--no-progress",
    "--no-simulate",
    "-q",
  ];

  const ytDlpProcess = child.spawn(ytDlpPath, args);

  return new Promise((res, rej) => {
    ytDlpProcess.on("close", async (code: any) => {
      if (code === 1) {
        rej();
      }

      res({
        createdFilePath,
      });
    });
  });
};
