import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Image, View, KeyboardAvoidingView } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions, { updateUsername } from '../Redux/LoginRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  render () {
    console.log('🎥 LoginScreen render ', this.props, JSON.stringify(new Date()), '🎬');

    return (
      <View style={styles.mainContainerSolid}>
        
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.popagame} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder={'Username'}
              value={this.props.username === null ? '' : this.props.username}
              onChangeText={(username) => this.props.updateUsername(username)}

            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder={'Password'}
              value={this.props.password === null ? '' : this.props.password}
              onChangeText={(password) => this.props.updatePassword(password)}
            />

            <Text style={styles.sectionText}>
              This  isn't what your appX is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text>
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
