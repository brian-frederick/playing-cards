import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from 'react-apollo';

import appSyncConfig from './appsync';


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
        <Rehydrated
            render={({ rehydrated }) => (
                rehydrated ? <App /> : <strong>Your custom UI component here...</strong>
            )}
        />
    </ApolloProvider>
  );


ReactDOM.render(<WithProvider />, document.getElementById('root'));
