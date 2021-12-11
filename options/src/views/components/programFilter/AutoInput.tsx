import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { UseStates, Error, Html, IsLoading, TextareaData, SaveActorsCount, ProgramFilterReducer } from 'types/stores/views/components/ProgramFilter.d';
import { CvListType } from 'types/views/components/programFilter/AutoInput.d';

const useStates = (): UseStates => {
  const {
    error,
    html,
    isLoading,
    textareaData,
    saveActorsCount
  } = useSelector((state: ProgramFilterReducer) => state.programFilterReducer);
  const dispatch = useDispatch();
  const setError = (error: Error) => 
    dispatch({ type: 'SET_ERROR', error });
  const setHtml = (html: Html) => 
    dispatch({ type: 'SET_HTML', html });
  const setLoading = (isLoading: IsLoading) => 
    dispatch({ type: 'SET_LOADING', isLoading });
  const setTextareaData = (textareaData: TextareaData) => 
    dispatch({ type: 'SET_TEXTAREA', textareaData });
  const setActorsCount = (saveActorsCount: SaveActorsCount) => 
    dispatch({ type: 'SET_ACTORS_COUNT', saveActorsCount });

  return {
    error,
    html,
    isLoading,
    textareaData,
    saveActorsCount,
    setError,
    setHtml,
    setLoading,
    setTextareaData,
    setActorsCount
  }
};

const getCvList = (state: UseStates, { element, brandName }: CvListType): string[] | [] => {
  const brandElement = element.querySelector(`[id="${brandName}"]`);

  if (brandElement === null) {
    state.setError(true);
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
};
const getHTML = (state: UseStates): Promise<Document|false> => {
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
const setVoiceActorNamesToTextArea = async(state: UseStates, e: React.SyntheticEvent<HTMLButtonElement>) => {
  if (!(e.target instanceof HTMLButtonElement)) {
    return;
  }
  state.setLoading(true);
  const element = await getHTML(state);

  if (typeof element === 'undefined' || element === false) {
    state.setError(true);
    state.setLoading(false);
    return;
  }

  const target = e.target;
  const brandName = target.dataset['brand'] ?? '';
  const voiceActors = getCvList(state, { element, brandName });

  console.log('voiceActors:', voiceActors);

  state.setTextareaData(voiceActors.join('\n'));
  // textarea.setName({ voiceActors });
  // state.setActorsCount();
  // countElm.innerText = textarea.countup();
  state.setLoading(false);
};

const AutoInput = () => {
  const state = useStates();
  const buttonClass = classNames({
    'button': true,
    'is-info': true,
    'is-outlined': true,
    'is-loading': state.isLoading,
  });

  return (
    <section className="filter-input">
      <h2 className="filter-input-description">アイマスDBの関連声優一覧から声優名を自動入力する</h2>
      <div className="buttons are-small">
        <button onClick={(e) => setVoiceActorNamesToTextArea(state, e)} className={buttonClass} data-brand="765as">765PRO ALLSTARS</button>
        <button onClick={(e) => setVoiceActorNamesToTextArea(state, e)} className={buttonClass} data-brand="cinderella">シンデレラガールズ</button>
        <button onClick={(e) => setVoiceActorNamesToTextArea(state, e)} className={buttonClass} data-brand="million">ミリオンライブ！</button>
        <button onClick={(e) => setVoiceActorNamesToTextArea(state, e)} className={buttonClass} data-brand="sidem">SideM</button>
        <button onClick={(e) => setVoiceActorNamesToTextArea(state, e)} className={buttonClass} data-brand="shinycolors">シャイニーカラーズ</button>
        <button onClick={(e) => setVoiceActorNamesToTextArea(state, e)} className={buttonClass} data-brand="xenoglossia">ゼノグラシア</button>
        <button onClick={(e) => setVoiceActorNamesToTextArea(state, e)} className={buttonClass} data-brand="dearlystars">ディアリースターズ</button>
      </div>
      <p id="error" className="filter-input-error">{ state.error ? 'サーバーエラーのため入力出来ませんでした。' : '' }</p>
    </section>
  )
};

export default AutoInput;