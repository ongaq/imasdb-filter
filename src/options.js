import cvList from './scripts/cvList.js';
import storage from './scripts/storage.js';
import textarea from './scripts/textarea.js';

(async() => {
  const saveBtnElm = document.querySelector('#save');
  const countElm = document.querySelector('#countup');
  const errorElm = document.querySelector('#error');
  const brandListElm = document.querySelector('[data-brandlist]');
  const brandBtnElms = document.querySelectorAll('[data-brand]');
  const voiceActorsName = await storage.getName();
  let timer = null;

  textarea.setName(voiceActorsName);
  countElm.innerText = textarea.countup();

  brandBtnElms.forEach((el) => 
    el.addEventListener('click', async(e) => {
      brandListElm.classList.add('is-loading');
      const element = await cvList.getHTML();

      if (element === false) {
        errorElm.innerText = 'サーバーエラーのため入力出来ませんでした。';
        brandListElm.classList.remove('is-loading');
        return;
      }

      const brandName = e.target.dataset.brand;
      const voiceActors = cvList.getCvList({ element, brandName });

      textarea.setName({ voiceActors });
      countElm.innerText = textarea.countup();
      brandListElm.classList.remove('is-loading');
    }));

  textarea.elm.addEventListener('input', (e) => {
    countElm.innerText = textarea.countup(e.target.value);
  });

  saveBtnElm.addEventListener('click', () => {
    const savedTextElm = document.querySelector('#savedText');
    const inputVoiceActorsName = textarea.getName();
    savedTextElm.classList.remove('is-active');
    savedTextElm.innerText = '';
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      storage.setName(inputVoiceActorsName);
      savedTextElm.innerText = '保存しました。ページをリロードして下さい。';
      savedTextElm.classList.add('is-active');
    }, 300);
  });
})();