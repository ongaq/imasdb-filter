'use strict';

(async() => {
  const isProgram = /^\/bangumi\/(scheduled)?$/.test(location.pathname);
  const body = document.querySelector('body > .container-fluid') || document.querySelector('body > .maruamyu-body');

  if (!isProgram || body === null) return;

  body.style.visibility = 'hidden';
  const programList = document.querySelectorAll('.timetable.ipgOnAirList tr') || document.querySelectorAll('.list.imas-ipg-onAirList.ipgOnAirList tr');
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