import Gettext from 'node-gettext';
import {sprintf, vsprintf} from 'sprintf-js';

const gt: Gettext = new Gettext();

(window as any).gt = gt;


type ILangs = Array<{type: string, file: any}>
type IValue = number | string | any[];

const addTranslations = (langs: ILangs) => {
  for (const lang of langs) {
    gt.addTranslations(lang.type, 'messages', lang.file);
  }
}

const setLanguage = (lang = 'zh_CN') => {
  gt.setLocale(lang);
}

export function _(msgid: string, value?: IValue): string {
  const str = gt.gettext(msgid);

  return (
    value
    ? value instanceof Array
        ? vsprintf(str, value)
        : sprintf(str, value)
    : str
  );
}

// 复数翻译
export function _p(msgid: string, msgidPlural: string, count: number): string {
  const str = gt.ngettext(msgid, msgidPlural, count);

  return (
    count > 1
    ? sprintf(str, count)
    : str
  );
}

// 带上下文翻译
export function _c(msgctxt: string, msgid: string, value?: IValue): string {
  const str = gt.pgettext(msgctxt, msgid);

  return (
    value
    ? value instanceof Array
        ? vsprintf(str, value)
        : sprintf(str, value)
    : str
  );
}

export function _cp(msgctx: string, msgid: string, msgidPlural: string, count: number): string {
  const str = gt.npgettext(msgctx, msgid, msgidPlural, count);

  return (
    count > 1
    ? sprintf(str, count)
    : str
  );
}

export default {
  init(langs: ILangs) {
    this.addTranslations(langs);
    this.setLanguage();
  },
  setLanguage,
  addTranslations,
}