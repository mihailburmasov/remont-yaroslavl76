/**
 * Фильтрация карточек портфолио по типу объекта и уровню ремонта.
 * Кнопки фильтра — [data-filter-group] с [data-filter-value] (или "all"),
 * карточки — [data-project-card] с data-object-type / data-level.
 */

interface FilterState {
	objectType: string;
	level: string;
}

function applyFilters(state: FilterState, cards: NodeListOf<HTMLElement>): void {
	let visibleCount = 0;

	cards.forEach((card) => {
		const matchesType = state.objectType === "all" || card.dataset.objectType === state.objectType;
		const matchesLevel = state.level === "all" || card.dataset.level === state.level;
		const isVisible = matchesType && matchesLevel;
		card.hidden = !isVisible;
		if (isVisible) visibleCount += 1;
	});

	const emptyState = document.querySelector<HTMLElement>("[data-portfolio-empty]");
	if (emptyState) emptyState.hidden = visibleCount !== 0;
}

function initPortfolioFilter(): void {
	const grid = document.querySelector<HTMLElement>("[data-portfolio-grid]");
	if (!grid) return;

	const cards = grid.querySelectorAll<HTMLElement>("[data-project-card]");
	const state: FilterState = { objectType: "all", level: "all" };

	document.querySelectorAll<HTMLElement>("[data-filter-group]").forEach((group) => {
		const groupName = group.dataset.filterGroup as "objectType" | "level";
		const buttons = group.querySelectorAll<HTMLButtonElement>("[data-filter-value]");

		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				state[groupName] = button.dataset.filterValue ?? "all";

				buttons.forEach((b) => {
					const active = b === button;
					b.setAttribute("aria-pressed", String(active));
					b.classList.toggle("btn-dark", active);
					b.classList.toggle("bg-transparent", !active);
				});

				applyFilters(state, cards);
			});
		});
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initPortfolioFilter);
} else {
	initPortfolioFilter();
}

export {};
