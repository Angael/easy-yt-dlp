# easy-yt-dlp [![Test and build](https://github.com/Angael/easy-yt-dlp/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/Angael/easy-yt-dlp/actions/workflows/node.js.yml)

NPM library for easy usage of yt-dlp

Depends on and uses `yt-dlp`. `yt-dlp` is not included in this package and must be installed separately.

## Links

- [Library documentation](docs/README.md)
- [NPM link](https://www.npmjs.com/package/easy-yt-dlp)

## Usage

```ts
import { downloadVideo } from 'yt-dlp-simple';

const { createdFilePath } = await downloadVideo({
  ytDlpPath: process.env.YTDLP_PATH,
  link: "https://website.com/watch?v=123",
  outputDir: join(__dirname, "/videos"),
  filename: 'video-file-name',
});
```



## Development workflow

1. Write code
2. Commit & Push
3. `npm version patch`
4. `npm publish`

> Use `yarn link` to test this library locally in other projects before publishing
> 
