export type DownloadVideoTypes = {
  ytDlpPath: string;
  link: string;
  format?: string;
  outputDir: string;
  // Filename, without extension and without path
  filename: string;
  /** @example 50k or 44.6M */
  maxFileSize?: string;
};

export type DownloadVideoOutput = {
  createdFilePath: string;
};
