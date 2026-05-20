import { Link } from "@tanstack/react-router";

import { Button } from "@/shared/components/ui/button";
import { Heading } from "@/shared/components/ui/heading";
import { Island } from "@/shared/components/ui/island";
import { SPACE } from "@/shared/constants/unicode";

import { useCookieConsentBanner } from "../hooks/use-cookie-consent-banner";

export function CookieConsentBanner() {
  const { hasDecision, handleAccept, handleReject } = useCookieConsentBanner();

  if (hasDecision) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-2 p-4">
      <Island className="bg-neutral-1 shadow-bottom-2 pointer-events-auto mx-auto max-w-4xl sm:flex-row sm:items-end sm:justify-between">
        <div className="flex max-w-3xl flex-col gap-1">
          <Heading variant="h2">Мы используем файлы cookie</Heading>
          <p className="text-neutral-7 text-sm">
            Мы используем файлы cookie, чтобы сайт работал корректно, сохранял
            ваши настройки и помогал нам улучшать сервис. Нажимая «Согласиться»,
            вы даете согласие на обработку файлов cookie. Подробнее об этом
            можно прочитать в{SPACE}
            <Link
              to="/legal/$slug"
              params={{ slug: "cookie-policy" }}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-8 underline underline-offset-2"
            >
              политике использования Cookie
            </Link>
            .
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-64 sm:flex-row sm:justify-end">
          <Button
            className="w-full justify-center sm:w-auto"
            onClick={handleReject}
          >
            Отказаться
          </Button>
          <Button
            variant="accent"
            priority="primary"
            className="w-full justify-center sm:w-auto"
            onClick={handleAccept}
          >
            Согласиться
          </Button>
        </div>
      </Island>
    </div>
  );
}
