import React, { Component } from 'react'
import { View, StatusBar, ActivityIndicator } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'

// Redux stuff
import { connect } from 'react-redux'
import ReduxPersist from '../Config/ReduxPersist'
import StartupActions from '../Redux/StartupRedux'
import InitActions from '../Redux/InitRedux'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentWillMount = () => {
    this.props.init();
    console.log('✨ RootContainer props', this.props);
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('🔥 state', state);
  return {
    ready: state.init.ready,
    fetching: state.init.fetching,
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  init: () => dispatch(InitActions.initRequest())
})

export default connect(null, mapDispatchToProps)(RootContainer)
