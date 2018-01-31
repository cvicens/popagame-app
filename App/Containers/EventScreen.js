import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Button, Image, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { Colors } from '../Themes/'
import GenericButton from '../Components/GenericButton'
import { Images } from '../Themes'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import EventActions from '../Redux/EventRedux'

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

  renderError () {
    return (
      <Text style={styles.sectionText}>
        {'ERROR? ' + this.props.error}
      </Text>
    )
  }

  render () {
    var __onPress = null;
    if (_DEBUG) {
      __onPress = '';
    } else {
      __onPress = this.props.screenProps.toggle;
    }

    console.log('🎥 EventScreen render ', this.props, JSON.stringify(new Date()), '🎬');

    const editable = !this.props.fetching;
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly;
    const buttonStyle = editable ? styles.button : styles.buttonDisabled;
    return (
      <View style={styles.mainContainerSolid}>
        
        <TouchableOpacity onPress={__onPress} style={{
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

            <View style={styles.row}>
              <Button 
                color={Colors.coal}
                title={'COMENZAR'}
                onPress={(e) => this.props.fetchEvent(COUNTRY, CITY)}/>
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

    fetching: state.event.fetching,
    error: state.event.error,
    result: state.event.result,
    errorMessage: state.event.errorMessage,
    errorReason: state.event.errorReason,
    errorDescription: state.event.errorDescription,
    errorRecoverySuggestion: state.event.errorRecoverySuggestion
  }
}


// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  fetchEvent: (country, city) => dispatch(EventActions.fetchEventRequest(country, city))
})


export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
