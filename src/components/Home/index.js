/* Home.js
 * Component for Homepage of the application
 * @Author: Dhanesh Pant
 * @Since: 28-April-2018
 */

import React, { Component } from 'react';
import _ from 'lodash';
import * as Utilities from '../../utilities/AppUtilities';
import Grid from '../Grid/index';
import GridButton from '../GridButton/index';
import * as GameConstant from '../../utilities/GameConstant';
import './Home.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.gamePlayMsg = GameConstant.GAME_PLAY_MSG;
    this.gameResetMsg = GameConstant.GAME_RESET_MSG;
    this.state = {
      showInitialDetails : true,
      showGrid: false,
      showResultantGrid : false,
      gridItemList : [],
      gameInfo : this.gamePlayMsg,
      rows : 0,
      columns : 0
    };
    this.setGridDimensions = this.setGridDimensions.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.updateGridItemsListCallback = this.updateGridItemsListCallback.bind(this);
    this.submitGridChoices = this.submitGridChoices.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
  }

  setGridDimensions (id, event) {
    let val = '';
    if(!_.isEmpty(event)) {
      val = Number(event);
    } 
    id === GameConstant.ROWS ? this.setState({rows: val}) : this.setState({columns: val})
  }

  createGrid () {
    let list = Utilities.generateGridItemList(this.state.rows, this.state.columns);
    this.setState({
      showInitialDetails :false,
      showGrid : true,
      gridItemList : list
    });
  }

  updateGridItemsListCallback (item) {
    let updatedList = Utilities.getUpdatedList(item, this.state.rows, this.state.columns, this.state.gridItemList);
    this.setState({gridItemList : updatedList});
  }

  submitGridChoices () {
    let gameWinMsg = Utilities.gameWinCalculations(this.state.rows, this.state.columns, this.state.gridItemList);
    this.setState({
      showGrid: false,
      showResultantGrid : true,
      gameInfo : this.gameResetMsg
    });
    alert(gameWinMsg);
  }

  resetGrid () {
    let list = Utilities.generateGridItemList(this.state.rows, this.state.columns);
    this.setState({
      showGrid: true,
      showResultantGrid : false,
      gridItemList : list
    })
  }

  render() {
    const dropInitialDetails = () => {
      let disableBtn = Utilities.disableGenerateGridBtn(this.state.rows, this.state.columns);
      return (
        <div> 
          <p className='Intro'> Please Fill In The Below Details: </p>
          {renderRowColumnSelect()}
          <GridButton 
            {...this.props}
            label={GameConstant.GENERATE_GRID_BTN}
            disableBtn={disableBtn}
            btnOnchangeCallback={this.createGrid} />
        </div>
      )
    }

    const renderRowColumnSelect = () => {
      const optionList = Utilities.gridDimensionDetail();
      return optionList.map((result) => {
        return (
          <div className='Text-input-wrapper'>
            <span className="Text-input-label">{result.label}</span>
            <input
              type='number'
              required
              placeholder={result.placeholderText}
              value={this.state[result.id]}
              onChange={(event) => this.setGridDimensions(result.id, event.target.value)}></input>
          </div>
        );
      });
    };

    return (
      <div id='Home-container'>
        {this.state.showInitialDetails ? dropInitialDetails() : null}
        {this.state.showGrid ?
          <div>
             <div className='Game-information'><p>{this.state.gameInfo}</p></div>
            <div className='Grid-container-wrapper'> 
              <Grid {...this.props} 
                showUserSelect={true}
                gridItemList={this.state.gridItemList}
                updateGridItemsListCallback={this.updateGridItemsListCallback}/> 
            </div>
            <GridButton 
              {...this.props}
              label={GameConstant.SUBMIT_BTN}
              disableBtn={Utilities.disableSubmitBtn(this.state.rows, this.state.columns, this.state.gridItemList)}
              btnOnchangeCallback={this.submitGridChoices} />
          </div> : null}
        {this.state.showResultantGrid ?
          <div>
            <div className='Game-information'><p>{this.state.gameInfo}</p></div>
            <div className='Grid-container-wrapper'> 
              <Grid {...this.props} 
                showUserSelect={false}
                gridItemList={this.state.gridItemList}/> 
            </div>
            <GridButton 
              {...this.props}
              label={GameConstant.RESET_BTN}
              disableBtn={false}
              btnOnchangeCallback={this.resetGrid} />
          </div> : null}
      </div>
    );
  }
}

export default HomePage;
