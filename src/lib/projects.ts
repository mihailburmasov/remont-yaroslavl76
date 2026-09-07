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

export function getProjectCover(project: Project): { src: string; alt: string } {
	const room = project.rooms[0];
	if (room) {
		return { src: room.afterSrc, alt: `${project.title} — ${room.title}, после ремонта` };
	}
	const photo = project.extraPhotos?.[0];
	if (photo) {
		return { src: photo.src, alt: `${project.title} — ${photo.title}, после ремонта` };
	}
	throw new Error(`Project "${project.slug}" has no photos`);
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
		slug: "bolshaya-oktyabrskaya",
		title: "Двухкомнатная квартира на Большой Октябрьской",
		objectType: "Квартира",
		level: "Дизайнерский",
		area: "54 м²",
		term: "9 недель",
		budgetRange: "1 100 000 – 1 450 000 ₽",
		description:
			"Ремонт двухкомнатной квартиры по адресу ул. Большая Октябрьская, 108: натяжные потолки с трековым светом, дизайнерские обои с акцентными стенами, керамогранит под мрамор в санузле. Фото «до» по этому объекту не сохранилось — только результат.",
		rooms: [],
		extraPhotos: [
			{ title: "Санузел", src: "/images/portfolio/bolshaya-oktyabrskaya-sanuzel-posle.webp" },
			{ title: "Спальня", src: "/images/portfolio/bolshaya-oktyabrskaya-spalnya-posle.webp" },
			{ title: "Гостиная", src: "/images/portfolio/bolshaya-oktyabrskaya-gostinaya-1-posle.webp" },
			{ title: "Гостиная", src: "/images/portfolio/bolshaya-oktyabrskaya-gostinaya-2-posle.webp" },
			{ title: "Кухня-гостиная", src: "/images/portfolio/bolshaya-oktyabrskaya-kukhnya-gostinaya-posle.webp" },
		],
	},
	{
		slug: "prospekt-lenina",
		title: "Проспект Ленина. Ремонт в старом жилом фонде",
		objectType: "Квартира",
		level: "Дизайнерский",
		area: "72 м²",
		term: "18 недель",
		budgetRange: "2 300 000 – 2 900 000 ₽",
		description:
			"Ремонт квартиры в доме старого жилого фонда на проспекте Ленина: сохранили высокие потолки, добавили трековый свет и филёнчатые панели на стенах, кухню и гостиную объединили в единое пространство, оборудовали отдельный кабинет. Фото «до» по этому объекту не сохранилось — только результат.",
		rooms: [],
		extraPhotos: [
			{ title: "Гостиная", src: "/images/portfolio/prospekt-lenina-gostinaya-1-posle.webp" },
			{ title: "Гостиная", src: "/images/portfolio/prospekt-lenina-gostinaya-2-posle.webp" },
			{ title: "Кухня", src: "/images/portfolio/prospekt-lenina-kukhnya-1-posle.webp" },
			{ title: "Кухня", src: "/images/portfolio/prospekt-lenina-kukhnya-2-posle.webp" },
			{ title: "Кухня", src: "/images/portfolio/prospekt-lenina-kukhnya-3-posle.webp" },
			{ title: "Санузел", src: "/images/portfolio/prospekt-lenina-sanuzel-1-posle.webp" },
			{ title: "Санузел", src: "/images/portfolio/prospekt-lenina-sanuzel-2-posle.webp" },
			{ title: "Кабинет", src: "/images/portfolio/prospekt-lenina-kabinet-1-posle.webp" },
			{ title: "Кабинет", src: "/images/portfolio/prospekt-lenina-kabinet-2-posle.webp" },
		],
	},
	{
		slug: "dom-sarafonovo",
		title: "Частный дом в Сарафоново, ремонт под ключ",
		objectType: "Дом",
		level: "Косметический",
		area: "116 м²",
		term: "11 недель",
		budgetRange: "1 200 000 – 1 550 000 ₽",
		description:
			"Ремонт дома под ключ в Сарафоново: кухня с мраморной столешницей и барной стойкой, гостиная-столовая, две спальни и два санузла. Фото «до» по этому объекту не сохранилось — только результат.",
		rooms: [],
		extraPhotos: [
			{ title: "Кухня", src: "/images/portfolio/dom-sarafonovo-kukhnya-1-posle.webp" },
			{ title: "Кухня", src: "/images/portfolio/dom-sarafonovo-kukhnya-2-posle.webp" },
			{ title: "Прихожая", src: "/images/portfolio/dom-sarafonovo-prihozhaya-posle.webp" },
			{ title: "Гостиная", src: "/images/portfolio/dom-sarafonovo-gostinaya-1-posle.webp" },
			{ title: "Гостиная", src: "/images/portfolio/dom-sarafonovo-gostinaya-2-posle.webp" },
			{ title: "Спальня", src: "/images/portfolio/dom-sarafonovo-spalnya-1-posle.webp" },
			{ title: "Спальня", src: "/images/portfolio/dom-sarafonovo-spalnya-2-posle.webp" },
			{ title: "Санузел", src: "/images/portfolio/dom-sarafonovo-sanuzel-1-posle.webp" },
			{ title: "Санузел", src: "/images/portfolio/dom-sarafonovo-sanuzel-2-posle.webp" },
		],
	},
];

export function getProjectBySlug(slug: string): Project | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}
