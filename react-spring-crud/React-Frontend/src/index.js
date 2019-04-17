import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './Header.css';
import 'semantic-ui-css/semantic.min.css';

import Header from "./Header";
import Container from "./Container";

const App = () => (
        <Router>
            <div>
                <Header />

                <div id="styles">

                    <Container />
                    
                </div>
            </div>
      </Router>
);
render(<App />, document.getElementById('root'));