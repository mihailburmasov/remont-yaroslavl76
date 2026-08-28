/**
 * Переиспользуемый модуль слайдера «до/после».
 * Работает мышью, тачем (через Pointer Events) и клавиатурой.
 * Инициализирует все элементы [data-before-after] на странице.
 */

const STEP = 5;

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

function initSlider(root: HTMLElement): void {
	const frameEl = root.querySelector<HTMLElement>("[data-baf-frame]");
	const clipEl = root.querySelector<HTMLElement>("[data-baf-clip]");
	const handleEl = root.querySelector<HTMLElement>("[data-baf-handle]");

	if (!frameEl || !clipEl || !handleEl) return;

	const frame: HTMLElement = frameEl;
	const clip: HTMLElement = clipEl;
	const handle: HTMLElement = handleEl;

	let position = Number(root.dataset.bafInitial ?? 50);
	let dragging = false;

	function setPosition(next: number): void {
		position = clamp(next, 0, 100);
		clip.style.width = `${position}%`;
		handle.style.left = `${position}%`;
		handle.setAttribute("aria-valuenow", String(Math.round(position)));
	}

	function positionFromClientX(clientX: number): number {
		const rect = frame.getBoundingClientRect();
		return ((clientX - rect.left) / rect.width) * 100;
	}

	function onPointerMove(event: PointerEvent): void {
		if (!dragging) return;
		setPosition(positionFromClientX(event.clientX));
	}

	function stopDragging(): void {
		dragging = false;
		document.body.style.userSelect = "";
		window.removeEventListener("pointermove", onPointerMove);
		window.removeEventListener("pointerup", stopDragging);
		document.removeEventListener("selectstart", preventSelectionWhileDragging);
	}

	function preventSelectionWhileDragging(event: Event): void {
		if (dragging) event.preventDefault();
	}

	function startDragging(event: PointerEvent): void {
		event.preventDefault();
		dragging = true;
		document.body.style.userSelect = "none";
		setPosition(positionFromClientX(event.clientX));
		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", stopDragging);
		document.addEventListener("selectstart", preventSelectionWhileDragging);
	}

	frame.addEventListener("pointerdown", (event) => {
		startDragging(event);
	});

	handle.addEventListener("keydown", (event) => {
		switch (event.key) {
			case "ArrowLeft":
			case "ArrowDown":
				event.preventDefault();
				setPosition(position - STEP);
				break;
			case "ArrowRight":
			case "ArrowUp":
				event.preventDefault();
				setPosition(position + STEP);
				break;
			case "Home":
				event.preventDefault();
				setPosition(0);
				break;
			case "End":
				event.preventDefault();
				setPosition(100);
				break;
		}
	});

	setPosition(position);
}

function initAll(): void {
	document.querySelectorAll<HTMLElement>("[data-before-after]").forEach(initSlider);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initAll);
} else {
	initAll();
}

export {};
