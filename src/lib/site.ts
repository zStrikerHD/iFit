/**
 * Dados de contato centralizados — substitua pelos dados reais da academia.
 */
const WHATSAPP_NUMBER = "5511999990000";
const WHATSAPP_MESSAGE = "Olá! Quero agendar uma aula experimental na iFIT.";

/** Link do WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SITE = {
  name: "iFIT",
  phoneLabel: "(11) 99999-0000",
  phoneHref: `tel:+${WHATSAPP_NUMBER}`,
  email: "contato@ifit.com.br",
  address: "Rua Exemplo, 123 — São Paulo, SP",
  hours: "Seg–Sex 5h–23h · Sáb 8h–14h",
  whatsappHref: whatsappLink(WHATSAPP_MESSAGE),
} as const;
