export interface ProjectRoom {
	title: string;
	beforeSrc: string;
	afterSrc: string;
}

export interface Project {
	slug: string;
	title: string;
	objectType: "Квартира" | "Дом";
	level: "Бюджетный" | "Комфорт" | "Премиум";
	area: string;
	term: string;
	budgetRange: string;
	description: string;
	rooms: ProjectRoom[];
}

export const PROJECTS: Project[] = [
	{
		slug: "kvartira-komfort-kukhnya",
		title: "Двухкомнатная квартира, капитальный ремонт",
		objectType: "Квартира",
		level: "Комфорт",
		area: "54 м²",
		term: "8 недель",
		budgetRange: "{{BUDGET_RANGE_1}}",
		description:
			"Полностью заменили инженерные сети, выровняли стены и потолки, сделали стяжку пола. Кухню объединили с гостиной по типовому решению перепланировки, санузел собрали заново с новой разводкой.",
		rooms: [
			{
				title: "Кухня-гостиная",
				beforeSrc: "/images/portfolio/kvartira-komfort-kukhnya-do.svg",
				afterSrc: "/images/portfolio/kvartira-komfort-kukhnya-posle.svg",
			},
			{
				title: "Санузел",
				beforeSrc: "/images/portfolio/kvartira-komfort-sanuzel-do.svg",
				afterSrc: "/images/portfolio/kvartira-komfort-sanuzel-posle.svg",
			},
		],
	},
	{
		slug: "dom-premium-gostinaya",
		title: "Частный дом, ремонт по дизайн-проекту",
		objectType: "Дом",
		level: "Премиум",
		area: "180 м²",
		term: "16 недель",
		budgetRange: "{{BUDGET_RANGE_2}}",
		description:
			"Ремонт двухэтажного дома по индивидуальному дизайн-проекту с авторским надзором. Многоуровневые потолки в гостиной, инженерия «умного дома», премиальные материалы и мебель под ключ.",
		rooms: [
			{
				title: "Гостиная",
				beforeSrc: "/images/portfolio/dom-premium-gostinaya-do.svg",
				afterSrc: "/images/portfolio/dom-premium-gostinaya-posle.svg",
			},
			{
				title: "Спальня",
				beforeSrc: "/images/portfolio/dom-premium-spalnya-do.svg",
				afterSrc: "/images/portfolio/dom-premium-spalnya-posle.svg",
			},
		],
	},
	{
		slug: "kvartira-byudzhet-vannaya",
		title: "Однокомнатная квартира, косметический ремонт",
		objectType: "Квартира",
		level: "Бюджетный",
		area: "31 м²",
		term: "3 недели",
		budgetRange: "{{BUDGET_RANGE_3}}",
		description:
			"Освежили квартиру без затяжного ремонта: выровняли и покрасили стены, заменили напольное покрытие, обновили сантехнику в санузле и привели в порядок электрику без штробления стен.",
		rooms: [
			{
				title: "Ванная",
				beforeSrc: "/images/portfolio/kvartira-byudzhet-vannaya-do.svg",
				afterSrc: "/images/portfolio/kvartira-byudzhet-vannaya-posle.svg",
			},
			{
				title: "Прихожая",
				beforeSrc: "/images/portfolio/kvartira-byudzhet-prihozhaya-do.svg",
				afterSrc: "/images/portfolio/kvartira-byudzhet-prihozhaya-posle.svg",
			},
		],
	},
];

export function getProjectBySlug(slug: string): Project | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}
