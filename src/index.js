import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from "react-router-dom";
import App from './App' 
// Pass your GraphQL endpoint to uri
const client = new ApolloClient({ uri: 'http://localhost:4000/' });
 

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
     <BrowserRouter>
    <AppComponent />
    </BrowserRouter>
  </ApolloProvider>
);
 
render(ApolloApp(App), document.getElementById('root'));


