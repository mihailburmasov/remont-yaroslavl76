// Собирает public/favicon.ico из готовых PNG (16/32/48) без внешних зависимостей.
// Формат ICO поддерживает PNG-данные внутри записей начиная с Windows Vista —
// это понимают все современные браузеры и мессенджеры-краулеры.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const sizes = [16, 32, 48];
const pngs = sizes.map((size) => readFileSync(join(root, `favicon-${size}x${size}.png`)));

const dirHeader = Buffer.alloc(6);
dirHeader.writeUInt16LE(0, 0); // reserved
dirHeader.writeUInt16LE(1, 2); // type: icon
dirHeader.writeUInt16LE(sizes.length, 4); // image count

const entries = [];
let offset = 6 + sizes.length * 16;

sizes.forEach((size, i) => {
	const png = pngs[i];
	const entry = Buffer.alloc(16);
	entry.writeUInt8(size === 256 ? 0 : size, 0); // width
	entry.writeUInt8(size === 256 ? 0 : size, 1); // height
	entry.writeUInt8(0, 2); // color count
	entry.writeUInt8(0, 3); // reserved
	entry.writeUInt16LE(1, 4); // color planes
	entry.writeUInt16LE(32, 6); // bits per pixel
	entry.writeUInt32LE(png.length, 8); // size of image data
	entry.writeUInt32LE(offset, 12); // offset of image data
	offset += png.length;
	entries.push(entry);
});

const ico = Buffer.concat([dirHeader, ...entries, ...pngs]);
writeFileSync(join(root, "favicon.ico"), ico);
console.log("favicon.ico built:", ico.length, "bytes");
