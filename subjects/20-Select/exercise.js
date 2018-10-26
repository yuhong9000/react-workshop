////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  state = { showOptions: false, value:this.props.defaultValue }

  toggleOptions = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }

  handleOnClick = (value) => {
    this.setState({
      value,
    })
  }

  handleMatchValue = () => {
    let value = '';
    React.Children.forEach(this.props.children, (child)=>{
      if(child.props.value === this.state.value
      || child.props.value === this.props.defaultValue)
        value = child.props.children;
    })
    return value;
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.value !== this.props.value){
      // console.log('changed prop',prevProps.value,this.props.value)
      if(this.props.onChange){
        this.props.onChange(this.props.value);
      }
      this.setState({
        value: this.props.value,
      })
    }
    if(prevState.value !== this.state.value){
      // console.log('changed state')
      if(this.props.onChange){
        this.props.onChange(this.state.value);
      }
    }
  }

  componentDidMount(){
    if(this.props.value){
      this.setState({
        value: this.props.value,
      });
    }
    else {
      this.setState({
        value: this.props.defaultValue,
      })
    }
  }

  render() {
    const label = this.handleMatchValue();
    const children = React.Children.map(this.props.children,(child)=>{
      return React.cloneElement(child,{
        _onClick: () => this.handleOnClick(child.props.value),
      })
    })

    return (
      <div className="select" onClick={this.toggleOptions}>
        <div className="label">
          {label} <span className="arrow">▾</span>
        </div>
        {this.state.showOptions &&
        <div className="options">{children}</div>}
      </div>
    );
  }
}

class Option extends React.Component {
  static propTypes = {
    _onClick: PropTypes.func,
  };

  render() {
    return <div className="option" onClick={this.props._onClick}>{this.props.children}</div>;
  }
}

class App extends React.Component {
  state = {
    selectValue: "dosa"
  };

  setToMintChutney = () => {
    this.setState({ selectValue: "mint-chutney" });
  };

  render() {
    return (
      <div>
        <h1>Select</h1>

        <h2>Uncontrolled</h2>

        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Controlled</h2>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <p>
          <button onClick={this.setToMintChutney}>
            Set to Mint Chutney
          </button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={value => this.setState({ selectValue: value })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
