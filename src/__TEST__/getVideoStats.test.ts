import { getVideoStats } from "../functions/getVideoStats";

const videoUrl = "https://www.youtube.com/watch?v=O3TtBNOtp-4";

describe("getVideoStats", () => {
  it("tests received env argument", async function () {
    expect(process.env.YTDLP_PATH).toBeTruthy();
  });

  it("gets video stats", async function () {
    const videoStats = await getVideoStats(process.env.YTDLP_PATH!, videoUrl);

    expect(videoStats).toBeTruthy();
  });

  it("has title, formats, duration", async () => {
    const videoStats = await getVideoStats(process.env.YTDLP_PATH!, videoUrl);

    expect(videoStats).toHaveProperty("title");
    expect(videoStats).toHaveProperty("formats");
    expect(videoStats).toHaveProperty("duration");
  });
});
