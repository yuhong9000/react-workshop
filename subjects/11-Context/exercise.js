////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls the form's `onSubmit` handler
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the form's `onSubmit` handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const FormContext = React.createContext()
class Form extends React.Component {
  state = {
    values: {},
  }
  render() {
    return (
      <FormContext.Provider
        value={{
          onSubmit: ()=>{this.props.onSubmit(this.state.values)},
          onChange: (e)=>{this.setState({values:{...this.state.values,[e.name]:e.value}})}
        }}
        >
        <div>{this.props.children}</div>
      </FormContext.Provider>

    );
  }
}

class SubmitButton extends React.Component {
  render() {
    return (
      <FormContext.Consumer>
        {
          (value) => {
            return <button onClick={value.onSubmit}>{this.props.children}</button>
          }
        }
      </FormContext.Consumer>
    );
  }
}

class TextInput extends React.Component {
  render() {
    return (
      <FormContext.Consumer>
        {
          (value) => {
            return   <input
                type="text"
                name={this.props.name}
                placeholder={this.props.placeholder}
                onKeyPress={(e)=>{
                  if(e.key === 'Enter')
                    value.onSubmit();
                }}
                onChange={(e)=>{value.onChange({name:this.props.name,value:e.target.value})}}
              />
          }
        }
      </FormContext.Consumer>
    );
  }
}

class App extends React.Component {
  handleSubmit = (e) => {
    console.log(e);
    alert("YOU WIN!");
  };

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name" />{" "}
            <TextInput name="lastName" placeholder="Last Name" />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
