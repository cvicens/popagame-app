import React, { Component } from 'react'
import { ScrollView, Text, TextInput, Button, Image, View, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Colors, Images } from '../Themes/'
import ChoiceButton from '../Components/ChoiceButton'
import RoundedButton from '../Components/RoundedButton'

import * as Animatable from 'react-native-animatable'

import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import EventActions from '../Redux/EventRedux'
import RankingActions from '../Redux/RankingRedux'

// Styles
import styles from './Styles/RankingScreenStyle'

class EventScreen extends Component {
  componentWillMount () {
    this.fetchRanking();
  }

  fetchRanking () {
    this.props.fetchRanking(this.props.eventId);
  }

  renderRows () {
    return this.props.rows.map((row, index) => { 
      return (
        <View key={'row-' + index} style={styles.rankingRow} >
          <View style={styles.rankingColOne}>
            <View style={styles.rankingColOneContainer}>
              <Text style={styles.rankingColOneText}>
                {index + 1}
              </Text>
            </View>
          </View>

          <View style={styles.rankingColTwo}>
            <View style={styles.userImage}>
              <Image 
                //source={{uri: row.image}}
                source={Images.leroyLogo} 
                style={ {flex: 1, width: null, height: null, resizeMode: 'contain'} } />
            </View>
          </View>

          <View style={styles.rankingColThree}>
            <View style={styles.rankingColThreeContainer}>
              <Text style={styles.rankingColThreeTitleText}>
                {row.firstName + ' ' + row.lastName}
              </Text>
              <Text style={styles.rankingColThreeSubtitleText}>
                {row.username}
              </Text>
            </View>
          </View>

          <View style={styles.rankingColFour}>
              <Text style={styles.rankingColFourText}>
                {row.points}
              </Text>
          </View>
        </View>
        )
      }
    );
  }

  onClose () {
    if (this.props.screenProps && this.props.screenProps.toggle) {
      this.props.screenProps.toggle();
    } else {
      //this.props.navigation.goBack();
      this.props.navigation.navigate('LoginScreen');
    }
  }

  render () {
    console.log('🎥 RankingScreen render ', this.props, JSON.stringify(new Date()), '🎬');

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
                <Text style={styles.bannerTitle}>{'PopaGame'}</Text>
              </View>
              

              <View style={styles.bannerImage}>
                <Image 
                  source={Images.refresh} 
                  style={ {flex: 1, width: null, height: null, resizeMode: 'contain'} } />
              </View>
            </View>
          </View>

          <View style={styles.rankingTable} >

            <View style={styles.rankingHeaderRow} >
              <View style={styles.rankingHeaderColOne}>
                <Text style={styles.rankingHeaderColOneText}>
                  {''}
                </Text>
              </View>

              <View style={styles.rankingHeaderColTwo}>
                <Text style={styles.rankingHeaderColTwoText}>
                  {'POSICION'}
                </Text>
              </View>

              <View style={styles.rankingHeaderColThree}>
                <Text style={styles.rankingHeaderColThreeText}>
                  {'USUARIO'}
                </Text>
              </View>

              <View style={styles.rankingHeaderColFour}>
                <Text style={styles.rankingHeaderColFourText}>
                  {'PTS'}
                </Text>
              </View>
            </View>

            {this.renderRows()}
            
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGivenName: state.login.result ? state.login.result.givenName : 'NO_USER',
    eventId: state.event.currentEvent.id,
    rows: state.ranking.rows
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  fetchRanking: (eventId) => dispatch(RankingActions.fetchRankingRequest(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
