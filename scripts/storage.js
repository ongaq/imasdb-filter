class Storage {
  getName() {
    return new Promise((resolve) => 
      chrome.storage.local.get('voiceActors', (res) => 
        resolve(res)));
  }
  setName(value) {
    return chrome.storage.local.set({ 'voiceActors': value });
  }
}
export default new Storage();