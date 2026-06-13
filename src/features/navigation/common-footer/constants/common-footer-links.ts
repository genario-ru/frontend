import type { CommonFooterLinksColumn } from "../types/common-footer-links";

export const commonFooterLinks: CommonFooterLinksColumn[] = [
  {
    title: "Контакты",
    items: [
      {
        title: "Telegram",
        href: "https://t.me/genario_ru",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      {
        title: "Почта",
        href: "mailto:support@genario.ru",
        target: "_self",
      },
    ],
  },
];
