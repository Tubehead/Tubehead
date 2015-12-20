import { Dispatcher } from 'flux'
import { PlayListStore } from '../stores/playlist-store'
import { SearchHistoryStore } from '../stores/search-history-store'
import { SidebarStore } from '../stores/sidebar-store'
import { PopularListStore } from '../stores/popularlist-store'


export const AppDispatcher = new Dispatcher()

PlayListStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'update-playlist':
      PlayListStore.items = payload.items
      PlayListStore.itemIndex = 0
      PlayListStore.query = payload.query
      PlayListStore.emit('update')
      break
  }
})

SearchHistoryStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'add-history':
      SearchHistoryStore.addItem(payload.query)
      SearchHistoryStore.emit('add')
      break
  }
})

AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'select-playlist-item':
      PlayListStore.setCurrentIndex(payload.index)
      PlayListStore.emit('select')
      break

    case 'update-playlist-index':
      PlayListStore.setCurrentIndex(payload.index)
      PlayListStore.emit('updateCurrent')
      break

    case 'toggle-sidebar':
      SidebarStore.toggle()
      SidebarStore.emit('toggle')
      break

    case 'init-popular-list':
      PopularListStore.setItems(payload.items)
      PopularListStore.emit('load');
      break

    case 'remove-all-history':
      SearchHistoryStore.removeAll()
      SearchHistoryStore.emit('removeAll')

    default:
      break
  }
})

