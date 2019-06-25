if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = '/activity/ts-react-scss' + '/sw.js?v=' + Date.now();
    navigator.serviceWorker.register(swUrl, {
    })
      .then(registration => {
        console.log('sw reg');
      }, err => {
        console.log('sw err: ', err);
      })
  })
}