import { AppDispatcher } from '../dispatcher/dispatcher'
import { Rss } from '../api/rss'

export const PopularListAction = {

  getItems (url) {
    Rss.get(url)
      .then((data) => {
        AppDispatcher.dispatch({
          eventName: 'init-popular-list',
          items: data.feed.entry
        })
      })
  }
}
