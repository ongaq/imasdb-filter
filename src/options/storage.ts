class Storage {
  getName(): Promise<VoiceActors> {
    return new Promise((resolve) => 
      chrome.storage.local.get('voiceActors', (res) => 
        resolve(res)));
  }
  setName(value: [] | string[]) {
    return chrome.storage.local.set({ 'voiceActors': value });
  }
}
export default new Storage();