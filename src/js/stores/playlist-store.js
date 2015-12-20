import { EventEmitter } from 'events'

export const PlayListStore = Object.assign({}, EventEmitter.prototype, {
  items: [],

  query: null,

  itemIndex: 0,

  getAll () {
    return this.items
  },

  getAllId () {
    return this.items.map((item) => {
      return item.videoId
    })
  },

  getIndexItem (index) {
    return this.items[index]
  },

  getCurrentIndex () {
    return this.itemIndex
  },

  setCurrentIndex (index) {
    this.itemIndex = index
  },

  getQuery () {
    return this.query
  }

})
