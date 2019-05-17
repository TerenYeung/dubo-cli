import gt, {_} from 'utils/gettext';
import locales from 'locales';

function setRootFontSizeFromClient() {
  let dpr, rem;
  const htmlEl = document.getElementsByTagName("html")[0],
    docEl = document.documentElement,
    metaEl = document.querySelector('meta[name="viewport"]');

  dpr = window.devicePixelRatio || 1;
  rem = docEl.clientWidth;
  metaEl.setAttribute(
    "content",
    `width=${docEl.clientWidth},initial-scale=${1},maximum-scale=${1}, minimum-scale=${1},use-scalable=no`
  );

  docEl.setAttribute("data-dpr", dpr);
  htmlEl.style.fontSize = `${rem}px`;

  window.dpr = dpr;
  window.rem = rem;
  window.r = function(value) {
    value = Number(value);
    // @ts-ignore
    return `${(value/process.env.designWidth)}rem`;
  }

  window.onresize = function() {
    htmlEl.style.fontSize = `${document.documentElement.clientWidth}px`;
  }
}

function initI18n(lang) {
  gt.init(locales);
}

export default {
  setRootFontSizeFromClient,
  initI18n,
};
