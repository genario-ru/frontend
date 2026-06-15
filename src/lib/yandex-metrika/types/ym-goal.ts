// Идентификаторы целей Яндекс.Метрики. Список ограничен: в reachGoal можно
// передать только значение из этого union — это даёт автоподсказку и защиту
// от опечаток. При заведении новой цели в Метрике добавляйте её сюда.
export type YMGoal =
  // Лендинг и аутентификация
  | "sign-in-success"
  | "sign-in-button-click"
  | "login-link-click"
  | "tariff-card-primary-button-click"
  | "tariff-card-secondary-button-click"
  | "trial-tariff-anchor-link-click"
  | "landing-header-menu-link-click"
  | "tg-community-link-click"
  | "support-email-link-click"
  | "legal-document-click"
  // Активация
  | "profile-create-success"
  | "profile-import-start"
  | "ideas-list-generation-start"
  | "ideas-list-more-ideas-request"
  | "idea-save"
  | "ideas-list-export-request"
  | "scenario-generation-start"
  | "scenario-save"
  | "scenario-export-request"
  | "scenario-metadata-generation-start"
  | "scenario-metadata-regenerate"
  | "scene-preview-generation-start"
  // Монетизация
  | "trial-payment-start"
  | "subscription-payment-start"
  | "credits-package-payment-start"
  | "payment-method-add"
  | "subscription-upgrade"
  | "subscription-cancel"
  // Прочее
  | "onboarding-hide"
  | "account-delete-success";
