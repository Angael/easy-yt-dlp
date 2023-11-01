import { DownloadVideoOutput, DownloadVideoTypes } from "./downloadVideo.types";
import child from "child_process";

export const downloadVideo = async (
  params: DownloadVideoTypes
): Promise<DownloadVideoOutput> => {
  const { ytDlpPath, link, filename, outputDir, format } = params;

  const args: string[] = [
    link,
    format && ["-f", format],
    "-o",
    `${filename}.%(ext)s`,
    "-P",
    outputDir,
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

  return new Promise((res, rej) => {
    ytDlpProcess.on("close", async (code: any) => {
      if (code === 1) {
        rej();
      }

      res({ createdFilePath });
    });
  });
};
