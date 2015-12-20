import React from 'react'
import ReactDOM from 'react-dom'

import FontAwesome from 'react-fontawesome'

import { SearchHistoryStore } from '../stores/search-history-store'
import { SearchHistoryAction } from '../actions/search-history-action'
import { PlayListAction } from '../actions/playlist-action'
import { SidebarAction } from '../actions/sidebar-action'


export class SearchHistory extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentDidMount () {
    SearchHistoryStore
      .on('add', this.addHistory.bind(this))
      .on('removeAll', this.resetHistory.bind(this))
  }

  componentWillUnmount () {
    SearchHistoryStore
      .off('add')
      .off('removeAll')
  }

  addHistory () {
    let items = SearchHistoryStore.getItems()

    this.setState({
      items
    })
  }

  resetHistory () {
    this.setState({
      items: []
    })
  }

  handleUpdateFromHistory (e) {
    e.preventDefault()
    const targetQuery = ReactDOM.findDOMNode(e.target).innerHTML

    PlayListAction.updateList(targetQuery)
    SidebarAction.toggle()
  }

  handleRemoveAll () {
    SearchHistoryAction.removeAll()
  }

  render () {
    const items = SearchHistoryStore.getItems() || []
    const itemList = items.map((item, index) => {
      return (
        <li key={ index } className="sidebar__list-item">
          <a href="#" className="sidebar__list-item-link" onClick={ this.handleUpdateFromHistory.bind(this) }>{ item }</a>
        </li>
      )
    })

    const history = items.length ? <ul className="sidebar__list">{ itemList }</ul> : <div className="sidebar__box">There are no items...</div>

    return (
      <nav>
        <h2 className="sidebar__headline">
          <FontAwesome
            className=''
            name='history'
          />
          <span className="sidebar__headline-inner">History</span>
        </h2>

        { history }

        <div className="sidebar__btn">
          <a href="#" className={ 'sidebar__btn-inner' + (items.length ? '' : ' is-hidden') } onClick={ this.handleRemoveAll.bind(this) }>
            <FontAwesome
              className=''
              name='trash'
            />
            <span className="sidebar__btn-label">Remove All Items</span>
          </a>
        </div>
      </nav>
    )
  }
}
