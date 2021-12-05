(() => {
  const hiddenStyle ='body>.container-fluid,body>.maruamyu-body{visibility:hidden;}';
  const isProgram = /^\/bangumi\/(scheduled)?$/.test(location.pathname);

  if (isProgram) {
    const html = document.querySelector('html');
    const style = document.createElement('style');
    style.id = 'extention-imasdb-filter';
    style.innerText = hiddenStyle;

    if (html !== null) {
      html.appendChild(style);
    }
  }
})();