import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Button, Image, View, Modal, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Colors, Images } from '../Themes/'

import ActionButton from '../Components/ActionButton'

import { connect } from 'react-redux'

import QuizScreen from './QuizScreen'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import EventActions from '../Redux/EventRedux'
import QuizActions from '../Redux/QuizRedux'

// Styles
import styles from './Styles/EventScreenStyle'

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
    this.props.fetchEvent(COUNTRY, CITY);
  }

  startQuiz () {
    this.props.startQuiz(this.props.currentQuiz);
    //this.props.navigation.navigate('QuizScreen');
  }

  onClose () {
    if (this.props.screenProps && this.props.screenProps.toggle) {
      this.props.screenProps.toggle();
    } else {
      this.props.navigation.goBack();
    }
  }

  render () {
    console.log('🎥 EventScreen render ', this.props, JSON.stringify(new Date()), '🎬');

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
                {'Instrucciones'}
              </Text>
            </View>

            <Text style={styles.instructionsText}>
              {INSTRUCCIONES[0]}
            </Text>
            <Text style={styles.instructionsText}>
              {INSTRUCCIONES[1]}
            </Text>
            <Text style={styles.instructionsText}>
              {INSTRUCCIONES[2]}
            </Text>

            <View style={styles.buttonRow}>
              <ActionButton 
                disabled={this.props.currentQuiz === null ||typeof this.props.currentQuiz === 'undefined'} 
                buttonStyle={styles.startButtonStyle}
                textStyle={styles.startButtonText}
                onPress={(e) => this.startQuiz()}>
              {'COMENZAR'}
              </ActionButton>
            </View>

          </View>

       

        </ScrollView>
      </View>
    )
  }
}

/*<Modal
presentationStyle={'pageSheet'}
visible={this.props != null && this.props.showModal}
>
<QuizScreen screenProps={{ toggle: this.toggleModal }} />
</Modal>*/

const mapStateToProps = (state) => {
  return {
    userGivenName: state.login.result ? state.login.result.givenName : 'NO_USER',

    fetching: state.event.fetching,
    error: state.event.error,
    currentEvent: state.event.currentEvent,
    currentQuiz: state.event.currentQuiz,
    showModal: state.event.showModal,
    errorMessage: state.event.errorMessage,
    errorReason: state.event.errorReason,
    errorDescription: state.event.errorDescription,
    errorRecoverySuggestion: state.event.errorRecoverySuggestion
  }
}


// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  fetchEvent: (country, city) => dispatch(EventActions.fetchEventRequest(country, city)),
  startQuiz: (quiz) => dispatch(QuizActions.startQuiz(quiz)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
