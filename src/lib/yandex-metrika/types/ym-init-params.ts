/** Сбор данных электронной коммерции при инициализации счётчика. */
export type YMInitParamsEcommerce = boolean | string | unknown[];

/** Параметры визита при инициализации (в произвольный момент — метод `params`). */
export type YMInitParamsVisitParams = Record<string, unknown> | unknown[];

/**
 * Параметры инициализации счётчика Яндекс.Метрики (`ym(id, 'init', …)`).
 * @see https://yandex.ru/support/metrica/code/counter-initialize.html
 */
export type YMInitParams = Partial<{
  /**
   * Точный показатель отказов.
   * - `true` — включить, событие о неотказе через 15 000 мс;
   * - `false` — не включать;
   * - целое число — включить, событие о неотказе через N мс.
   * @default true
   */
  accurateTrackBounce: boolean | number;

  /**
   * Запись содержимого iframe без счётчика в дочернем окне.
   * @default false
   */
  childIframe: boolean;

  /**
   * Сбор данных для карты кликов.
   * @default true
   */
  clickmap: boolean;

  /**
   * Отключение автоматической отправки данных при инициализации счётчика.
   * @default false
   */
  defer: boolean;

  /**
   * Сбор данных электронной коммерции.
   * - `true` — через `window.dataLayer`;
   * - `false` — отключить;
   * - строка — имя массива в `window.<objectName>`;
   * - массив — передача данных через указанный JavaScript-массив.
   * @default false
   */
  ecommerce: YMInitParamsEcommerce;

  /**
   * Параметры визита при инициализации счётчика.
   */
  params: YMInitParamsVisitParams;

  /**
   * Параметры посетителей при инициализации счётчика.
   */
  userParams: Record<string, unknown>;

  /**
   * Отслеживание изменений хеша в адресной строке.
   * @default false
   */
  trackHash: boolean;

  /**
   * Отслеживание переходов по внешним ссылкам.
   * @default true
   */
  trackLinks: boolean;

  /** Доверенные домены для записи содержимого дочернего окна iframe (адрес родительского окна). */
  trustedDomains: string[];

  /**
   * Тип счётчика. Для РСЯ равен 1.
   * @default 0
   */
  type: number;

  /**
   * Использование Вебвизора.
   * @default false
   */
  webvisor: boolean;

  /**
   * Проверка готовности счётчика.
   * @default false
   */
  triggerEvent: boolean;

  /**
   * Запись заголовков страниц. Укажите `false`, если в заголовках есть приватные данные.
   * @default true
   */
  sendTitle: boolean;

  /**
   * Технический параметр для работы кода вставки (SSR).
   * @default true
   */
  ssr: boolean;
}>;
