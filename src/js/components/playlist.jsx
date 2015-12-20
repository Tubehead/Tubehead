import React from 'react'

import FontAwesome from 'react-fontawesome'
import _ from 'lodash'

import { PlayerAction } from '../actions/player-action'
import { PlayListAction } from '../actions/playlist-action'
import { PlayListStore } from '../stores/playlist-store'
import { SearchHistoryAction } from '../actions/search-history-action'


export class PlayList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: this.props.items
    }
  }

  componentDidMount () {
    PlayListStore
      .on('update', () => {
        this.updatePlayList()

        // TODO: rewrite it without using setTimeout
        setTimeout(() => {
          this.addHistory()
        }, 1)
      })
      .on('select', this.selectPlayListItem.bind(this))
      .on('updateCurrent', this.forceRender.bind(this))

    window.addEventListener('scroll', _.throttle(this.updateLayoutWithAffix.bind(this), 60))
  }

  componentWillUnmount () {
    PlayListStore
      .off('change')
      .off('select')
      .off('updateCurrent')

    window.removeEventListener('scroll')
  }

  addHistory () {
    SearchHistoryAction.add(PlayListStore.getQuery())
  }

  scrollToTop () {
    window.scrollTo(0, 0)
  }

  updatePlayList () {
    const items = PlayListStore.getAll()

    this.setState({
      result: items
    })

    const idList = PlayListStore.getAllId()

    window.player.loadPlaylist(idList, 0)
    window.player.setLoop(true);
    this.scrollToTop()
  }

  selectPlayListItem () {
    const idList = PlayListStore.getAllId()

    this.setState({
      result: PlayListStore.getAll()
    })

    window.player.loadPlaylist(idList, PlayListStore.itemIndex)
  }

  forceRender () {
    this.setState({
      result: PlayListStore.getAll()
    })
  }

  playItem (videoId, index) {
    PlayListAction.selectItem(videoId, index)
  }

  updateLayoutWithAffix () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    this.setState({
      affix: scrollTop > this.props.affixPos ? true : false
    })
  }

  render () {
    const items = PlayListStore.getAll() || []
    const currentIndex = PlayListStore.getCurrentIndex()

    const itemList = items.map((item, index) => {
      let itemClassName = `list__item${ index === currentIndex ? ' is-item-selected' : '' }`

      return (
        <li
          className={ itemClassName }
          key={ index }
          id={ item.videoId }
          onClick={ this.playItem.bind(this, item.videoId, index) }
        >
          <div className="list__title">{ item.title }</div>
          <div className="list__thumb">
            <img src={ item.thumb } className="list__thumb-img" />
          </div>
        </li>
      )
    })

    return (
      <div className={ 'list' + (items.length ? '' : ' is-hidden') + (this.state.affix ? ' is-under-affix-video' : '') }>
        <h2 className="list__headline">
          <FontAwesome
            className=''
            name='list'
          />
          <span className="list__headline-inner">Playlist</span>
        </h2>
        <ol className="list__items">
          { itemList }
        </ol>
      </div>
    )
  }
}

PlayList.defaultProps = {
  affixPos: 60
}
