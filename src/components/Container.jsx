import React, { Component } from 'react'
import Thumbnail from './Thumbnail'
import homes from '../data/homes'
// import PropTypes from 'prop-types'

const style = {
  backgroundColor: 'whitesmoke',
  height: '700px',
  width: '1200px',
  overflow: 'hidden',
}

class Container extends Component {

  generateThumbnails = () =>
    homes.map(home =>
      <Thumbnail
        key={home.id}
        id={home.id}
        name={home.name}
        size={home.size}
        cost={home.cost}
      />,
    )

  render = () =>
    <div style={style}>
      {this.generateThumbnails()}
    </div>
}

export default Container
