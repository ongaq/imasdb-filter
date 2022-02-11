import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Error, Html, IsLoading, TextareaData, AutoInputType, SaveActorsCount, ProgramFilterReducer } from 'types/stores/views/components/ProgramFilter.d';
import { CvListType } from 'types/views/components/programFilter/AutoInput.d';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const useStates = (): AutoInputType => {
  const {
    error,
    html,
    isLoading,
    textareaData,
    actorsCount
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
  const setActorsCount = (actorsCount: SaveActorsCount) => 
    dispatch({ type: 'SET_ACTORS_COUNT', actorsCount });

  return {
    error,
    html,
    isLoading,
    textareaData,
    actorsCount,
    setError,
    setHtml,
    setLoading,
    setTextareaData,
    setActorsCount
  }
};

const getCvList = (state: AutoInputType, { element, brandName }: CvListType): string[] => {
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
const getHTML = (state: AutoInputType): Promise<Document|false> => {
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
const setVoiceActorNamesToTextArea = async(state: AutoInputType, e: React.SyntheticEvent<HTMLButtonElement>) => {
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
  const brandName = e.target.dataset['brand'] ?? '';
  const voiceActors = getCvList(state, { element, brandName });
  const deduplication = Array.from(new Set([...state.textareaData, ...voiceActors]));
  const totalCount = deduplication.length;

  state.setTextareaData(deduplication);
  state.setActorsCount(totalCount);
  state.setLoading(false);
};

const buttons = [
  { title: '765PRO ALLSTARS', key: '765as' },
  { title: 'シンデレラガールズ', key: 'cinderella' },
  { title: 'ミリオンライブ！', key: 'million' },
  { title: 'SideM', key: 'sidem' },
  { title: 'シャイニーカラーズ', key: 'shinycolors' },
  { title: 'ゼノグラシア', key: 'xenoglossia' },
  { title: 'ディアリースターズ', key: 'dearlystars' },
];
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          my: 1
        }
      }}>
        <ButtonGroup size="small" variant="outlined">
          {buttons.map((button) => (
            <Button 
              key={button.key} 
              variant="outlined" 
              onClick={(e) => setVoiceActorNamesToTextArea(state, e)} 
              className={buttonClass} 
              data-brand={button.key}
            >{button.title}</Button>
          ))}
        </ButtonGroup>
      </Box>
      {state.error && <p id="error" className="filter-input-error">サーバーエラーのため入力出来ませんでした。</p>}
    </section>
  )
};

export default AutoInput;