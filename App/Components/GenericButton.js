import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyles'


export default class GenericButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object,
    buttonStyle: PropTypes.any,
    textStyle: PropTypes.any
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    return (
      <TouchableOpacity style={[styles.button, this.props.buttonStyle]} onPress={this.props.onPress}>
        <Text style={[styles.buttonText, this.props.textStyle]}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
