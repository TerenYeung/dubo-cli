import json from './locales.json';

export default Object.entries(json).map(item => {
  return {
    type: item[0],
    file: item[1]
  }
});