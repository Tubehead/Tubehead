import { AppDispatcher } from '../dispatcher/dispatcher'


export const SearchHistoryAction = {

  add (query) {
    AppDispatcher.dispatch({
      eventName: 'add-history',
      query
    })
  },

  removeAll () {
    AppDispatcher.dispatch({
      eventName: 'remove-all-history'
    })
  }
}
