export interface ProjectRoom {
	title: string;
	beforeSrc: string;
	afterSrc: string;
}

export interface ProjectPhoto {
	title: string;
	src: string;
}

export interface Project {
	slug: string;
	title: string;
	objectType: "Квартира" | "Дом";
	level: "Бюджетный" | "Косметический" | "Дизайнерский";
	area: string;
	term: string;
	budgetRange: string;
	description: string;
	rooms: ProjectRoom[];
	extraPhotos?: ProjectPhoto[];
}

export const PROJECTS: Project[] = [
	{
		slug: "dom-banya",
		title: "Дом-баня, ремонт под ключ",
		objectType: "Дом",
		level: "Дизайнерский",
		area: "110 м²",
		term: "6 месяцев",
		budgetRange: "2 400 000 – 3 000 000 ₽",
		description:
			"Ремонт дома-бани под ключ: от чернового бетона и разводки коммуникаций до готового объекта. В предбаннике — панорамное остекление и тёплый пол с керамогранитом, в парной — отделка термодревом, каменная стена и подсветка потолка. Отдельная зона с купелью и душем на глянцевой плитке.",
		rooms: [
			{
				title: "Предбанник",
				beforeSrc: "/images/portfolio/dom-banya-predbannik-do.webp",
				afterSrc: "/images/portfolio/dom-banya-predbannik-posle.webp",
			},
			{
				title: "Парная",
				beforeSrc: "/images/portfolio/dom-banya-parilka-do.webp",
				afterSrc: "/images/portfolio/dom-banya-parilka-posle.webp",
			},
			{
				title: "Стеклоблочная перегородка",
				beforeSrc: "/images/portfolio/dom-banya-steklobloki-do.webp",
				afterSrc: "/images/portfolio/dom-banya-steklobloki-posle.webp",
			},
		],
	},
	{
		slug: "dom-premium-gostinaya",
		title: "Частный дом, ремонт по дизайн-проекту",
		objectType: "Дом",
		level: "Дизайнерский",
		area: "180 м²",
		term: "16 недель",
		budgetRange: "3 100 000 – 4 100 000 ₽",
		description:
			"Ремонт двухэтажного дома по индивидуальному дизайн-проекту с авторским надзором. Многоуровневые потолки в гостиной, инженерия «умного дома», премиальные материалы и мебель под ключ.",
		rooms: [
			{
				title: "Гостиная",
				beforeSrc: "/images/portfolio/dom-premium-gostinaya-do.webp",
				afterSrc: "/images/portfolio/dom-premium-gostinaya-posle.webp",
			},
		],
		extraPhotos: [
			{ title: "Кухня", src: "/images/portfolio/dom-premium-kukhnya-posle.webp" },
			{ title: "Прихожая", src: "/images/portfolio/dom-premium-prihozhaya-posle.webp" },
			{ title: "Санузел", src: "/images/portfolio/dom-premium-sanuzel-posle.webp" },
			{ title: "Санузел", src: "/images/portfolio/dom-premium-sanuzel2-posle.webp" },
		],
	},
	{
		slug: "dom-sarafonovo",
		title: "Частный дом в Сарафоново, ремонт под ключ",
		objectType: "Дом",
		level: "Косметический",
		area: "116 м²",
		term: "10 недель",
		budgetRange: "1 050 000 – 1 350 000 ₽",
		description:
			"Ремонт дома под ключ от чернового бетона до готового интерьера с мебелью. Натяжные потолки, тёплый пол, кухня-гостиная со столешницей под мрамор, спальня с текстилем и техникой — заезжай и живи.",
		rooms: [
			{
				title: "Кухня-гостиная",
				beforeSrc: "/images/portfolio/dom-sarafonovo-kukhnya-do.webp",
				afterSrc: "/images/portfolio/dom-sarafonovo-kukhnya-posle.webp",
			},
			{
				title: "Спальня",
				beforeSrc: "/images/portfolio/dom-sarafonovo-spalnya-do.webp",
				afterSrc: "/images/portfolio/dom-sarafonovo-spalnya-posle.webp",
			},
		],
	},
];

export function getProjectBySlug(slug: string): Project | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}
