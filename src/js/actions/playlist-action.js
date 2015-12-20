import { AppDispatcher } from '../dispatcher/dispatcher'
import { Api } from '../api/api'


function createPlayList (jsonData) {
  const jsonItems = jsonData.items

  const playList = jsonItems.map((item) => {
    return {
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.default.url
    }
  })

  return playList
}


export const PlayListAction = {
  updateList (query) {
    Api
      .get(query)
      .then((data) => {
        AppDispatcher.dispatch({
          eventName: 'update-playlist',
          items: createPlayList(data),
          query
        })
      })
  },

  selectItem (id, index) {
    AppDispatcher.dispatch({
      eventName: 'select-playlist-item',
      id,
      index
    })
  },

  updateCurrentIndex (index) {
    AppDispatcher.dispatch({
      eventName: 'update-playlist-index',
      index
    })
  }
}
