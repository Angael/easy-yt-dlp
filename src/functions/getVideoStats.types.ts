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

export type VideoStats = {
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
