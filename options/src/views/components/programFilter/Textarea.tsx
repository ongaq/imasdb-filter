import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { TextareaData, SetTextareaData, SaveActorsCount, SetActorsCount, ProgramFilterReducer } from 'types/stores/views/components/ProgramFilter.d';
import { useDebounce } from 'utils/util';

const getName = (setTextareaData: SetTextareaData) => {
  if (typeof chrome.storage === 'undefined') return;

  chrome.storage.local.get('voiceActors', ({ actors }) => {
    setTextareaData(actors);
  });
};
const changeTextarea = (
    debouncedInputText: string,
    textareaData: TextareaData,
    setTextareaData: SetTextareaData,
    setActorsCount: SetActorsCount
  ) => {
  
  if (debouncedInputText.length) {
    const valArray = debouncedInputText.split('\n').filter(Boolean);
    console.log('valArray:', valArray);

    if (textareaData.length) {
      const newArray = valArray.filter((key) => (textareaData as string[]).indexOf(key) === -1);
      setTextareaData(newArray);
      setActorsCount(newArray.length);
    } else {
      setTextareaData(valArray);
      setActorsCount(valArray.length);
    }
  }
};
const Textarea = () => {
  const { textareaData, isLoading } = useSelector((state: ProgramFilterReducer) => state.programFilterReducer);
  const dispatch = useDispatch();
  const setTextareaData = (textareaData: TextareaData) => dispatch({ type: 'SET_TEXTAREA', textareaData });
  const setActorsCount = (saveActorsCount: SaveActorsCount) => dispatch({ type: 'SET_ACTORS_COUNT', saveActorsCount });
  const buttonClass = classNames({
    'textarea': true,
    'is-loading': isLoading,
  });
  const textarea = textareaData.join('\n');

  const [inputText, setInputText] = useState('');
  const debouncedInputText = useDebounce(inputText, 500);
  const handleChange = (e:any) => setInputText(e.target.value);

  useEffect(() => {
    changeTextarea(debouncedInputText, textareaData, setTextareaData, setActorsCount)
  }, [debouncedInputText]);

  getName(setTextareaData);

  return (
    <textarea 
      onChange={handleChange} 
      defaultValue={textarea} 
      className={buttonClass}
    ></textarea>
  )
};

export default Textarea;