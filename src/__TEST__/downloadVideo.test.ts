import fs from "fs-extra";
import { join } from "path";
import { downloadVideo } from "../functions/downloadVideo";

import { checkFileExists } from "../functions/utils";
import * as path from "path";

const outputDir = join(__dirname, "/videos");

jest.setTimeout(20 * 1000);

describe("downloadVideo", () => {
  beforeAll(() => {
    fs.ensureDirSync(outputDir);
    fs.emptyDirSync(outputDir);
  });

  afterEach(() => {
    fs.emptyDirSync(outputDir);
  });

  afterAll(() => {
    fs.emptyDirSync(outputDir);
  });

  it("tests received env argument", async function () {
    expect(process.env.YTDLP_PATH).toBeTruthy();
  });

  it("creates file / returns its filename", async function () {
    const link = "https://www.youtube.com/watch?v=O3TtBNOtp-4";
    const filename = "vid";
    const { createdFilePath } = await downloadVideo({
      ytDlpPath: process.env.YTDLP_PATH!,
      link,
      outputDir,
      filename,
    });

    const exists = await checkFileExists(createdFilePath);

    expect(createdFilePath).toBeTruthy();
    expect(exists).toEqual(true);
  });

  it("accepts format", async function () {
    const link = "https://www.youtube.com/watch?v=O3TtBNOtp-4";
    const filename = "vid-bad-format";
    const { createdFilePath } = await downloadVideo({
      ytDlpPath: process.env.YTDLP_PATH!,
      link,
      format: "worstvideo*",
      outputDir,
      filename,
    });

    const exists = await checkFileExists(createdFilePath);

    expect(createdFilePath).toBeTruthy();
    expect(exists).toEqual(true);
  });

  it("accepts maxFileSize and throws", function () {
    const link = "https://www.youtube.com/watch?v=O3TtBNOtp-4";
    const filename = "vid-small";

    expect.assertions(1);

    return downloadVideo({
      ytDlpPath: process.env.YTDLP_PATH!,
      link,
      maxFileSize: "1K",
      outputDir,
      filename,
    }).catch((e) => {
      expect(e).toBeUndefined();
    });
  });

  it("throws understandable error if yt-dlp is not found", async () => {
    expect.assertions(1);

    try {
      await downloadVideo({
        ytDlpPath: "asd",
        link: "https://www.youtube.com/watch?v=O3TtBNOtp-4",
        outputDir,
        filename: "vid",
      });
    } catch (e: any) {
      expect(e.message).toContain("ENOENT");
    }
  });

  it("returns full filename path to a file with extension", async () => {
    const link = "https://www.youtube.com/watch?v=O3TtBNOtp-4";
    const filename = "vid-bad-format";
    const { createdFilePath } = await downloadVideo({
      ytDlpPath: process.env.YTDLP_PATH!,
      link,
      format: "worstvideo*",
      outputDir,
      filename,
    });

    const { dir, name, ext, root, base } = path.parse(createdFilePath);

    expect(dir).toBeTruthy();
    expect(name).toBe(filename);
    expect(ext).toBeTruthy();
    expect(ext[0]).toBe(".");
    expect(root).toBeTruthy();
    expect(base).toBeTruthy();
    expect(base).toBe(`${filename}${ext}`);
  });
});
