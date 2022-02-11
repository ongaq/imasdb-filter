import { AutoInputType } from 'types/stores/views/components/ProgramFilter';
import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
export const getHTML = (state: AutoInputType): Promise<Document|false> => {
  return new Promise(async(resolve) => {
    if (state.error) {
      return resolve(false);
    } else if (state.html !== '') {
      return resolve(state.html);
    }

    // const url = 'https://imas-db.jp/misc/cv.html';
    const url = 'http://localhost:5500/test.html';
    const response = await fetch(url);
    if (response.status !== 200) {
      state.setError(true);
      return resolve(false);
    }

    const text = await response.text();
    if (!text) {
      state.setError(true);
      return resolve(false);
    }

    const newHTML = new DOMParser().parseFromString(text, 'text/html');
    if (state.html === '') {
      state.setHtml(newHTML);
    }
    return resolve(newHTML);
  });
};