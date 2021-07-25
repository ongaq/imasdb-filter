'use strict';

(async() => {
  const isProgram = /^\/bangumi\/(scheduled)?$/.test(location.pathname);

  if (!isProgram) return;

  const body = document.querySelector('body > .maruamyu-body');
  body.style.visibility = 'hidden';
  const programList = document.querySelectorAll('.list.imas-ipg-onAirList.ipgOnAirList tr');
  const getVoiceActorsFromStorage = async () => 
    new Promise((resolve) => 
      chrome.storage.local.get('voiceActors', (res) => 
        resolve(res)));
  const { voiceActors } = await getVoiceActorsFromStorage();

  if (!voiceActors || !voiceActors.length) {
    body.style.removeProperty('visibility');
    return;
  }

  programList.forEach((tr) => {
    tr.style.display = 'none';
    const text = [...tr.querySelectorAll('td')]
      .reduce((temp, td) => temp += td.innerText.replace(/[\s\n]/g, ''), '');

    for (let i=0,len=voiceActors.length; i < len; i++) {
      const name = voiceActors[i];
      
      if (text.indexOf(name) !== -1) {
        tr.style.display = 'table-row';
        break;
      }
    }
  });
  body.style.removeProperty('visibility');
})();