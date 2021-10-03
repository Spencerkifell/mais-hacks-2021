import React, {useState, useEffect} from 'react';
import Navbar from './Components/Navbar/Navbar.js';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './Components/Home/Home.js';

const App = () => {
  return (
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar/>
            <Switch>
              <Route path="/" exact component={Home}/>
            </Switch>
        </Container>
      </BrowserRouter>
  );
}

export default App;