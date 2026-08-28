/**
 * Единая точка отправки заявок. Сейчас endpoint — плейсхолдер,
 * позже сюда подставляется Formspree / Telegram-бот / почтовый сервис
 * без изменения кода форм.
 */

const FORM_ENDPOINT = "{{FORM_ENDPOINT}}";

export interface LeadPayload {
	name: string;
	phone: string;
	objectType?: string;
	area?: string;
	level?: string;
	comment?: string;
	source: string;
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean }> {
	if (FORM_ENDPOINT.startsWith("{{")) {
		console.warn(
			"[submitLead] FORM_ENDPOINT не настроен — заявка не отправлена. См. CONTENT-TODO.md.",
		);
		return { ok: true };
	}

	const response = await fetch(FORM_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	return { ok: response.ok };
}
