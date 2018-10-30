/* Grid.js
 * Component for showing grid used in the application
 * @Author: Dhanesh Pant
 * @Since: 28-April-2018
 */

import React, { Component } from 'react';
import Plot from '../Plot/index';
import './Grid.css';

class Grid extends Component {
  render() {
    const {gridItemList, showUserSelect} =this.props;

    const dropGrid = () => {
      return gridItemList.map((result) => {
        return ( 
          <div className='Grid-row'>
            {showGridColumns(result)}         
          </div>
        );
      });
    }

    const showGridColumns = (columnArr) => {
      return columnArr.map((item) => {
        return ( 
          <Plot {...this.props} item={item} showUserSelect={showUserSelect}/>
        );
      });
    }
   
    return (
      <div id='Grid-container'>
        {dropGrid()}
      </div>
    );
  }
}

export default Grid;
