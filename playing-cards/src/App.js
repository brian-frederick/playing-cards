import React, { Component } from 'react';
import './App.css';

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import appSyncConfig from './appsync';

import StartAGame from './StartAGame'

class App extends Component {
  render() {
    return (
      <div className="App">
        <StartAGame />
      </div>
    );
  }
}

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
      type: appSyncConfig.aws_appsync_authenticationType,
      apiKey: appSyncConfig.apiKey,
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
      <Rehydrated>
          <App />
      </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
