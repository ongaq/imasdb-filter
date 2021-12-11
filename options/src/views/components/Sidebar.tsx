import React from 'react';
import { Link } from 'react-router-dom';
import pages from 'utils/pages.json';
import { PagesType, PageListProp } from 'types/views/components/Sidebar.d';
import 'styles/components/Sidebar.scss';

const pageData: PagesType = pages;
const PageList = (props: PageListProp) => {
  return (
    <ul className="menu-list" key={`menulist_${props.id}`}>
      {Object.keys(props.data).map((page: string) =>(
        <li key={`link_${page}`}><Link to={props.data[page]}>{page}</Link></li>
      ))}
    </ul>
  )
};
const Sidebar = () => {
  return (
    <nav className="column is-2 menu sidebar">
      {Object.keys(pageData).map((label: string, key: number) => (
        <React.Fragment key={`div_${label}`}>
          <p key={`label_${label}`} className="menu-label">{label}</p>
          <PageList data={pageData[label]} id={key} key={label} />
        </React.Fragment>
      ))}
    </nav>
  )
};

export default Sidebar;