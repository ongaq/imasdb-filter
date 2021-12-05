type CvListType = {
  element: Document,
  brandName: string | ''
};

class CvList {
  html: '' | Document;
  error: null | true;
  constructor() {
    this.html = '';
    this.error = null;
  }
  getCvList({ element, brandName }: CvListType): string[] | [] {
    const brandElement = element.querySelector(`[id="${brandName}"]`);

    if (brandElement === null) {
      this.error = true;
      return [];
    }

    const tr = brandElement.querySelectorAll<HTMLTableRowElement>('.table tr');

    return [...tr].reduce<string[]>((temp, cvs) => {
      const name = cvs.querySelector<HTMLElement>('ruby rb');
    
      if (name === null) {
        return temp;
      }
      const text = name.innerText;
      if (!temp.includes(text)) {
        temp.push(text);
      }
      return temp;
    }, []);
  }
  getHTML(): Promise<Document|false> {
    return new Promise(async(resolve) => {
      if (this.error) {
        return resolve(false);
      } else if (this.html !== '') {
        return resolve(this.html);
      }

      const response = await fetch('https://imas-db.jp/misc/cv.html');
      if (response.status !== 200) {
        this.error = true;
        return resolve(false);
      }

      const text = await response.text();
      if (!text) {
        this.error = true;
        return resolve(false);
      }

      const newHTML = new DOMParser().parseFromString(text, 'text/html');
      if (this.html === '') {
        this.html = newHTML;
      }
      return resolve(newHTML);
    });
  }
}
export default new CvList();