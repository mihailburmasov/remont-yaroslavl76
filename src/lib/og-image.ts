import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Хэш содержимого og-cover.jpg, добавляется к URL картинки как ?v=.
 * Мессенджеры (МАХ, VK и т.п.) кэшируют превью ссылки по URL картинки и не
 * перезапрашивают её при повторной отправке той же ссылки. Без версии в URL
 * замена файла на сервере не приводит к обновлению превью у тех, кто уже
 * отправлял ссылку раньше.
 *
 * Путь строится от process.cwd() (корень проекта), а не от import.meta.url —
 * во время сборки этот файл попадает в бандл в dist/.prerender/chunks, и
 * относительный путь от import.meta.url там уже указывал бы не туда.
 */
const ogCoverPath = join(process.cwd(), "public", "og-cover.jpg");

export const OG_IMAGE_VERSION = createHash("sha256").update(readFileSync(ogCoverPath)).digest("hex").slice(0, 8);
