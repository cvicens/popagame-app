import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin / 3,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  textInput: {
    height: 40,
    borderColor: Colors.text,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Colors.textBackground,
    color: Colors.coal,
    paddingHorizontal: Metrics.doubleBaseMargin / 2
  },
  textInputReadonly: {
    height: 40,
    borderColor: Colors.text,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Colors.textBackground,
    color: Colors.steel,
    paddingHorizontal: Metrics.doubleBaseMargin / 2
  },
  button: {
    height: 40,
    borderColor: Colors.text,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: Colors.textBackground,
    paddingHorizontal: Metrics.doubleBaseMargin / 2
  },
  buttonDisabled: {
    height: 40,
    borderColor: Colors.text,
    borderWidth: 1,
    backgroundColor: Colors.textBackground,
    paddingHorizontal: Metrics.doubleBaseMargin / 2
  },
  usernameInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingVertical: 10
  },
  passwordInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingVertical: 10
  }
})