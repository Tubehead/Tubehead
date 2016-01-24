import React from 'react'

import FontAwesome from 'react-fontawesome'


export class Github extends React.Component {

  constructor (props) {
    super(props)
  }

  handleClick (e) {
    e.preventDefault()
    shell.openExternal('https://github.com/Tubehead/TubeHead')
  }

  render () {
    return (
      <a href="#" className="footer__link" onClick={ this.handleClick.bind(this) }>
        <FontAwesome
          className=''
          size='2x'
          name='github'
        />
      </a>
    )
  }
}
