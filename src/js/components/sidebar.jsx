import React from 'react'

import FontAwesome from 'react-fontawesome'

import { SidebarStore } from '../stores/sidebar-store'
import { SidebarAction } from '../actions/sidebar-action'


export class Sidebar extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      toggleStatus: false
    }
  }

  componentDidMount () {
    SidebarStore.on('toggle', this.toggle.bind(this))
  }

  componentWillUnmount () {
    SidebarStore.off('toggle')
  }

  toggle () {
    this.setState({
      toggleStatus: !this.state.toggleStatus
    })
  }

  handleToggle (e) {
    e.preventDefault()
    SidebarAction.toggle()
  }

  render () {
    const sidebarClass = `sidebar${ this.state.toggleStatus ? ' is-sidebar-opened' : '' }`
    const sidebarOverlayClass = `sidebar__overlay${ this.state.toggleStatus ? '' : ' is-hidden' }`

    return (
      <div>
        <div className={ sidebarClass }>
          <div className="sidebar__main">
            { this.props.children }
          </div>
        </div>
        <div className={ sidebarOverlayClass } onClick={ this.handleToggle.bind(this) }></div>
      </div>
    )
  }
}
