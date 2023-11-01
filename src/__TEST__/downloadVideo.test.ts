import fs from "fs-extra";
import { join } from "path";
import { downloadVideo } from "../functions/downloadVideo";
import { checkFileExists } from "./utils/checkFileExists";

const videoDir = join(__dirname, "/videos");

jest.setTimeout(20 * 1000);

describe("downloadVideo", () => {
  beforeAll(() => {
    fs.ensureDirSync(videoDir);
    fs.emptyDirSync(videoDir);
  });

  afterEach(() => {
    fs.emptyDirSync(videoDir);
  });

  afterAll(() => {
    fs.emptyDirSync(videoDir);
  });

  it("tests received env argument", async function () {
    expect(process.env.YTDLP_PATH).toBeTruthy();
  });

  it("creates file / returns its filename", async function () {
    const link = "https://www.youtube.com/watch?v=O3TtBNOtp-4";
    const videoName = "vid";
    const { createdFilePath } = await downloadVideo({
      ytDlpPath: process.env.YTDLP_PATH!,
      link,
      outputDir: videoDir,
      filename: videoName,
    });

    const exists = await checkFileExists(createdFilePath);

    expect(createdFilePath).toBeTruthy();
    expect(exists).toEqual(true);
  });

  it("can accept format param", async function () {
    const link = "https://www.youtube.com/watch?v=O3TtBNOtp-4";
    const videoName = "vid-bad-format";
    const { createdFilePath } = await downloadVideo({
      ytDlpPath: process.env.YTDLP_PATH!,
      link,
      format: "worstvideo*",
      outputDir: videoDir,
      filename: videoName,
    });

    const exists = await checkFileExists(createdFilePath);

    expect(createdFilePath).toBeTruthy();
    expect(exists).toEqual(true);
  });
});
