import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'stores/index';

import ProgramList from 'views/pages/ProgramList';
import ProgramFilter from 'views/pages/ProgramFilter';
import VoiceActorsList from 'views/pages/VoiceActorsList';
import Settings from 'views/pages/Settings';

import Sidebar from 'views/components/Sidebar';
import Schedule from 'views/components/programList/Schedule';
import {
  Official,
  Private765,
  PrivateDS,
  PrivateCG,
  PrivateML,
  PrivateMale,
  PrivateSC,
  Other,
} from 'views/components/programList/Categories';


import 'bulma/css/bulma.min.css';
import 'styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <div className="columns main">
          <Sidebar />
          <div className="column is-10 box content">
            <Routes>
              <Route path="/filter/program" element={<ProgramFilter />} />
              <Route path="/notification/program" element={<ProgramList />}>
                <Route path="schedule" element={<Schedule />} />
                <Route path="1" element={<Official />} />
                <Route path="2" element={<Private765 />} />
                <Route path="3" element={<PrivateDS />} />
                <Route path="5" element={<PrivateCG />} />
                <Route path="6" element={<PrivateML />} />
                <Route path="4" element={<PrivateMale />} />
                <Route path="7" element={<PrivateSC />} />
                <Route path="0" element={<Other />} />
              </Route>
              <Route path="/notification/voiceActors" element={<VoiceActorsList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/filter/program" />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);