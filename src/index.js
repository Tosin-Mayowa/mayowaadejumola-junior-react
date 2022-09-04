import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import {store} from './redux/Store/store';
import App from './App' 
// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://localhost:4000/' });
 

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
     <BrowserRouter>
     <Provider  store={store}>
    <AppComponent />
    </Provider>
    </BrowserRouter>
  </ApolloProvider>
);
 
render(ApolloApp(App), document.getElementById('root'));


