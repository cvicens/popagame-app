import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
    
  },
  instructionsSection: {
    padding: 10
  },
  instructionsHeader: {
    paddingTop: Metrics.doubleBaseMargin / 3,
    marginVertical: Metrics.smallMargin,
    borderBottomColor: Colors.leroy,
    borderBottomWidth: 2,
  },
  instructionsHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.coal,
    textAlign: 'left'
  },
  instructionsText: {
    fontSize: 16,
    paddingTop: Metrics.doubleBaseMargin / 3,
    color: Colors.coal,
    marginVertical: Metrics.smallMargin,
    textAlign: 'justify'
  },
  mainContainerSolid: {
    flex: 1,
    backgroundColor: Colors.white
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
  buttonRow: {
    paddingVertical: Metrics.doubleBaseMargin / 3,
    paddingHorizontal: Metrics.doubleBaseMargin,
    alignItems: 'center'
  },
  startButtonStyle: {
    //flex: 1,
    height: 110,
    borderRadius: 110,
    width: 110,
    //marginHorizontal: Metrics.section,
    //marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.leroyBlue,
    justifyContent: 'center'
  },
  startButtonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
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
  bannerContainer: {
    height: 110,
    backgroundColor: Colors.leroy,
    paddingLeft: 35,
    paddingTop: Metrics.statusbarHeight
  },
  banner: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    margin: 5
  },
  bannerText: {
    flex: 5,
    flexDirection: 'column',
    //alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  bannerImage: {
    flex: 2,
    flexDirection: 'column',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    //marginTop: Metrics.statusbarHeight,
  },
  bannerSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    //marginTop: 5,
  },
  statusBar: {
    height: Metrics.statusbarHeight,
  },
  appBar: {
    backgroundColor: Colors.background,
    //height: APPBAR_HEIGHT,
    paddingVertical: 10,
    alignItems: 'center'
  },
  appBarText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.headerText
  },
  questionSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    margin: 5
  },
  questionOrder: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  questionOrderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.coal,
    //marginTop: Metrics.statusbarHeight,
  },
  question: {
    flex: 5,
    flexDirection: 'column',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.coal,
    //marginTop: 5,
  },
  detailsSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    margin: 5
  },
  questionImage: {
    flex: 2,
    height: 150,
    flexDirection: 'column',
    //alignItems: 'center',
    marginLeft: 20,
    //paddingBottom: 5,
  },
  quizStatus: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  ranking: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.coal,
    //marginTop: 5,
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.coal,
    //marginTop: 5,
  },
  choicesSection: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    margin: 5
  }
})