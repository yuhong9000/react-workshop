////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import $ from "jquery";
import "bootstrap-webpack";

class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  doImperativeWork(){
    if(this.props.isOpen){
      this.open();
    }
    else{
      this.close();
    }
  }
  componentDidMount(){
    this.doImperativeWork();
  }

  componentDidUpdate(prevProps){
    if(prevProps.isOpen !== this.props.isOpen)
      this.doImperativeWork();
  }

  open() {
    $(this.node).modal("show");
  }

  close() {
    $(this.node).modal("hide");
  }

  render() {
    return (
      <div className="modal fade" ref={node => (this.node = node)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    isModalOpen: false,
  }

  openModal = () => {
    // no longer need ref modal
    // this.modal.open();
    this.setState({
      isModalOpen: true,
    })
  };

  closeModal = () => {
    // this.modal.close();
    this.setState({
      isModalOpen: false,
    })
  };

  render() {
    return (
      <div className="container">
        <h1>Let’s make bootstrap modal declarative</h1>

        <button className="btn btn-primary" onClick={this.openModal}>
          open modal
        </button>

        <Modal
          isOpen={this.state.isModalOpen}
          title="Declarative is better"
        >
          <p>Calling methods on instances is a FLOW not a STOCK!</p>
          <p>
            It’s the dynamic process, not the static program in text
            space.
          </p>
          <p>
            You have to experience it over time, rather than in
            snapshots of state.
          </p>
          <button
            onClick={this.closeModal}
            type="button"
            className="btn btn-default"
          >
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
