import type { CommonFooterLinksColumn } from "../types/common-footer-links";

export const commonFooterLinks: CommonFooterLinksColumn[] = [
  {
    title: "Социльные сети",
    items: [
      {
        title: "ВКонтакте",
        href: "https://vk.com",
      },
      {
        title: "Telegram",
        href: "https://telegram.org",
      },
      {
        title: "YouTube",
        href: "https://www.youtube.com",
      },
    ],
  },
  {
    title: "Документы",
    items: [
      {
        title: "Согласие на обработку ПД",
        to: "/documents/pd-processing-consent",
      },
      {
        title: "Политика обработки ПД",
        to: "/documents/pd-processing-policy",
      },
      {
        title: "Пользовательское соглашение",
        to: "/documents/user-agreement",
      },
    ],
  },
];
