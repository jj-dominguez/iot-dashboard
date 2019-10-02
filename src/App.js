import React from 'react';
import './App.scss';
import Highcharts from 'highcharts';
import { BrowserRouter as
    Router,
    Route,
    // Link
} from "react-router-dom";

import OverviewDashboard from './main/js/components/OverviewDashboard';

import CustomTheme from './main/js/highcharts-theme.js';

// Load the fonts
Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = CustomTheme;

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

/*
App.js acts as the entry point to the dashboard
*/

function App() {
  return (
    <div className="App">
        <Router>
            <Route path='/' exact component={OverviewDashboard} />
            <Route path='/overview' exact component={OverviewDashboard} />
        </Router>
    </div>
  );
}

export default App;
