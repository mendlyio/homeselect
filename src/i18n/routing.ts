import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "de", "nl", "es"],
  defaultLocale: "fr",
  localeDetection: false,
});
