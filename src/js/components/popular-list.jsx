import React from 'react'
import ReactDOM from 'react-dom'

import FontAwesome from 'react-fontawesome'

import { PopularListAction } from '../actions/popularlist-action'
import { PopularListStore } from '../stores/popularlist-store'
import { PlayListStore } from '../stores/playlist-store'
import { PlayListAction } from '../actions/playlist-action.js'

export class PopularList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: [],
      isVideoExist: false
    }
  }

  componentDidMount () {
    PopularListAction.getItems('https://itunes.apple.com/us/rss/topsongs/limit=25/json')

    PopularListStore.on('load', this.loadItems.bind(this))
    PlayListStore.on('update', this.toggle.bind(this))
  }

  componentWillUnmount () {
    PopularListStore.off('load')
    PlayListStore.off('update')
  }

  loadItems () {
    this.setState({
      items: PopularListStore.getItems()
    })
  }

  toggle () {
    const playListItems = PlayListStore.getAll()
    const isVideoExist = playListItems && playListItems.length

    this.setState({
      isVideoExist
    })
  }

  handleClick (title) {
    PlayListAction.updateList(title)
  }

  render () {
    const items = this.state.items

    const itemTemplates = items.map((item, index) => {
      return (
        <li
          key={ index }
          className="list__item"
          onClick={ this.handleClick.bind(this, item['im:artist'].label) }
        >
          <div className="list__title list__title--narrow">
            <span className="list__title-inner">{ item['im:artist'].label }</span>
            <span className="list__label">{ item.category.attributes.label }</span>
          </div>
          <div className="list__thumb list__thumb--narrow">
            <img src={ item['im:image'][1].label } className="list__thumb-img" />
          </div>
        </li>
      )
    })


    return (
      <div className={ 'list' + (this.state.isVideoExist ? ' is-hidden' : '') }>
        <h2 className="list__headline">
          <FontAwesome
            className=''
            name='fire'
          />
          <span className="list__headline-inner">Popular Songs</span>
        </h2>
        <ol className="list__items">
          { itemTemplates }
        </ol>
      </div>
    )
  }
}
