import { useSelector } from 'react-redux';
import { TextareaData, SetSaved, ProgramFilterReducer } from 'types/stores/views/components/ProgramFilter.d';

const saveActors = async(textareaData: TextareaData, setSaved: SetSaved) => {
  if (typeof chrome.storage === 'undefined') {
    return;
  }
  await chrome.storage.local.set({ 'voiceActors': textareaData });
  setSaved(true);
};

const Submit = () => {
  const {
    isSaved,
    textareaData,
    saveActorsCount,
    setSaved,
  } = useSelector((state: ProgramFilterReducer) => state.programFilterReducer);

  return (
    <div className="filter-submit">
      <button id="save" onClick={() => saveActors(textareaData, setSaved)} className="button is-info">保存</button>
      <span id="countup" className="filter-submit-countup">{ saveActorsCount }</span>
      <p id="savedText" className="filter-submit-savedText">{ isSaved ? '保存しました。ページをリロードして下さい。' : '' }</p>
    </div>
  )
};

export default Submit;