import { isProgramPage } from './utils/util';

(() => {
  const hiddenStyle ='body>.container-fluid,body>.maruamyu-body{visibility:hidden;}';

  if (isProgramPage) {
    const html = document.querySelector('html');
    const style = document.createElement('style');
    style.id = 'extention-imasdb-filter';
    style.innerText = hiddenStyle;

    if (html !== null) {
      html.appendChild(style);
    }
  }
})();