class Textarea {
  elm: HTMLTextAreaElement | null;
  names: [] | string[] | undefined;
  constructor() {
    this.elm = document.querySelector('#voiceActors');
    this.names = [];
  }
  makeArray(value: string): string[] {
    return value.split('\n').filter(Boolean);
  }
  getName(): [] | string[] {
    if (this.elm === null || this.elm.value === '') {
      return [];
    }
    return this.makeArray(this.elm.value);
  }
  setName(data: VoiceActors): void {
    if (typeof data === 'undefined' || this.elm === null || !Object.keys(data).length) {
      return;
    }
    const names = this.names = data.voiceActors || [];

    if (this.elm.value.length) {
      const savedNames = this.makeArray(this.elm.value);
      const newNames = [
        ...names,
        ...savedNames
      ].filter((x, i, self) => self.indexOf(x) === i);

      this.names = newNames;
      this.elm.value = newNames.join('\n');
    } else {
      this.elm.value = names.join('\n');
    }
  }
  countup(value?: string): string {
    if (typeof value !== 'undefined' ) {
      return String(this.makeArray(value).length);
    }
    if (typeof this.names === 'undefined') {
      return '0';
    }
    return String(this.names.length);
  }
}
export default new Textarea();