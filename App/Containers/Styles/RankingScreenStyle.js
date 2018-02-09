import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
    
  },
  mainContainerSolid: {
    flex: 1,
    backgroundColor: Colors.white
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
  row: {
    paddingVertical: Metrics.doubleBaseMargin / 3,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  buttonRow: {
    paddingVertical: Metrics.doubleBaseMargin / 3,
    paddingHorizontal: Metrics.doubleBaseMargin,
    alignItems: 'center'
  },
  rankingTable: {
    flexDirection: 'column',
    flex: 1,
    //alignItems: 'center',
    //margin: 5
  },
  rankingHeaderRow: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    backgroundColor: Colors.leroyLightGreen
  },
  rankingHeaderColOne: {
    //flex: 0.25,
    width: 25,
    flexDirection: 'column',
    alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  rankingHeaderColOneText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.coal,
    //marginTop: Metrics.statusbarHeight,
  },
  rankingHeaderColTwo: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  rankingHeaderColTwoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.coal,
    //marginTop: Metrics.statusbarHeight,
  },
  rankingHeaderColThree: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  rankingHeaderColThreeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.coal,
    //marginTop: Metrics.statusbarHeight,
  },
  rankingHeaderColFour: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  rankingHeaderColFourText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.coal,
    //marginTop: Metrics.statusbarHeight,
  },
  rankingRow: {
    flexDirection: 'row',
    flex: 1,
    margin: 5
  },
  rankingColOne: {
    //flex: 0.25,
    width: 25,
    flexDirection: 'column',
    alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  rankingColOneContainer: {
    //flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: Colors.leroyLightGreen,
    //marginRight: 5,
    //paddingBottom: 5,
  },
  rankingColOneText: {
    //width: 20,
    fontSize: 18,
    backgroundColor: Colors.transparent,
    flex: 1,
    color: Colors.coal,
    //textAlign: 'center',
    textAlignVertical: 'center',
    //marginTop: Metrics.statusbarHeight,
  },
  rankingColTwo: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  rankingColTwoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.coal,
    //marginTop: Metrics.statusbarHeight,
  },
  rankingColThree: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  rankingColThreeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //marginRight: 5,
    //paddingBottom: 5,
  },
  rankingColThreeTitleText: {
    fontSize: 16,
    color: Colors.coal,
    //marginTop: Metrics.statusbarHeight,
  },
  rankingColThreeSubtitleText: {
    fontSize: 13,
    color: Colors.charcoal,
    //marginTop: Metrics.statusbarHeight,
  },
  rankingColFour: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankingColFourContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  rankingColFourText: {
    fontSize: 16,
    flex: 1,
    color: Colors.coal,
    textAlign: 'center',
  },
  userImage: {
    flex: 2,
    //width: 50,
    height: 60,
    flexDirection: 'row',
    //alignItems: 'center',
    //marginLeft: 20,
    //paddingBottom: 5,
  }
})