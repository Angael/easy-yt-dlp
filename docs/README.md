easy-yt-dlp

# easy-yt-dlp

## Table of contents

### Type Aliases

- [DownloadVideoOutput](README.md#downloadvideooutput)
- [DownloadVideoTypes](README.md#downloadvideotypes)
- [Thumbnail](README.md#thumbnail)
- [VideoFormat](README.md#videoformat)
- [VideoStats](README.md#videostats)

### Functions

- [downloadVideo](README.md#downloadvideo)
- [getVideoStats](README.md#getvideostats)

## Type Aliases

### DownloadVideoOutput

Ƭ **DownloadVideoOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `createdFilePath` | `string` |

#### Defined in

[functions/downloadVideo.types.ts:12](https://github.com/Angael/easy-yt-dlp/blob/09d5b56/src/functions/downloadVideo.types.ts#L12)

___

### DownloadVideoTypes

Ƭ **DownloadVideoTypes**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filename` | `string` | - |
| `format?` | `string` | - |
| `link` | `string` | - |
| `maxFileSize?` | `string` | **`Example`** ```ts 50k or 44.6M ``` |
| `outputDir` | `string` | - |
| `ytDlpPath` | `string` | - |

#### Defined in

[functions/downloadVideo.types.ts:1](https://github.com/Angael/easy-yt-dlp/blob/09d5b56/src/functions/downloadVideo.types.ts#L1)

___

### Thumbnail

Ƭ **Thumbnail**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `preference` | `number` |
| `url` | `string` |

#### Defined in

[functions/getVideoStats.types.ts:31](https://github.com/Angael/easy-yt-dlp/blob/09d5b56/src/functions/getVideoStats.types.ts#L31)

___

### VideoFormat

Ƭ **VideoFormat**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `acodec` | `string` |
| `aspect_ratio` | `number` \| ``null`` |
| `audio_ext` | `string` |
| `columns` | `number` \| ``null`` |
| `ext` | `string` |
| `format` | `string` |
| `format_id` | `string` |
| `format_note` | `string` |
| `fps` | `number` \| ``null`` |
| `fragments` | { `duration`: `number` ; `url`: `string`  }[] |
| `height` | `number` \| ``null`` |
| `http_headers` | { `Accept`: `string` ; `Accept-Language`: `string` ; `Sec-Fetch-Mode`: `string` ; `User-Agent`: `string`  } |
| `http_headers.Accept` | `string` |
| `http_headers.Accept-Language` | `string` |
| `http_headers.Sec-Fetch-Mode` | `string` |
| `http_headers.User-Agent` | `string` |
| `protocol` | `string` |
| `resolution` | `string` |
| `rows` | `number` \| ``null`` |
| `url` | `string` |
| `vcodec` | `string` |
| `video_ext` | `string` |
| `width` | `number` \| ``null`` |

#### Defined in

[functions/getVideoStats.types.ts:1](https://github.com/Angael/easy-yt-dlp/blob/09d5b56/src/functions/getVideoStats.types.ts#L1)

___

### VideoStats

Ƭ **VideoStats**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `acodec` | `string` |
| `channel_id` | `string` |
| `channel_url` | `string` |
| `description` | `string` |
| `duration` | `number` |
| `ext` | `string` |
| `formats` | [`VideoFormat`](README.md#videoformat)[] |
| `fps` | `number` |
| `height` | `number` |
| `id` | `string` |
| `thumbnail` | `string` |
| `thumbnails` | [`Thumbnail`](README.md#thumbnail)[] |
| `title` | `string` |
| `uploader` | `string` |
| `uploader_id` | `string` |
| `uploader_url` | `string` |
| `vcodec` | `string` |
| `width` | `number` |

#### Defined in

[functions/getVideoStats.types.ts:37](https://github.com/Angael/easy-yt-dlp/blob/09d5b56/src/functions/getVideoStats.types.ts#L37)

## Functions

### downloadVideo

▸ **downloadVideo**(`params`): `Promise`<[`DownloadVideoOutput`](README.md#downloadvideooutput)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`DownloadVideoTypes`](README.md#downloadvideotypes) |

#### Returns

`Promise`<[`DownloadVideoOutput`](README.md#downloadvideooutput)\>

#### Defined in

[functions/downloadVideo.ts:11](https://github.com/Angael/easy-yt-dlp/blob/09d5b56/src/functions/downloadVideo.ts#L11)

___

### getVideoStats

▸ **getVideoStats**(`ytDlpPath`, `link`): `Promise`<[`VideoStats`](README.md#videostats)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ytDlpPath` | `string` |
| `link` | `string` |

#### Returns

`Promise`<[`VideoStats`](README.md#videostats)\>

#### Defined in

[functions/getVideoStats.ts:4](https://github.com/Angael/easy-yt-dlp/blob/09d5b56/src/functions/getVideoStats.ts#L4)
