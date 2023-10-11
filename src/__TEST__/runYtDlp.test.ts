import fs from "fs-extra";
import { join } from "path";
import { runYtDlp } from "../functions/core/runYtDlp";
import { checkFileExists } from "../functions/utils/checkFileExists";

const videoDir = join(__dirname, "/videos");

jest.setTimeout(20 * 1000);

describe("runYtDlp", () => {
  beforeAll(() => {
    fs.ensureDirSync(videoDir);
    fs.emptyDirSync(videoDir);
  });

  afterEach(() => {
    fs.emptyDirSync(videoDir);
  });

  afterAll(() => {
    fs.rmdirSync(videoDir);
  });

  it("tests received env argument", async function () {
    expect(process.env.YTDLP_PATH).toBeTruthy();
  });

  it("creates file / returns its filename", async function () {
    const link = "https://www.youtube.com/watch?v=O3TtBNOtp-4";
    const videoName = "vid.webm";
    const { filename } = await runYtDlp({
      path: process.env.YTDLP_PATH!,
      args: [link, "-P", videoDir, "-o", videoName],
      options: {
        onProgress: (progress) => {
          // console.log("progress", progress);
        },
        onOutput: (output) => {
          // console.log("output", output);
        },
      },
    });

    const exists = await checkFileExists(filename);

    expect(filename).toBeTruthy();
    expect(exists).toEqual(true);
  });
});
