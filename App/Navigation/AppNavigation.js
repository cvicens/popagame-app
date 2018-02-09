import { StackNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import EventScreen from '../Containers/EventScreen'
import QuizScreen from '../Containers/QuizScreen'
import RankingScreen from '../Containers/RankingScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: { screen: LoginScreen },
  EventScreen: { screen: EventScreen },
  QuizScreen: { screen: QuizScreen },
  RankingScreen: { screen: RankingScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  //initialRouteName: 'LaunchScreen',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
