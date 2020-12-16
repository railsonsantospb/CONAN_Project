import React from 'react';

import { GlobalStyle } from './styles/GlobalStyle';
import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Header />
      <Routes />
    </React.Fragment>
  );
}

export default App;
