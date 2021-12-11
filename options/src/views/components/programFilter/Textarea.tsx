import { useSelector } from 'react-redux';
import { ProgramFilterReducer } from 'types/stores/views/components/ProgramFilter.d';

const Textarea = () => {
  const { textareaData } = useSelector((state: ProgramFilterReducer) => state.programFilterReducer);

  return (
    <textarea id="voiceActors" defaultValue={textareaData} className="textarea"></textarea>
  )
};

export default Textarea;