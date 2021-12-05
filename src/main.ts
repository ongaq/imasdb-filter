type VoiceActors = {
  voiceActors?: string[]
};

(async() => {
  const isProgram = /^\/bangumi\/(scheduled)?$/.test(location.pathname);
  const body = document.querySelector<HTMLDivElement>('body > .container-fluid') || 
    document.querySelector<HTMLDivElement>('body > .maruamyu-body');

  if (!isProgram || body === null) return;

  body.style.visibility = 'hidden';
  const programList = document.querySelectorAll<HTMLTableRowElement>('.timetable.ipgOnAirList tr') || 
    document.querySelectorAll<HTMLTableRowElement>('.list.imas-ipg-onAirList.ipgOnAirList tr');
  const getVoiceActorsFromStorage = async(): Promise<VoiceActors> => 
    new Promise((resolve) => 
      chrome.storage.local.get('voiceActors', (res) => resolve(res)));
  const { voiceActors } = await getVoiceActorsFromStorage();

  if (typeof voiceActors === 'undefined' || !voiceActors.length) {
    body.style.removeProperty('visibility');
    return;
  }

  for (const tr of programList) {
    tr.style.display = 'none';
    const text = [...tr.querySelectorAll<HTMLTableCellElement>('td')]
      .reduce((temp, td) => temp += td.innerText.replace(/[\s\n]/g, ''), '');

    for (const name of voiceActors) {
      if (text.indexOf(name) !== -1) {
        tr.style.display = 'table-row';
        break;
      }
    }
  }
  body.style.removeProperty('visibility');
})();