import React from 'react'

import FontAwesome from 'react-fontawesome'

import { SidebarAction } from '../actions/sidebar-action'


export class Navigation extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  handleClick (e) {
    e.preventDefault()
    SidebarAction.toggle()
  }

  render () {
    return (
      <nav>
        <ul>
          <li>
            <a href="#" className="btn btn--bar" onClick={ this.handleClick.bind(this) }>
              <FontAwesome
                className=''
                size='2x'
                name='bars'
              />
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
