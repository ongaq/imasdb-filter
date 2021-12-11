import { AutoInput, Submit, Textarea } from 'views/components/ProgramFilter';
import 'styles/pages/ProgramFilter.scss';

const ProgramFilter = () => {
  return (
    <div className="filter">
      <h1 className="filter-heading">番組表フィルタ</h1>
      <p>番組表（https://imas-db.jp/bangumi/）の一覧に表示しておきたい声優名を入力する。<br />
      (複数の場合は改行で区切る)</p>

      <AutoInput />
      <Textarea />
      <Submit />
    </div>
  )
}
export default ProgramFilter;