import React from "react";

export default class ContactCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
    };
  }

  handleOnChange = (event) => {
    const contactObj = {};
    contactObj[event.target.name] = event.target.value;
    this.setState(contactObj);
  };

  handleOnCreate = () => {
    this.props.onCreate({
      name: this.state.name,
      phone: this.state.phone,
    });
    this.setState({
      name: "",
      phone: "",
    });
    this.nameInput.focus();
  };

  handleEnter = (event) => {
    if (event.charCode === 13) {
      this.handleOnCreate();
    }
  };

  render() {
    return (
      <div>
        <h1>Create</h1>
        <input
          name="name"
          placeholder="name"
          type="text"
          value={this.state.name}
          onChange={this.handleOnChange}
          ref={(ref) => (this.nameInput = ref)}
        />
        <input
          name="phone"
          placeholder="phone"
          type="text"
          value={this.state.phone}
          onChange={this.handleOnChange}
          onKeyPress={this.handleEnter}
        />
        <p></p>
        <button onClick={this.handleOnCreate}>Create</button>
      </div>
    );
  }
}
