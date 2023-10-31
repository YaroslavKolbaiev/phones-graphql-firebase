import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import './styles/App.scss';

import { App } from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql/queries';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <HashRouter>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </HashRouter>
  </Provider>
);
