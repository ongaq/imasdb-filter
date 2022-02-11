import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { TextareaData, SetTextareaData, SaveActorsCount, SetActorsCount, ProgramFilterReducer } from 'types/stores/views/components/ProgramFilter.d';
import { useDebounce } from 'utils/util';

const Textarea = () => {
  const { textareaData, isLoading } = useSelector((state: ProgramFilterReducer) => state.programFilterReducer);
  const dispatch = useDispatch();
  const buttonClass = classNames({
    'textarea': true,
    'is-loading': isLoading,
  });
  const textarea = textareaData.join('\n');
  const getName = () => {
    if (typeof chrome.storage === 'undefined') return;
  
    chrome.storage.local.get('voiceActors', ({ actors }) => {
      dispatch({ type: 'SET_TEXTAREA', textareaData: actors });
    });
  };
  const changeTextarea = (inputText: string) => {
    if (!inputText.length) {
      dispatch({ type: 'SET_ACTORS_COUNT', actorsCount: 0 });
      return;
    }
    const valArray = inputText.split('\n').filter(Boolean);
    dispatch({ type: 'SET_TEXTAREA', textareaData: valArray });
    dispatch({ type: 'SET_ACTORS_COUNT', actorsCount: valArray.length });
    // if (textareaData.length) {
    //   const newArray = [...valArray];
    //   console.log('newArray:', newArray);
    //   dispatch({ type: 'SET_TEXTAREA', textareaData: newArray });
    //   dispatch({ type: 'SET_ACTORS_COUNT', actorsCount: newArray.length });
    // } else {
    //   dispatch({ type: 'SET_TEXTAREA', textareaData: valArray });
    //   dispatch({ type: 'SET_ACTORS_COUNT', actorsCount: valArray.length });
    // }
  };
  const hideActorsCount = () => dispatch({ type: 'SET_ACTORS_COUNT', actorsCount: '---' });

  useEffect(() => getName(), []);

  return (
    <textarea 
      onFocus={() => hideActorsCount()}
      onBlur={(e) => changeTextarea(e.target.value)}
      defaultValue={textarea} 
      className={buttonClass}
    ></textarea>
  )
};

export default Textarea;