class CvList {
  constructor() {
    this.html = '';
    this.error = null;
  }
  getCvList({ element, brandName }) {
    const brandElement = element.querySelector(`[id="${brandName}"]`);
    const tr = brandElement.querySelectorAll('.table tr');

    return [...tr].reduce((temp, cvs) => {
      const name = cvs.querySelector('ruby rb');
    
      if (name === null) {
        return temp;
      }
      if (!temp.includes(name.innerText)) {
        temp.push(name.innerText);
      }
      return temp;
    }, []);
  }
  getHTML() {
    return new Promise(async(resolve) => {
      if (this.error) {
        return resolve(false);
      } 
      else if (this.html !== '') {
        return resolve(this.html);
      }

      const newHTML = await fetch('https://imas-db.jp/misc/cv.html')
        .then((res) => {
          if (res.status !== 200) {
            return false;
          }
          return res.text();
        })
        .then((text) => {
          if (!text) {
            return false;
          }
          return new DOMParser().parseFromString(text, 'text/html');
        })
        .catch(() => false);

      if (newHTML === false) {
        this.error = true;
        return resolve(false);
      } 
      else if (this.html === '') {
        this.html = newHTML;
      }
      return resolve(newHTML);
    });
  }
}
export default new CvList();