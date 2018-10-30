/* Plot.js
 * Component for showing a plot of the grid
 * @Author: Dhanesh Pant
 * @Since: 28-April-2018
 */

import React, { Component } from 'react';
import './Plot.css';

class Plot extends Component {
  render() {
    const { item, showUserSelect, updateGridItemsListCallback } = this.props;
    const dropGridPlot = () => {
      return (
        <div className='plot' onClick={showUserSelect ? ()=>updateGridItemsListCallback(item) : null}>
          { showUserSelect ? item.plotSelection ? item.userSelectedValue : '' : item.value }
        </div>
      )
    }

    return (
      <div id='Plot-container'>
        {dropGridPlot()}
      </div>
    );
  }
}

export default Plot;
