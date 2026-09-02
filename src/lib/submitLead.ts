/**
 * Единая точка отправки заявок. Используем FormSubmit.co (без бэкенда и регистрации) —
 * форма пересылается на почту заказчика. При первой реальной заявке FormSubmit присылает
 * на эту почту письмо с подтверждением — его нужно один раз открыть и подтвердить,
 * иначе письма с заявками не будут приходить.
 */

import { CONTACTS } from "./site";

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACTS.email}`;

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
	const response = await fetch(FORM_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			...payload,
			_subject: `Новая заявка с сайта ПроРемонт — ${payload.source}`,
		}),
	});

	return { ok: response.ok };
}
