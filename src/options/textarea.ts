class Textarea {
  constructor() {
    this.elm = document.querySelector('#voiceActors');
    this.names = [];
  }
  makeArray(value) {
    return value.split('\n').filter(Boolean);
  }
  getName() {
    if (this.elm === null || this.elm.value === '') {
      return [];
    }
    return this.makeArray(this.elm.value);
  }
  setName(data) {
    if (this.elm === null || !Object.keys(data).length) {
      return;
    }
    const names = this.names = data.voiceActors;

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
  countup(value) {
    if (typeof value !== 'undefined') {
      return this.makeArray(value).length;
    }
    return this.names.length;
  }
}
export default new Textarea();