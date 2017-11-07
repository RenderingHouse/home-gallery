import React, { Component } from 'react'
import PropTypes from 'prop-types'

const imgLoc = 'http://res.cloudinary.com/renderinghouse/image/upload/h_200/app/demo/images/';
const style = {
  tile: {
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    height: '234px',
    width: '300px',
    margin: '5px',
    userSelect: 'none',
  },
  tileHeader: {
    paddingTop: '.2rem',
    paddingBottom: '.3rem',
    lineHeight: '1.6rem',
    fontSize: '1rem',
    fontWeight: '100',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,.5)',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  tileImg: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '300px',
    height: '200px',
    position: 'relative',
  },
}

class Thumbnail extends Component {

  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  }

  render = () =>
    <div style={style.tile}>
      <section style={style.tileHeader}>{this.props.name}</section>
      <div style={{
        backgroundImage: `url(${imgLoc}${this.props.src})`,
        ...style.tileImg,
      }}
      />
    </div>
}

export default Thumbnail
