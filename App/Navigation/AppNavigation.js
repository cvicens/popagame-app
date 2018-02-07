import { StackNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import EventScreen from '../Containers/EventScreen'
import QuizScreen from '../Containers/QuizScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: { screen: LoginScreen },
  EventScreen: { screen: EventScreen },
  QuizScreen: { screen: QuizScreen }
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
