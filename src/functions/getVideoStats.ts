import child from "child_process";
import { VideoStats } from "./getVideoStats.types";

export const getVideoStats = (
  ytDlpPath: string,
  link: string
): Promise<VideoStats> =>
  new Promise(async (res, rej) => {
    const ytDlpProcess = child.spawn(ytDlpPath, [link, "-j", "--no-warnings"]);

    const out: string[] = [];
    ytDlpProcess.stdout.on("data", (buffer: Buffer) => {
      const text = buffer.toString().trim();
      if (!text) return;
      out.push(text);
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

      const outJson = out.join("");
      try {
        const stats = JSON.parse(outJson) as VideoStats;
        res(stats);
      } catch (e: any) {
        rej(
          new Error(
            ["Failed to parse JSON object", ...out, ...errors].join("\n")
          )
        );
      }
    });
  });
