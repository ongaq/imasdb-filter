import { useState, useEffect } from 'react';

type ScheduleDataType = [] | {
  id: number;
  path: string;
  text: string;
}[];

const fetchProgramList = async(setData: React.Dispatch<React.SetStateAction<ScheduleDataType>>) => {
  // const url = 'https://imas-db.jp/misc/cv.html';
  const url = 'http://localhost:5500/programList.html';

  const res = await fetch(url);
  const text = await res.text();
  const newHTML = new DOMParser().parseFromString(text, 'text/html');
  
  const tableElms = newHTML.querySelectorAll<HTMLTableRowElement>('#ipgTitleList tbody tr');
  const programList = [];

  for (const elm of tableElms) {
    const td = elm.querySelectorAll('td')[0];
    const anchor = td.querySelector('a');

    if (anchor !== null && anchor.href !== null && anchor.textContent !== null) {
      programList.push({
        id: programList.length,
        path: anchor.href,
        text: anchor.textContent
      });
    }
  }
  console.log('programList:', programList);
  setData(programList);
};

const Schedule = () => {
  const [data, setData] = useState<ScheduleDataType>([]);

  useEffect(() => {
    fetchProgramList(setData);
  }, [setData]);

  return (
    <div className="plist-child">
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>今後の放送予定がある番組</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={`plist_${item.id}`}>
              <td><a href={item.path}>{item.text}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};
export default Schedule;