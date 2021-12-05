type VoiceActors = {
  voiceActors?: string[]
};

(async() => {
  const removeStyle = () => document.querySelector('#extention-imasdb-filter')?.remove();
  const isProgram = /^\/bangumi\/(scheduled)?$/.test(location.pathname);
  const body = document.querySelector<HTMLDivElement>('body > .container-fluid') || 
    document.querySelector<HTMLDivElement>('body > .maruamyu-body');

  if (!isProgram || body === null) {
    removeStyle();
    return;
  }

  const programList = document.querySelectorAll<HTMLTableRowElement>('.timetable.ipgOnAirList tr') || 
    document.querySelectorAll<HTMLTableRowElement>('.list.imas-ipg-onAirList.ipgOnAirList tr');
  const getVoiceActorsFromStorage = async(): Promise<VoiceActors> => 
    new Promise((resolve) => 
      chrome.storage.local.get('voiceActors', (res) => resolve(res)));
  const { voiceActors } = await getVoiceActorsFromStorage();

  if (typeof voiceActors === 'undefined' || !voiceActors.length) {
    removeStyle();
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
  removeStyle();
})();