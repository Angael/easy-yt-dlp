import child from "child_process";
import { YTDlpArgs, YtDlpOutput } from "../../types";
import { checkFileExists } from "../utils/checkFileExists";
import { getVideoStats } from "../getVideoStats";

const CONSTANT_ARGS = [
  "-q",
  "--no-warnings",
  "--no-simulate",
  "--progress",
  "--progress-template",
  "download;%(progress.status)s;%(progress._percent_str)s;%(progress.downloaded_bytes)s;%(progress.total_bytes)s;%(progress.eta)s;%(progress.speed)s;%(progress._total_bytes_str)s;%(progress._eta_str)s;%(progress._speed_str)s",
  "--print",
  "filename",
];

export const runYtDlp = ({
  path,
  args,
  options: { onProgress, onOutput, outputFilename } = {},
}: YTDlpArgs): Promise<YtDlpOutput> =>
  new Promise(async (res, rej) => {
    const stats = getVideoStats(path, args[0]);

    const fullArgs = [...CONSTANT_ARGS, ...args];
    const ffmpegConsole = child.spawn(path, fullArgs);

    console.log(path + " " + fullArgs.join(" "));

    const noProgressOutputArray: string[] = [];

    const onBuffer = (data: Buffer) => {
      const text = data.toString().trim();
      if (!text) return;

      if (onOutput) {
        onOutput(text);
      }

      if (text.startsWith("download;")) {
        if (onProgress) {
          onProgress(text as any);
        }
      } else {
        noProgressOutputArray.push(text);
      }
    };

    ffmpegConsole.stderr.on("data", onBuffer);
    ffmpegConsole.stdout.on("data", onBuffer);

    ffmpegConsole.on("close", async (code: any) => {
      if (code === 1) {
        rej();
      }

      console.log("ending, checking for file path", noProgressOutputArray);
      const filename =
        noProgressOutputArray[noProgressOutputArray.length - 1].trim();
      if (await checkFileExists(filename)) {
        res({ filename });
      } else {
        rej();
      }
    });
  });
