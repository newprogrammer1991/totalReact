import './index.css'
import React, { PropTypes } from 'react'

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  }

  state = {
    isOpen: false,
    value: this.props.defaultValue
  }


  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  isControlled = () => {
    return this.props.value != null
  }

  handleChange = (value) => {
    this.isControlled() ?
      this.props.onChange(value) :
      this.setState({ value })
  }


  render() {
    const { isOpen } = this.state;
    const { children } = this.props;
    const { value } = this.isControlled() ? this.props : this.state
    let label;

    const childrenItems = React.Children.map(children, (child) => {
      if (value === child.props.value) label = child.props.children
      return React.cloneElement(child, {
        handleChange:()=>this.handleChange(child.props.value)
      })
    })


    return (
      <div className="select" onClick={this.handleToggle}>
        <div className="label">{label}<span className="arrow">▾</span></div>
        {isOpen && (
          <div className="options">
            {childrenItems}
          </div>
        )}
      </div>
    )
  }
}


class Option extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <div className="option" onClick={handleChange}>
        {this.props.children}
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  }

  setToMintChutney = () => {
    this.setState({
      selectValue: 'mint-chutney'
    })
  }


  render() {
    return (
      <div className="app">
        <div className="block">
          <h2>Uncontrolled</h2>
          <Select defaultValue="tikka-masala">
            <Option value="tikka-masala">Tikka Masala</Option>
            <Option value="tandoori-chicken">Tandoori Chicken</Option>
            <Option value="dosa">Dosa</Option>
            <Option value="mint-chutney">Mint Chutney</Option>
          </Select>
        </div>

        <div className="block">
          <h2>Controlled</h2>
          <p>
            <button onClick={this.setToMintChutney}>
              Set to Mint Chutney
            </button>
          </p>
          <Select
            value={this.state.selectValue}
            onChange={(selectValue) => {
              this.setState({ selectValue })
            }}
          >
            <Option value="tikka-masala">Tikka Masala</Option>
            <Option value="tandoori-chicken">Tandoori Chicken</Option>
            <Option value="dosa">Dosa</Option>
            <Option value="mint-chutney">Mint Chutney</Option>
          </Select>
        </div>
      </div>
    )
  }
}

export default App
