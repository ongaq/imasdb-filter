import { useSelector, useDispatch } from 'react-redux';
import { State, CountReducer } from 'types/stores/index.d';

const Submit = () => {
  // const [count, setCount] = useState(0);
  const count = useSelector((state: CountReducer) => state.countReducer.count);
  const dispatch = useDispatch();
  const increase = () => dispatch({ type: 'INCREASE_COUNT' });

  return (
    <div className="filter-submit">
      <button id="save" onClick={increase} className="button is-info">保存</button>
      <span id="countup" className="filter-submit-countup">{ count }</span>
      <p id="savedText" className="filter-submit-savedText"></p>
    </div>
  )
};

export default Submit;