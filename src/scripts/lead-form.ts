/**
 * Переиспользуемая логика форм заявки (основная и мини-форма обратного звонка).
 * Инициализирует все формы [data-lead-form]: маска телефона, валидация,
 * honeypot + проверка времени заполнения, состояние загрузки, экран «спасибо».
 */

import { submitLead } from "../lib/submitLead";
import { METRIKA_ID } from "../lib/site";

const MIN_FILL_TIME_MS = 2000;
const PHONE_DIGITS_REQUIRED = 11;

declare global {
	interface Window {
		ym?: (...args: unknown[]) => void;
	}
}

function reachMetrikaGoal(goal: string, params?: Record<string, unknown>): void {
	if (typeof window.ym === "function" && !METRIKA_ID.startsWith("{{")) {
		window.ym(METRIKA_ID, "reachGoal", goal, params);
	}
}

function formatPhoneInput(input: HTMLInputElement): void {
	let digits = input.value.replace(/\D/g, "");

	if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
	if (!digits.startsWith("7")) digits = `7${digits}`;
	digits = digits.slice(0, PHONE_DIGITS_REQUIRED);

	const parts = [
		digits.slice(1, 4),
		digits.slice(4, 7),
		digits.slice(7, 9),
		digits.slice(9, 11),
	];

	let formatted = "+7";
	if (parts[0]) formatted += ` (${parts[0]}`;
	if (parts[0]?.length === 3) formatted += ")";
	if (parts[1]) formatted += ` ${parts[1]}`;
	if (parts[2]) formatted += `-${parts[2]}`;
	if (parts[3]) formatted += `-${parts[3]}`;

	input.value = formatted;
}

function showError(field: HTMLElement, message: string): void {
	const errorEl = field.parentElement?.querySelector<HTMLElement>("[data-field-error]");
	if (errorEl) {
		errorEl.textContent = message;
		errorEl.classList.remove("hidden");
	}
	field.setAttribute("aria-invalid", "true");
}

function clearError(field: HTMLElement): void {
	const errorEl = field.parentElement?.querySelector<HTMLElement>("[data-field-error]");
	if (errorEl) {
		errorEl.textContent = "";
		errorEl.classList.add("hidden");
	}
	field.removeAttribute("aria-invalid");
}

function validateForm(form: HTMLFormElement): boolean {
	let isValid = true;

	const name = form.querySelector<HTMLInputElement>('[name="name"]');
	if (name && !name.hidden) {
		if (name.value.trim().length < 2) {
			showError(name, "Укажите, как к вам обращаться");
			isValid = false;
		} else {
			clearError(name);
		}
	}

	const phone = form.querySelector<HTMLInputElement>('[name="phone"]');
	if (phone) {
		const digits = phone.value.replace(/\D/g, "");
		if (digits.length !== PHONE_DIGITS_REQUIRED) {
			showError(phone, "Введите телефон полностью");
			isValid = false;
		} else {
			clearError(phone);
		}
	}

	const consent = form.querySelector<HTMLInputElement>('[name="consent"]');
	if (consent && !consent.checked) {
		showError(consent, "Нужно согласие на обработку данных");
		isValid = false;
	} else if (consent) {
		clearError(consent);
	}

	return isValid;
}

function isSpam(form: HTMLFormElement): boolean {
	const honeypot = form.querySelector<HTMLInputElement>('[name="website"]');
	if (honeypot && honeypot.value.trim() !== "") return true;

	const loadedAt = Number(form.dataset.loadedAt ?? 0);
	if (Date.now() - loadedAt < MIN_FILL_TIME_MS) return true;

	return false;
}

function initForm(form: HTMLFormElement): void {
	form.dataset.loadedAt = String(Date.now());

	const phoneInput = form.querySelector<HTMLInputElement>('[name="phone"]');
	phoneInput?.addEventListener("input", () => formatPhoneInput(phoneInput));
	phoneInput?.addEventListener("focus", () => {
		if (!phoneInput.value) phoneInput.value = "+7 (";
	});

	const submitButton = form.querySelector<HTMLButtonElement>('[type="submit"]');
	const successView = form.parentElement?.querySelector<HTMLElement>("[data-form-success]");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		if (isSpam(form)) {
			// Тихо «успешно» завершаем для ботов, ничего не отправляя.
			form.reset();
			return;
		}

		if (!validateForm(form)) return;

		const formData = new FormData(form);
		submitButton?.setAttribute("disabled", "true");
		submitButton?.classList.add("opacity-60");
		const originalLabel = submitButton?.textContent;
		if (submitButton) submitButton.textContent = "Отправляем…";

		try {
			const result = await submitLead({
				name: String(formData.get("name") ?? ""),
				phone: String(formData.get("phone") ?? ""),
				objectType: String(formData.get("objectType") ?? ""),
				area: String(formData.get("area") ?? ""),
				level: String(formData.get("level") ?? ""),
				comment: String(formData.get("comment") ?? ""),
				source: form.dataset.formSource ?? "unknown",
			});

			if (result.ok) {
				form.hidden = true;
				successView?.classList.remove("hidden");
				reachMetrikaGoal("lead_form_submit", { source: form.dataset.formSource });
			} else {
				throw new Error("submit failed");
			}
		} catch {
			if (submitButton) submitButton.textContent = originalLabel ?? "Отправить";
			submitButton?.removeAttribute("disabled");
			submitButton?.classList.remove("opacity-60");
			const formError = form.querySelector<HTMLElement>("[data-form-error]");
			if (formError) {
				formError.textContent = "Не получилось отправить заявку. Позвоните нам напрямую.";
				formError.classList.remove("hidden");
			}
		}
	});
}

function initAll(): void {
	document.querySelectorAll<HTMLFormElement>("[data-lead-form]").forEach(initForm);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initAll);
} else {
	initAll();
}
