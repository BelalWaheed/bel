import { useAppSelector } from "@/redux/Store";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

type TranslationKeys = typeof en;

const translations = { ar, en };

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}` | K
          : K
        : never;
    }[keyof T]
  : never;

export function useTranslation() {
  const { language } = useAppSelector((state) => state.language);
  const t = translations[language] as TranslationKeys;
  const isRTL = language === "ar";

  const translate = (key: string): string => {
    const keys = key.split(".");
    let result: unknown = t;

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof result === "string" ? result : key;
  };

  return {
    t: translate,
    language,
    isRTL,
    dir: isRTL ? "rtl" : "ltr",
  };
}

export type { NestedKeyOf, TranslationKeys };
