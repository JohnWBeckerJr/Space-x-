import './App.css';
import React, { Component } from 'react'
import logo from './logo.jpeg'
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {ApolloProvider} from '@apollo/react-hooks'
import Launches from './components/Launches'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

class App extends Component {
  render(){
  return (
    <ApolloProvider client = {client}>
      <div className="container">
        <img
          src={logo}
          alt="SpaceX"
          style={{ width: 300, display: "block", margin: "auto" }}
        ></img>
        <Launches />
      </div>
    </ApolloProvider>
  );
}
}

export default App;
