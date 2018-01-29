import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Image, View, KeyboardAvoidingView } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import InitActions from '../Redux/InitRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainerSolid}>
        
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.popagame} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <Image source={Images.ready} />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
