import AutoInput from 'views/components/programFilter/AutoInput';
import Textarea from 'views/components/programFilter/Textarea';
import Submit from 'views/components/programFilter/Submit';
import 'styles/pages/ProgramFilter.scss';

const ProgramFilter = () => {
  return (
    <div className="filter">
      <h1 className="filter-heading">番組表フィルタ</h1>
      <p>番組表（<a href="https://imas-db.jp/bangumi/" target="_blank">https://imas-db.jp/bangumi/</a>）の一覧に表示しておきたい声優名を入力する。<br />
      (複数の場合は改行で区切る)</p>

      <AutoInput />
      <Textarea />
      <Submit />
    </div>
  )
}
export default ProgramFilter;