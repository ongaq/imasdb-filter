import { Link, Outlet, useLocation } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import 'styles/pages/programList.scss';

const childRoutes = [
  { path: '/notification/program/schedule', title: '今後の放送予定がある番組' },
  { path: '/notification/program/1', title: 'アイマス公式' },
  { path: '/notification/program/2', title: '個人(765)' },
  { path: '/notification/program/3', title: '個人(DS)' },
  { path: '/notification/program/5', title: '個人(CG)' },
  { path: '/notification/program/6', title: '個人(ML)' },
  { path: '/notification/program/4', title: '個人(男性)' },
  { path: '/notification/program/7', title: '個人(SC)' },
  { path: '/notification/program/0', title: 'その他' },
];
const fetchProgramList = async() => {
  // const url = 'https://imas-db.jp/misc/cv.html';
  const url = 'http://localhost:5500/programList.html';
  const response = await fetch(url);

  return fetch('/');
};

const ProgramList = () => {
  const { pathname } = useLocation();

  return (
    <div className="plist">
      <h1 className="plist-heading">番組一覧</h1>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          my: 1
        }
      }}>
        <ButtonGroup size="small" variant="outlined">
          {childRoutes.map((route) => {
            const isActive = pathname === route.path ? 'is-active' : '';
            return (
              <Button key={route.title} className={isActive}>
                <Link to={route.path}>{route.title}</Link>
              </Button>
            )
          })}
        </ButtonGroup>
      </Box>
      <Outlet />
    </div>
  )
}

export default ProgramList;