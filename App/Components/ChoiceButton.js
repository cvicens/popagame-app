import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from './Styles/ChoiceButtonStyles'

import * as Animatable from 'react-native-animatable'

export default class ChoiceButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object,
    buttonStyle: PropTypes.any,
    textStyle: PropTypes.any,
    disabled: PropTypes.bool
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    const disabled = this.props.disabled === true;
    if (!disabled) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }} ref="view" animation="pulse" easing="ease-out" iterationCount="infinite" >
        <TouchableOpacity disabled={disabled} style={[styles.button, this.props.buttonStyle]} onPress={this.props.onPress}>
          <Text style={[styles.buttonText, this.props.textStyle]}>{this.getText()}</Text>    
        </TouchableOpacity>
        </View>
      )
    } 
    return (
      <Animatable.View style={{ flexDirection: 'row', alignItems: 'center' }} ref="view" animation="pulse" easing="ease-out" iterationCount="infinite" >
        <TouchableOpacity disabled={disabled} style={[styles.button, this.props.buttonStyle]} onPress={this.props.onPress}>
          <Text style={[styles.buttonText, this.props.textStyle]}>{this.getText()}</Text>    
        </TouchableOpacity>
      </Animatable.View>
    )
  }
}
