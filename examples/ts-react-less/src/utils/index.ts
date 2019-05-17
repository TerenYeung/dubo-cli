import gt, {_} from 'utils/gettext';
import locales from 'locales';

function setRootFontSizeFromClient() {
  let dpr, rem;
  const htmlEl = document.getElementsByTagName("html")[0],
    docEl = document.documentElement,
    metaEl = document.querySelector('meta[name="viewport"]');

  dpr = (window as any).devicePixelRatio || 1;
  rem = docEl.clientWidth;
  metaEl.setAttribute(
    "content",
    `width=${docEl.clientWidth},initial-scale=${1},maximum-scale=${1}, minimum-scale=${1},use-scalable=no`
  );

  docEl.setAttribute("data-dpr", dpr);
  htmlEl.style.fontSize = `${rem}px`;

  (window as any).dpr = dpr;
  (window as any).rem = rem;
  (window as any).r = function(value: number | string): string {
    value = Number(value);
    // @ts-ignore
    return `${(value/process.env.designWidth)}rem`;
  }

  window.onresize = function() {
    htmlEl.style.fontSize = `${document.documentElement.clientWidth}px`;
  }
}

function initI18n(lang: string) {
  gt.init(locales);
}

export default {
  setRootFontSizeFromClient,
  initI18n,
};
