export type DownloadVideoTypes = {
  ytDlpPath: string;
  link: string;
  outputDir: string;
  // Filename, without extension and without path
  filename: string;
};

export type DownloadVideoOutput = {
  createdFilePath: string;
};
