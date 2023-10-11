# yt-dlp-js [![Test and build](https://github.com/Angael/yt-dlp-js/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/Angael/yt-dlp-js/actions/workflows/node.js.yml)

NPM library for easy usage of yt-dlp

Depends on and uses `yt-dlp`. `yt-dlp` is not included in this package and must be installed separately.

## Docs

[Library documentation](docs/README.md)


## Development workflow

1. Write code
2. Commit & Push
3. `npm version patch`
4. `npm publish`

> Use `yarn link` to test this library locally in other projects before publishing

> To test library on linux (yt-dlp binary might behave different there) use docker `docker build .`
> TODO: fix dockerfile
