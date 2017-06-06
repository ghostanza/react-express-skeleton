import * as spotify from 'spotify';

export function getUserInfo(token){
  return{
    type: "GET_USER_INFO",
    payload: spotify.getUserInfo(token)
  }
}

export function getTopItems(token, itemType, options){
  return {
    type: "GET_TOP_ITEMS",
    payload: spotify.getTop(token, itemType, options)
  }
}

export function changeTopItemsRange(range, itemType){
  return {
    type: "CHANGE_TOP_ITEMS_RANGE",
    changeTo: range,
    itemType
  }
}

/*

import * as user from ./userActions.js

user.setUserName('blahhh');

*/
