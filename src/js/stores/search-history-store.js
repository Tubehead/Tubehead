import { EventEmitter } from 'events'

const STORAGE_NAME = 'history'
const STORAGE_MAX_LIMIT = 10

export const SearchHistoryStore = Object.assign({}, EventEmitter.prototype, {

  addItem (query) {
    let items = this.getItems() || []

    if (this.getItemLength() === STORAGE_MAX_LIMIT) {
      items.pop()
    }

    items.unshift(query)
    items = items.filter((item, index) => {
      return items.indexOf(item) === index
    })

    window.localStorage.setItem(STORAGE_NAME, items)
  },

  getItems () {
    let items = window.localStorage.getItem(STORAGE_NAME)

    if (!items) {
      return []
    }

    return items.split(',')
  },

  getItemLength () {
    return this.getItems().length
  },

  removeAll () {
    window.localStorage.removeItem(STORAGE_NAME)
  }

})
