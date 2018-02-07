import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Button, Image, View, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Colors, Images } from '../Themes/'
import ActionButton from '../Components/ActionButton'

import * as Animatable from 'react-native-animatable'

import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import EventActions from '../Redux/EventRedux'
import QuizActions from '../Redux/QuizRedux'

// Styles
import styles from './Styles/QuizScreenStyle'

const COUNTRY = 'SPAIN'; 
const CITY = 'MADRID'; 

const INSTRUCCIONES = [ 
  'Popagame es un juego donde ...',
  'Elige la respuesta...',
  'Al final del juego podrás...'
];

const _DEBUG = false;

class EventScreen extends Component {
  componentWillMount () {
    //this.props.fetchEvent(COUNTRY, CITY);
  }

  renderError () {
    return (
      <Text style={styles.sectionText}>
        {'ERROR? ' + this.props.error}
      </Text>
    )
  }

  onClose () {
    if (this.props.screenProps && this.props.screenProps.toggle) {
      this.props.screenProps.toggle();
    } else {
      this.props.navigation.goBack();
    }
  }

  render () {
    console.log('🎥 QuizScreen render ', this.props, JSON.stringify(new Date()), '🎬');

    const editable = !this.props.fetching;
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly;
    const buttonStyle = editable ? styles.button : styles.buttonDisabled;
    return (
      <View style={styles.mainContainerSolid}>
        
        <TouchableOpacity onPress={() => this.onClose()} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 10,
          zIndex: 10
        }}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>

        <ScrollView style={styles.container}>
          
          <View style={styles.bannerContainer}>
            <View style={styles.banner}>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>{this.props.userGivenName}</Text>
                <Text style={styles.bannerSubtitle}>{'¡Bienvenido a PopaGame!'}</Text>
              </View>
              

              <View style={styles.bannerImage}>
                <Image 
                  source={Images.leroyLogo} 
                  style={ {flex: 1, width: null, height: null, resizeMode: 'contain'} } />
              </View>
            </View>
          </View>

          <View style={styles.instructionsSection} >
            <View style={styles.instructionsHeader} >
              <Text style={styles.instructionsHeaderText}>
                {'QUIZ' + this.props.event}
              </Text>
            </View>

           

            <View style={styles.buttonRow}>
              <ActionButton buttonStyle={styles.startButtonStyle} textStyle={styles.startButtonText}
                onPress={(e) => this.props.log()}>
              {'COMENZAR'}
              </ActionButton>
            </View>

          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGivenName: state.login.result ? state.login.result.givenName : 'NO_USER',
    event: state.event.result,
    answers: state.event.result.answers,
  }
}


// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  //fetchEvent: (country, city) => dispatch(EventActions.fetchEventRequest(country, city)),
  log: () => console.log('dummy')
})


export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
