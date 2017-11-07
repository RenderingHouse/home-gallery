import React, { Component } from 'react'
import Thumbnail from './Thumbnail'
import homes from '../data/homes'
// import PropTypes from 'prop-types'

const style = {
  container: {
    backgroundColor: 'whitesmoke',
    height: '100%',
    width: '100%',
    overflow: 'scroll',
    display: 'flex',
    padding: '5px 0px',

    WebkitAlignItems: 'center',
    alignItems: 'center',
    WebkitJustifyContent: 'center',
    justifyContent: 'center',
    WebkitFlexDirection: 'row',
    flexDirection: 'row',
    WebkitFlexWrap: 'wrap',
    flexWrap: 'wrap',
    WebkitAlignContent: 'flex-start',
    alignContent: 'flex-start',
  },
  modalDialog: {
    width: '350px',
    height: '200px',
    backgroundColor: 'white',
    border: '2px lightgray solid',
    borderRadius: '3px',
    position: 'absolute',
    zIndex: 3,
    textAlign: 'center',
    cursor: 'pointer',
  },
  modalOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: '0.4',
    position: 'absolute',
    zIndex: 2,
    cursor: 'pointer',
  },
}

class Container extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      name: '',
      size: 0,
      cost: 0,
    }
  }

  generateThumbnails = () =>
    homes.map(home =>
      <Thumbnail key={home.id} {...home} openModal={this.openModal} />,
    )

  openModal = (name, size, cost) => {
    this.setState({
      showModal: true,
      name,
      size,
      cost,
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    })
  }

  render = () =>
    <div style={style.container}>
      {this.generateThumbnails()}
      {this.state.showModal &&
        <div style={style.modalDialog} onClick={this.closeModal} >
          <h2>Name: {this.state.name}</h2>
          <h2>Cost: {this.state.cost}</h2>
          <h2>Sq ft: {this.state.size}</h2>
        </div>
      }
      {this.state.showModal &&
        <div style={style.modalOverlay} onClick={this.closeModal} />
      }
    </div>
}

export default Container
