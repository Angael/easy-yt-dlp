# dunes-node 

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

> To test library on linux (ffmpeg binary might behave different there) use docker `docker build .`

### Maybe useful links
https://cmdcolin.github.io/posts/2022-05-27-youmaynotneedabundler
