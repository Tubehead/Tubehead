import { EventEmitter } from 'events'
import _ from 'lodash'

export const PopularListStore = Object.assign({}, EventEmitter.prototype, {

  items: [],

  setItems (items) {
    this.items = _.uniq(items, (item) => {
      return item['im:artist'].label
    })
  },

  getItems () {
    return this.items
  }
})
