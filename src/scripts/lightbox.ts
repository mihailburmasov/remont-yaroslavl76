/**
 * Простой переиспользуемый лайтбокс.
 * Открывается кликом по [data-lightbox-trigger], закрывается по Esc,
 * клику на фон или кнопку закрытия. Фокус возвращается на элемент-триггер.
 */

let overlay: HTMLDivElement | null = null;
let imageEl: HTMLImageElement | null = null;
let captionEl: HTMLParagraphElement | null = null;
let closeButton: HTMLButtonElement | null = null;
let lastTrigger: HTMLElement | null = null;

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

	captionEl = document.createElement("p");
	captionEl.className = "mt-3 text-center text-sm text-white/70";
	figure.appendChild(captionEl);

	closeButton = document.createElement("button");
	closeButton.type = "button";
	closeButton.setAttribute("aria-label", "Закрыть просмотр");
	closeButton.className =
		"absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-ink shadow-lg";
	closeButton.innerHTML =
		'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 6l12 12M18 6L6 18"/></svg>';
	closeButton.addEventListener("click", close);
	figure.appendChild(closeButton);

	overlay.appendChild(figure);
	overlay.addEventListener("click", (event) => {
		if (event.target === overlay) close();
	});

	document.body.appendChild(overlay);
}

function open(src: string, caption: string, trigger: HTMLElement): void {
	if (!overlay) buildOverlay();
	if (!overlay || !imageEl || !captionEl) return;

	lastTrigger = trigger;
	imageEl.src = src;
	imageEl.alt = caption;
	captionEl.textContent = caption;

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
}

function initAll(): void {
	document.querySelectorAll<HTMLElement>("[data-lightbox-trigger]").forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const src = trigger.dataset.lightboxSrc ?? "";
			const caption = trigger.dataset.lightboxCaption ?? "";
			if (src) open(src, caption, trigger);
		});
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initAll);
} else {
	initAll();
}

export {};
