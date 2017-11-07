import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Container from './components/Container';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Container />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render();

const moduleUpdate = () => {
  render();
};

module.hot.accept('./components/Container', moduleUpdate);
