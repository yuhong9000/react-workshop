import React from "react";
import PropTypes from "prop-types";
import { createHashHistory } from "history";

/*
How to use the history library:

// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

const RouterContext = React.createContext();

class Router extends React.Component {
  history = createHashHistory();

  state = {
    location: history.location,
  }

  componentDidMount(){
    this.history.listen(()=>{
      this.setState({
        location:history.location,
      })
    })
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history:this.history
        }}
        >
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

class Route extends React.Component {
  render() {
    const { path, render, component: Component } = this.props;
    return(
      <RouterContext.Consumer>
        {(value)=>{
          const history = value.history;
          const isMatch = history.location.pathname.startsWith(path);
          if(isMatch){
            if(render)
              return render()
            else if(Component)
              return <Component />
          }
          else{
            return null;
          }
        }}
      </RouterContext.Consumer>
    );
  }
}

class Link extends React.Component {
  handleClick = (event, history) => {
    event.preventDefault();
    if(!history.location.pathname.startsWith(this.props.to))
      history.push(this.props.to);
  };

  render() {
    return (
      <RouterContext.Consumer>
        {
          (value)=>{
            const history = value.history;
            return (
              <a href={`#${this.props.to}`}
                onClick={(event)=>{
                  this.handleClick(event,history);
                }}>
                {this.props.children}
              </a>
            )
          }
        }
      </RouterContext.Consumer>
    );
  }
}

class Redirect extends React.Component {

}

export { Router, Route, Link };
