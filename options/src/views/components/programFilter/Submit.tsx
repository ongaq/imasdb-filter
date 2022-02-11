import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { TextareaData, SetSaved, IsSaved, ProgramFilterReducer } from 'types/stores/views/components/ProgramFilter.d';
import Button from '@mui/material/Button';

const saveActors = async(textareaData: TextareaData, setSaved: SetSaved) => {
  if (typeof chrome.storage === 'undefined') {
    setSaved(false);
    return;
  }
  await chrome.storage.local.set({ 'voiceActors': textareaData });
  setSaved(true);
};

const Submit = () => {
  const {
    isSaved,
    textareaData,
    actorsCount,
  } = useSelector((state: ProgramFilterReducer) => state.programFilterReducer);
  const dispatch = useDispatch();
  const setSaved = (isSaved: IsSaved) => dispatch({ type: 'SET_SAVED', isSaved });
  const [saveState, setSaveState] = useState('');
  const buttonClass = classNames({
    'button': true,
    'is-info': true,
    'Disabled': !isSaved,
  });
  const savedTextClass = classNames({
    'filter-submit-savedText': true,
    'is-active': saveState.length,
  });
  const isDisabled = textareaData.length === 0;

  useEffect(() => {
    if (isSaved === true) {
      setSaveState('保存しました。番組表をリロードして下さい。');
    } else if (isSaved === false) {
      setSaveState('保存に失敗しました。もう一度試すか時間を置いて試して下さい。');
    }
  }, [isSaved]);

  return (
    <div className="filter-submit">
      <Button 
        variant="contained"
        onClick={() => saveActors(textareaData, setSaved)} 
        className={buttonClass} 
        disabled={isDisabled}
      >保存</Button>
      <span className="filter-submit-countup">{ actorsCount }</span>
      <p className={savedTextClass}>{ saveState }</p>
    </div>
  )
};

export default Submit;