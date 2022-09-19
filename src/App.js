import logo from './logo.svg';
import './App.css';
import Cantantes from './components/cantantes';

import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";

import Index from './components/index';

function App() {
  return (
    <Router>
      
      
      <Index />
    </Router>
  );
}

export default App;
