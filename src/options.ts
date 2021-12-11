import cvList from './options/cvList';
import storage from './options/storage';
import textarea from './options/textarea';

(async() => {
  const saveBtnElm = document.querySelector<HTMLButtonElement>('#save');
  const countElm = document.querySelector<HTMLSpanElement>('#countup');
  const errorElm = document.querySelector<HTMLParagraphElement>('#error');
  const brandListElm = document.querySelector<HTMLDivElement>('[data-brandlist]');
  const brandBtnElms = document.querySelectorAll<HTMLButtonElement>('[data-brand]');

  if (saveBtnElm === null || 
    countElm === null ||
    errorElm === null ||
    brandListElm === null ||
    !brandBtnElms.length) return;

  const voiceActorsName = await storage.getName();
  const setVoiceActorNamesToTextArea = async(e: MouseEvent) => {
    brandListElm.classList.add('is-loading');
    const element = await cvList.getHTML();

    if (element === false) {
      errorElm.innerText = 'サーバーエラーのため入力出来ませんでした。';
      brandListElm.classList.remove('is-loading');
      return;
    }
    if (e.target === null) {
      return;
    }

    const target = <HTMLButtonElement>e.target;
    const brandName = target.dataset['brand'] ?? '';
    const voiceActors = cvList.getCvList({ element, brandName });

    textarea.setName({ voiceActors });
    countElm.innerText = textarea.countup();
    brandListElm.classList.remove('is-loading');
  };


  textarea.setName(voiceActorsName);
  countElm.innerText = textarea.countup();

  for (const el of brandBtnElms) {
    el.addEventListener('click', (e) => 
      setVoiceActorNamesToTextArea(e));
  }

  textarea.elm?.addEventListener('input', (e) => {
    const target = <HTMLInputElement>e.target;
    countElm.innerText = textarea.countup(target.value);
  });

  let timer: number | undefined;
  saveBtnElm.addEventListener('click', () => {
    const savedTextElm = document.querySelector<HTMLParagraphElement>('#savedText');
    const inputVoiceActorsName = textarea.getName();

    if (savedTextElm === null) return;

    savedTextElm.classList.remove('is-active');
    savedTextElm.innerText = '';
    
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      storage.setName(inputVoiceActorsName);
      savedTextElm.innerText = '保存しました。ページをリロードして下さい。';
      savedTextElm.classList.add('is-active');
    }, 300);
  });
})();