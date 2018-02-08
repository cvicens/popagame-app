import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    flex: 1,
    height: 45,
    borderRadius: 5,
    //marginHorizontal: Metrics.section,
    //marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.leroy,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.coal,
    backgroundColor: Colors.transparent,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
