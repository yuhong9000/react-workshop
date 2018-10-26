////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a <GeoPosition> component that encapsulates the geo state and
//   watching logic and uses a render prop to pass the coordinates back to
//   the <App>
//
// Got extra time?
//
// - Create a <GeoAddress> component that translates the geo coordinates to a
//   physical address and prints it to the screen (hint: use
//   `getAddressFromCoords`)
// - You should be able to compose <GeoPosition> and <GeoAddress> beneath it to
//   naturally compose both the UI and the state needed to render it
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import getAddressFromCoords from "./utils/getAddressFromCoords";
import LoadingDots from "./LoadingDots";

class GeoAddress extends React.Component {
  state = {
    address: null,
  }

  fetchAddress(){
    let {latitude, longitude} = this.props.coords;

    getAddressFromCoords(latitude, longitude).then(address => {
      this.setState({ address });
    });
    // this.setState({
    //   address: `${latitude} and ${longitude}`
    // })
  }
  componentDidMount(){
    this.fetchAddress();
  }

  componentDidUpdate(prevProps){
    if (
      prevProps.coords.longitude !== this.props.coords.longitude ||
      prevProps.coords.latitude !== this.props.coords.latitude
    )
      this.fetchAddress();
  }

  render(){
    return(
      <p>Address: {this.state.address || <LoadingDots/>}</p>
    )
  }
}

class GeoPosition extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => {
        this.setState({ error });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render(){
    const { coords, error }= this.state;
    return this.props.children({coords,error});
  }
}

class App extends React.Component {
  render() {
    return (
      <GeoPosition>
        {
          (state) =>
            <div>
              <h1>Geolocation</h1>
              {state.error ? (
                <div>Error: {state.error.message}</div>
              ) : (
                <React.Fragment>
                  <dl>
                    <dt>Latitude</dt>
                    <dd>{state.coords.latitude || <LoadingDots />}</dd>
                    <dt>Longitude</dt>
                    <dd>{state.coords.longitude || <LoadingDots />}</dd>
                  </dl>
                  <GeoAddress coords={state.coords} />
                </React.Fragment>
              )}

            </div>
          }
      </GeoPosition>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
