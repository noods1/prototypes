export function i18nCapitalize(text: string, locale = 'en-US') {
  if (!text) {
    return text;
  }
  // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
  return text[0].toLocaleUpperCase(locale) + text.substring(1);
}
