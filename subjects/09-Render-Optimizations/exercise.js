////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as RainbowListDelegate from "./RainbowListDelegate";

const rowHeight = 30;

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  state = { windowHeight:0, start:0, rows: 26}

  componentDidMount(){
    this.setState({
      windowHeight: window.innerHeight,
      rows: parseInt(window.innerHeight/this.props.rowHeight),
    })
  }

  handleOnScroll = (event) => {
    const num = parseInt(event.target.scrollTop / this.props.rowHeight);
    this.setState({
        start: num,
      })
  }

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const { start, rows } = this.state;
    const totalHeight = numRows * rowHeight;

    const items = [];

    if(start > 0)
      items.push(<li key={-1}><div style={{height: start*rowHeight}}></div></li>)

    let index = start;
    let end = Math.min(start+rows+1,numRows);

    while (index < end) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div style={{ height: "100vh", overflowY: "scroll" }} onScroll={this.handleOnScroll}>
        <div style={{ height: totalHeight }}>
          <ol>{items}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ListView
    numRows={100}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
