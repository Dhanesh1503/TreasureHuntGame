/* AppUtilities.js
 * JS file used for computation of the functions overall in the application
 * @Author: Dhanesh Pant
 * @Since: 28-April-2018
 */

import _ from 'lodash';
import * as GameConstant from './GameConstant';

/**
 * Config to determine the inputs for rows and columns used in the grid
 */
export const gridDimensionDetail = () => {

   const result =  [
      {
        'id' : GameConstant.ROWS,
        'placeholderText' : GameConstant.ROW_PLACEHOLDER,
        'label' :  GameConstant.ROW_LABEL
      },
      {
        'id' : GameConstant.COLUMNS,
        'placeholderText' : GameConstant.COLUMN_PLACEHOLDER,
        'label' :  GameConstant.COLUMN_LABEL
      }
    ]

  return result;
};

/**
 * Funtion to disable or enable the Generate Grid button
 * @param {*} rows
 * @param {*} columns
 */
export const disableGenerateGridBtn = (rows, columns) => {
  let disable = false;
  if (rows <= 0 || columns <= 0 ) {
    disable = true;
  }
  if (_.isEmpty(rows.toString()) || _.isEmpty(columns.toString())) {
    disable = true;
  } 

  return disable;
}

/**
 * Funtion to generate the grid 
 * @param {*} rows
 * @param {*} columns
 */
export const generateGridItemList = (rows, columns) => {
  let returnList = [],
    rowsArr = [];

  for(let r=0; r<rows; r++){
    //Create a column array
    let columnsArr = [];
    //iterate over the column array and push objects into this array
    for(let c=0; c<columns; c++) {
      columnsArr.push({
        id: `${r}${c}`,
        rowIndex : r,
        columnIndex : c, 
        value : 0,
        plotSelection : false,
        userSelectedValue : ''
      })
    }
    //push column array into the rows array
    rowsArr.push(columnsArr);
  }
  
  returnList = createTreasureMap(rows, columns, rowsArr);

  return returnList;
}

/**
 * Funtion to create the treasure map on the grid
 * @param {*} gridItemsList
 * @param {*} rows
 * @param {*} columns
 */
export const createTreasureMap = (rows, columns, gridItemsList) => {
  let totalGridPlots = rows*columns;
  let treasuresCount = _.random(1, totalGridPlots);

  //setting the treasures in the grid
  while(treasuresCount > 0) {
    let randomRowIndex = _.random(0, rows-1);
    let randomColumnIndex = _.random(0, columns-1);
    let gridItem = gridItemsList[randomRowIndex][randomColumnIndex];

    if (gridItem.value.toString() !== 'X') {
      gridItem.value = 'X';
    }

    gridItemsList[randomRowIndex][randomColumnIndex] = gridItem;
    treasuresCount--;
  }
  //calculating the adjacentValues of the plots and returing the final list
  return setAdjacentPlotsValue(rows, columns, gridItemsList);
}

/**
 * Funtion to set the value property of the gridItemList nodes
 * @param {*} gridItemsList
 * @param {*} rows
 * @param {*} columns
 */
export const setAdjacentPlotsValue = (rows, columns, gridItemsList) => {
  let tempList = _.cloneDeep(gridItemsList);

  for(let i=0; i<rows; i++) {
    for(let j=0; j<columns; j++) {
      if(gridItemsList[i][j].value !== 'X') {
        gridItemsList[i][j] = updateValueProperty(i, j, gridItemsList[i][j], tempList, rows, columns);
      }
    }
  }

  return gridItemsList;
} 

/**
 * Funtion to update and calculate the adjacentTreasureCount of the plot in the grid
  * @param {*} rowIndex
 * @param {*} columnIndex
 * @param {*} gridItem
 * @param {*} list
 * @param {*} rows
 * @param {*} columns
 */
