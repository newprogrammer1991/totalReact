import React from 'react'
import PropTypes from 'prop-types'

/*
// Tips:

// Get the store's state
store.getState()

// Dispatch changes to the store
// (you won't need to call this but you'll pass it to mapDispatchToProps)
store.dispatch(action)

// subscribe to changes to the store
store.subscribe(() => {})

// unsubscribe from the store
unsubscribe = store.subscribe(() => {})
unsubscribe()
*/

class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object.isRequired
  }
  getChildContext() {
    return {
      store: this.props.store
    }
  }
  render() {
    return this.props.children
  }
}
const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Component) => {
    return class extends React.Component {

      static contextTypes = {
        store: PropTypes.object.isRequired
      }

      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          this.forceUpdate();
        })
      }

      componentWillUnmount() {
          this.unsubscribe()
      }

      render() {
        const { store } = this.context;
        return <Component {...this.props} {...mapStateToProps(store.getState())}  {...mapDispatchToProps(store.dispatch)} />
      }
    }
  }
}

export { Provider, connect }
