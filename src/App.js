import React, { Component } from 'react';
import Home from './Components/Home';
import { Switch , Route , BrowserRouter as Router } from 'react-router-dom';


class App extends Component {
  render() {
    return (
    	<Router>
    		<Switch>
    			<Route exact path="/"/>
    			<Route exact path="/english" component={Home}/>
    		</Switch>
    	</Router>
    );
  }
}

export default App;