export const updateValueProperty = (rowIndex, columnIndex, gridItem, list, rows, columns) => {
  let adjacentTreasureCount = 0;
  //check for top adjacent item in the grid w.r.t gridItem passed as an argument in this function
  if(rowIndex > 0 && list[rowIndex - 1][columnIndex] instanceof Object) {
    if(list[rowIndex - 1][columnIndex].value.toString() === 'X') adjacentTreasureCount++; 
  }
  //check for left adjacent item in the grid w.r.t gridItem passed as an argument in this function
  if(columnIndex > 0 && list[rowIndex][columnIndex - 1] instanceof Object) {
    if(list[rowIndex][columnIndex - 1].value.toString() === 'X') adjacentTreasureCount++; 
  }
  //check for bottom adjacent item in the grid w.r.t gridItem passed as an argument in this function
  if(rowIndex + 1 < rows && list[rowIndex + 1][columnIndex] instanceof Object) {
    if(list[rowIndex + 1][columnIndex].value.toString() === 'X') adjacentTreasureCount++; 
  }
  //check for right adjacent item in the grid w.r.t gridItem passed as an argument in this function
  if(columnIndex + 1 < columns && list[rowIndex][columnIndex + 1] instanceof Object) {
    if (list[rowIndex][columnIndex + 1].value.toString() === 'X') adjacentTreasureCount++; 
  }
  //check for top left diagonal item in the grid w.r.t gridItem passed as an argument in this function
  if(rowIndex > 0 && columnIndex > 0 && list[rowIndex - 1][columnIndex - 1] instanceof Object) {
    if(list[rowIndex - 1][columnIndex - 1].value.toString() === 'X') adjacentTreasureCount++; 
  }
  //check for bottom left diagonal item in the grid w.r.t gridItem passed as an argument in this function
  if(rowIndex + 1 < rows && columnIndex + 1 < columns && list[rowIndex + 1][columnIndex + 1] instanceof Object) {
    if(list[rowIndex + 1][columnIndex + 1].value.toString() === 'X') adjacentTreasureCount++;
  }
  //check for top right diagonal item in the grid w.r.t gridItem passed as an argument in this function
  if(rowIndex > 0 && columnIndex + 1 < columns && list[rowIndex - 1][columnIndex + 1] instanceof Object) {
    if(list[rowIndex - 1][columnIndex + 1].value.toString() === 'X') adjacentTreasureCount++;
  }
  //check for bottom right diagonal item in the grid w.r.t gridItem passed as an argument in this function
  if(rowIndex + 1 < rows && columnIndex > 0 && list[rowIndex + 1][columnIndex - 1] instanceof Object) {
    if(list[rowIndex + 1][columnIndex - 1].value.toString() === 'X') adjacentTreasureCount++;
  }

  //set the adjacentTreasureCount value
  gridItem.value = adjacentTreasureCount;

  return gridItem; 
}

/**
 * Funtion to get the updated list after user have made a selection for the treasure
  * @param {*} item
 * @param {*} rows
 * @param {*} colums
 * @param {*} list
 */
export const getUpdatedList = (item, rows, columns, list) => {
  let clonedList =  _.cloneDeep(list);
  for(let r=0; r<rows; r++ ) {
    for(let c=0; c<columns; c++) {
      let listItem = clonedList[r][c];

      if(item.id === listItem.id) {
        listItem.plotSelection = !listItem.plotSelection;
        if(listItem.plotSelection) {
          listItem.userSelectedValue = 'X';
        }
        else {
          listItem.userSelectedValue = '';
        }
        break;
      }
    }
  }

  return clonedList;
}

/**
 * Funtion to disable and enable the sumbit button 
 * @param {*} rows
 * @param {*} colums
 * @param {*} gridList
 */
export const disableSubmitBtn = (rows, columns, gridList) => {
  let disable = true;

  for(let r=0; r<rows; r++ ) {
    for(let c=0; c<columns; c++) {
      let listItem = gridList[r][c];

      if(!_.isEmpty(listItem.userSelectedValue)) {
        disable = false;
        break;
      }
    }
  }

  return disable;
}


/**
 * Funtion to check and calculate the condition for winning the treasure hunt game
 * @param {*} rows
 * @param {*} colums
 * @param {*} list
 */
export const gameWinCalculations = (rows, columns, list) => {
  let treasures = [],
    userSelectedTreasures = [], 
    gameWin = GameConstant.GAME_LOST_MSG, 
    gameWinFlag = false;

  treasures = iterateOnGrid(rows, columns, list, 'value', treasures);
  userSelectedTreasures = iterateOnGrid(rows, columns, list, 'userSelectedValue', userSelectedTreasures);

  //Check all the ids of the treasures are in userSelectedTreasures 
  if (_.size(userSelectedTreasures) === _.size(treasures)) {
    gameWinFlag = treasures.every((value) => {
      return (userSelectedTreasures.indexOf(value) >= 0);
    });
  }
  //set the gameWin message
  if(gameWinFlag) {
    gameWin = GameConstant.GAME_WIN_MSG;
  }

  return gameWin;
}

/**
 * Funtion to iterate on the grid to push all the nodes id's where there is a treasure availabel or user have made a choice for the treasure
 * @param {*} rows
 * @param {*} colums
 * @param {*} list
 * @param {*} property
 * @param {*} returnList
 */
export const iterateOnGrid = (rows, columns, list, property, returnList) => {
  for(let r=0; r<rows; r++ ) {
    for(let c=0; c<columns; c++) {
      let listItem = list[r][c];

      if(listItem[property].toString() === 'X') {
        returnList.push(listItem.id);
      }
    }
  }

  return returnList;
}