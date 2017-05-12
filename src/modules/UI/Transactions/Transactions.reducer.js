  import * as ACTION from './Transactions.action'
  import {combineReducers} from 'redux'

const transactionsList = (state = [], action) => {
  switch (action.type) {
    case ACTION.UPDATE_TRANSACTIONS_LIST :
      return action.data
    case ACTION.DELETE_TRANSACTIONS_LIST :
      return []
    case ACTION.UPDATE_SEARCH_RESULTS :
      return action.data
    default:
      return state
  }
}

const searchVisible = (state = false, action) => {
  switch (action.type) {
    case ACTION.TRANSACTIONS_SEARCH_VISIBLE :
      return true
    case ACTION.TRANSACTIONS_SEARCH_HIDDEN :
      return false
    default:
      return state
  }
}

const contactsList = (state = [], action) => {
  switch (action.type) {
    case ACTION.UPDATE_CONTACTS_LIST :
      return action.data
    default:
      return state
  }
}

const updatingBalance = (state = true, action) => {
  switch (action.type) {
    case ACTION.ENABLE_UPDATING_BALANCE : 
      return true
    case ACTION.DISABLE_UPDATING_BALANCE : 
      return false
    case ACTION.TOGGLE_UPDATING_BALANCE :
      return !state
    default :
      return state
  }
}

const transactionList = combineReducers({
  transactionsList,
  searchVisible,
  contactsList,
  updatingBalance
})

export default transactionList