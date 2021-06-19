'use strict';

(async() => {
  const body = document.querySelector('body > .maruamyu-body');
  const programList = document.querySelectorAll('.list.imas-ipg-onAirList.ipgOnAirList tr');
	const getVoiceActorsFromStorage = async () => 
		new Promise((resolve) => 
			chrome.storage.local.get('voiceActors', (res) => 
				resolve(res)));
	const { voiceActors } = await getVoiceActorsFromStorage();

	if (!voiceActors || !voiceActors.length) {
    body.style.visibility = 'visible';
    return;
  }

  programList.forEach((el) => {
    const title = el.title.replace(/[\s\n]/g, '');
    el.style.display = 'none';

    for (let i=0,len=voiceActors.length; i < len; i++) {
      const name = voiceActors[i];
      
      if (title.indexOf(name) !== -1) {
        el.style.display = 'table-row';
        break;
      }
    }
  });
  body.style.visibility = 'visible';
})();