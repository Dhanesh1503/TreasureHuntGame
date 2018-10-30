/* GridBtn.js
 * Component for showing grid buttons used in the application
 * @Author: Dhanesh Pant
 * @Since: 28-April-2018
 */

import React, { Component } from 'react';
import './GridBtn.css';

class GridButton extends Component {
  render() {
    const { btnOnchangeCallback, label, disableBtn } = this.props;
    return (
      <div className='Grid-btn-wrapper'>
        <button className={disableBtn ? 'Disable-Grid-btn': 'Grid-btn'} disabled={disableBtn} onClick={() => btnOnchangeCallback()}>{label}</button>
      </div>
    );
  }
}

export default GridButton;
