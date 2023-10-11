import child from "child_process";
import { VideoStats } from "./getVideoStats.types";

const isJson = (text: string) => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

export const getVideoStats = (
  ytDlpPath: string,
  link: string
): Promise<VideoStats> =>
  new Promise(async (res, rej) => {
    const ytDlpProcess = child.spawn(ytDlpPath, [link, "-j", "--no-warnings"]);

    let stats = {};

    let out: string[] = [];
    ytDlpProcess.stdout.on("data", (buffer: Buffer) => {
      const text = buffer.toString().trim();
      out.push(text);
      if (!text) return;

      if (isJson(text)) {
        // hopefully only one json object is written to stdout
        stats = JSON.parse(text);
      }
    });

    const errors: string[] = [];
    ytDlpProcess.stderr.on("data", (buffer: Buffer) => {
      const text = buffer.toString().trim();
      errors.push(text);
      if (!text) return;
    });

    ytDlpProcess.on("close", async (code: any) => {
      if (code === 1) {
        rej(new Error([...out, ...errors].join("\n")));
      }

      if (Object.keys(stats).length) {
        res(stats as VideoStats);
      } else {
        rej(new Error([...out, ...errors].join("\n")));
      }
    });
  });
