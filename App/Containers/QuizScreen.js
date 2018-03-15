import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Button, Image, View, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Colors, Images } from '../Themes/'
import ChoiceButton from '../Components/ChoiceButton'
import RoundedButton from '../Components/RoundedButton'

import * as Animatable from 'react-native-animatable'

import ActionButton from '../Components/ActionButton'

import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import EventActions from '../Redux/EventRedux'
import QuizActions from '../Redux/QuizRedux'

// Styles
import styles from './Styles/QuizScreenStyle'

const INSTRUCCIONES = [ 
  'Muchas gracias por paticipar...',
  'Ahora puede ver el estado del ranking...',
  'El juego ha terminado, por favor pulse terminar.'
];

class EventScreen extends Component {
  componentWillMount () {
    
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.quizFinished && nextProps.quizFinished) {
      this.props.stopQuiz(this.props.username, this.props.eventId);
      //this.props.submitAnswers(this.props.username, this.props.quizId, this.props.answers);
    }
  }

  pushAnswer (questionIdx, answer) {
    this.props.pushAnswer(this.props.username, 
      this.props.userId, this.props.firstName, this.props.lastName, 
      this.props.eventId, questionIdx, answer);
  }

  renderChoiceButtons () {
    return this.props.questions[this.props.currentQuestionIdx].choices.map((choice, index) => { 
      return (
          <View key={'choice-' + index} style={styles.buttonRow}>
          <ChoiceButton 
            onPress={(e) => this.pushAnswer(this.props.currentQuestionIdx, index)}>
            {choice}
            </ChoiceButton>
          </View>  
        )
      }
    );
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
    //console.log('🎥 QuizScreen render ', this.props, JSON.stringify(new Date()), '🎬');

    if (this.props.fetching) {
      return (
        <View style={[styles.activityContainer, styles.horizontal]}>
          
          <ActivityIndicator size="large" color="#6eba40" />
          
        </View>
        )
    }

    if (this.props.quizFinished) {
      return (
        <View style={styles.mainContainerSolid}>
        
        <TouchableOpacity onPress={() => this.onClose()} style={{
          position: 'absolute',
          paddingTop: 10,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
        </TouchableOpacity>

        <ScrollView style={styles.container}>
          
          <View style={styles.bannerContainer}>
            <View style={styles.banner}>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>{this.props.userGivenName}</Text>
                <Text style={styles.bannerSubtitle}>{'¡El juego ha terminado!'}</Text>
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
              {'VER RANKING'}
              </ActionButton>
            </View>

          </View>

        </ScrollView>

        </View>
        )
    }

    const editable = !this.props.fetching;
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly;
    const buttonStyle = editable ? styles.button : styles.buttonDisabled;
    return (
      <View style={styles.mainContainerSolid}>
        
        <TouchableOpacity onPress={() => this.onClose()} style={{
          position: 'absolute',
          paddingTop: 20,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
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

          <View style={styles.questionSection} >
            <View style={styles.questionOrder}>
              <Text style={styles.questionOrderText}>
                {(this.props.currentQuestionIdx + 1) + '/' + this.props.questions.length}
              </Text>
            </View>

            <View style={styles.question}>
              <Text style={styles.questionText}>
                {this.props.questions[this.props.currentQuestionIdx].question}
              </Text>
            </View> 
          </View>

          <View style={styles.detailsSection} >
            <View style={styles.questionImage}>
              <Image 
                source={{uri: this.props.questions[this.props.currentQuestionIdx].image}} 
                style={ {flex: 1, width: null, height: null, resizeMode: 'contain'} } />
            </View>

            <View style={styles.quizStatus}>
              <Text style={styles.ranking}>{this.props.correctAnswers}</Text>
              <Text style={styles.timer}>{3}</Text>
            </View> 
          </View>

          <View style={styles.choicesSection} >
            {this.renderChoiceButtons()}
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGivenName: state.login.givenName ? state.login.givenName : 'NO_USER',
    username: state.login.username ? state.login.username : 'NO_USER',
    userId: state.login.userId ? state.login.userId : 'NO_USER',
    firstName: state.login.firstName ? state.login.firstName : 'NO_USER',
    lastName: state.login.lastName ? state.login.lastName : 'NO_USER',
    eventId: state.event.currentEvent.id,
    startTimestamp: state.quiz.startTimestamp,
    currentQuestionIdx: state.quiz.currentQuestionIdx,
    correctAnswers: state.quiz.correctAnswers,
    questions: state.quiz.questions,
    quizFinished: state.quiz.finished
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  pushAnswer: (username, userId, firstName, lastName, eventId, questionIdx, answer) => dispatch(QuizActions.pushAnswer(username, userId, firstName, lastName, eventId, questionIdx, answer)),
  stopQuiz: (username, eventId) => dispatch(QuizActions.stopQuiz(username, eventId)),
  //submitAnswers: (username, eventId, answers) => dispatch(QuizActions.submitAnswers(username, eventId, answers)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
