/* App.js
 * Component for displaying root page of the application
 * @Author: Dhanesh Pant
 * @Since: 28-April-2018
 */

import React, { Component } from 'react';
import HomePage from './components/Home/index';
import gameIntroImage from './images/app_left_logo.png';
import gamePlayImage from './images/app_right_logo.png';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <div className='App-logo-left'><img src={gameIntroImage} alt='logo-left'/></div>
          <div className='App-title'><h1>Yo Get Ready to Play Treasure Hunt Game ....!</h1></div>
          <div className='App-logo-right'><img src={gamePlayImage} alt='logo-right'/></div>
        </header>
        <HomePage {...this.props}/>
      </div>
    );
  }
}

export default App;
