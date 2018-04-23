////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { createBrowserHistory } from 'history'
import * as PropTypes from 'prop-types'


class Router extends React.Component {

  static childContextTypes = {
    history: PropTypes.object.isRequired
  }

  history = createBrowserHistory();

  getChildContext() {
    return {
      history: this.history
    }
  }

  componentDidMount() {

    this.unsubscribe = this.history.listen(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    return this.props.children
  }
}

class Route extends React.Component {
  static contextTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { render, component:Component, exact, path } = this.props;
    const { history } = this.context;
    const { location } = history;
    const { pathname } = location;
    if (exact ? pathname === path : pathname.startsWith(path)) {
      if (render) {
        return render();
      }
      else if (Component) {
        return <Component />
      }
      else return null
    }
    else {
      return null
    }

  }

}




class Link extends React.Component {

  static contextTypes = {
    history: PropTypes.object.isRequired
  }

  handleClick = (e) => {
    e.preventDefault()
    this.context.history.push(this.props.to);
  }


  render() {
    return (
      <a
        href={`${this.props.to}`}
        onClick={this.handleClick}
      >
        {this.props.children}
      </a>
    )
  }
}

export { Router, Route, Link }
