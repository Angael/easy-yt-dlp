import { runYtDlp } from "./core/runYtDlp";
import { VideoJson } from "../types";

const isJson = (text: string) => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

export async function getVideoStats(
  ytDlpPath: string,
  link: string
): Promise<VideoJson> {
  const objFromJson = await new Promise(async (res, rej) => {
    // TODO: problem, that we dont wait for end of process
    await runYtDlp({
      path: ytDlpPath,
      args: [link, "-j", "--no-warnings"],
      options: {
        onOutput: (text) => {
          if (isJson(text)) {
            res(JSON.parse(text));
          }
        },
      },
    });

    // if didn't resolve, but ended
    rej();
  });

  return objFromJson as VideoJson;
}
