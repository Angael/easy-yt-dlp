export type YTDlpArgs = {
  path: string;
  args: string[];
  options?: {
    onOutput?: (text: string) => void;
    onProgress?: (percentageDownloaded: number) => void;
    // filename to save, without extension
    outputFilename?: string;
    // ms to wait for download to end
    timeout?: number;
  };
};

export type YtDlpOutput = {
  filename: string; // Bad name, change to full filepath
};

export type VideoFormat = {
  format_id: string;
  format_note: string;
  ext: string;
  protocol: string;
  acodec: string;
  vcodec: string;
  url: string;
  width: number | null;
  height: number | null;
  fps: number | null;
  rows: number | null;
  columns: number | null;
  fragments: {
    url: string;
    duration: number;
  }[];
  resolution: string;
  aspect_ratio: number | null;
  http_headers: {
    "User-Agent": string;
    Accept: string;
    "Accept-Language": string;
    "Sec-Fetch-Mode": string;
  };
  audio_ext: string;
  video_ext: string;
  format: string;
};

export type Thumbnail = {
  url: string;
  preference: number;
  id: string;
};

export type VideoJson = {
  id: string;
  title: string;
  ext: string;
  formats: VideoFormat[];
  thumbnails: Thumbnail[];
  thumbnail: string;
  description: string;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
  channel_id: string;
  channel_url: string;
  duration: number;
  width: number;
  height: number;
  fps: number;
  vcodec: string;
  acodec: string;
};
