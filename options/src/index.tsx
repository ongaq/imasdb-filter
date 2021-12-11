import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'stores/index';

import App from 'views/pages/App';
import Sidebar from 'views/components/Sidebar';
import ProgramList from 'views/pages/ProgramList';
import ProgramFilter from 'views/pages/ProgramFilter';
import VoiceActorsList from 'views/pages/VoiceActorsList';
import Settings from 'views/pages/Settings';

import 'bulma/css/bulma.min.css';
import 'styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <div className="columns main">
          <Sidebar />
          <div className="column is-10 box content">
            <Routes>
              <Route path="/filter/program" element={<ProgramFilter />} />
              
              <Route path="/notification/program" element={<ProgramList />} />
              <Route path="/notification/voiceActors" element={<VoiceActorsList />} />
              
              <Route path="/" element={<App />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);