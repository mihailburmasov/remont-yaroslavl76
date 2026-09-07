/**
 * Переиспользуемый лайтбокс с поддержкой галерей.
 * Открывается кликом по [data-lightbox-trigger], закрывается по Esc,
 * клику на фон или кнопку закрытия. Фокус возвращается на элемент-триггер.
 *
 * Триггеры с одинаковым data-lightbox-gallery объединяются в одну галерею —
 * между её фото можно переключаться стрелками (клавиатура и кнопки).
 * Триггер без data-lightbox-gallery показывает одно фото без стрелок.
 */

interface GalleryItem {
	src: string;
	caption: string;
}

let overlay: HTMLDivElement | null = null;
let imageEl: HTMLImageElement | null = null;
let captionEl: HTMLParagraphElement | null = null;
let counterEl: HTMLParagraphElement | null = null;
let closeButton: HTMLButtonElement | null = null;
let prevButton: HTMLButtonElement | null = null;
let nextButton: HTMLButtonElement | null = null;
let lastTrigger: HTMLElement | null = null;

let currentGallery: GalleryItem[] = [];
let currentIndex = 0;

function buildOverlay(): void {
	overlay = document.createElement("div");
	overlay.className =
		"fixed inset-0 z-[100] hidden items-center justify-center bg-ink/90 p-4 md:p-10";
	overlay.setAttribute("role", "dialog");
	overlay.setAttribute("aria-modal", "true");
	overlay.setAttribute("aria-label", "Просмотр фото");

	const figure = document.createElement("figure");
	figure.className = "relative max-h-full max-w-4xl";

	imageEl = document.createElement("img");
	imageEl.className = "max-h-[80vh] w-full rounded-lg object-contain";
	figure.appendChild(imageEl);

	const captionRow = document.createElement("div");
	captionRow.className = "mt-3 flex items-center justify-center gap-3 text-center text-sm text-white/70";

	captionEl = document.createElement("p");
	captionRow.appendChild(captionEl);

	counterEl = document.createElement("p");
	counterEl.className = "text-white/40";
	captionRow.appendChild(counterEl);

	figure.appendChild(captionRow);

	closeButton = document.createElement("button");
	closeButton.type = "button";
	closeButton.setAttribute("aria-label", "Закрыть просмотр");
	closeButton.className =
		"absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-ink shadow-lg";
	closeButton.innerHTML =
		'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 6l12 12M18 6L6 18"/></svg>';
	closeButton.addEventListener("click", close);
	figure.appendChild(closeButton);

	prevButton = document.createElement("button");
	prevButton.type = "button";
	prevButton.setAttribute("aria-label", "Предыдущее фото");
	prevButton.className =
		"absolute top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-colors hover:bg-black/80 md:-left-14";
	prevButton.innerHTML =
		'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 6l-6 6 6 6"/></svg>';
	prevButton.addEventListener("click", (event) => {
		event.stopPropagation();
		show(currentIndex - 1);
	});
	figure.appendChild(prevButton);

	nextButton = document.createElement("button");
	nextButton.type = "button";
	nextButton.setAttribute("aria-label", "Следующее фото");
	nextButton.className =
		"absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-colors hover:bg-black/80 md:-right-14";
	nextButton.innerHTML =
		'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>';
	nextButton.addEventListener("click", (event) => {
		event.stopPropagation();
		show(currentIndex + 1);
	});
	figure.appendChild(nextButton);

	overlay.appendChild(figure);
	overlay.addEventListener("click", (event) => {
		if (event.target === overlay) close();
	});

	document.body.appendChild(overlay);
}

function show(index: number): void {
	if (!imageEl || !captionEl || !counterEl || !prevButton || !nextButton) return;
	const total = currentGallery.length;
	if (total === 0) return;

	currentIndex = ((index % total) + total) % total;
	const item = currentGallery[currentIndex];
	imageEl.src = item.src;
	imageEl.alt = item.caption;
	captionEl.textContent = item.caption;

	const hasMultiple = total > 1;
	counterEl.textContent = hasMultiple ? `${currentIndex + 1} / ${total}` : "";
	prevButton.hidden = !hasMultiple;
	nextButton.hidden = !hasMultiple;
}

function open(gallery: GalleryItem[], index: number, trigger: HTMLElement): void {
	if (!overlay) buildOverlay();
	if (!overlay) return;

	lastTrigger = trigger;
	currentGallery = gallery;
	show(index);

	overlay.classList.remove("hidden");
	overlay.classList.add("flex");
	document.body.style.overflow = "hidden";
	document.addEventListener("keydown", onKeydown);
	closeButton?.focus();
}

function close(): void {
	if (!overlay) return;
	overlay.classList.add("hidden");
	overlay.classList.remove("flex");
	document.body.style.overflow = "";
	document.removeEventListener("keydown", onKeydown);
	lastTrigger?.focus();
}

function onKeydown(event: KeyboardEvent): void {
	if (event.key === "Escape") close();
	else if (event.key === "ArrowLeft") show(currentIndex - 1);
	else if (event.key === "ArrowRight") show(currentIndex + 1);
}

function initAll(): void {
	const galleries = new Map<string, GalleryItem[]>();

	document.querySelectorAll<HTMLElement>("[data-lightbox-trigger]").forEach((trigger, i) => {
		const src = trigger.dataset.lightboxSrc ?? "";
		if (!src) return;

		const galleryId = trigger.dataset.lightboxGallery ?? `__single-${i}`;
		const caption = trigger.dataset.lightboxCaption ?? "";

		if (!galleries.has(galleryId)) galleries.set(galleryId, []);
		const gallery = galleries.get(galleryId)!;
		gallery.push({ src, caption });
		const indexInGallery = gallery.length - 1;

		trigger.addEventListener("click", () => {
			open(galleries.get(galleryId)!, indexInGallery, trigger);
		});
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initAll);
} else {
	initAll();
}

export {};
