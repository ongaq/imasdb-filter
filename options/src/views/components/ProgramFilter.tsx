// import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import store from 'stores/index';
import { State } from 'types/stores/index.d';

export const AutoInput = () => {
  return (
    <section className="filter-input">
      <h2 className="filter-input-description">アイマスDBの関連声優一覧から声優名を自動入力する</h2>
      <div className="buttons are-small" data-brandlist>
        <button className="button is-info is-outlined" data-brand="765as">765PRO ALLSTARS</button>
        <button className="button is-info is-outlined" data-brand="cinderella">シンデレラガールズ</button>
        <button className="button is-info is-outlined" data-brand="million">ミリオンライブ！</button>
        <button className="button is-info is-outlined" data-brand="sidem">SideM</button>
        <button className="button is-info is-outlined" data-brand="shinycolors">シャイニーカラーズ</button>
        <button className="button is-info is-outlined" data-brand="xenoglossia">ゼノグラシア</button>
        <button className="button is-info is-outlined" data-brand="dearlystars">ディアリースターズ</button>
      </div>
      <p id="error" className="filter-input-error"></p>
    </section>
  )
};
export const Textarea = () => {
  return (
    <textarea id="voiceActors" className="textarea"></textarea>
  )
};
export const Submit = () => {
  // const [count, setCount] = useState(0);
  const count = useSelector((state: State) => state.count);
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