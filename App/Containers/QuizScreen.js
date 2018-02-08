import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Button, Image, View, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Colors, Images } from '../Themes/'
import ChoiceButton from '../Components/ChoiceButton'
import RoundedButton from '../Components/RoundedButton'

import * as Animatable from 'react-native-animatable'

import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import EventActions from '../Redux/EventRedux'
import QuizActions from '../Redux/QuizRedux'

// Styles
import styles from './Styles/QuizScreenStyle'

class EventScreen extends Component {
  componentWillMount () {
    
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.quizFinished && nextProps.quizFinished) {
      this.props.stopQuiz();
    }
  }

  pushAnswer (questionIdx, answer) {
    this.props.pushAnswer(questionIdx, answer);
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
    userGivenName: state.login.result ? state.login.result.givenName : 'NO_USER',
    startTimestamp: state.quiz.startTimestamp,
    currentQuestionIdx: state.quiz.currentQuestionIdx,
    correctAnswers: state.quiz.correctAnswers,
    questions: state.quiz.questions,
    quizFinished: state.quiz.finished
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  pushAnswer: (questionIdx, answer) => dispatch(QuizActions.pushAnswer(questionIdx, answer)),
  stopQuiz: () => dispatch(QuizActions.stopQuiz())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
