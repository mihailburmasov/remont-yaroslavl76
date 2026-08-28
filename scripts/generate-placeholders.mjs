// Генератор SVG-плейсхолдеров вместо реальных фото (см. DECISIONS.md — фото из ВК недоступны без авторизации).
// Запуск: node scripts/generate-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "public");

function svgPlaceholder({ width, height, label, sublabel = "", dark = false }) {
	const bg = dark ? "#111111" : "#F5F5F4";
	const fg = dark ? "#FFC700" : "#1F1F1F";
	const sub = dark ? "#9CA3AF" : "#6B7280";
	const stripe = dark ? "#1F1F1F" : "#E7E5E4";

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <g opacity="0.5">
    ${Array.from({ length: 6 })
			.map((_, i) => {
				const x = (width / 6) * i;
				return `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${stripe}" stroke-width="1"/>`;
			})
			.join("\n    ")}
  </g>
  <rect x="0" y="0" width="${width}" height="6" fill="#FFC700"/>
  <text x="50%" y="46%" font-family="Manrope, Arial, sans-serif" font-size="${Math.round(width / 22)}" font-weight="800" fill="${fg}" text-anchor="middle" dominant-baseline="middle">${label}</text>
  <text x="50%" y="56%" font-family="Manrope, Arial, sans-serif" font-size="${Math.round(width / 40)}" font-weight="600" fill="${sub}" text-anchor="middle" dominant-baseline="middle">${sublabel || `${width}×${height}`}</text>
</svg>`;
}

function write(relPath, svg) {
	const fullPath = join(root, relPath);
	mkdirSync(dirname(fullPath), { recursive: true });
	writeFileSync(fullPath, svg, "utf-8");
	console.log("created", relPath);
}

// OG cover
write(
	"og-cover.svg",
	svgPlaceholder({
		width: 1200,
		height: 630,
		label: "ПРО Ремонт 76",
		sublabel: "Ремонт квартир и домов в Ярославле",
		dark: true,
	}),
);

// Hero
write(
	"images/hero-cover.svg",
	svgPlaceholder({
		width: 1600,
		height: 1200,
		label: "Фото объекта",
		sublabel: "Плейсхолдер — заменить на реальное фото",
	}),
);

const portfolioPairs = [
	{ slug: "kvartira-komfort-kukhnya", title: "Кухня, ремонт комфорт" },
	{ slug: "kvartira-komfort-sanuzel", title: "Санузел, ремонт комфорт" },
	{ slug: "dom-premium-gostinaya", title: "Гостиная, дизайнерский ремонт" },
	{ slug: "dom-premium-spalnya", title: "Спальня, дизайнерский ремонт" },
	{ slug: "kvartira-byudzhet-vannaya", title: "Ванная, косметический ремонт" },
	{ slug: "kvartira-byudzhet-prihozhaya", title: "Прихожая, косметический ремонт" },
];

for (const pair of portfolioPairs) {
	write(
		`images/portfolio/${pair.slug}-do.svg`,
		svgPlaceholder({
			width: 1200,
			height: 900,
			label: "ДО",
			sublabel: pair.title,
		}),
	);
	write(
		`images/portfolio/${pair.slug}-posle.svg`,
		svgPlaceholder({
			width: 1200,
			height: 900,
			label: "ПОСЛЕ",
			sublabel: pair.title,
			dark: true,
		}),
	);
}

// Команда — квадратные плейсхолдеры-аватары
const team = [
	{ slug: "team-1", title: "Фото сотрудника" },
	{ slug: "team-2", title: "Фото сотрудника" },
	{ slug: "team-3", title: "Фото сотрудника" },
	{ slug: "team-4", title: "Фото сотрудника" },
];

for (const member of team) {
	write(
		`images/team/${member.slug}.svg`,
		svgPlaceholder({ width: 600, height: 600, label: "Фото", sublabel: member.title }),
	);
}

// Карта проезда (заглушка вместо встроенной карты — нужен реальный адрес)
write(
	"images/map-placeholder.svg",
	svgPlaceholder({
		width: 1200,
		height: 700,
		label: "Карта проезда",
		sublabel: "Встроить Яндекс.Карты после подтверждения адреса",
	}),
);
