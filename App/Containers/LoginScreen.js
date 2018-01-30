import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Button, Image, View, KeyboardAvoidingView } from 'react-native'
import { Colors } from '../Themes/'
import GenericButton from '../Components/GenericButton'
import { Images } from '../Themes'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions, { updateUsername } from '../Redux/LoginRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  renderError () {
    return (
      <Text style={styles.sectionText}>
        {'ERROR? ' + this.props.error}
      </Text>
    )
  }

  render () {
    console.log('🎥 LoginScreen render ', this.props, JSON.stringify(new Date()), '🎬');

    const editable = !this.props.fetching;
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly;
    const buttonStyle = editable ? styles.button : styles.buttonDisabled;
    return (
      <View style={styles.mainContainerSolid}>
        
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.popagame} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <View style={styles.row}>
              <TextInput
                ref='username'
                style={textInputStyle}
                value={this.props.username === null ? '' : this.props.username}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(username) => this.props.updateUsername(username)}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.password.focus()}
                placeholder='Username' />
            </View>
            
            <View style={styles.row}>
              <TextInput
                ref='password'
                style={textInputStyle}
                value={this.props.password === null ? '' : this.props.password}
                editable={editable}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={(password) => this.props.updatePassword(password)}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.props.authenticate(this.props.username, this.props.password)}
                placeholder='Password' />
            </View>

            <View style={styles.row}>
              <Button 
                color={Colors.coal}
                title={'LOGIN'}
                onPress={(e) => this.props.authenticate(this.props.username, this.props.password)}/>
            </View>

            {this.props.error ? this.renderError() : null}
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    password: state.login.password,
    fetching: state.login.fetching,
    error: state.login.error,
    result: state.login.result,
    errorMessage: state.login.errorMessage,
    errorReason: state.login.errorReason,
    errorDescription: state.login.errorDescription,
    errorRecoverySuggestion: state.login.errorRecoverySuggestion
  }
}


// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  updateUsername: (username) => dispatch(LoginActions.updateUsername(username)),
  updatePassword: (password) => dispatch(LoginActions.updatePassword(password)),
  authenticate: (username, password) => dispatch(LoginActions.authenticateRequest(username, password))
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
