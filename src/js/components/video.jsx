import React from 'react'

import FontAwesome from 'react-fontawesome'
import _ from 'lodash'

import { PlayListStore } from '../stores/playlist-store'
import { PlayListAction } from '../actions/playlist-action'


export class Video extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      autoPlay: this.props.autoPlay,
      affix: false
    }
  }

  callYoutubeApi () {
    window.onYouTubeIframeAPIReady = function () {
      window.player = new YT.Player('player', {
        videoId: '',
        width: 400,
        height: 250,
        events: {
          onReady: function () {
          },
          onStateChange: function (event) {
            if (event.data === YT.PlayerState.PLAYING) {
              PlayListAction.updateCurrentIndex(window.player.getPlaylistIndex())
            }
          },
          onError: function () {
          }
        }
      })
    }
  }

  componentDidMount () {
    PlayListStore.on('update', this.updatePlayer.bind(this))
    this.callYoutubeApi()
    window.addEventListener('scroll', _.throttle(this.affix.bind(this), 60))
  }

  componentWillUnmount () {
    PlayListStore.off('update')
    window.removeEventListener('scroll')
  }

  componentDidUpdate (prevProps, prevState) {
  }

  affix () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    this.setState({
      affix: scrollTop > this.props.affixPos ? true : false
    })
  }

  updatePlayer () {
    this.setState({
      autoPlay: 1
    })
  }

  render () {
    const {
      autoPlay,
      affix
    } = this.state

    const items = PlayListStore.getAll()
    const isVideoExist = items && items.length

    return (
      <div className={ 'video' + (isVideoExist ? '' : ' is-hidden') + (affix ? ' is-fixed' : '') }>
        <div id="player"></div>
      </div>
    )
  }
}

Video.defaultProps = {
  autoPlay: 1,
  affixPos: 60
}
