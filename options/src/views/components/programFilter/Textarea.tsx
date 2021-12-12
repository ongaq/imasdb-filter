import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { TextareaData, SetTextareaData, ProgramFilterReducer } from 'types/stores/views/components/ProgramFilter.d';

const getName = (setTextareaData: SetTextareaData) => {
  if (typeof chrome.storage === 'undefined') return;

  chrome.storage.local.get('voiceActors', ({ actors }) => {
    setTextareaData(actors);
  });
}
const Textarea = () => {
  const { textareaData, isLoading } = useSelector((state: ProgramFilterReducer) => state.programFilterReducer);
  const dispatch = useDispatch();
  const setTextareaData = (textareaData: TextareaData) => dispatch({ type: 'SET_TEXTAREA', textareaData });
  const buttonClass = classNames({
    'textarea': true,
    'is-loading': isLoading,
  });
  getName(setTextareaData);
  const textarea = textareaData.join('\n');

  return (
    <textarea defaultValue={textarea} className={buttonClass}></textarea>
  )
};

export default Textarea;